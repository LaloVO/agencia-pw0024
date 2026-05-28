import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';

const HeroProptech = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [operationType, setOperationType] = useState('1'); // 1 = Venta, 2 = Renta
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    params.set('accion', operationType);
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="luxury-container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Side: Editorial Content & Proptech Search */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className={`space-y-4 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.15] text-balance">
              Hogares en Morelos con procesos <span className="text-accent">ágiles y transparentes</span>.
            </h1>
            <p className="font-sans text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
              Sin fricciones ni burocracia. Especialistas en propiedades residenciales, casas nuevas de un solo nivel y gestión de créditos con total seguridad.
            </p>
          </div>

          {/* Search Bar - Clean Proptech Pill */}
          <form 
            onSubmit={handleSearch}
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-2xl md:rounded-full shadow-elegant flex flex-col md:flex-row gap-2 max-w-2xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Operation Selector Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full shrink-0 md:w-36">
              <button
                type="button"
                onClick={() => setOperationType('1')}
                className={`flex-1 py-1.5 text-xs font-sans font-bold tracking-wider rounded-full transition-all ${
                  operationType === '1'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                VENTA
              </button>
              <button
                type="button"
                onClick={() => setOperationType('2')}
                className={`flex-1 py-1.5 text-xs font-sans font-bold tracking-wider rounded-full transition-all ${
                  operationType === '2'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                RENTA
              </button>
            </div>

            {/* Input field */}
            <div className="flex-1 flex items-center bg-transparent px-3 py-2 md:py-0">
              <MapPin className="w-4 h-4 text-accent shrink-0 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cuautla, Yautepec, Cocoyoc..."
                className="bg-transparent w-full outline-none text-slate-950 dark:text-white placeholder-slate-400 font-sans text-sm"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-accent text-white font-sans text-xs uppercase tracking-widest font-extrabold hover:bg-accent/90 transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 group"
            >
              Buscar
              <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </button>
          </form>

          {/* Quick stats tags */}
          <div className={`flex flex-wrap items-center gap-4 text-xs font-sans font-semibold text-slate-500 dark:text-slate-400 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <span>🔥 Populares en Morelos:</span>
            <button 
              type="button" 
              onClick={() => { setSearchQuery('Cuautla'); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-accent hover:text-white rounded-full transition-all"
            >
              Cuautla
            </button>
            <button 
              type="button" 
              onClick={() => { setSearchQuery('Casa de un nivel'); }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-accent hover:text-white rounded-full transition-all"
            >
              Un Solo Nivel
            </button>
            <button 
              type="button" 
              onClick={() => { navigate('/solicita-inmueble'); }}
              className="text-accent hover:underline flex items-center gap-0.5"
            >
              Búsqueda Inteligente ✦
            </button>
          </div>
        </div>

        {/* Right Side: Staggered Overlapping Photo Gallery */}
        <div className={`lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Main Card (Staggered back-right) */}
          <div className="absolute w-[65%] aspect-[4/5] right-4 top-4 rounded-3xl overflow-hidden shadow-elegant border border-white/40 dark:border-slate-800/40 rotate-[3deg] group hover:rotate-0 transition-transform duration-500 z-10">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" 
              alt="Casa iluminada Morelos" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
          </div>

          {/* Secondary Card (Staggered front-left) */}
          <div className="absolute w-[60%] aspect-[4/5] left-4 bottom-4 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 dark:border-slate-800/40 -rotate-[4deg] group hover:rotate-0 transition-transform duration-500 z-20">
            <img 
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop" 
              alt="Fachada moderna minimalista" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
            />
            {/* Quick floating detail pill */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-white/50">
              <span className="font-serif font-extrabold text-slate-900 text-xs sm:text-sm block">Desde $2,500,000</span>
              <span className="font-sans text-slate-500 text-[10px] sm:text-xs block">Listas para escriturar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProptech;
