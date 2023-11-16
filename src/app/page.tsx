import AuthProvider from '@/providers/AuthProvider'
import SingleBanners from './_components/SingleBanners'
import Header from './_components/Header'
import SliderBanners from './_components/SliderBanners'

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <div>
        <h1 className="text-4xl font-bold text-primary mb-8">Portal Login</h1>
        <div className="w-full flex gap-4">
          <SliderBanners />
          <SingleBanners />
        </div>
      </div>
    </AuthProvider>
  )
}
