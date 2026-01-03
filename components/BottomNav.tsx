
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { to: '/', icon: 'menu_book', label: 'Leituras' },
    { to: '/preces', icon: 'volunteer_activism', label: 'Preces' },
    { to: '/calendario', icon: 'calendar_month', label: 'Calendário' },
    { to: '/oracoes-eucaristicas', icon: 'auto_stories', label: 'O.E.' },
    { to: '/sobre', icon: 'info', label: 'Sobre' },
    { to: '/ajustes', icon: 'settings', label: 'Ajustes' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-lg bg-white/90 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe z-50">
      <div className="flex h-16 items-center justify-around px-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-all group ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500'
              }`
            }
          >
            <span className={`material-symbols-outlined text-[24px] transition-transform group-active:scale-90 ${location.pathname === item.to ? 'fill-1' : ''
              }`}>
              {item.icon}
            </span>
            <span className="text-[9px] font-bold tracking-tight text-center">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
