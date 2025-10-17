// 1) MOBILE NAV TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById("nav-menu");

  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
});

// 2) TOUCH CARD LOGIC - MOBILE & TABLET FRIENDLY
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".collection-card");

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    cards.forEach(card => {
      let tapped = false;

      card.addEventListener("click", (e) => {
        const btn = card.querySelector(".overlay .btn");

        // Always allow button clicks
        if (e.target.closest(".btn")) {
          return;
        }

        // If not tapped yet, show overlay
        if (!tapped) {
          e.preventDefault();
          card.classList.add("tapped");
          tapped = true;
        }
      });

      // Optional: hide overlay when tapping outside
      document.addEventListener("click", (e) => {
        if (!card.contains(e.target)) {
          card.classList.remove("tapped");
          tapped = false;
        }
      });
    });
  }
});


// 3) CONTACT FORM + TOAST
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        await fetch("/", {
          method: "POST",
          body: formData,
        });

        // Show toast
        if (toast) {
          toast.style.display = "block";
          setTimeout(() => {
            toast.style.display = "none";
          }, 5000);
        }

        form.reset();
      } catch (error) {
        alert("❌ Something went wrong. Please try again later.");
      }
    });
  }
});

// 4) FOOTER YEAR
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("yr");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});