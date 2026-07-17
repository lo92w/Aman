import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AuthProvider, useAuth } from '@/hooks/use-auth';

// Pages
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import TransfersList from '@/pages/transfers';
import TransferDetail from '@/pages/transfers/[id]';
import TransferFlow from '@/pages/transfer-flow';
import Notifications from '@/pages/notifications';
import RecipientView from '@/pages/recipient-view';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType<any> }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Login />;
  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      
      {/* Recipient view is public (demo link) */}
      <Route path="/recipient-view" component={RecipientView} />

      {/* Protected Routes */}
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/transfer">
        <ProtectedRoute component={TransferFlow} />
      </Route>
      <Route path="/transfers">
        <ProtectedRoute component={TransfersList} />
      </Route>
      <Route path="/transfers/:id">
        <ProtectedRoute component={TransferDetail} />
      </Route>
      <Route path="/notifications">
        <ProtectedRoute component={Notifications} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
