import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';


export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Escucha la colección "patients" en tiempo real, ordenada por fecha de creación
    const q = query(collection(db, "patients"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPatients(data);
    });
    return () => unsubscribe();
  }, []);

  // Filtrado instantáneo por nombre o cédula
  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.dni?.includes(search)
  );

  return (
    <section className="panel-section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
          <h2>Base de Datos de Pacientes</h2>
          <input 
            type="text" 
            placeholder="🔍 Buscar por nombre o cédula..." 
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', width: '300px' }}
          />
        </div>

        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Nombre</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Cédula</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Teléfono</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.dni} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '15px' }}>{p.name}</td>
                  <td style={{ padding: '15px' }}>{p.dni}</td>
                  <td style={{ padding: '15px' }}>
                    <a href={`https://wa.me/${p.phone}`} target="_blank" rel="noreferrer" style={{ color: '#25D366' }}>
                      <i className="fa-brands fa-whatsapp"></i> {p.phone}
                    </a>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <Link to={`/patients/${p.dni}`} className="btn-small">Ver Ficha</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
