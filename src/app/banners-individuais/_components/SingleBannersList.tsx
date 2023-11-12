import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Info } from 'lucide-react'
import Link from 'next/link'

interface SingleBannersListProps {
  banners: {
    id: string
    description: string
  }[]
}

export default function SingleBannersList({ banners }: SingleBannersListProps) {
  return (
    <div className="w-full flex justify-center">
      <Table className="max-w-[800px] m-auto">
        <TableCaption>Lista de Banners Individuais atualmente.</TableCaption>
        <TableBody>
          {banners.map((banner, index) => (
            <TableRow key={index}>
              <TableCell>{banner.description}</TableCell>
              <TableCell className="flex gap-3 items-center justify-end">
                <Button className="rounded" asChild>
                  <Link href={`/banners-individuais/${banner.id}`}>Editar</Link>
                </Button>
                <Info className="text-primary" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
