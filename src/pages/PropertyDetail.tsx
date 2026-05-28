import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') ?? '5217351234567';
  const whatsappMsg = property
    ? encodeURIComponent(`Hola Larissa, me interesa la propiedad: ${property.nombre}. ¿Podrías darme más información?`)
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-background px-6 md:px-12 luxury-container animate-pulse">
          <div className="h-8 bg-muted rounded-full w-1/3 mb-8" />
          <div className="aspect-video bg-muted rounded-3xl mb-8" />
          <div className="h-10 bg-muted rounded-full w-1/2 mb-4" />
          <div className="h-4 bg-muted rounded-full w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="font-serif text-2xl font-bold text-slate-700">Propiedad no encontrada</p>
            <Link to="/mapa" className="inline-block px-6 py-2 bg-accent text-white text-xs font-sans uppercase font-bold tracking-widest rounded-full hover:bg-accent/90 transition-all">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(', ');
  const profileImg = user?.imagen_perfil_usuario || '/profile.png';

  return (
    <>
      <Helmet>
        <title>{property.nombre} | {user?.nombre_usuario ?? 'Larissa García'}</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-24 min-h-screen bg-background">
        {/* Back */}
        <div className="px-6 md:px-12 py-6 luxury-container">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent font-sans font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Mapa de Propiedades
          </Link>
        </div>

        {/* Images */}
        <div className="px-6 md:px-12 luxury-container mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 luxury-container pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Details */}
            <div className="lg:col-span-2 space-y-8 text-left">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 bg-accent text-white text-[10px] uppercase tracking-wider font-extrabold rounded-full">
                    {badge}
                  </span>
                  {property.tipo && (
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] uppercase tracking-wider font-bold rounded-full">
                      {property.tipo}
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {property.nombre}
                </h1>

                {location && (
                  <p className="flex items-center gap-1.5 text-slate-500 font-sans text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    {location}
                  </p>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {property.habitaciones != null && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center">
                    <Bed className="w-5 h-5 mx-auto mb-1.5 text-accent" />
                    <p className="font-serif text-xl font-bold text-slate-900 dark:text-white">{property.habitaciones}</p>
                    <p className="text-xs text-slate-500 font-sans">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center">
                    <Bath className="w-5 h-5 mx-auto mb-1.5 text-accent" />
                    <p className="font-serif text-xl font-bold text-slate-900 dark:text-white">{property.banios}</p>
                    <p className="text-xs text-slate-500 font-sans">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center">
                    <Square className="w-5 h-5 mx-auto mb-1.5 text-accent" />
                    <p className="font-serif text-xl font-bold text-slate-900 dark:text-white">{property.area} m²</p>
                    <p className="text-xs text-slate-500 font-sans">Construcción</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center">
                    <Car className="w-5 h-5 mx-auto mb-1.5 text-accent" />
                    <p className="font-serif text-xl font-bold text-slate-900 dark:text-white">{property.estacionamientos}</p>
                    <p className="text-xs text-slate-500 font-sans">Cochera</p>
                  </div>
                )}
              </div>

              {property.descripcion && (
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h2 className="font-serif text-xl font-extrabold text-slate-900 dark:text-white">Descripción</h2>
                  <p className="font-sans text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-6 shadow-elegant space-y-6 text-left">
                <div>
                  <p className="font-serif text-3xl font-extrabold text-accent">{formatPrice(property.precio)}</p>
                  <p className="text-xs text-slate-400 font-sans font-medium mt-1">
                    {badge === 'Renta' ? 'Renta mensual' : 'Precio total de venta'}
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pb-5 border-b border-slate-100 dark:border-slate-800/80">
                  <img
                    src={profileImg}
                    alt={user?.nombre_usuario || 'Larissa García'}
                    className="w-12 h-12 rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-sm"
                  />
                  <div>
                    <p className="font-sans font-bold text-sm text-slate-900 dark:text-white">{user?.nombre_usuario || 'Larissa García'}</p>
                    <p className="font-sans text-xs text-slate-400">Asesora Inmobiliaria Profesional</p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar por WhatsApp
                </a>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3.5">
                  <h4 className="font-serif text-base font-bold text-slate-900 dark:text-white">¿No es lo que buscas?</h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed">
                    Si esta propiedad no cumple tus expectativas, completa nuestra solicitud inteligente de 6 pasos para encontrar la opción perfecta según tu rutina diaria.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-accent text-accent hover:bg-accent hover:text-white rounded-full font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    Búsqueda Inteligente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
