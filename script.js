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

const calculateAge = (birthdateValue) => {
    const birthdate = new Date(`${birthdateValue}T00:00:00`);
    if (Number.isNaN(birthdate.getTime())) {
        return '—';
    }

    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const hasHadBirthdayThisYear =
        today.getMonth() > birthdate.getMonth() ||
        (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());

    if (!hasHadBirthdayThisYear) {
        age -= 1;
    }

    return age < 0 ? '—' : String(age);
};

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