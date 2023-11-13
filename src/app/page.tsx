import AuthProvider from '@/providers/AuthProvider'
import SingleBanners from './_components/SingleBanners'
import Header from './_components/Header'

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <div>
        <h1 className="text-4xl font-bold text-primary mb-8">Portal Login</h1>
        <SingleBanners />
      </div>
    </AuthProvider>
  )
}
