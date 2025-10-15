console.log("html2pdf exists?", typeof html2pdf);

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme") || "Rustic";
  document.getElementById("themeName").textContent = theme;

  // ===== ROOM TYPES FOR PREMIUM =====
  const roomTypes = [
    { name: "2 Room", price: 10500 },
    { name: "2 Room with Wardrobe", price: 10500 + 1500 },
    { name: "3 Room", price: 10500 + 1500 + 4000 },
  ];
  const roomContainer = document.getElementById("roomContainer");

  roomTypes.forEach((room, index) => {
    const label = document.createElement("label");
    label.classList.add("addon-list-label");
    label.innerHTML = `
      <span class="addon-name">${room.name}</span>
      <span class="addon-right">
        <span>RM${room.price}</span>
        <input type="radio" name="roomType" class="room-type" data-name="${room.name}" data-price="${room.price}" ${index===0 ? "checked" : ""}>
      </span>
    `;
    roomContainer.appendChild(label);
  });

  // ===== THEME-BASED ADD-ONS =====
  const themeAddons = {
    Rustic: [
      { name: "Smart Switch", price: 200 },
      { name: "Premium Curtains", price: 350 },
      { name: "Feature Wall", price: 750 },
      { name: "Lighting Package", price: 450 },
      { name: "TV Console", price: 600 },
    ],
    "Timeless Elegant": [
      { name: "Smart Switch", price: 220 },
      { name: "Premium Curtains", price: 380 },
      { name: "Feature Wall", price: 780 },
      { name: "Lighting Package", price: 500 },
      { name: "TV Console", price: 650 },
    ],
    "Scandinavian Snug": [
      { name: "Smart Switch", price: 210 },
      { name: "Premium Curtains", price: 360 },
      { name: "Feature Wall", price: 770 },
      { name: "Lighting Package", price: 470 },
      { name: "TV Console", price: 620 },
    ],
  };

  const addonContainer = document.getElementById("addonItemsContainer");
  themeAddons[theme].forEach(item => {
    const label = document.createElement("label");
    label.classList.add("addon-list-label");
    label.innerHTML = `
      <span class="addon-name">${item.name}</span>
      <span class="addon-right">
        <span>RM${item.price}</span>
        <input type="checkbox" class="addon-item" data-name="${item.name}" data-price="${item.price}">
      </span>
    `;
    addonContainer.appendChild(label);
  });

  // ===== CALCULATION =====
  let total = 0;
  const totalDisplay = document.getElementById("totalAmount");

  function calculateTotal() {
    const selectedRoom = document.querySelector(".room-type:checked");
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const addonCheckboxes = document.querySelectorAll(".addon-item");
    const addonTotal = Array.from(addonCheckboxes)
      .filter(cb => cb.checked)
      .reduce((sum, cb) => sum + parseFloat(cb.dataset.price), 0);

    total = roomPrice + addonTotal;
    totalDisplay.textContent = total.toFixed(2);
  }

  document.querySelectorAll(".room-type, .addon-item").forEach(input => {
    input.addEventListener("change", calculateTotal);
  });

  calculateTotal(); // initialize

  // ===== PDF GENERATION =====
  document.getElementById("generatePDF").addEventListener("click", () => {
    const name = document.querySelector('input[name="name"]').value || "-";
    const email = document.querySelector('input[name="email"]').value || "-";
    const phone = document.querySelector('input[name="phone"]').value || "-";
    const unit = document.querySelector('input[name="unit"]').value || "-";
    const unitType = document.querySelector('input[name="type"]').value || "-";

    const selectedRoom = document.querySelector(".room-type:checked");
    const selectedRoomName = selectedRoom ? selectedRoom.dataset.name : "-";
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const selectedAddons = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked)
      .map(cb => ({ name: cb.dataset.name, price: parseFloat(cb.dataset.price) }));

    // PDF content
    const pdfContainer = document.createElement("div");
    pdfContainer.style.padding = "20px";
    pdfContainer.style.background = "#fff";
    pdfContainer.style.fontFamily = "Arial, sans-serif";
    pdfContainer.style.fontSize = "12px";
    pdfContainer.style.color = "#333";

    pdfContainer.innerHTML = `
      <div style="display:flex; align-items:flex-start; margin-bottom:20px;">
        <img src="../image/SS logos.png" style="width:80px; height:auto; margin-right:15px;">
        <div>
          <h2 style="margin:0; font-size:18px;">Square Space Solution</h2>
          <p style="margin:2px 0;">B-21-06, Residensi Aradia,<br>102, Jalan Sibu, Taman Wahyu</p>
        </div>
      </div>

      <h1 style="text-align:center; font-size:20px; margin-bottom:20px;">Helix 2 Add-On Summary</h1>

      <h2 style="font-size:16px; margin-bottom:5px;">Customer Details</h2>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="width:120px;"><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone Number:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Unit:</strong></td><td>${unit}</td></tr>
        <tr><td><strong>Unit Type:</strong></td><td>${unitType}</td></tr>
        <tr><td><strong>Theme:</strong></td><td>${theme}</td></tr>
        <tr><td><strong>Room Type:</strong></td><td>${selectedRoomName} (RM${roomPrice})</td></tr>
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
          ${selectedAddons.map(item => `
            <tr>
              <td style="padding:5px; border-top:1px solid #ccc;">${item.name}</td>
              <td style="padding:5px; border-top:1px solid #ccc; text-align:right;">${item.price.toFixed(2)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <h2 style="text-align:right; margin-top:10px; font-size:16px;">Total: RM${total.toFixed(2)}</h2>

      <div style="margin-top:40px; display:flex; justify-content:space-between;">
        <div style="text-align:left;">
          <div>_________________________</div>
          <div>Client Signature</div>
          <div>Name: ___________________</div>
          <div>Date: ___________________</div>
        </div>
        <div style="text-align:left;">
          <div>_________________________</div>
          <div>Company Representative</div>
          <div>Name: ___________________</div>
          <div>Date: ___________________</div>
        </div>
      </div>
    `;

    document.body.appendChild(pdfContainer);

    const opt = {
      margin: 10,
      filename: "Helix2_AddOn_Summary.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    setTimeout(() => {
      html2pdf().set(opt).from(pdfContainer).save().then(() => pdfContainer.remove());
    }, 300);
  });
});