from flask import Blueprint, send_file, request, jsonify, redirect
import requests
from io import BytesIO
from bson.objectid import ObjectId
from reportlab.lib.pagesizes import letter
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, NextPageTemplate, PageBreak, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
from dropbox import Dropbox
from dropbox.files import WriteMode

import datetime
import socket
import secrets  # for generating secret key
import os

from __init__ import mongo

hostname = socket.gethostname()

pdf_route = Blueprint('pdf_route', __name__)

@pdf_route.route('/oauth/connect')
def oauth_connect():
    redirect_uri = f"{os.getenv('FRONTEND_URL')}/export-pdf"
    auth_url = f"https://www.dropbox.com/oauth2/authorize?client_id={os.getenv('DROPBOX_CLIENT_ID')}&response_type=token&redirect_uri={redirect_uri}"
    print(f"Redirecting to Dropbox auth URL: {auth_url}")
    return redirect(auth_url)

@pdf_route.route('/api/export-pdf', methods=['GET', 'POST'])
def export_dictionary_pdf():
    try:

        # Get token from request headers
        print("Received export-pdf request")
        auth_header = request.headers.get('Authorization')
        print(f"Auth header present: {bool(auth_header)}")

        if not auth_header:
            return jsonify({'error': 'No token provided'}), 401
            
        access_token = auth_header.split(' ')[1]  # Assumes format: "Bearer <token>"
        print("Token extracted from header")

        dbx = Dropbox(access_token)
        print("Dropbox client initialized")


        # Get all documents from your MongoDB collection and sort them by 'can'
        iv_en = mongo.db.translations.find().sort('can')
        en_iv = mongo.db.translations.find().sort('en')
        cat = mongo.db.translations.find().sort([('cat', 1), ('can', 1)])
        swadesh = mongo.db.translations.find( {"sw" : 1 } ).sort('en')
        iv_en_count = mongo.db.translations.count_documents({})

        # Create BytesIO buffer instead of file
        buffer = BytesIO()

        class FooterCanvas:
            def __init__(self, doc):
                self.doc = doc

            def afterPage(self, canvas, doc):
                "Register drawing commands with the canvas"
                c = canvas
                c.saveState()
                c.setFont("Helvetica", 9)
                c.drawString(cm, cm, "Page %d" % doc.page)
                c.restoreState()


        # Create a new PDF files
        pdf_doc = BaseDocTemplate(buffer, pagesize=letter)

        # Create a Frame for the main content
        main_frame = Frame(pdf_doc.leftMargin, pdf_doc.bottomMargin, pdf_doc.width, pdf_doc.height, id='main_frame')

        # Create a Frame for the footer
        footer_frame = Frame(pdf_doc.leftMargin, pdf_doc.bottomMargin - 50, pdf_doc.width, 50, id='footer_frame')

        # Create a PageTemplate with the main_frame and the footer_frame
        main_page_template = PageTemplate(id='main', frames=[main_frame], onPageEnd=FooterCanvas(pdf_doc).afterPage)
    
        # Add the PageTemplate to the document
        pdf_doc.addPageTemplates([main_page_template])

        # title

        # Get a sample stylesheet
        styles = getSampleStyleSheet()

        # Define a style for the title
        title_style = ParagraphStyle(
            'Title',
            parent=styles['Heading1'],
            fontSize=24,
            alignment=1  # Center alignment
        )

        date_style = ParagraphStyle(
            'Date',
            parent = styles['Heading2'],
            alignment = 1,
            fontSize = 16
            )

        noe_style = ParagraphStyle(
            'Noe',
            parent = styles['Heading2'],
            alignment = 1,
            fontSize = 14
            )


        # Define a style for the section
        section_style = ParagraphStyle(
            'Section',
            parent=styles['Heading2'],
            fontSize=18,
            alignment=0  # Left alignment
        )

        normal_style = ParagraphStyle(
            'MyNormal',
            parent = styles['Normal'],
            fontSize = 12,
            spaceAfter = 5,
            spaceBefore = 5
            )
        
        tableStyle = ParagraphStyle(
        name='CustomWrap',
        fontName='Helvetica',
        fontSize=10,
        leading=12,  # Line spacing
        wordWrap='CJK'  # Wrap algorithm
    )


        # Create a list to hold the elements
        elements = []

        # Create a Paragraph object with the title text
        title = Paragraph("Ilven-Inglis Kistalkekirtus", title_style)
    
        # Add the title to the elements list
        elements.append(title)

        # Add a spacer after the title
        elements.append(Spacer(1, 0.5 * cm))
    
        # Insert date

        anir = datetime.datetime.now()
        anir_str = anir.strftime("%d-%m-%y")
        date = Paragraph(anir_str, date_style)
        elements.append(date)
        elements.append(Spacer(1, 0.2 * cm))

        noe = Paragraph(f"({iv_en_count} kistalkee)", noe_style)
        elements.append(noe)
        elements.append(Spacer(1, 0.2 * cm))

        # Section IV2EN
        section_iv2en = Paragraph("Ilvensi > Inglisu", section_style)
        elements.append(section_iv2en)
        # Add a spacer after the title
        elements.append(Spacer(1, cm))


    #   ILVENSI > INGLISU

        for i, doc in enumerate(iv_en):
            if (doc['cat'] == 'NO'):
                text = f"{doc['can']} ({doc['cat']}) √{doc['root']} [{doc['pl']}, {doc['pl2']}, {doc['par']}] : {doc['en']}"
            elif (doc['cat'] == 'VB'):
                text = f"{doc['can']} ({doc['cat']}) √{doc['root']} [{doc['pr']}, {doc['pa']}, {doc['fu']}] : {doc['en']}"
            else:
                text = f"{doc['can']} ({doc['cat']}) √{doc['root']} : {doc['en']}"
            elements.append(Paragraph(text, normal_style))
        elements.append(PageBreak())

    #   INGLISI > ILVENU

        section_en2iv = Paragraph("Inglisi > Ilvenu", section_style)
        elements.append(section_en2iv)
        # Add a spacer after the title
        elements.append(Spacer(1, cm))

        for i, doc in enumerate(en_iv):
            if (doc['cat'] == 'NO'):
                text = f"{doc['en']} : {doc['can']} ({doc['cat']}) √{doc['root']} [{doc['pl']}, {doc['pl2']}, {doc['par']}]"
            elif (doc['cat'] == 'VB'):
                text = f"{doc['en']} : {doc['can']} ({doc['cat']}) √{doc['root']} [{doc['pr']}, {doc['pa']}, {doc['fu']}]"
            else:
                text = f"{doc['en']} : {doc['can']} ({doc['cat']}) √{doc['root']}"
            elements.append(Paragraph(text, normal_style))
        elements.append(PageBreak())

    #   CAT

        section_cat = Paragraph("Talsalkesies Salten", section_style)

        elements.append(section_cat)
        # Add a spacer after the title
        elements.append(Spacer(1, cm))

        for i, doc in enumerate(cat):
            text = f"{doc['cat']} : {doc['can']} - {doc['en']}"
            elements.append(Paragraph(text, normal_style))
        elements.append(PageBreak())

    #   SWADESH LIST

        section_root = Paragraph("Swadeshin Salto", section_style)

        elements.append(section_root)
        # Add a spacer after the title
        elements.append(Spacer(1, cm))

        for i, doc in enumerate(swadesh):
            text = f"{doc['en']} : {doc['can']}"
            elements.append(Paragraph(text, normal_style))
        elements.append(PageBreak())


        # Build the PDF
        pdf_doc.build(elements)

        # Debug print
        print("PDF generated successfully")

        # Upload to Dropbox

        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        dropbox_path = f"/kistalkekirtus/ilven_dictionary_{timestamp}.pdf"
        
        buffer.seek(0)
        upload_result = dbx.files_upload(
            buffer.getvalue(),
            dropbox_path,
            mode=WriteMode('overwrite')
        )
        
        shared_link = dbx.sharing_create_shared_link(dropbox_path)
        
        return jsonify({
            'success': True,
            'message': 'PDF uploaded to Dropbox',
            'link': shared_link.url
        })

    except Exception as e:
        print(f"Error during PDF export: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500



@pdf_route.route('/api/export-roots', methods=['GET'])
def export_roots_pdf():
    # Get roots data
    konota = mongo.db.roots.find().sort('root', 1)
    root_count = mongo.db.roots.count_documents({})

    # Create BytesIO buffer
    buffer = BytesIO()
    
    class FooterCanvas:
        def __init__(self, doc):
            self.doc = doc

        def afterPage(self, canvas, doc):
            "Register drawing commands with the canvas"
            c = canvas
            c.saveState()
            c.setFont("Helvetica", 9)
            c.drawString(cm, cm, "Page %d" % doc.page)
            c.restoreState()


    # Create PDF doc with buffer
    root_doc = BaseDocTemplate(buffer, pagesize=letter)
    
    # Your existing root PDF creation code
    root_main_frame = Frame(root_doc.leftMargin, root_doc.bottomMargin, root_doc.width, root_doc.height, id='main_frame')

    root_footer_frame = Frame(root_doc.leftMargin, root_doc.bottomMargin - 50, root_doc.width, 50, id='footer_frame')

    root_main_page_template = PageTemplate(id='main', frames=[root_main_frame], onPageEnd=FooterCanvas(root_doc).afterPage)

    root_doc.addPageTemplates([root_main_page_template])

   # title

    # Get a sample stylesheet
    styles = getSampleStyleSheet()

    # Define a style for the title
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Heading1'],
        fontSize=24,
        alignment=1  # Center alignment
    )

    date_style = ParagraphStyle(
        'Date',
        parent = styles['Heading2'],
        alignment = 1,
        fontSize = 16
        )

    noe_style = ParagraphStyle(
        'Noe',
        parent = styles['Heading2'],
        alignment = 1,
        fontSize = 14
        )


    # Define a style for the section
    section_style = ParagraphStyle(
        'Section',
        parent=styles['Heading2'],
        fontSize=18,
        alignment=0  # Left alignment
    )

    normal_style = ParagraphStyle(
        'MyNormal',
        parent = styles['Normal'],
        fontSize = 12,
        spaceAfter = 5,
        spaceBefore = 5
        )
    
    tableStyle = ParagraphStyle(
    name='CustomWrap',
    fontName='Helvetica',
    fontSize=10,
    leading=12,  # Line spacing
    wordWrap='CJK'  # Wrap algorithm
    )

   # Create a list to hold the elements
    root_elements = []

    # Create a Paragraph object with the title text
    root_title = Paragraph("Konotalen Salto", title_style)
    # Add the title to the elements list
    root_elements.append(root_title)

    # Add a spacer after the title
    root_elements.append(Spacer(1, 0.5 * cm))

    # Insert date

     # Insert date

    anir = datetime.datetime.now()
    anir_str = anir.strftime("%d-%m-%y")
    date = Paragraph(anir_str, date_style)
    root_elements.append(date)
    root_elements.append(Spacer(1, 0.2 * cm))

    nor = Paragraph(f"({root_count} konoi)", noe_style)
    root_elements.append(nor)
    root_elements.append(Spacer(1, 0.2 * cm))

    data = [["ROOT", "PRIMARY", "ACTIVE", "MOD ACT", "PASSIVE", "MOD PAS"]]  # Header row

    for doc in konota:
        row = [doc['root'], doc['prim'], doc['act'], doc['moda'], doc['pas'], doc['modp']]
        data.append(row)

    # Wrap cell content in Paragraphs
    for i in range(len(data)):
        for j in range(len(data[i])):
            data[i][j] = Paragraph(data[i][j], tableStyle)  # Wrap text
    # Create the table

    table = Table(data, colWidths=[60, 80, 90, 40, 90, 40], repeatRows=1)  # Adjust widths as needed
    WIDTH, HEIGHT = letter

    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.ghostwhite),
        ('GRID', (0,0), (-1,-1), 1, colors.black),
        ('WIDTH', (0, 0), (-1, -1), WIDTH * 0.8),
    ]))

    root_elements.append(table)

    # Build PDF to buffer
    root_doc.build(root_elements)
    
    # Prepare buffer for reading
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name='konota.pdf',
        mimetype='application/pdf'
    )