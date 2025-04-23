import NavBar from './components/NavBar';
import Footer from './components/Footer';
// importa también tus páginas y rutas si las estás usando

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
        {/* Aquí irá tu router o páginas */}
      </main>

      <Footer />
    </div>
  );
}

export default App;
