import { ArrowLeft } from 'lucide-react'
import SingleBannersList from './_components/SingleBannersList'
import Link from 'next/link'

export default async function Page() {
  const banners = await fetch(`${process.env.API_URL}/banners`, {
    cache: 'no-store',
  }).then((res) => res.json())

  return (
    <div className="flex flex-col">
      <div className="container flex gap-3 items-center">
        <Link
          href="/"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary"
        >
          <ArrowLeft className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-primary">Banners Individuais</h1>
      </div>
      <SingleBannersList banners={banners} />
    </div>
  )
}
