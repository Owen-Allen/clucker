"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

 
const formSchema = z.object({
    id: z.string().min(1).max(50).refine((val)=> !val.includes('!') && !val.includes('*') && !val.includes("'") && !val.includes('(') && !val.includes(')') && !val.includes(';') && !val.includes(':') && !val.includes('@') && !val.includes('&') && !val.includes('=') && !val.includes('+') && !val.includes('$') && !val.includes(',') && !val.includes('/') && !val.includes('?') && !val.includes('%') && !val.includes('#') && !val.includes('[') && !val.includes(']'), {message: "Username cannot contain the following characters !*'();:@&=+$,/?%#[]"} ),
    name: z.string().max(50),
  email: z.string().email().endsWith('@gmail.com', { message: "sadly, only gmail is supported at the moment" }),
})

export default function SignupForm(){
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: values.id, name: values.name, email: values.email
         })
        }
        const response = await fetch(`${process.env.DB_HOST}/api/new_user/`, requestOptions)
        console.log(response.status)
        const data = await response.json()
        console.log(data)
        if(response.status === 201){
            // now that the user is created we need to log them in using google auth
            await signIn("google", { callbackUrl: '/feed' })
        }
      }


  return (
        <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
                <FormItem className="">
                <FormLabel>Create a username</FormLabel>
                <FormControl> 
                    <Input placeholder="dodo_bird64" {...field}/>
                </FormControl>
                <FormMessage />
                <FormDescription />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Enter your name</FormLabel>
                <FormControl>
                    <Input placeholder="Tim Robinson" {...field}/>
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Enter your gmail</FormLabel>
                <FormControl>
                    <Input placeholder="timrobinson@gmail.com" {...field}/>
                </FormControl>
                <FormDescription />
                <FormMessage />
            </FormItem>
            )}
        />
        <div className="flex pt-4">
            <Button className="mx-auto" type="submit">Sign Up</Button>
        </div>
        </form>
        </Form>

  )
}
