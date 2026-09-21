import React, { useState, useEffect } from 'react';
import { Alumno, WeatherDataMDP, FeedbackEntrenamiento } from './types';
import { INITIAL_ALUMNOS } from './data/seedData';
import { fetchMDPWeather, getMockSudestadaMDP } from './utils/weather';
import { usePwaInstall } from './hooks/usePwaInstall';
import { LoginScreen } from './components/LoginScreen';
import { CoachDashboard } from './components/CoachDashboard';
import { PupilPortal } from './components/PupilPortal';
import { Navbar } from './components/Navbar';
import { WeatherBanner } from './components/WeatherBanner';
import { NewPupilModal } from './components/NewPupilModal';
import { InstallPromptModal } from './components/InstallPromptModal';

const STORAGE_KEY = 'mardel_trote_alumnos_v2';

export function App() {
  const [alumnos, setAlumnos] = useState<Alumno[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ALUMNOS;
  });

  const [currentView, setCurrentView] = useState<'login' | 'coach' | 'pupil'>('login');
  const [currentPupil, setCurrentPupil] = useState<Alumno | null>(null);

  // Weather state
  const [weather, setWeather] = useState<WeatherDataMDP>({
    temperatura: 16,
    vientoKmH: 26,
    probabilidadLluvia: 20,
    descripcion: 'Brisa marina típica en la costa de Mar del Plata',
    esAlertaClima: false,
    horaActualizacion: '--:--'
  });
  const [isSudestadaSimulada, setIsSudestadaSimulada] = useState(false);

  // PWA Install
  const { isInstallable, isInstalled } = usePwaInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);

  // Modal nuevo alumno
  const [showNewPupilModal, setShowNewPupilModal] = useState(false);

  // Guardar en localStorage cuando cambian los alumnos
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  }, [alumnos]);

  // Actualizar título de la pestaña según la vista
  useEffect(() => {
    if (currentView === 'coach') {
      document.title = 'Mar del Trote | Panel Entrenadora';
    } else if (currentView === 'pupil' && currentPupil) {
      document.title = `Mar del Trote | ${currentPupil.nombre}`;
    } else {
      document.title = 'Mar del Trote | Running & Nutrición';
    }
  }, [currentView, currentPupil]);

  // Cargar clima de Mar del Plata al iniciar
  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchMDPWeather();
      setWeather(data);
    };
    loadWeather();
  }, []);

  // Detectar link de WhatsApp con token en la URL (ej: /?token=sofia-martinez-8291)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      const alumnoFound = alumnos.find(a => a.tokenAcceso === token);
      if (alumnoFound) {
        setCurrentPupil(alumnoFound);
        setCurrentView('pupil');
      }
    }
  }, [alumnos]);

  const handleRefreshWeather = async () => {
    setIsSudestadaSimulada(false);
    const data = await fetchMDPWeather();
    setWeather(data);
  };

  const handleToggleSudestadaSimulada = () => {
    if (isSudestadaSimulada) {
      handleRefreshWeather();
    } else {
      setIsSudestadaSimulada(true);
      setWeather(getMockSudestadaMDP());
    }
  };

  const handleUpdateAlumno = (updatedAlumno: Alumno) => {
    setAlumnos(prev => prev.map(a => a.id === updatedAlumno.id ? updatedAlumno : a));
    if (currentPupil?.id === updatedAlumno.id) {
      setCurrentPupil(updatedAlumno);
    }
  };

  const handleAddAlumno = (nuevoAlumno: Alumno) => {
    setAlumnos(prev => [nuevoAlumno, ...prev]);
  };

  const handleGuardarFeedback = (feedback: FeedbackEntrenamiento) => {
    if (!currentPupil) return;
    const nuevoHistorial = [feedback, ...currentPupil.historialFeedback];
    
    // Marcar como completado el entrenamiento correspondiente en el plan actual
    let planActualizado = currentPupil.planActual;
    if (planActualizado) {
      const nuevosEntrenamientos = planActualizado.entrenamientos.map(ent => {
        if (ent.numero === feedback.entrenamientoNumero) {
          return {
            ...ent,
            completado: true,
            modalidadRealizada: feedback.modalidad
          };
        }
        return ent;
      });
      planActualizado = {
        ...planActualizado,
        entrenamientos: nuevosEntrenamientos
      };
    }

    const alumnoActualizado: Alumno = {
      ...currentPupil,
      planActual: planActualizado,
      historialFeedback: nuevoHistorial
    };

    handleUpdateAlumno(alumnoActualizado);
  };

  const appBaseUrl = window.location.origin;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Vista de Login / Bienvenida */}
      {currentView === 'login' && (
        <LoginScreen
          alumnos={alumnos}
          onLoginEntrenadora={() => setCurrentView('coach')}
          onLoginAlumno={(alumno) => {
            setCurrentPupil(alumno);
            setCurrentView('pupil');
          }}
          onOpenInstallModal={() => setShowInstallModal(true)}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
        />
      )}

      {/* Vista de la Entrenadora */}
      {currentView === 'coach' && (
        <div className="min-h-screen flex flex-col">
          <Navbar
            weather={weather}
            onOpenInstallModal={() => setShowInstallModal(true)}
            onLogout={() => setCurrentView('login')}
            isInstallable={isInstallable}
            isInstalled={isInstalled}
          />
          
          <main className="flex-1 py-4">
            <div className="max-w-7xl mx-auto px-4 mb-4">
              <WeatherBanner
                weather={weather}
                alumnos={alumnos}
                onRefreshWeather={handleRefreshWeather}
                onToggleSudestadaSimulada={handleToggleSudestadaSimulada}
                isSudestadaSimulada={isSudestadaSimulada}
              />
            </div>

            <CoachDashboard
              alumnos={alumnos}
              onUpdateAlumno={handleUpdateAlumno}
              onOpenNewPupilModal={() => setShowNewPupilModal(true)}
              appBaseUrl={appBaseUrl}
            />
          </main>
        </div>
      )}

      {/* Vista del Alumno */}
      {currentView === 'pupil' && currentPupil && (
        <PupilPortal
          alumno={currentPupil}
          onGuardarFeedback={handleGuardarFeedback}
          onVolverALogin={() => {
            // Limpiar query params de la URL para que no quede bloqueado
            window.history.replaceState({}, '', window.location.pathname);
            setCurrentView('login');
          }}
        />
      )}

      {/* Modales globales */}
      <InstallPromptModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      <NewPupilModal
        isOpen={showNewPupilModal}
        onClose={() => setShowNewPupilModal(false)}
        onAddAlumno={handleAddAlumno}
      />
    </div>
  );
}

export default App;
