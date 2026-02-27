import { ErrorBoundary } from 'react-error-boundary';
import { AppRoutes } from './components/layout/app-routes';
import { ErrorBoundaryFallback } from './components/layout/error-boundary-fallback';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      <AppRoutes />
      <Toaster position="top-right" expand={false} richColors />
    </ErrorBoundary>
  );
};

export default App;
