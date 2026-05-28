import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { Building2 } from 'lucide-react';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 space-y-4">
    <div className="aspect-[16/10] rounded-2xl bg-slate-200 dark:bg-slate-800" />
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
  </div>
);

const PropertiesPage = () => {
  const { properties, isLoading } = useProperties({ limit: 100 });

  return (
    <>
      <Helmet>
        <title>Catálogo Completo de Propiedades | Larissa García</title>
        <meta
          name="description"
          content="Explora el inventario completo de casas de un solo nivel, departamentos y terrenos listos para escriturar en Cuautla y Morelos con Larissa García."
        />
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-24 bg-background min-h-screen">
        <div className="luxury-container max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-left space-y-3">
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Nuestras Propiedades
            </h1>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl">
              Explora nuestra oferta completa en Morelos. Residenciales nuevos y terrenos seleccionados bajo estrictos estándares de calidad y certeza jurídica.
            </p>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : properties.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm">
                <Building2 className="w-12 h-12 text-slate-350 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-slate-800">Inventario en actualización</h3>
                <p className="font-sans text-slate-500 text-sm max-w-md mx-auto">
                  Estamos integrando nuevas preventas y desarrollos. Por favor, solicita asesoría personalizada para buscar opciones fuera de catálogo.
                </p>
                <Link
                  to="/solicita-inmueble"
                  className="inline-block px-8 py-3 bg-accent text-white text-xs font-sans uppercase font-extrabold tracking-widest rounded-full hover:bg-accent/90 transition-all shadow-md"
                >
                  Búsqueda Inteligente ✦
                </Link>
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} variant="compact" />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

import { Link } from 'react-router-dom';
export default PropertiesPage;
