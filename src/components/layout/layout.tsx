import React from 'react';
import { Outlet } from 'react-router';
import { Header } from './header';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-secondary text-primary font-sans">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
