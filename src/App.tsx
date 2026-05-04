import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CharacterListPage } from './pages/CharacterListPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { BackgroundPattern } from './components/BackgroundPattern';
import { PortalTransition } from './components/PortalTransition';
import { CustomCursor } from './components/CustomCursor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <BackgroundPattern />
      <PortalTransition />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/characters" replace />} />
          <Route path="characters" element={<CharacterListPage />} />
          <Route path="characters/:id" element={<CharacterDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
