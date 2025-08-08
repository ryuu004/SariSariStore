import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CubeIcon } from '@heroicons/react/24/outline';

function TabItem({ to, label, Icon, isActive }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-xl transition-colors ${
        isActive ? 'text-brand-700 bg-brand-50' : 'text-gray-600 hover:bg-gray-50'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}

export default function MobileTabBar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-gray-200">
      <div className="mx-auto max-w-screen-sm px-3">
        <div className="grid grid-cols-2 gap-2 py-1">
          <TabItem to="/" label="Home" Icon={HomeIcon} isActive={pathname === '/'} />
          <TabItem to="/inventory" label="Inventory" Icon={CubeIcon} isActive={pathname.startsWith('/inventory')} />
        </div>
      </div>
    </nav>
  );
}


