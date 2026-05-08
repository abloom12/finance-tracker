import { checkout, polar, portal, usage } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';

export function createPolarClient(accessToken: string) {
  return new Polar({
    accessToken: accessToken,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: 'sandbox',
  });
}

export function usePolarPlugin(accessToken: string) {
  const polarClient = new Polar({
    accessToken: accessToken,
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: 'sandbox',
  });

  return polar({
    client: polarClient,
    createCustomerOnSignUp: true,
    use: [checkout(), portal(), usage()],
  });
}
