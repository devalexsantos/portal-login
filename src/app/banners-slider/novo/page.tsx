'use client'
import { TailSpin } from 'react-loader-spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'

export default function Page() {
  const router = useRouter()

  const [submiting, setSubmiting] = useState(false)

  const [image, setImage] = useState<File | null>(null)
  const [card, setCard] = useState<File | null>(null)
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [position, setPosition] = useState(0)

  const { toast } = useToast()

  const urlImages: string[] = []
  async function onSubmit(e: React.FormEvent) {
    setSubmiting(true)

    e.preventDefault()

    const images = [image, card]

    const uploadPromises = images.map(async (element, index) => {
      const storageRef = ref(storage, `banners-slider/${element?.name}`)

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
        .post(`${process.env.NEXT_PUBLIC_API_URL}/banner-slide`, {
          url: urlImages[0],
          card: urlImages[1],
          link,
          active: true,
          position,
          description,
        })
        .then((res) => {
          if (res.status === 201) {
            toast({
              title: 'Banner adicionado com sucesso',
              description: 'Confira no site a modificação.',
            })
          } else {
            toast({
              title: 'Ocorreu um erro.',
              description: 'Entre em contato com o administrador.',
            })
          }
        })
      router.push('/banners-slider')
    }
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link href="/banners-slider">
          <ArrowLeft className="text-primary" />
        </Link>
        <h1 className="text-primary text-3xl font-bold">Criar novo Banner</h1>
      </div>
      <form onSubmit={onSubmit} className="mt-6 space-y-12">
        <label className="flex items-center gap-4">
          <span className="font-bold">Descrição:</span>
          <Input
            value={description}
            className="max-w-[400px]"
            name="description"
            type="text"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-4">
            <span className="font-bold">Selecione o Banner:</span>
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
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-4">
            <span className="font-bold">Selecione o Card:</span>
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
        </div>

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
        <label className="flex items-center gap-4">
          <span className="font-bold">Ordem:</span>
          <Input
            name="order"
            className="max-w-[100px]"
            type="number"
            required
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value))}
          />
        </label>

        <Button type="submit" className="rounded" disabled={submiting}>
          Criar
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
    </div>
  )
}
