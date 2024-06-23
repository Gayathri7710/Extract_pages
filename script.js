document.getElementById('extract-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('pdf-file');
    const pageNumbersInput = document.getElementById('page-numbers');
    const downloadLink = document.getElementById('download-link');

    if (fileInput.files.length === 0) {
        alert('Please select a PDF file.');
        return;
    }

    const pageNumbers = pageNumbersInput.value.split(',').map(num => parseInt(num.trim()) - 1);
    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdfDoc = await PDFLib.PDFDocument.create();

    const pages = await newPdfDoc.copyPages(pdfDoc, pageNumbers);
    pages.forEach(page => newPdfDoc.addPage(page));

    const newPdfBytes = await newPdfDoc.save();
    const blob = new Blob([newPdfBytes], { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'extracted-pages.pdf';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Extracted PDF';
});
