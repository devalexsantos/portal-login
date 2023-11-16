'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete() {
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/banner-slide/delete/${id}`)
    router.refresh()
    toast({
      title: 'Banner Excluído com sucesso.',
      description: 'Por favor confira no site.',
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded bg-red-600">Deletar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a deletar este banner, essa ação é irreversível.
            Tem certeza disso?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="rounded bg-red-600"
              onClick={() => handleDelete()}
            >
              Deletar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
