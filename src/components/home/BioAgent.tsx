import { useEffect, useRef, useState } from 'react';
import { Phone, FileText, CheckCircle2, Award, Shield } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const BioAgent = () => {
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

  const profileImg = user?.imagen_perfil_usuario || '/agent-avatar.svg';
  const phone = user?.telefono_usuario || '5217351234567';
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent("Hola Asesor Demo, me gustaría recibir asesoría para encontrar una propiedad en Morelos.");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  return (
    <section id="perfil" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-slate-100 dark:border-slate-800">
      {/* Decorative blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[90px] pointer-events-none" />

      <div ref={ref} className="luxury-container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Floating Elegant Profile Portrait */}
          <div className={`lg:col-span-5 relative flex justify-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Back accent glass frame */}
            <div className="absolute w-[80%] aspect-[3/4] bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-3xl -rotate-6 translate-x-2 translate-y-2 border border-white/50 dark:border-slate-700/30 z-0 shadow-card" />
            
            {/* Main Image Container */}
            <div className="relative w-[80%] aspect-[3/4] rounded-3xl overflow-hidden shadow-elegant border border-white dark:border-slate-800 z-10 group">
              <img 
                src={profileImg} 
                alt="Asesor Demo" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-left">
                <span className="font-serif font-extrabold text-2xl block">{user?.nombre_usuario || 'Asesor Demo'}</span>
                <span className="font-sans text-slate-300 text-xs tracking-wider uppercase font-semibold">Asesora Profesional • Morelos</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Bio & Professional Badges */}
          <div className={`lg:col-span-7 space-y-6 text-left transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                Asesoría confiable, directa y profesional
              </h2>
              <p className="font-sans text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Hola, soy Asesor Demo. Mi compromiso es ayudarte a encontrar el hogar de tus sueños o la inversión ideal en el hermoso estado de Morelos con total tranquilidad y rapidez.
              </p>
              <p className="font-sans text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Me especializo en perfilar y gestionar créditos hipotecarios (Bancarios, Infonavit, Fovissste) y en simplificar toda la carga administrativa del proceso. Conmigo obtienes un trato profesional, directo, transparente y sin fricciones burocráticas.
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 p-4 rounded-2xl flex flex-col items-start gap-2 shadow-sm">
                <Award className="w-6 h-6 text-accent" />
                <span className="font-serif font-bold text-sm text-slate-900 dark:text-white">Créditos al 100%</span>
                <span className="font-sans text-[11px] text-slate-500">Gestión sin costo</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 p-4 rounded-2xl flex flex-col items-start gap-2 shadow-sm">
                <Shield className="w-6 h-6 text-accent" />
                <span className="font-serif font-bold text-sm text-slate-900 dark:text-white">Certeza Legal</span>
                <span className="font-sans text-[11px] text-slate-500">Escrituración directa</span>
              </div>

              <div className="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 p-4 rounded-2xl flex flex-col items-start gap-2 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-accent" />
                <span className="font-serif font-bold text-sm text-slate-900 dark:text-white">Zonas Selectas</span>
                <span className="font-sans text-[11px] text-slate-500">Cuautla y Cocoyoc</span>
              </div>
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
                Iniciar Conversación
              </a>
              <a
                href="/solicita-inmueble"
                className="px-8 py-3.5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-slate-400 font-sans text-xs uppercase tracking-widest font-extrabold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4 text-accent" />
                Búsqueda Inteligente
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioAgent;
