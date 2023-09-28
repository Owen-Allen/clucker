"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"; // **updated**


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "./ui/textarea"


const formSchema = z.object({
  name: z.string().max(50),
  about: z.string().max(300),
})

interface Profile {
  id: string,
  name: string,
  about: string
}

export default function EditProfileForm({ id_token, profile }: { id_token: string, profile: Profile }) {
  const router = useRouter()
  console.log("in editProfileForm")
  console.log(profile)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      about: profile.about
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${id_token}` },
      body: JSON.stringify({
        name: values.name, about: values.about
      })
    }
    const response = await fetch(`${process.env.DB_HOST}/api/user/${profile.id}/`, requestOptions)
    const data = await response.json()
    console.log(response)
    if (response.status === 200) {
      console.log("WENT THROUGH")
    }
    window.location.replace(`/user/${profile.id}`)  
    // FIX THIS
    // router replace does not refresh the profile once its passed to editProfileForm
    // when using router.replace, if a user edits their profile, saves it, then presses edit again, the edit shows the PREVIOUS defaultValue, not the new one
    // should we render the page entirely client side? And store profile in state?
  }

  return (
    <Form  {...form}>
      <div className="flex items-center w-full pb-4">
        <h1 className="text-xl font-bold">Edit your profile</h1>
        <button onClick={() => { router.back() }} className="-mt-6 -mr-2 ml-auto" >
          <svg fill="#000000" height="16" width="16" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 460.775 460.775">
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
          </svg>
        </button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={profile.name} {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder={profile.about} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex pt-4">
          <Button className="mx-auto" type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>

  )
}
