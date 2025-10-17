console.log("html2pdf exists?", typeof html2pdf);

document.addEventListener("DOMContentLoaded", () => {
  // ===== Get Theme from URL =====
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get("theme") || "Rustic";
  document.getElementById("themeName").textContent = theme;

  // ===== ROOM TYPES =====
  const roomTypes = [
    { name: "2 Room", price: 8900 },
    { name: "2 Room with Wardrobe", price: 10100 },
    { name: "3 Room", price: 13700 },
  ];
  const roomContainer = document.getElementById("roomContainer");

  roomTypes.forEach((room, index) => {
    const label = document.createElement("label");
    label.classList.add("addon-list");
    label.innerHTML = `
      <span class="addon-name">${room.name}</span>
      <div class="addon-right">
        <span>RM${room.price}</span>
        <input type="radio" name="roomType" class="room-type" data-name="${room.name}" data-price="${room.price}" ${index===0 ? "checked" : ""}>
      </div>
    `;
    roomContainer.appendChild(label);
  });

  // ===== GROUPED ADD-ONS =====
  const groupedAddons = {
    "Furniture": [
      { name: "Dining Set Upgrade", price: 580 },
      { name: "Kitchen Cabinet include 15mm Thick Quartz Stone", price: 6900 }
    ],
    "Only applicable to Type A": [
      { name: "Kitchen Yard Cabinet", price: 4800 },
      { name: "Customize Wardrobe (Melamine Finish)", price: 950 },
      { name: "Kitchen Sliding Door", price: 70 },
      { name: "Upgrade Fixed Shoe Cabinet (Melamine Finish)", price: 780 }
    ],
    "Electrical Appliances": [
      { name: "TV 55 inch", price: 2000 },
      { name: "Aircon 1HP Inverter (Midea)", price: 2080 },
      { name: "Aircon 2HP Inverter (Midea)", price: 3590 },
      { name: "Instant Water Heater", price: 0 },
      { name: "Fan (Deka) 56/48 inch", price: 285 },
      { name: "Lighting 12 Watt, 4000K", price: 25 },
      { name: "Lighting 18 Watt, 4000K", price: 30 },
      { name: "Lighting 24 Watt, 4000K", price: 35 },
      { name: "13 Amp Single Socket", price: 190 },
      { name: "Smart Door Lock", price: 1250 },
      { name: "Washing machine 7.5KG Frontload", price: 1450 },
      { name: "8.5KG/6KG Combo Washer and Dryer", price: 2000 },
      { name: "Fridge 240L Two Door", price: 1450 }
    ],
    "Curtain (for Unit Type)": [
      { name: "Type A", price: 3300 },
      { name: "Type B", price: 3500 },
      { name: "Type C", price: 3700 },
      { name: "Type D1", price: 4890 },
      { name: "Type D2", price: 3600 },
      { name: "Type E", price: 4300 },
      { name: "Type F", price: 5800 }
    ],
    "Accessories": [
      { name: "Partition", price: 0 },
      { name: "Plaster Ceiling", price: 0 },
      { name: "Yard Grill", price: 1300 },
      { name: "Door Grill", price: 2100 },
      { name: "Shower Screen", price: 980 }
    ]
  };

  const addonContainer = document.getElementById("addonItemsContainer");
  Object.keys(groupedAddons).forEach(group => {
    const groupHeader = document.createElement("h3");
    groupHeader.textContent = group;
    addonContainer.appendChild(groupHeader);

    groupedAddons[group].forEach(item => {
      const label = document.createElement("label");
      label.classList.add("addon-list");
      label.innerHTML = `
        <span class="addon-name">${item.name}</span>
        <div class="addon-right">
          <span>RM${item.price}</span>
          <input type="checkbox" class="addon-item" data-name="${item.name}" data-price="${item.price}" data-group="${group}">
        </div>
      `;
      addonContainer.appendChild(label);
    });
  });

  // ===== CALCULATION =====
  const totalDisplay = document.getElementById("totalAmount");
  let total = 0;

  function calculateTotal() {
    const selectedRoom = document.querySelector(".room-type:checked");
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const addonTotal = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked)
      .reduce((sum, cb) => sum + parseFloat(cb.dataset.price), 0);

    total = roomPrice + addonTotal;
    totalDisplay.textContent = total.toFixed(2);
  }

  document.querySelectorAll(".room-type, .addon-item").forEach(input => {
    input.addEventListener("change", calculateTotal);
  });

  calculateTotal(); // initialize total

  // ===== PDF GENERATION =====
  document.getElementById("generatePDF").addEventListener("click", () => {
    const name = document.querySelector('input[name="name"]').value || "-";
    const email = document.querySelector('input[name="email"]').value || "-";
    const phone = document.querySelector('input[name="phone"]')?.value || "-";
    const unit = document.querySelector('input[name="unit"]').value || "-";
    const unitType = document.querySelector('input[name="type"]').value || "-";

    const selectedRoom = document.querySelector(".room-type:checked");
    const selectedRoomName = selectedRoom ? selectedRoom.dataset.name : "-";
    const roomPrice = selectedRoom ? parseFloat(selectedRoom.dataset.price) : 0;

    const selectedAddons = Array.from(document.querySelectorAll(".addon-item"))
      .filter(cb => cb.checked)
      .map(cb => ({
        name: cb.dataset.name,
        price: parseFloat(cb.dataset.price),
        group: cb.dataset.group
      }));

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

      <h1 style="text-align:center; font-size:20px; margin-bottom:20px;">Helix 2 Premium Add-On Summary</h1>

      <h2 style="font-size:16px; margin-bottom:5px;">Customer Details</h2>
      <table style="width:100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="width:120px;"><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
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
          ${[...new Set(selectedAddons.map(a => a.group))].map(group => `
            <tr style="font-weight:bold; background:#e0e0e0;"><td colspan="2">${group}</td></tr>
            ${selectedAddons.filter(a => a.group === group).map(item => `
              <tr>
                <td style="padding:5px; border-top:1px solid #ccc;">${item.name}</td>
                <td style="padding:5px; border-top:1px solid #ccc; text-align:right;">${item.price.toFixed(2)}</td>
              </tr>
            `).join("")}
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
      filename: "Helix2_Premium_AddOn_Summary.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    };

    html2pdf().set(opt).from(pdfContainer).save().then(() => pdfContainer.remove());
  });
});