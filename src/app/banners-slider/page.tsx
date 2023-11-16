import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'
import SingleBannersList from './_components/SingleBannerList'
import { Button } from '@/components/ui/button'

export default async function Page() {
  const banners = await fetch(`${process.env.API_URL}/banner-slide`, {
    cache: 'no-store',
  }).then((res) => res.json())

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-between items-center gap-3 max-w-4xl">
        <Link href="/">
          <ArrowLeft className="text-primary" />
        </Link>
        <div className="w-full flex gap-4">
          <h1 className="text-3xl font-bold text-primary">Banners Slider</h1>
          <Button className="rounded-full text-sm" variant="outline" asChild>
            <Link href="/banners-slider/novo">Adicionar</Link>
          </Button>
        </div>
      </div>
      <SingleBannersList banners={banners} />
    </div>
  )
}
