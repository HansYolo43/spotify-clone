import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModelProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import  getSongId from '@/actions/getPlaylistByUserId'


const font = Figtree({subsets: ['latin'] })

export const metadata = {
  title: "spoootify-clone",
  description: 'A Spotify clone built with Next.js and Tailwind CSS',
}

export const reinvalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  // const userSongs = await getSongId()  //3:30:00
  return(
  <html lang="en" >
      <body className={font.className} >
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
          <ModalProvider/>
            <Sidebar>
              
                {children}A

            </Sidebar>
          </UserProvider>
        </SupabaseProvider>
    </body>
  </html>
  )
}

