import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SliderBanners() {
  return (
    <Card className="max-w-[300px]">
      <CardHeader>
        <CardTitle className="text-primary">Banner Slider</CardTitle>
        <CardDescription>
          Edite os banners individuais do e-Commerce
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="rounded" asChild>
          <Link href="/banners-slider">Editar</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
