import AuthProvider from '@/providers/AuthProvider'
import SingleBanners from './_components/SingleBanners'
import SliderBanners from './_components/SliderBanners'

export default function Home() {
  return (
    <AuthProvider>
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
