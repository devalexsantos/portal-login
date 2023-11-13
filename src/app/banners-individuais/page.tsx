import { ArrowLeft } from 'lucide-react'
import SingleBannersList from './_components/SingleBannersList'
import Link from 'next/link'

export default async function Page() {
  const banners = await fetch(`${process.env.API_URL}/banners`, {
    cache: 'no-store',
  }).then((res) => res.json())

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between items-center gap-3">
        <Link href="/">
          <ArrowLeft className="text-primary" />
        </Link>
        <h1 className="text-3xl font-bold text-primary">Banners Individuais</h1>
      </div>
      <SingleBannersList banners={banners} />
    </div>
  )
}
