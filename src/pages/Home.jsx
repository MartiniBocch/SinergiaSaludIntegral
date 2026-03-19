import './Home.css';

export default function Home() {
  return (
    <>
    <section className="hero">
      <div className="container">
        <p className="eyebrow">Odontología y Salud Integral</p>
        <h2>Cuidado integral para tu salud</h2>
        <p>Combinamos excelencia dental y seguimiento médico en una sola clínica para que tu plan de atención sea claro, coordinado y compasivo.</p>
        <div className="hero-actions">
          <a className="btn" href="#clinic-about">Agenda una Cita</a>
          <a className="btn btn-outline" href="#clinic-services">Explora Nuestros Servicios</a>
        </div>
      </div>
    </section>

    <section className="services" id="clinic-services">
      <div className="container">
        <h2>Cuidado diseñado alrededor de tus necesidades</h2>
        <p className="section-lead">Desde tratamientos dentales hasta el seguimiento médico interno, nuestro equipo trabaja en conjunto para ofrecer atención clínica completa en cada visita.</p>
        <div className="services-grid">
          <article className="service">
            <i className="fa-solid fa-syringe" aria-hidden="true"></i>
            <h3>Exodoncia</h3>
            <p>Extraccion dental que puede ser necesaria cuando un diente está dañado o de forma irreparable, infectado, por apiñamiento dental, o para prepararse para tratamientos ortodónticos u protesicos.</p>
          </article>
          <article className="service">
            <i className="fa-solid fa-tooth" aria-hidden="true"></i>
            <h3>Odontopediatría</h3>
            <p>Tratamientos especializados para niños, incluyendo limpiezas, selladores, y prevención de caries.</p>
          </article>
          <article className="service">
            <i className="fa-solid fa-user-doctor" aria-hidden="true"></i>
            <h3>Consulta Odontológica</h3>
            <p>Revision profecional del estado de tu salud bucal, donde se evalúa la necesidad de tratamientos preventivos o restaurativos.</p>
          </article>
          <article className="service">
            <i className="fa-solid fa-stethoscope" aria-hidden="true"></i>
            <h3>Medicina interna</h3>
            <p>Seguimiento médico integral con servicios como electrocardiogramas, informes preoperatorios, y evaluaciones clínicas completas.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="about" id="clinic-about">
      <div className="container">
        <h2>¿Porqué elegir Sinergia Salud Integral?</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Sinergia Salud Integral fue creada para eliminar la brecha entre la atención dental y médica. Nuestros clínicos documentan cada visita claramente, comparten hallazgos clave y guían a los pacientes a través de la mejor decisión con empatía.</p>
            <ul className="about-features">
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i>Historiales dentales y médicos unificados</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i>Notas estructuradas para cada cita</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i>Planes de tratamiento y prevención personalizados</li>
              <li><i className="fa-solid fa-circle-check" aria-hidden="true"></i>Comunicación clara para familias y cuidadores</li>
            </ul>
            <a className="btn" href="https://wa.me/584220069326?text=Hola%2C%20quiero%20agendar%20una%20consulta.">
              Habla con nuestro equipo
            </a>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80" alt="Dentist and doctor reviewing a patient chart together" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
