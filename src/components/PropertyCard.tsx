import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(' • ') || 'Morelos, MX';

  if (variant === 'compact') {
    return (
      <Link 
        to={`/properties/${property.id}`} 
        className="group block bg-card/65 dark:bg-slate-900/65 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 dark:border-slate-800/40 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent text-white text-[10px] uppercase tracking-wider font-extrabold rounded-full shadow-sm">
              {badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-white font-serif font-extrabold text-xl">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="font-serif text-base font-bold text-slate-900 dark:text-white group-hover:text-accent transition-colors truncate">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs text-slate-500 flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            {location}
          </p>
          <div className="flex gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 font-sans font-medium">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-accent" />
                {property.habitaciones} Rec.
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-accent" />
                {property.banios} Baños
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1.5">
                <Square className="w-3.5 h-3.5 text-accent" />
                {property.area}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/properties/${property.id}`} 
      className="group cursor-pointer block bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800/60 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.01]"
    >
      <div className="relative aspect-[16/10] mb-5 overflow-hidden rounded-2xl">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-accent text-white text-[10px] uppercase tracking-wider font-extrabold rounded-full shadow-md">
            {badge}
          </span>
        </div>
      </div>
      <div className="px-1 flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <div className="space-y-1 md:max-w-[70%]">
          <h3 className="font-serif text-lg md:text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
            {property.nombre}
          </h3>
          <p className="font-sans text-xs md:text-sm text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            {location}
          </p>
        </div>
        <div className="md:text-right flex-shrink-0">
          <span className="font-serif font-extrabold text-xl text-accent block">
            {formatPrice(property.precio)}
          </span>
          {property.area && (
            <span className="font-sans text-xs text-slate-400 font-medium">
              {property.area} m² const.
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
