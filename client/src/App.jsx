import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from "./pages/Home"
// importa también tus páginas y rutas si las estás usando

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <main className="flex-grow">
        {/* Aquí irá tu router o páginas */}
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;
