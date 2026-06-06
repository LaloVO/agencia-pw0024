import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const Footer = () => {
  const { site, user } = useSiteUser();
  
  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10 px-6 md:px-12 border-t border-slate-800">
      <div className="luxury-container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <Link to="/" className="font-serif text-2xl font-extrabold tracking-tight hover:text-accent transition-colors block">
              {site?.site_name || 'Asesor Demo'}
            </Link>
            <p className="font-sans text-sm text-slate-400 max-w-xs leading-relaxed">
              Procesos inmobiliarios ágiles, seguros y transparentes en Cuautla y todo Morelos. Tu patrimonio en las mejores manos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-accent">Contacto</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-sans">
                <li>📍 Morelos, México</li>
                {user?.telefono_usuario && (
                  <li>
                    <a href={`https://wa.me/${user.telefono_usuario.replace(/\D/g, '')}`} className="hover:text-accent transition-colors">
                      📞 WhatsApp: {user.telefono_usuario}
                    </a>
                  </li>
                )}
                {user?.email_usuario && (
                  <li>
                    <a href={`mailto:${user.email_usuario}`} className="hover:text-accent transition-colors">
                      ✉️ {user.email_usuario}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-accent">Redes</h4>
              <ul className="space-y-2 text-sm text-slate-400 font-sans">
                <li>
                  <a 
                    href="https://www.facebook.com/larissa.garcia.892804" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-accent transition-colors"
                  >
                    Facebook Profesional
                  </a>
                </li>
                <li>
                  <Link to="/mapa" className="hover:text-accent transition-colors">
                    Explorar Mapa
                  </Link>
                </li>
                <li>
                  <Link to="/solicita-inmueble" className="hover:text-accent transition-colors">
                    Búsqueda Inteligente
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-[11px] text-slate-500 uppercase tracking-widest flex flex-col sm:flex-row justify-between gap-4 font-sans">
          <span>© {new Date().getFullYear()} {site?.site_name || 'Asesor Demo'} | Proptech Real Estate</span>
          <span className="flex items-center gap-1">
            Desarrollado con
            <span className="text-accent">✦</span>
            CBF Connect
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
