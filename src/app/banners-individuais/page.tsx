import SingleBannersList from './_components/SingleBannersList'

export default async function Page() {
  const banners = await fetch('http://127.0.0.1:3333/banners').then((res) =>
    res.json(),
  )

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Banners Individuais
      </h1>
      <SingleBannersList banners={banners} />
    </div>
  )
}
