/* Passthrough root — route groups (site) and (payload) own their
 * own <html>/<body> and providers. */
export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
