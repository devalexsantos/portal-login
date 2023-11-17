import AuthProvider from '@/providers/AuthProvider'

export default function bannersIndividuaisLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
