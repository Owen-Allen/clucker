"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from 'next/navigation'

// import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"; // **updated**
import { useSession } from "next-auth/react"


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
    id: z.string().min(1).max(50).refine((val)=> !val.includes('!') && !val.includes('*') && !val.includes("'") && !val.includes('(') && !val.includes(')') && !val.includes(';') && !val.includes(':') && !val.includes('@') && !val.includes('&') && !val.includes('=') && !val.includes('+') && !val.includes('$') && !val.includes(',') && !val.includes('/') && !val.includes('?') && !val.includes('%') && !val.includes('#') && !val.includes('[') && !val.includes(']'), {message: "Username cannot contain the following characters !*'();:@&=+$,/?%#[]"} )
                                .refine(async (id) =>{
                                  const requestOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ 'id': id })
                                  }
                                  const res = await fetch(`${process.env.DB_HOST}/api/id_available/`, requestOptions)
                                  const data = await res.json()
                                  if(res.status == 200){
                                    return data.id_available
                                  }
                                  return true
                                }, {message: "An account with this username already exists"})   , 
    name: z.string().max(50)
  })


export default function SignupForm({email}: {email: string}){
  const router = useRouter()
  const { update } = useSession()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      id: "",
      name: "",
    }
  })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("IN SUBMIT")
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: values.id, name: values.name, email: email
         })
        }
        const response = await fetch(`${process.env.DB_HOST}/api/new_user/`, requestOptions)
        const data = await response.json()
        console.log(response)
        if(response.status === 201){
            // Using redirect causes error: Uncaught (in promise) Error: NEXT_REDIRECT
            console.log('calling update')
            update({id: values.id})
            router.replace(`/feed`)
        }
      }


  return (
        <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Create a username</FormLabel>
                <FormControl> 
                    <Input placeholder="dodo_bird64" {...field}/>
                </FormControl>
                <FormMessage/>
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
                <FormMessage className="grow-0" />
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
