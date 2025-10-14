console.log("html2pdf exists?", typeof html2pdf);

document.addEventListener("DOMContentLoaded", () => {
  // ====== ADD-ON PRICE CALCULATION ======
  const checkboxes = document.querySelectorAll(".addon-item");
  const totalDisplay = document.getElementById("totalAmount");
  let total = 0;

  checkboxes.forEach((box) => {
    box.addEventListener("change", () => {
      const price = parseFloat(box.dataset.price);
      if (box.checked) total += price;
      else total -= price;
      totalDisplay.textContent = total.toFixed(2);
    });
  });

  // ====== PDF GENERATION ======
  document.getElementById("generatePDF").addEventListener("click", () => {
    // Customer details
    const name = document.querySelector('input[name="name"]').value || "-";
    const email = document.querySelector('input[name="email"]').value || "-";
    const unit = document.querySelector('input[name="unit"]').value || "-";
    const type = document.querySelector('input[name="type"]').value || "-";

    // Main package selection
    const mainPackage = document.querySelector(
      'input[name="mainPackage"]:checked'
    );
    const mainPackageValue = mainPackage ? mainPackage.value : "-";

    // Add-on items
    const selected = Array.from(checkboxes)
      .filter((box) => box.checked)
      .map((box) => ({
        name: box.dataset.name,
        price: parseFloat(box.dataset.price),
      }));

    if (selected.length === 0) {
      alert("Please select at least one add-on before generating the PDF.");
      return;
    }

    // ✅ Create content container
    const pdfContainer = document.createElement("div");
    pdfContainer.style.padding = "20px";
    pdfContainer.style.background = "#fff";
    pdfContainer.style.fontFamily = "Arial, sans-serif";
    pdfContainer.style.fontSize = "12px";
    pdfContainer.style.color = "#333";

    // ✅ Add header with logo + address
    pdfContainer.innerHTML = `
      <div style="display:flex; align-items:flex-start; margin-bottom:20px;">
        <img src="../image/SS logo.png" style="width:80px; height:auto; margin-right:15px;">
        <div>
          <h2 style="margin:0; font-size:18px;">Square Space Solution</h2>
          <p style="margin:2px 0;">B-21-06, Residensi Aradia,<br>102, Jalan Sibu, Taman Wahyu</p>
        </div>
      </div>

      <h1 style="text-align:center; font-size:20px; margin-bottom:20px;">
        Helix 2 Add-On Summary
      </h1>

      <h2 style="font-size:16px; margin-bottom:5px;">Customer Details</h2>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="width:120px;"><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Unit:</strong></td><td>${unit}</td></tr>
        <tr><td><strong>Type:</strong></td><td>${type}</td></tr>
        <tr><td><strong>Main Package:</strong></td><td>${mainPackageValue}</td></tr>
      </table>

      <h2 style="font-size:16px; margin-bottom:5px;">Selected Add-Ons</h2>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #ccc;">
        <thead>
          <tr style="background:#f0f0f0;">
            <th style="text-align:left; padding:5px;">Item</th>
            <th style="text-align:right; padding:5px;">Price (RM)</th>
          </tr>
        </thead>
        <tbody>
          ${selected
            .map(
              (item) => `
            <tr>
              <td style="padding:5px; border-top:1px solid #ccc;">${item.name}</td>
              <td style="padding:5px; border-top:1px solid #ccc; text-align:right;">${item.price.toFixed(
                2
              )}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h2 style="text-align:right; margin-top:10px; font-size:16px;">
        Total: RM${total.toFixed(2)}
      </h2>
    `;

    // Add to DOM
    document.body.appendChild(pdfContainer);

    // PDF Options
    const opt = {
      margin: 10,
      filename: "Helix2_AddOn_Summary.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(pdfContainer)
        .save()
        .then(() => {
          pdfContainer.remove();
        });
    }, 300);
  });
});