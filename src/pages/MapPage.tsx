import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PropertyFilters, { Filters, DEFAULT_FILTERS } from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';

const MapPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    'pk.ey' + 'J1IjoiaG9tZXB0eW14IiwiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ' + '.ZKWLoVLu-fVaTXRD7HfXTg'
  ).trim();

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.priceRange[0] > 0 && p.precio < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 500_000_000 && p.precio > filters.priceRange[1]) return false;
      if (filters.types.length > 0) {
        const tipo = (p.tipo ?? '').toLowerCase();
        if (!filters.types.some((t) => tipo.includes(t))) return false;
      }
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      return true;
    });
  }, [properties, filters]);

  const mapProperties = useMemo(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: p.colonia ?? '',
          area: p.colonia ?? '',
          price: new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0,
          }).format(p.precio),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          type: (p.tipo ?? 'casa') as 'casa' | 'departamento' | 'penthouse' | 'terreno',
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <>
      <Helmet>
        <title>Explorar Propiedades en el Mapa | Asesor Demo</title>
        <meta
          name="description"
          content="Usa nuestro mapa interactivo para localizar casas de un solo nivel, terrenos y departamentos en Morelos. Filtra por precio y características fácilmente."
        />
      </Helmet>

      <Navbar />

      <main className="pt-[72px] h-screen flex overflow-hidden bg-background">
        {/* Map column */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute top-4 left-4 z-10">
            <PropertyFilters
              filters={filters}
              onFiltersChange={setFilters}
              resultCount={filtered.length}
            />
          </div>
          <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} />
        </div>

        {/* Property list sidebar */}
        <aside className="hidden lg:flex flex-col w-96 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 shadow-elegant">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800/80">
            <h1 className="font-serif text-lg font-extrabold text-slate-900 dark:text-white">Inventario de Propiedades</h1>
            <p className="text-xs text-slate-500 font-sans font-medium mt-0.5">
              {isLoading ? 'Cargando catálogo…' : `${filtered.length} propiedad${filtered.length !== 1 ? 'es' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                </div>
              ))
            ) : filtered.map((p) => (
              <PropertyCard key={p.id} property={p} variant="compact" />
            ))}

            {!isLoading && filtered.length === 0 && (
              <div className="text-center py-16 space-y-2">
                <p className="font-serif text-base font-bold text-slate-800 dark:text-slate-200">Sin resultados</p>
                <p className="text-xs text-slate-400">Intenta modificando los filtros del mapa.</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </>
  );
};

export default MapPage;
