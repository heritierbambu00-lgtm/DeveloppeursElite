import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', background: '#0B0813', color: 'white', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Une erreur critique est survenue dans l'application.</h1>
          <p style={{ color: '#9E7AFF', marginBottom: '20px' }}>{this.state.error?.message || 'Erreur inconnue'}</p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Veuillez vérifier que les variables d'environnement Supabase (VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY) sont bien configurées dans Vercel.</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '12px 24px', background: '#9E7AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Recharger la matrice
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
