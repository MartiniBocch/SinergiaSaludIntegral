import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './PatientDetails.css'; // All styles are here now

export default function PatientDetail() {
  const { dni } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      const docRef = doc(db, "patients", dni);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPatient(docSnap.data());
      } else {
        navigate("/list");
      }
    };
    fetchPatient();
  }, [dni, navigate]);

  if (!patient) return <div className="loading-state">Cargando historia clínica...</div>;

  return (
    <section className="detail-page">
      <div className="container">
        <Link to="/list" className="btn-back">← Volver a la lista</Link>

          <div className="header-content">
            <h1>{patient.name}</h1>
            <div className="patient-meta">
              <span className="meta-item"><strong>Cédula:</strong> {patient.dni}</span>
              <span className="meta-divider">|</span>
              <span className="meta-item"><strong>Género:</strong> {patient.gender}</span>
            </div>
          </div>
          {/* Action button to register today's appointment
          <Link to={`/new-appointment/${patient.dni}`} className="btn">
            <i className="fa-solid fa-plus"></i> Registrar Cita Hoy
          </Link>
          */}

        <div className="info-grid">
          <div className="panel-card">
            <h3 className="section-title contact-title">
              <i className="fa-solid fa-address-book"></i> Datos de Contacto
            </h3>
            <div className="data-box">
              <p><strong>Teléfono:</strong> {patient.phone}</p>
              <p><strong>Ocupación:</strong> {patient.occupation || 'N/A'}</p>
              <p><strong>Dirección:</strong> {patient.patientAddress || 'No registrada'}</p>
            </div>
          </div>

          <div className="panel-card">
            <h3 className="section-title emergency-title">
              <i className="fa-solid fa-circle-exclamation"></i> Contacto de Emergencia
            </h3>
            <div className="data-box">
              <p><strong>Nombre:</strong> {patient.emergencyName}</p>
              <p><strong>Relación:</strong> {patient.emergencyRelation}</p>
              <p><strong>Teléfono:</strong> {patient.emergencyPhone}</p>
            </div>
          </div>
        </div>

        <div className="panel-card medical-summary">
          <h3 className="section-title">Motivo de Consulta</h3>
          <div className="data-box highlight">
            <p>{patient.reason}</p>
          </div>

          <h3 className="section-title">Enfermedad Actual</h3>
          <div className="data-box">
            <p>{patient.currentIllness || "Sin registros previos."}</p>
          </div>
        </div>

        <div className="medical-history-grid">
          {[
            { id: 'cardio', label: 'Cardio', icon: 'fa-heart-pulse' },
            { id: 'endocrino', label: 'Endocrino', icon: 'fa-droplet' },
            { id: 'gastro', label: 'Gastro', icon: 'fa-stomach' },
            { id: 'resp', label: 'Resp', icon: 'fa-lungs' }
          ].map(cat => (
            <div key={cat.id} className="history-card">
              <h4><i className={`fa-solid ${cat.icon}`}></i> {cat.label}</h4>
              <ul>
                {patient[cat.id]?.length > 0 
                  ? patient[cat.id].map((item, i) => <li key={i}>✅ {item}</li>)
                  : <li className="empty-text">Ninguno</li>
                }
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}