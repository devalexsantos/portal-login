'use client'
import { Button } from '@/components/ui/button'
import { TailSpin } from 'react-loader-spinner'

import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/navigation'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/services/firebase'

interface EditFormBannerProps {
  banner: {
    id: string
    url: string
    card: string
    link: string
  }
}

export default function EditFormBanner({ banner }: EditFormBannerProps) {
  const router = useRouter()

  const [submiting, setSubmiting] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [card, setCard] = useState<File | null>(null)
  const [link, setLink] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    setLink(banner.link)
  }, [banner])

  const urlImages: string[] = []

  async function onSubmit(e: React.FormEvent) {
    setSubmiting(true)

    e.preventDefault()

    const images = [image, card]

    const uploadPromises = images.map(async (element, index) => {
      const storageRef = ref(storage, `banners-fixos/${element?.name}`)

      await uploadBytes(storageRef, element as Blob).then(() => {
        return getDownloadURL(storageRef).then(
          (url) => (urlImages[index] = url),
        )
      })
    })

    try {
      await Promise.all(uploadPromises)
      uploadImagesToPortal()
    } catch (error) {
      console.error('Erro ao carregar imagens:', error)
    } finally {
      toast({
        title: 'Banner Atualizado com sucesso.',
        description: 'Por favor confira no site.',
      })
      setSubmiting(false)
    }

    async function uploadImagesToPortal() {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/banners/${banner.id}`, {
          url: urlImages[0],
          card: urlImages[1],
          link,
        })
        .then((res) => {
          if (res.status === 204) {
            toast({
              title: 'Alteração Realizada',
              description: 'Confira no site a modificação.',
            })
          } else {
            toast({
              title: 'Ocorreu um erro.',
              description: 'Entre em contato com o administrador.',
            })
          }
        })
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <form onSubmit={onSubmit} className="space-y-12">
        <label className="flex items-center gap-4">
          <span className="font-bold">Banner:</span>
          <Input
            className="max-w-[400px]"
            name="banner"
            type="file"
            required
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }}
          />
        </label>

        <label className="flex items-center gap-4">
          <span className="font-bold">Card:</span>
          <Input
            className="max-w-[400px]"
            name="card"
            type="file"
            required
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setCard(e.target.files[0])
              }
            }}
          />
        </label>

        <label className="flex items-center gap-4">
          <span className="font-bold">Link:</span>
          <Input
            name="link"
            className="max-w-[400px]"
            type="text"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
        <Button type="submit" className="rounded">
          Atualizar
        </Button>
        {submiting && (
          <TailSpin
            height="50"
            width="50"
            color="#086f86"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </form>
      <div className="max-w-[1140px]">
        <span className="text-bold">Banner atual:</span>
        <img
          src={banner.url}
          className="rounded w-full"
          alt="Imagem do Banner"
        />
      </div>
      <Toaster />
    </div>
  )
}
