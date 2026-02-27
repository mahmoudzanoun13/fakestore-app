import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { Layout } from './layout';
import { ProtectedRoute } from './protected-route';
import { Spinner } from '@/components/ui/spinner';

// Lazy load pages
const ProductsPage = lazy(() =>
  import('@/pages/products-page').then((m) => ({
    default: m.ProductsPage,
  }))
);
const ProductDetailsPage = lazy(() =>
  import('@/pages/product-details-page').then((m) => ({
    default: m.ProductDetailsPage,
  }))
);
const CreateProductPage = lazy(() =>
  import('@/pages/create-product-page').then((m) => ({
    default: m.CreateProductPage,
  }))
);
const CartPage = lazy(() =>
  import('@/pages/cart-page').then((m) => ({
    default: m.CartPage,
  }))
);
const LoginPage = lazy(() =>
  import('@/pages/login-page').then((m) => ({
    default: m.LoginPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({
    default: m.NotFoundPage,
  }))
);

export const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    }
  >
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route
          path="create-product"
          element={
            <ProtectedRoute>
              <CreateProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
