import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'
import EditFormBanner from './_components/EditFormBanner'

interface bannerProps {
  id: string
  description: string
  url: string
  card: string
  link: string
  position: number
  active: boolean
}

export default async function Page({ params }: { params: { id: string } }) {
  const banner: bannerProps[] = await fetch(
    `${process.env.API_URL}/banner-slide/${params.id}`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link href="/banners-slider">
          <ArrowLeft className="text-primary" />
        </Link>
        <h1 className="text-primary text-3xl font-bold">
          {banner[0].description}
        </h1>
      </div>
      <EditFormBanner banner={banner[0]} />
    </div>
  )
}
