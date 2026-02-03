const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const tabLinks = Array.from(document.querySelectorAll('.tab-link'));
const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));

const setActiveTab = (targetId) => {
    tabLinks.forEach((link) => {
        const isActive = link.dataset.tab === targetId;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', String(!isActive));
    });
};

if (tabLinks.length && tabPanels.length) {
    tabLinks.forEach((link) => {
        link.setAttribute('role', 'tab');
        link.setAttribute('aria-selected', link.classList.contains('active') ? 'true' : 'false');

        link.addEventListener('click', () => {
            const targetId = link.dataset.tab;
            if (!targetId) {
                return;
            }

            setActiveTab(targetId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    tabPanels.forEach((panel) => {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-hidden', panel.classList.contains('active') ? 'false' : 'true');
    });
}

const clinicAnchors = Array.from(document.querySelectorAll('a[href^="#clinic-"]'));
clinicAnchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId) {
            return;
        }

        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            return;
        }

        event.preventDefault();
        setActiveTab('tab-principal');

        const headerOffset = document.querySelector('header')?.offsetHeight ?? 0;
        const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset + 8;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    });
});

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') ?? '').toString().trim();
        const service = (formData.get('service') ?? '').toString();

        const serviceLabels = {
            'dental-preventive': 'preventive dental care',
            'dental-restorative': 'restorative dental treatment',
            'medical-consultation': 'a medical consultation',
            'care-coordination': 'integrated care coordination'
        };

        const serviceLabel = serviceLabels[service] ?? 'clinical care';
        const greeting = name ? `Thank you, ${name}!` : 'Thank you!';

        alert(`${greeting} Your request for ${serviceLabel} has been received. Our clinic team will contact you shortly.`);
        contactForm.reset();
    });
}

const notesForm = document.querySelector('#notesForm');
const notesList = document.querySelector('#notesList');
const notesEmpty = document.querySelector('#notesEmpty');

const visitTypeLabels = {
    odontology: 'Odontology',
    medical: 'Medical',
    'follow-up': 'Follow-up',
    emergency: 'Emergency'
};

const formatDate = (dateValue) => {
    if (!dateValue) {
        return 'Date not provided';
    }

    const parsedDate = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(parsedDate.getTime())) {
        return dateValue;
    }

    return parsedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

if (notesForm && notesList) {
    notesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(notesForm);
        const date = formData.get('noteDate')?.toString() ?? '';
        const patient = formData.get('notePatient')?.toString().trim() ?? '';
        const doctor = formData.get('noteDoctor')?.toString().trim() ?? '';
        const type = formData.get('noteType')?.toString() ?? '';
        const summary = formData.get('noteSummary')?.toString().trim() ?? '';
        const plan = formData.get('notePlan')?.toString().trim() ?? '';

        const noteItem = document.createElement('article');
        noteItem.className = 'note-item';

        const typeLabel = visitTypeLabels[type] ?? 'Clinical visit';
        noteItem.innerHTML = `
            <h4>${patient || 'Unnamed patient'}</h4>
            <p class="note-meta">${formatDate(date)} · ${typeLabel} · ${doctor || 'Provider not specified'}</p>
            <p>${summary}</p>
            <p class="note-plan"><strong>Plan:</strong> ${plan}</p>
        `;

        notesList.prepend(noteItem);
        notesEmpty?.remove();
        notesForm.reset();
    });
}

const patientForm = document.querySelector('#patientForm');
const patientTableBody = document.querySelector('#patientTableBody');
const patientEmpty = document.querySelector('#patientEmpty');

document.addEventListener("DOMContentLoaded", () => {
    const birthdateInput = document.getElementById("patientBirthdate");
    const ageInput = document.getElementById("patientAge");

    if (!birthdateInput || !ageInput) return;

    function calculateAge(dateString) {
        if (!dateString) return "";

        const today = new Date();
        const birthDate = new Date(dateString);

        // basic validation
        if (Number.isNaN(birthDate.getTime())) return "";

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // if birthday hasn't happened yet this year, subtract 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
        }

        // prevent negative ages if a future date is picked
        return age < 0 ? 0 : age;
    }

    function updateAge() {
        ageInput.value = calculateAge(birthdateInput.value);
    }

    birthdateInput.addEventListener("change", updateAge);
    birthdateInput.addEventListener("input", updateAge);

    // If the birthdate is prefilled (edit mode), calculate on load
    updateAge();
});

if (patientForm && patientTableBody) {
    patientForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(patientForm);
        const name = formData.get('patientName')?.toString().trim() ?? '';
        const documentId = formData.get('patientId')?.toString().trim() ?? '';
        const birthdate = formData.get('patientBirthdate')?.toString() ?? '';
        const phone = formData.get('patientPhone')?.toString().trim() ?? '';
        const insurance = formData.get('patientInsurance')?.toString().trim() ?? '';
        const alerts = formData.get('patientNotes')?.toString().trim() ?? '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${name}</strong><br><span class="table-subtext">${formData.get('patientEmail')?.toString().trim() ?? ''}</span></td>
            <td>${documentId}</td>
            <td>${calculateAge(birthdate)}</td>
            <td>${phone}</td>
            <td>${insurance}</td>
            <td>${alerts}</td>
        `;

        patientTableBody.prepend(row);
        patientEmpty?.remove();
        patientForm.reset();
    });
}
// Signature pad and auto-fill date
document.addEventListener("DOMContentLoaded", () => {
  // -------- Auto-fill today's date --------
  const consentDate = document.getElementById("consentDate");
  if (consentDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    consentDate.value = `${yyyy}-${mm}-${dd}`;
  }

  // -------- Signature pad --------
  const canvas = document.getElementById("signatureCanvas");
  const signatureData = document.getElementById("signatureData");
  const clearBtn = document.getElementById("clearSignatureBtn");

  if (!canvas || !signatureData) return;

  const ctx = canvas.getContext("2d");
  let drawing = false;
  let hasSignature = false;

  // Resize canvas to match its CSS size (important for crisp lines + correct data)
  function resizeCanvasToDisplaySize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Optional: set pen style
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0f172a";
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function startDraw(e) {
    drawing = true;
    hasSignature = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function endDraw() {
    if (!drawing) return;
    drawing = false;

    // Save signature image to hidden input (base64 PNG)
    signatureData.value = canvas.toDataURL("image/png");
  }

  function clearSignature() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    signatureData.value = "";
    hasSignature = false;
  }

  // Initial sizing + keep it correct on resize/orientation change
  resizeCanvasToDisplaySize();
  window.addEventListener("resize", () => {
    // If you want to keep existing signature after resize, we'd need to preserve it;
    // simplest is to clear and re-init:
    const had = hasSignature;
    const dataUrl = had ? canvas.toDataURL("image/png") : null;

    resizeCanvasToDisplaySize();

    if (dataUrl) {
      const img = new Image();
      img.onload = () => {
        const rect = canvas.getBoundingClientRect();
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = dataUrl;
    }
  });

  // Pointer events work for mouse + touch + pen (best for iPad/tablet)
  canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    startDraw(e);
  });

  canvas.addEventListener("pointermove", (e) => {
    e.preventDefault();
    draw(e);
  });

  canvas.addEventListener("pointerup", (e) => {
    e.preventDefault();
    endDraw();
  });

  canvas.addEventListener("pointercancel", () => {
    endDraw();
  });

  if (clearBtn) clearBtn.addEventListener("click", clearSignature);

  // Optional: prevent form submit if no signature drawn
  const form = canvas.closest("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (!signatureData.value) {
        e.preventDefault();
        alert("Por favor, agregue la firma antes de guardar.");
      }
    });
  }
});
