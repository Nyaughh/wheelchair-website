import { WheelchairIcon, SunIcon, MoonIcon } from './icons';
import { Theme } from '@/types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header = ({ theme, toggleTheme }: HeaderProps) => {
  return (
    <header className={`border-b ${theme === 'light' ? 'border-blue-200/60 bg-white/90 shadow-blue-500/5' : 'border-zinc-800/40 bg-black/50'} backdrop-blur-sm shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30' : 'bg-zinc-700 text-white'}`}>
              <WheelchairIcon />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-semibold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                {theme === 'light' ? 'Medical Mobility Assistant' : 'Smart Wheelchair'}
              </span>
              <span className={`text-xs sm:text-sm ${theme === 'light' ? 'text-blue-600' : 'text-zinc-400'}`}>
                {theme === 'light' ? 'Healthcare Mobility' : 'Voice-Controlled System'}
              </span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
            }`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>
      </div>
    </header>
  );
};
