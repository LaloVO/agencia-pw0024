import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { Building2, Compass } from 'lucide-react';

const SkeletonCard = () => (
  <div className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 space-y-4">
    <div className="aspect-[16/10] rounded-2xl bg-slate-200 dark:bg-slate-800" />
    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
    <div className="flex gap-4 pt-2 border-t border-slate-100 dark:border-slate-850">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
    </div>
  </div>
);

const ListadoPropiedades = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 6 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="propiedades" ref={sectionRef} className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-100 dark:border-slate-900">
      {/* Background flare */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="luxury-container max-w-6xl mx-auto relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-16 text-left">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
              Propiedades Selectas
            </h2>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-xl">
              Explora nuestra cuidada colección de hogares en Morelos. Opciones residenciales listas para habitar y escriturar.
            </p>
          </div>

          <Link
            to="/mapa"
            className="group px-6 py-3 rounded-full bg-accent text-white font-sans text-xs uppercase tracking-widest font-extrabold hover:bg-accent/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-1.5 self-start sm:self-auto hover:scale-105"
          >
            <Compass className="w-4 h-4" />
            Explorar Mapa Completo
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : properties.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
              <p className="font-sans text-slate-500 dark:text-slate-400 text-base">
                No hay propiedades disponibles en este momento.
              </p>
              <Link
                to="/solicita-inmueble"
                className="inline-block px-6 py-2.5 bg-accent text-white text-xs font-sans uppercase font-bold tracking-widest rounded-full hover:bg-accent/95 transition-all"
              >
                Solicitar Inmueble ✦
              </Link>
            </div>
          ) : (
            properties.map((property, index) => (
              <div
                key={property.id}
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} variant="compact" />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ListadoPropiedades;
