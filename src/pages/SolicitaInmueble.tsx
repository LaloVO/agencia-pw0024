import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user } = useSiteUser();

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | {user?.nombre_usuario ?? "Asesor Demo"}</title>
        <meta
          name="description"
          content="Completa nuestra solicitud inteligente de 6 pasos para encontrar tu propiedad ideal en Morelos. Evaluamos tu perfil y presupuesto para darte la recomendación perfecta."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20">
        {/* Radial background flare */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header de la Sección */}
          <div className="text-center mb-12 space-y-3">
            <h1 className="font-serif text-3xl md:text-5xl text-slate-900 dark:text-white font-extrabold tracking-tight">
              Búsqueda Inteligente Inmobiliaria
            </h1>
            <p className="font-sans text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Cuéntanos lo que buscas, tu presupuesto y necesidades. Filtraremos y buscaremos las mejores residencias en Morelos que se adapten a tu perfil.
            </p>
          </div>

          {/* Formulario MultiStep */}
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-800/40 shadow-elegant overflow-hidden">
            <FormularioMultiStep />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
