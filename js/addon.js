console.log("html2pdf exists?", typeof html2pdf);

document.addEventListener('DOMContentLoaded', () => {

  // ====== ADD-ON PRICE CALCULATION ======
  const checkboxes = document.querySelectorAll('.addon-item');
  const totalDisplay = document.getElementById('totalAmount');
  let total = 0;

  checkboxes.forEach(box => {
    box.addEventListener('change', () => {
      const price = parseFloat(box.dataset.price);
      if (box.checked) total += price;
      else total -= price;
      totalDisplay.textContent = total.toFixed(2);
    });
  });

  // ====== PDF GENERATION ======
  document.getElementById('generatePDF').addEventListener('click', () => {

    const name = document.querySelector('input[name="name"]').value || '-';
    const email = document.querySelector('input[name="email"]').value || '-';
    const unit = document.querySelector('input[name="unit"]').value || '-';
    const type = document.querySelector('input[name="type"]').value || '-';

    const selected = Array.from(checkboxes)
      .filter(box => box.checked)
      .map(box => `${box.dataset.name} - RM${box.dataset.price}`);

    if (selected.length === 0) {
      alert("Please select at least one add-on before generating the PDF.");
      return;
    }

    // ✅ Create a visible container just for the PDF content
    const pdfContainer = document.createElement('div');
    pdfContainer.style.padding = '20px';
    pdfContainer.style.background = '#ffffff';
    pdfContainer.style.fontSize = '14px';

    pdfContainer.innerHTML = `
      <h2>Helix 2 Add-On Summary</h2>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Unit:</strong> ${unit}</p>
      <p><strong>Type:</strong> ${type}</p>

      <h3>Selected Items</h3>
      <ul>
        ${selected.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h3>Total: RM${total.toFixed(2)}</h3>
    `;

    document.body.appendChild(pdfContainer);

    const opt = {
      margin: 10,
      filename: 'Helix2_AddOn_Summary.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
      html2pdf().set(opt).from(pdfContainer).save().then(() => {
        pdfContainer.remove();
      });
    }, 300);
  });

});