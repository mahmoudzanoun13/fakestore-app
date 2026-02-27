import React from 'react';
import { NavLink } from 'react-router';
import { PlusCircle, User } from 'lucide-react';

type MobileMenuProps = {
  isOpen: boolean;
  isAuthenticated: boolean;
  username?: string;
  onClose: () => void;
};

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isAuthenticated,
  username,
  onClose,
}) => {
  if (!isOpen) return null;

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
      isActive ? 'bg-primary/10 text-primary' : 'text-secondary-foreground hover:bg-secondary'
    }`;

  return (
    <>
      {/* Overlay/Backdrop */}
      <div
        className="fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-30 animate-in fade-in duration-300 md:hidden"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-border shadow-xl animate-in slide-in-from-top duration-300 z-40">
        <nav className="flex flex-col p-4 space-y-2">
          {isAuthenticated && username && (
            <div className="flex items-center gap-3 px-4 py-3 mb-2 border-b border-secondary">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted">Signed in as</span>
                <span className="text-sm font-bold text-secondary-foreground capitalize">
                  {username}
                </span>
              </div>
            </div>
          )}
          <NavLink to="/" onClick={onClose} className={linkClasses}>
            All Products
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/create-product" onClick={onClose} className={linkClasses}>
              <PlusCircle size={20} />
              Create Product
            </NavLink>
          )}
        </nav>
      </div>
    </>
  );
};
