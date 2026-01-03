
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ReadingsList from './screens/ReadingsList';
import ReadingDetail from './screens/ReadingDetail';
import GeneratePrayers from './screens/GeneratePrayers';
import PersonalizePrayers from './screens/PersonalizePrayers';
import Calendar from './screens/Calendar';
import Settings from './screens/Settings';
import About from './screens/About';
import OracoesEucaristicas from './screens/OracoesEucaristicas';
import OracaoDetalhe from './screens/OracaoDetalhe';
import BottomNav from './components/BottomNav';
import { DEFAULT_IMAGES } from './constants';

export const ImageContext = React.createContext({
  images: DEFAULT_IMAGES,
  setImages: (imgs: typeof DEFAULT_IMAGES) => { }
});

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNav = location.pathname.startsWith('/reading/') || location.pathname.startsWith('/oracoes-eucaristicas/oracao-');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col max-w-lg mx-auto bg-background-light dark:bg-background-dark shadow-2xl overflow-x-hidden border-x border-slate-200 dark:border-slate-800">
      <Routes>
        <Route path="/" element={<ReadingsList />} />
        <Route path="/reading/:id" element={<ReadingDetail />} />
        <Route path="/preces" element={<GeneratePrayers />} />
        <Route path="/preces/personalizar" element={<PersonalizePrayers />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/oracoes-eucaristicas" element={<OracoesEucaristicas />} />
        <Route path="/oracoes-eucaristicas/:id" element={<OracaoDetalhe />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/sobre" element={<About />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  const [images, setImages] = useState(DEFAULT_IMAGES);

  useEffect(() => {
    const saved = localStorage.getItem('app_images');
    if (saved) {
      try { setImages(JSON.parse(saved)); } catch (e) { }
    }
  }, []);

  const updateImages = (newImages: typeof DEFAULT_IMAGES) => {
    setImages(newImages);
    localStorage.setItem('app_images', JSON.stringify(newImages));
  };

  return (
    <ImageContext.Provider value={{ images, setImages: updateImages }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ImageContext.Provider>
  );
};

export default App;
