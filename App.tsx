import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          {/* మీ రూట్స్ */}
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
