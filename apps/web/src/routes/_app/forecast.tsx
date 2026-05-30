import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/forecast')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/forecast"!</div>
}
