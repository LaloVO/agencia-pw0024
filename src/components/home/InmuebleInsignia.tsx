import { useEffect, useRef, useState } from 'react';
import { Home, Phone, Calendar, ArrowUpRight, Check, Trees, Droplets, Map } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const InmuebleInsignia = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSiteUser();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const phone = user?.telefono_usuario || '5217351234567';
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent("Hola Asesor Demo, me interesa la casa de $2.5 MDP en Fracc. Tezahuapan, Cuautla Morelos. Me gustaría recibir más detalles.");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  const specs = [
    { label: "3 Habitaciones con clóset", icon: <Check className="w-4 h-4 text-accent" /> },
    { label: "2 Baños completos + 1/2 baño", icon: <Check className="w-4 h-4 text-accent" /> },
    { label: "Estacionamiento (1 a 2 autos)", icon: <Check className="w-4 h-4 text-accent" /> },
    { label: "Jardín privado y terraza", icon: <Trees className="w-4 h-4 text-accent" /> },
    { label: "Cisterna de gran capacidad", icon: <Droplets className="w-4 h-4 text-accent" /> },
    { label: "200 m² Terreno | 143 m² Const.", icon: <Map className="w-4 h-4 text-accent" /> },
  ];

  return (
    <section id="insignia" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-slate-100 dark:border-slate-800">
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[90px] pointer-events-none" />

      <div ref={ref} className="luxury-container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Asymmetric Portrait of the Signature House */}
          <div className={`lg:col-span-6 relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant group border border-white/50 dark:border-slate-800/40">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" 
                alt="Casa Nueva en Cuautla Morelos" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-accent text-white px-4 py-2 rounded-2xl shadow-lg border border-white/20 font-serif font-extrabold text-lg flex items-center gap-1">
                $2,500,000 MXN
              </div>
              <div className="absolute top-6 right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-[10px] font-sans font-bold uppercase tracking-wider text-slate-800 dark:text-white border border-slate-100">
                ⭐ OPORTUNIDAD ÚNICA
              </div>
            </div>
          </div>

          {/* Right: Premium Editorial copy and specifications */}
          <div className={`lg:col-span-6 space-y-6 text-left transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Casa de un solo nivel en Fracc. Tezahuapan, Cuautla
              </h2>
              <p className="font-sans text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Ubicada en una de las zonas de mayor plusvalía y tranquilidad en Morelos. Su diseño de un solo nivel optimiza los espacios brindando confort térmico y fluidez, ideal para disfrutar en familia de sus áreas verdes y excelente iluminación natural.
              </p>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4">
              {specs.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 font-sans text-sm text-slate-700 dark:text-slate-300">
                  <div className="p-1 bg-accent/10 rounded-full shrink-0">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-accent text-white font-sans text-xs uppercase tracking-widest font-extrabold hover:bg-accent/90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
              <a
                href="/solicita-inmueble"
                className="px-8 py-3.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-400 font-sans text-xs uppercase tracking-widest font-extrabold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-accent" />
                Agendar Cita Virtual
              </a>
            </div>

            {/* Extra text note */}
            <p className="font-sans text-[11px] text-slate-400 dark:text-slate-500 tracking-wide leading-relaxed">
              * Aceptamos y tramitamos todo tipo de créditos hipotecarios (Bancarios, Infonavit, Cofinavit). Asesoría 100% integral y sin fricción.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InmuebleInsignia;
