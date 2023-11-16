import AuthProvider from '@/providers/AuthProvider'
import Header from '../_components/Header'

export default function bannersSliderLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  )
}
