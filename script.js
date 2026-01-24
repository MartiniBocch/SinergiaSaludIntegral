const yearElement = document.querySelector('#year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        const targetSection = targetId ? document.querySelector(targetId) : null;

        if (!targetSection) {
            return;
        }

        event.preventDefault();
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
            home: 'home cleaning',
            office: 'office cleaning',
            deep: 'deep cleaning',
            move: 'move in/out cleaning'
        };

        const serviceLabel = serviceLabels[service] ?? 'cleaning service';
        const greeting = name ? `Thanks, ${name}!` : 'Thanks!';

        alert(`${greeting} Your request for ${serviceLabel} has been received. We will reach out shortly.`);
        contactForm.reset();
    });
}
