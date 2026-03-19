import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Added signOut here too
import PatientRegistry from './pages/PatientRegistry';
import AppointmentNotes from './pages/AppointmentNotes';
import './App.css'
import Login from './pages/login';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop showing 'Cargando' once we know the status
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="App"><p>Cargando...</p></div>;
  }


  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="logo">
            <h1>Sinergia <span className="highlight">Salud Integral</span></h1>
          </div>
          <nav aria-label="Primary">
            <ul className="tab-nav">
              {/* Always visible */}
              <li><Link className="tab-link active" to="/">Principal</Link></li>

              {/* Visible only when user is authenticated */}
              {user && (
                <>
                  <li><Link className="tab-link" to="/notes">Appointment Notes</Link></li>
                  <li><Link className="tab-link" to="/registry">Patient Registry</Link></li>
                  <li>
                    <button 
                      className="tab-link"
                      onClick={() => auth.signOut()}> Signout
                    </button>
                  </li>
                </>
              )}

              {/* Visible only when user is NOT authenticated */}
              {!user && (
                <li><Link className="tab-link" to="/login">Accesso Clinica</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Private Pages (Redirects to login if user is null) */}
          <Route
            path="/registry"
            element={user ? <PatientRegistry /> : <Navigate to="/login" />}
          />
          <Route
            path="/notes"
            element={user ? <AppointmentNotes /> : <Navigate to="/login" />}
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
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
