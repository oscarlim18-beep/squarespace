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
  const selected = Array.from(checkboxes)
    .filter(box => box.checked)
    .map(box => `${box.dataset.name} - RM${box.dataset.price}`);

  const content = `
    <h2>Helix 2 Add-On Summary</h2>
    <ul>${selected.map(i => `<li>${i}</li>`).join('')}</ul>
    <h3>Total: RM${total.toFixed(2)}</h3>
  `;

  const element = document.createElement('div');
  element.innerHTML = content;

  const opt = {
    margin: 10,
    filename: 'Helix2_AddOn_Summary.pdf',
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
});