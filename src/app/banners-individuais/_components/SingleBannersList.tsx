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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface SingleBannersListProps {
  banners: {
    id: string
    description: string
    url: string
  }[]
}

export default function SingleBannersList({ banners }: SingleBannersListProps) {
  return (
    <div className="container flex justify-center">
      <Table className="m-auto mt-4">
        <TableCaption>Lista de Banners Individuais atualmente.</TableCaption>
        <TableBody>
          {banners.map((banner, index) => (
            <TableRow key={index}>
              <TableCell>
                <Link
                  href={`/banners-individuais/${banner.id}`}
                  className="font-bold text-primary"
                >
                  {banner.description}
                </Link>
              </TableCell>
              <TableCell className="flex gap-3 items-center justify-end">
                <Button className="rounded" asChild>
                  <Link href={`/banners-individuais/${banner.id}`}>Editar</Link>
                </Button>
                <Popover>
                  <PopoverTrigger>
                    <Info className="text-primary" />
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px]">
                    <img
                      src={banner.url}
                      className="w-full"
                      alt="Imagem do Banner"
                    />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
