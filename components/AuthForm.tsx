'use client'
import Link from 'next/link'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { z } from "zod"
 import {Loader2} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Input } from "@/components/ui/input"
import { ITEMS } from '@/constants'
import Custominput from './Custominput'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, SignIn, SignUp } from '@/lib/actions/user.actions'


const AuthForm = ({type}:{type:string}) => {
  const router = useRouter()
    const [user, setuser] = useState(null);
    const [isLoading, setLoading]= useState(false);

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      })
     
      // 2. Define a submit handler.
     const onSubmit =  async(data: z.infer<typeof formSchema>) =>{

        setLoading(true);
      
    
      try {
        if(type==='sign-up'){
            const newUser = await SignUp(data);
            setuser(newUser);
        }
        if(type==='sign-in'){
         const response = await SignIn({
            email:data.email,
            password: data.password
          })
          if(response) router.push('/')
        }

      } catch (error) {
        console.log(error)
      }
      finally{
        setLoading(false);
      }
      }
  return (
   <section className="auth-form">
    <header className="flex col gap-5 md:gap-8">
    <Link href="/"
            className="
            cursor-pointer flex
            items-center">
                <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
                <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user
                    ?'Link Account'
                :type==='sign-in'
                ?'Sign In'
                :'Sign Up' }
                <p className='text-16 font-normal text-gray-600'>
                    {user? 'Link your account to get started':'Please enter your details'}
                </p>
                </h1>
            </div>
    </header>
    {
        user?(
            <div className="flex flex-col gap-4">
                {/*Plaid link account*/}
            </div>
        ):
        <>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       {type==='sign-up' &&(
        <>
        <div className='flex gap-4'>
        <Custominput 
        control={form.control} name="firstName" label="First Name" placeholder="Enter your First Name" />
        <Custominput 
        control={form.control} name="lastName" label="Last Name" placeholder="Enter your Last Name" />
        </div>

             <Custominput 
        control={form.control} name="address1" label="Address" placeholder="Enter your Address" />
        <Custominput 
        control={form.control} name="city" label="City" placeholder="Enter your City" />
        <div className='flex gap-4'>
         <Custominput 
        control={form.control} name="state" label="State" placeholder="Example: Bihar" />
             <Custominput 
        control={form.control} name="postalCode" label="Posatl Code" placeholder="Example: 901503" />
        </div>
        <div className='flex gap-4'>
     <Custominput 
        control={form.control} name="dateOfBirth" label="Date Of Birth" placeholder="YYYY-MM-DD" />
             <Custominput 
        control={form.control} name="ssn" label="SSN" placeholder="Example: 1234" />
        </div>
        </>
       )}
        <Custominput 
        control={form.control} name="email" label="email" placeholder="enter your Email" />
        <Custominput 
        control={form.control} name="password" label="password" placeholder="Enter password" />

<div className=' flex flex-col gap-4'>
<Button type="submit" className='form-btn' disabled={isLoading}>
          {isLoading?(
            <>
            <Loader2 size={20} className="animate-spin"/>
            &nbsp; Loading...

            </>
          ):type==='sign-in'?'Sign-in':'sign-up'}
         
        </Button>
            
            </div>
        
          <footer className='flex justify-center gap-1'>
            <p>
              {
                type==='sign-in'
                ?"Don't have an account?":
                "Already have an account?"
              }
            </p>
              <Link  href={type==='sign-in'?'/sign-up':'/sign-in'} className='form-link'>
              {type==='sign-in'?'sign Up':'sign In'}
              </Link>
          </footer>
      </form>
    </Form>
        </>
    }
   </section>
  )
}

export default AuthForm
