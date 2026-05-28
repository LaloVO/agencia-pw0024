import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Cpu, KeyRound } from 'lucide-react';

const DiferenciadoresProptech = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-accent" />,
      title: "Agilidad Digital",
      desc: "Menos burocracia, más velocidad. Integramos herramientas digitales de punta para agilizar la búsqueda, el perfilamiento y la negociación de tu patrimonio."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: "Seguridad y Créditos",
      desc: "Nos encargamos de gestionar y perfilar la mejor opción crediticia para ti (Infonavit, bancario, cofinanciado) sin costo extra y con total certeza legal."
    },
    {
      icon: <KeyRound className="w-8 h-8 text-accent" />,
      title: "Transparencia Total",
      desc: "Cero sorpresas o cargos ocultos. Todas nuestras propiedades publicadas cuentan con escrituración en regla, planos aprobados e información verídica."
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-t border-slate-100 dark:border-slate-900">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="luxury-container max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Un enfoque contemporáneo en bienes raíces
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400 text-sm md:text-base">
            Combinamos la calidez humana con estándares tecnológicos modernos para darte el servicio inmobiliario libre de estrés que mereces.
          </p>
        </div>

        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-100 dark:border-slate-900 hover:border-accent/30 dark:hover:border-accent/20 shadow-card hover:shadow-elegant hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform mb-6">
                {item.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferenciadoresProptech;
