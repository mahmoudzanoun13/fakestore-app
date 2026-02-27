import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogOut, LogIn, PlusCircle, Store, Menu, X } from 'lucide-react';
import { MobileMenu } from './mobile-menu';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, username } = useAuthStore();
  const { totalItems } = useCartStore();

  const handleAuth = () => {
    setIsMenuOpen(false);
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <button
            className="p-2 md:hidden text-secondary-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <NavLink to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Store size={24} />
            <span className="hidden xs:inline sm:inline">FakeStore</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-secondary-foreground'
                }`
              }
            >
              All Products
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/create-product"
                className={({ isActive }: { isActive: boolean }) =>
                  `text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                    isActive ? 'text-primary' : 'text-secondary-foreground'
                  }`
                }
              >
                <PlusCircle size={16} />
                Create Product
              </NavLink>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/cart"
            className="relative p-2 text-secondary-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </NavLink>

          <div className="flex items-center gap-3">
            {isAuthenticated && username && (
              <span className="hidden lg:inline text-sm font-medium text-muted">
                Hi, <span className="text-secondary-foreground capitalize">{username}</span>
              </span>
            )}
            <Button
              variant={isAuthenticated ? 'secondary' : 'primary'}
              size="sm"
              onClick={handleAuth}
              className="flex items-center gap-2 h-9 sm:h-auto"
            >
              {isAuthenticated ? (
                <>
                  <LogOut size={16} />
                  <span>Logout</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Login</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        isAuthenticated={isAuthenticated}
        username={username}
        onClose={closeMenu}
      />
    </header>
  );
};
