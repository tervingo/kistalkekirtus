from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId
from reportlab.lib.pagesizes import letter
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, NextPageTemplate, PageBreak, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors



import datetime
import socket

from __init__ import mongo

hostname = socket.gethostname()

from constants import paths

pdf_route = Blueprint('pdf_route', __name__)

@pdf_route.route('/api/export/pdf', methods=['GET'])
def export_pdf():
    # Get all documents from your MongoDB collection and sort them by 'can'
    iv_en = mongo.db.translations.find().sort('can')
    en_iv = mongo.db.translations.find().sort('en')
    cat = mongo.db.translations.find().sort([('cat', 1), ('can', 1)])
    konota = mongo.db.roots.find().sort('root', 1)
    swadesh = mongo.db.translations.find( {"sw" : 1 } ).sort('en')

    iv_en_count = mongo.db.translations.count_documents({})
    root_count = mongo.db.roots.count_documents({})

    # Specify the path where you want to save the CSV file

    pdf_path_name = f"{hostname.upper()}_PDF_PATH"
    path = paths[pdf_path_name]

    root_pdf_path_name = f"{hostname.upper()}_ROOT_PDF_PATH"
    root_file = paths[root_pdf_path_name]


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
    pdf_doc = BaseDocTemplate(path, pagesize=letter)
    root_doc = BaseDocTemplate(root_file, pagesize=letter)

    # Create a Frame for the main content
    main_frame = Frame(pdf_doc.leftMargin, pdf_doc.bottomMargin, pdf_doc.width, pdf_doc.height, id='main_frame')
    root_main_frame = Frame(root_doc.leftMargin, root_doc.bottomMargin, root_doc.width, root_doc.height, id='main_frame')

    # Create a Frame for the footer
    footer_frame = Frame(pdf_doc.leftMargin, pdf_doc.bottomMargin - 50, pdf_doc.width, 50, id='footer_frame')
    root_footer_frame = Frame(root_doc.leftMargin, root_doc.bottomMargin - 50, root_doc.width, 50, id='footer_frame')

    # Create a PageTemplate with the main_frame and the footer_frame
    main_page_template = PageTemplate(id='main', frames=[main_frame], onPageEnd=FooterCanvas(pdf_doc).afterPage)
    root_main_page_template = PageTemplate(id='main', frames=[root_main_frame], onPageEnd=FooterCanvas(root_doc).afterPage)

    # Add the PageTemplate to the document
    pdf_doc.addPageTemplates([main_page_template])
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

    # Create a list to hold the elements
    elements = []
    root_elements = []

    # Create a Paragraph object with the title text
    title = Paragraph("Ilven-Inglis Kistalkekirtus", title_style)
    root_title = Paragraph("Konotalen Salto", title_style)
    # Add the title to the elements list
    elements.append(title)
    root_elements.append(root_title)

    # Add a spacer after the title
    elements.append(Spacer(1, 0.5 * cm))
    root_elements.append(Spacer(1, 0.5 * cm))

    # Insert date

    anir = datetime.datetime.now()
    anir_str = anir.strftime("%d-%m-%y")
    date = Paragraph(anir_str, date_style)
    elements.append(date)
    elements.append(Spacer(1, 0.2 * cm))
    root_elements.append(date)
    root_elements.append(Spacer(1, 0.2 * cm))

    noe = Paragraph(f"({iv_en_count} kistalkee)", noe_style)
    elements.append(noe)
    elements.append(Spacer(1, 0.2 * cm))

    nor = Paragraph(f"({root_count} konoi)", noe_style)
    root_elements.append(nor)
    root_elements.append(Spacer(1, 0.2 * cm))

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

#   ROOTS

    data = [["ROOT", "ACTIVE", "MODA", "PASSIVE", "MODP"]]  # Header row

    for doc in konota:
        row = [doc['root'], doc['act'], doc['moda'], doc['pas'], doc['modp']]
        data.append(row)

    # Create the table
    table = Table(data)

    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),

        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),

        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.ghostwhite),
        ('GRID', (0,0), (-1,-1), 1, colors.black)
    ]))

    root_elements.append(table)

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
    root_doc.build(root_elements)

    # Return a success message
    return 'PDFs generated successfully!', 200
