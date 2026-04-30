### Basic example with Tanstack Query

```jsx
// src/routes/posts.tsx
const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(),
});

export const Route = createFileRoute("/posts")({
  // Use the `loader` option to ensure that the data is loaded
  loader: () => queryClient.ensureQueryData(postsQueryOptions),
  component: () => {
    // Read the data from the cache and subscribe to updates
    const {
      data: { posts },
    } = useSuspenseQuery(postsQueryOptions);

    return (
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  },
});
```

### Error handling with Tanstack Query

```jsx
export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(postsQueryOptions),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    const queryErrorResetBoundary = useQueryErrorResetBoundary();

    useEffect(() => {
      // Reset the query error boundary
      queryErrorResetBoundary.reset();
    }, [queryErrorResetBoundary]);

    return (
      <div>
        {error.message}
        <button
          onClick={() => {
            // Invalidate the route to reload the loader, and reset any router error boundaries
            router.invalidate();
          }}
        >
          retry
        </button>
      </div>
    );
  },
});
```

###

```jsx

```

### Example of handling fast/slow requests together in the loader option

```jsx
// src/routes/posts.$postId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { slowDataOptions, fastDataOptions } from "~/api/query-options";

export const Route = createFileRoute("/posts/$postId")({
  loader: async ({ context: { queryClient } }) => {
    // Kick off the fetching of some slower data, but do not await it
    queryClient.prefetchQuery(slowDataOptions());

    // Fetch and await some data that resolves quickly
    await queryClient.ensureQueryData(fastDataOptions());
  },
});
```

Then in your component, you can use the library's hooks to access the data:

```jsx
// src/routes/posts.$postId.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { slowDataOptions, fastDataOptions } from "~/api/query-options";

export const Route = createFileRoute("/posts/$postId")({
  // ...
  component: PostIdComponent,
});

function PostIdComponent() {
  const fastData = useSuspenseQuery(fastDataOptions());

  // do something with fastData

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SlowDataComponent />
    </Suspense>
  );
}

function SlowDataComponent() {
  const data = useSuspenseQuery(slowDataOptions());

  return <div>{data}</div>;
}
```
