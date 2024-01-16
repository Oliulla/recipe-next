import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Header from '@/components/shared/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe-Next',
  description: 'It is 100% trusted recipe application provide you right way to cook',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
