import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { App } from './App.tsx';
import { queryClient } from './lib/query-client.ts';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element '#root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ hideUntilHover: true }}
          plugins={[formDevtoolsPlugin()]}
        />
      )}
    </QueryClientProvider>
  </StrictMode>,
);
