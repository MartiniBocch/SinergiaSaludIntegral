import './AppointmentNotes.css';

export default function AppointmentNotes() {
  return (
    <section className="panel-section notes-section">
      <div className="container panel-grid">
        <div className="panel-card">
          <h2>Appointment Notes</h2>
          <p>Document each consultation in a consistent structure so every provider can follow the clinical reasoning and the next action.</p>

          <form id="notesForm" className="stack-form">
            <div className="form-group">
              <label htmlFor="noteDate">Appointment Date</label>
              <input id="noteDate" name="noteDate" type="date" required />
            </div>

            <div className="form-group">
              <label htmlFor="notePatient">Patient Name</label>
              <input id="notePatient" name="notePatient" type="text" placeholder="e.g., Laura Gómez" required/>
            </div>

            <div className="form-group">
              <label htmlFor="noteDoctor">Doctor / Specialist</label>
              <input id="noteDoctor" name="noteDoctor" type="text" placeholder="e.g., Dra. Martínez" required/>
            </div>

            <div className="form-group">
              <label htmlFor="noteType">Visit Type</label>
              <select id="noteType" name="noteType" required>
                <option value="" defaultValue disabled>Seleccione el tipo de visita</option>
                <option value="odontology">Odontologia</option>
                <option value="medical">Medica</option>
                <option value="follow-up">Chequeo general</option>
                <option value="emergency">Emergencia</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="noteSummary">Clinical Summary</label>
              <textarea id="noteSummary" name="noteSummary" rows="6" placeholder="Assessment, findings, procedures performed, and key considerations." required></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="notePlan">Plan & Next Steps</label>
              <textarea id="notePlan" name="notePlan" rows="4" placeholder="Medications, instructions, follow-up timing, and referrals." required></textarea>
            </div>

            <button className="btn" type="submit">Save Note</button>
          </form>
        </div>

        <div className="panel-card panel-card-muted">
          <div className="panel-card-header">
            <h3>Saved Notes</h3>
            <p>Use this running log during the day to review what was documented for each appointment.</p>
          </div>

          <div id="notesList" className="notes-list" aria-live="polite">
            <p className="empty-state" id="notesEmpty">No appointment notes saved yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
