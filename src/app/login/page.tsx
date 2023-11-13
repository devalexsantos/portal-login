'use client'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/services/firebase'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

export default function Page() {
  const [user, loading, error] = useAuthState(auth)

  loading && <div>Carregando...</div>
  user && redirect('/')

  const formSchema = z.object({
    email: z.string().email({ message: 'Por favor informe um e-mail válido.' }),
    password: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signInWithEmailAndPassword(auth, values.email, values.password).catch(
      () =>
        alert(
          'Usuário não encontrado ou sistema indisponível. Entre em contato com o administrador.',
        ),
    )
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-[500px] p-4 m-auto">
      <Image
        src="/assets/logo-login-color.png"
        width={293}
        height={131}
        alt="Logo Login Informática"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded">
            Entrar
          </Button>
        </form>
      </Form>
      {error && <p>Ocorreu um erro, entre em contato com o administrador.</p>}
    </div>
  )
}
