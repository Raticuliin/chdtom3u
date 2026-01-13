import { useOrganizer } from './presentation/hooks/use-organizer';

function App() {
  const { startProcess, isLoading } = useOrganizer();

  return (
    <div className="main-container">
      <header>
        <h1>PSX M3U Manager</h1>
        <p>Organiza tus juegos .chd en carpetas .m3u automáticamente</p>
      </header>

      <main>
        <div className="card">
          <h3>Paso 1: Seleccionar Carpeta</h3>
          <p>Se te pedirá permiso para leer y escribir en la carpeta seleccionada.</p>

          <button
            className="primary-button"
            onClick={() => startProcess('Disc')}
            disabled={isLoading}
          >
            {isLoading ? 'Procesando archivos...' : 'Escanear y Organizar'}
          </button>
        </div>
      </main>

      {isLoading && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>No cierres la pestaña, estamos moviendo tus juegos...</p>
        </div>
      )}
    </div>
  );
}

export default App;
