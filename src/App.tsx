import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { CharacterListPage } from './pages/CharacterListPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { EpisodesPage } from './pages/EpisodesPage';
import { LocationsPage } from './pages/LocationsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { StatsPage } from './pages/StatsPage';
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
          <Route path="episodes" element={<EpisodesPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
