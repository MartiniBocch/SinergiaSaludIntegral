import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Send her to the homepage after login
    } catch (error) {
      alert("Error: Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="panel-section">
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="panel-card">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="stack-form">
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
