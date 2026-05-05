## Set up without React context

```jsx
// trpc.ts
import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { AppRouter } from '../server/router';
 
export const queryClient = new QueryClient();
 
const trpcClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: 'http://localhost:2022' })],
});
 
export const trpc = createTRPCOptionsProxy<AppRouter>({
  client: trpcClient,
  queryClient,
});
```

```jsx
// App.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../utils/trpc";
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app here */}
    </QueryClientProvider>
  );
}
```

#### Fetch Data

```jsx
import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "./trpc";

export default function UserList() {
  const userQuery = useQuery(trpc.getUser.queryOptions({ id: "id_bilbo" }));
  const userCreator = useMutation(trpc.createUser.mutationOptions());

  return (
    <div>
      <p>{userQuery.data?.name}</p> 
      <button onClick={() => userCreator.mutate({ name: "Frodo" })}>
        Create Frodo
      </button>
    </div>
  );
}
```
