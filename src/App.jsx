import { Routes, Route, Link } from 'react-router-dom';
import PatientRegistry from './pages/PatientRegistry';
import AppointmentNotes from './pages/AppointmentNotes';
import { useState } from 'react'
import './App.css'
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="logo">
            <h1>Sinergia <span className="highlight">Salud Integral</span></h1>
          </div>
          <nav aria-label="Primary">
            <ul className="tab-nav">
              {/* Note: In React, we will eventually use 'React Router' for these links */}
              <li><a className="tab-link active" href="/">Principal</a></li>
              <li><a className="tab-link" href="/notes">Appointment Notes</a></li>
              <li><a className="tab-link" href="/registry">Patient Registry</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registry" element={<PatientRegistry />} />
          <Route path="/notes" element={<AppointmentNotes />} />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <section className="footer-section">
              <h3>Sinergia Salud Integral</h3>
              <p>Servicios medicos y odontológicos integrados para una atención completa y personalizada.</p>
            </section>
            <section className="footer-section">
              <h3>Clinical Focus</h3>
              <ul>
                <li><a href="#clinic-services">Evaluacion integral de adultos</a></li>
                <li><a href="#clinic-services">Manejo de enfermedades agudas y crónicas</a></li>
                <li><a href="#clinic-services">Servicios Generales de Odontología</a></li>
                <li><a href="#clinic-services">Electrocardiogramas</a></li>
              </ul>
            </section>
            <section className="footer-section">
              <h3>Contact</h3>
              <ul>
                <li><i className="fa-solid fa-phone" aria-hidden="true"></i>(422) 006-9326</li>
                <li><i className="fa-solid fa-instagram" aria-hidden="true"></i>@sinergiasaludintegral</li>
                <li><i className="fa-solid fa-location-dot" aria-hidden="true"></i>C.C. Novo centro, Av. Stadium, Puerto La Cruz</li>
              </ul>
            </section>
            <section className="footer-section">
              <h3>Hours</h3>
              <ul>
                <li>lun-vie: 7:30 – 11:00 AM y 2:00 – 5:30 PM</li>
                <li>Sabados: 8:00 – 11:30 AM</li>
                <li>Sabados: PREVIA CITA PM</li>
              </ul>
            </section>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Sinergia Salud Integral. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
