import { ArrowLeft } from 'lucide-react'
import EditFormBanner from './_components/EdiFormBanner'
import Link from 'next/link'

interface bannerProps {
  id: string
  description: string
  url: string
  card: string
  link: string
}

export default async function Page({ params }: { params: { id: string } }) {
  const banner: bannerProps[] = await fetch(
    `${process.env.API_URL}/banners/${params.id}`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json())

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link href="/banners-individuais">
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
