import './PatientRegistry.css';

export default function PatientRegistry() {
  return (
    <div className="panel-section patients-section">
      <div className="container panel-grid patients-grid">
        <div className="panel-card">
          <h2>Registro de Paciente</h2>
          <p>Register new patients with essential clinical and administrative details.</p>

          <form id="patientRegistryForm" className="stack-form" noValidate>
            {/* 1) Datos personales */}
            <section className="form-section" aria-labelledby="sec-datos">
              <h3 id="sec-datos">Datos personales del paciente</h3>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="patientName">Nombre y apellido</label>
                  <input id="patientName" name="patientName" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientAge">Edad</label>
                  <input id="patientAge" name="patientAge" type="number" readOnly />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientGender">Sexo</label>
                  <select id="patientGender" name="patientGender" required defaultValue="">
                    <option value="" disabled>Seleccione</option>
                    <option value="male">M</option>
                    <option value="female">F</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="patientBirthplace">Lugar de nacimiento</label>
                  <input id="patientBirthplace" name="patientBirthplace" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientBirthdate">Fecha de nacimiento</label>
                  <input id="patientBirthdate" name="patientBirthdate" type="date" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientId">Cédula</label>
                  <input id="patientId" name="patientId" type="text" required />
                </div>
              </div>
            
              <div className="form-row">
                <div className="form-group span-2">
                  <label htmlFor="patientAddress">Dirección</label>
                  <input id="patientAddress" name="patientAddress" type="text" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientPhone">Teléfonos</label>
                  <input id="patientPhone" name="patientPhone" type="tel" required />
                </div>
              
                <div className="form-group span-1">
                  <label htmlFor="patientOccupation">Ocupación</label>
                  <input id="patientOccupation" name="patientOccupation" type="text" />
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
