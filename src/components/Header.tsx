import { NavLink } from 'react-router-dom';
import { Moon, Sun, Map, Image, Brain, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import sanJosemariaLogo from '@/assets/san-josemaria-logo.jpg';

const navItems = [
  { to: '/', icon: Info, label: 'Inicio' },
  { to: '/mapa', icon: Map, label: 'Mapa' },
  { to: '/album', icon: Image, label: 'Álbum' },
  { to: '/quiz', icon: Brain, label: 'Trivial' },
];

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 safe-area-top">
      <div className="flex items-center justify-between h-16 px-3 sm:px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg flex-shrink-0 ring-2 ring-primary/20">
            <img 
              src={sanJosemariaLogo} 
              alt="San Josemaría" 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="hidden sm:block min-w-0">
            <h1 className="font-bold text-sm md:text-base leading-tight text-foreground truncate">
              Logroño 1915–1925
            </h1>
            <p className="text-xs text-muted-foreground leading-tight truncate">
              Ruta San Josemaría
            </p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-1 bg-secondary/50 p-1 rounded-full mx-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )
              }
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="hidden xs:inline sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full flex-shrink-0"
          aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
