'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface EditFormBannerProps {
  banner: {
    id: string
    url: string
    card: string
    link: string
  }
}

export default function EditFormBanner({ banner }: EditFormBannerProps) {
  const [submiting, setSubmiting] = useState(false)
  const { toast } = useToast()

  const formSchema = z.object({
    url: z.string().min(2, {
      message: 'Você precisa informar a URL do Banner.',
    }),
    card: z.string().min(2, {
      message: 'Você precisa informar a URL do Card.',
    }),
    link: z.string().min(2, {
      message:
        'Você deve informar o link com "https://" para qual o Banner deve apontar.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: banner.url,
      card: banner.card,
      link: banner.link,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmiting(true)
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/banners/${banner.id}`, {
        url: values.url,
        card: values.card,
        link: values.link,
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
    setSubmiting(false)
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Banner</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="card"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Card</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do Banner</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submiting && <span>Atualizando...</span>}
          <Button type="submit" className="rounded">
            Atualizar
          </Button>
        </form>
      </Form>
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
