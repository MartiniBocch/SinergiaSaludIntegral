import './patientRegistry.css';
import {db} from '../firebase';
import {collection, setDoc, doc, serverTimestamp} from 'firebase/firestore';

export default function PatientRegistry() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Capture data from the form
    const formData = new FormData(e.target);
    const patientData = Object.fromEntries(formData.entries());

    // 1. Group checkboxes into arrays
    formData.forEach((value, key) => {
      if (key.endsWith('[]')) {
        const cleanKey = key.replace('[]', '');
        if (!patientData[cleanKey]) patientData[cleanKey] = [];
        patientData[cleanKey].push(value);
      } else {
        patientData[key] = value;
      }
    });

    // 2. MERGE "OTHER" TEXT INTO THE ARRAYS
    // This looks for fields like 'cardio_other' and moves them into 'cardio'
    Object.keys(patientData).forEach(key => {
      if (key.endsWith('_other')) {
        const mainCategory = key.replace('_other', '');
        const otherValue = patientData[key].trim();

        if (otherValue !== "") {
          // If the category array doesn't exist yet, create it
          if (!patientData[mainCategory]) patientData[mainCategory] = [];

          // Add the custom text to the list
          patientData[mainCategory].push(otherValue);

          // Optional: delete the separate "_other" field to keep the DB clean
          delete patientData[key];
        }
      }
    });

    patientData.createdAt = serverTimestamp(); // Add timestamp for record keeping

    try {
      //set Cedula as document ID to ensure uniqueness and easy retrieval
      const docId = patientData.dni; 
      await setDoc(doc(db, "patients", docId), patientData);
      alert("Paciente registrado exitosamente!");
      e.target.reset(); // Clear the form

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Hubo un error al registrar el paciente. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="panel-section -section">
      <div className="container panel-grid -grid">
        <div className="panel-card">
          <h2>Registro de Paciente</h2>
          <p>Register new patients with essential clinical and administrative details.</p>

          <form id="patientRegistryForm" className="stack-form" onSubmit={handleSubmit}>
            {/* 1) Datos personales */}
            <section className="form-section" aria-labelledby="sec-datos">
              <h3 id="sec-datos">Datos personales del paciente</h3>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="name">Nombre y apellido</label>
                  <input id="name" name="name" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="age">Edad</label>
                  <input id="age" name="age" type="number" readOnly />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="gender">Sexo</label>
                  <select id="gender" name="gender" required defaultValue="">
                    <option value="" disabled>Seleccione</option>
                    <option value="male">M</option>
                    <option value="female">F</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="birthplace">Lugar de nacimiento</label>
                  <input id="birthplace" name="birthplace" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="birthdate">Fecha de nacimiento</label>
                  <input id="birthdate" name="birthdate" type="date" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="dni">Cédula</label>
                  <input id="dni" name="dni" type="text" required />
                </div>
              </div>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="address">Dirección</label>
                  <input id="address" name="address" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="phone">Teléfonos</label>
                  <input id="phone" name="phone" type="tel" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="occupation">Ocupación</label>
                  <input id="occupation" name="occupation" type="text" />
                </div>
              </div>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="emergencyName">Contacto de emergencia</label>
                  <input id="emergencyName" name="emergencyName" type="text" required />
                </div>
                <div className="form-group span-1">
                  <label htmlFor="emergencyPhone">Teléfono</label>
                  <input id="emergencyPhone" name="emergencyPhone" type="tel" required />
                </div>
                <div className="form-group span-1">
                  <label htmlFor="emergencyRelation">Relación</label>
                  <input id="emergencyRelation" name="emergencyRelation" type="text" required />
                </div>
              </div>
            </section>
          
            <section className="form-section" aria-labelledby="sec-motivo">
              <h3 id="sec-motivo">Motivo de consulta</h3>
              <div className="form-group">
                <textarea id="reason" name="reason" rows="4" required></textarea>
              </div>
            </section>
          
            <section className="form-section" aria-labelledby="sec-actual">
              <h3 id="sec-actual">Enfermedad actual</h3>
              <div className="form-group">
                <textarea id="currentIllness" name="currentIllness" rows="5"></textarea>
              </div>
            </section>
          
            <section className="form-section" aria-labelledby="sec-antecedentes">
              <h2 id="sec-antecedentes">Antecedentes médicos personales</h2>
            
              <div className="checkbox-grid">
                <fieldset> 
                  <legend>Cardiovascular</legend> 
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Hipertensión" /> Hipertensión</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Hipotensión" /> Hipotensión</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Taquicardia" /> Taquicardia</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Angina de pecho" /> Angina de P.</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Infarto" /> Infarto</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Insuficiencia cardiaca" /> Insuficiencia C.</label>
                  <label className="checkbox-item"><input type="checkbox" name="cardio[]" value="Disnea" /> Disnea</label>
                  <label className="checkbox-item">Otro: <input type="text" name="cardio_other" /></label> 
                </fieldset> 
              
                <fieldset> 
                  <legend>Endocrinos</legend> 
                  <label className="checkbox-item"><input type="checkbox" name="endocrino[]" value="Hipertiroidismo" /> Hipertiroidismo</label>
                  <label className="checkbox-item"><input type="checkbox" name="endocrino[]" value="Hipotiroidismo" /> Hipotiroidismo</label>
                  <label className="checkbox-item"><input type="checkbox" name="endocrino[]" value="Diabetes" /> Diabetes</label>
                  <label className="checkbox-item">Otro: <input type="text" name="endocrino_other" /></label>
                </fieldset> 
              
                <fieldset> 
                  <legend>Gastrointestinales</legend> 
                  <label className="checkbox-item"><input type="checkbox" name="gastro[]" value="Gastritis" /> Gastritis</label>
                  <label className="checkbox-item"><input type="checkbox" name="gastro[]" value="Reflujo gástrico" /> Reflujo gástrico</label>
                  <label className="checkbox-item"><input type="checkbox" name="gastro[]" value="Úlceras gástricas" /> Úlceras gástricas</label>
                  <label className="checkbox-item">Otro: <input type="text" name="gastro_other" /></label>
                </fieldset> 
              
                <fieldset> 
                  <legend>Respiratorio</legend>
                  <label className="checkbox-item"><input type="checkbox" name="resp[]" value="Sinusitis" /> Sinusitis</label>
                  <label className="checkbox-item"><input type="checkbox" name="resp[]" value="Asma" /> Asma</label>
                  <label className="checkbox-item"><input type="checkbox" name="resp[]" value="EPOC" /> EPOC</label>
                  <label className="checkbox-item"><input type="checkbox" name="resp[]" value="Rinitis" /> Rinitis</label>
                  <label className="checkbox-item"><input type="checkbox" name="resp[]" value="Neumonía" /> Neumonía</label>
                  <label className="checkbox-item">Otro: <input type="text" name="resp_other" /></label> 
                </fieldset> 
              </div>
            </section>
            
            <button type="submit" className="btn" style={{marginTop: '20px'}}>Registrar Paciente</button>
          </form>
        </div>
      </div>
    </div>
  );
}
