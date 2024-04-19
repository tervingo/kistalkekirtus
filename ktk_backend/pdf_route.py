from flask import Blueprint, send_file, request, jsonify
from bson.objectid import ObjectId
from reportlab.lib.pagesizes import letter
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame, Paragraph, NextPageTemplate, PageBreak, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle

import datetime

from __init__ import mongo

pdf_route = Blueprint('pdf_route', __name__)

@pdf_route.route('/api/export/pdf', methods=['GET'])
def export_pdf():
    # Get all documents from your MongoDB collection and sort them by 'can'
    iv_en = mongo.db.translations.find().sort('can')
    en_iv = mongo.db.translations.find().sort('en')
    cat = mongo.db.translations.find().sort([('cat', 1), ('can', 1)])

    iv_en_count = mongo.db.translations.count_documents({})

    path = "C:\\Users\\j4alo\\Dropbox\\Lenguas\\Ilven\\Ilven-Inglisen_kiskirtus.pdf"


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


    # Create a new PDF file
    pdf_doc = BaseDocTemplate(path, pagesize=letter)

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


    # Build the PDF
    pdf_doc.build(elements)

    # Return a success message
    return 'PDF generated successfully!', 200
