import './AppointmentNotes.css';

export default function AppointmentNotes() {
  return (
    <section class="panel-section notes-section">
      <div class="container panel-grid">
        <div class="panel-card">
          <h2>Appointment Notes</h2>
          <p>Document each consultation in a consistent structure so every provider can follow the clinical reasoning and the next action.</p>

          <form id="notesForm" class="stack-form">
            <div class="form-group">
              <label for="noteDate">Appointment Date</label>
              <input id="noteDate" name="noteDate" type="date" required />
            </div>

            <div class="form-group">
              <label for="notePatient">Patient Name</label>
              <input id="notePatient" name="notePatient" type="text" placeholder="e.g., Laura Gómez" required/>
            </div>

            <div class="form-group">
              <label for="noteDoctor">Doctor / Specialist</label>
              <input id="noteDoctor" name="noteDoctor" type="text" placeholder="e.g., Dra. Martínez" required/>
            </div>

            <div class="form-group">
              <label for="noteType">Visit Type</label>
              <select id="noteType" name="noteType" required>
                <option value="" selected disabled>Select a visit type</option>
                <option value="odontology">Odontology</option>
                <option value="medical">Medical</option>
                <option value="follow-up">Follow-up</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div class="form-group">
              <label for="noteSummary">Clinical Summary</label>
              <textarea id="noteSummary" name="noteSummary" rows="6" placeholder="Assessment, findings, procedures performed, and key considerations." required></textarea>
            </div>

            <div class="form-group">
              <label for="notePlan">Plan & Next Steps</label>
              <textarea id="notePlan" name="notePlan" rows="4" placeholder="Medications, instructions, follow-up timing, and referrals." required></textarea>
            </div>

            <button class="btn" type="submit">Save Note</button>
          </form>
        </div>

        <div class="panel-card panel-card-muted">
          <div class="panel-card-header">
            <h3>Saved Notes</h3>
            <p>Use this running log during the day to review what was documented for each appointment.</p>
          </div>

          <div id="notesList" class="notes-list" aria-live="polite">
            <p class="empty-state" id="notesEmpty">No appointment notes saved yet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
