import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/setup/bills')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/setup/bills"!</div>
}
