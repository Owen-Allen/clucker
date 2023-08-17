"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
 
const formSchema = z.object({
  content: z.string().min(1).max(300),
})

export default function CluckForm({ user }: any){
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: user.id, content: values.content })
    }
    console.log(values)
    const response = await fetch(`http://127.0.0.1:9000/api/cluck_detail/`, requestOptions)
    const data = await response.json()
    if(response.status === 201){
      router.push('/feed')
    }
  }

  return (
    <Form {...form}>
      <div className="flex">
        <button onClick={() => {router.back()}}className="-mt-2 ml-auto mb-2" >X</button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="What you wanna cluck?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
           <Button className="mx-auto"type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
