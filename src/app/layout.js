import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '../../components/navBar/NavBar'
import { SessionProvider } from "next-auth/react"
import ClientSessionProvider from '../../utils/SessionProvider'
import { Nunito } from "next/font/google"
import { AuthProvider } from '../../contexts/auth/AuthProvider'
import { UiProvider } from '../../contexts/ui/UiProvider'
import ToasterProvider from '../../contexts/toaster/ToasterProvider'
import LoginModal from '../../components/modals/LoginModal'
import RentModal from '../../components/modals/RentModal'
import RegisterModal from '../../components/modals/RegisterModal'
import { getCurrentUser } from '../../actions/getCurrentUser'
import SearchModal from '../../components/modals/SearchModal'


export const metadata = {
  title: "TATTUO · Tatuajes y Tatuadores seleccionados para ti",
  description: "TATTUO es una plataforma que te permite encontrar tatuadores y tatuajes de calidad, además de poder agendar citas con los mejores artistas.",
}

const font = Nunito({
  subsets: ['latin']
})



export default async function RootLayout({ children }) {

  console.log("FROM LAYOUT")

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientSessionProvider>
          <AuthProvider>
            <UiProvider>
              <ToasterProvider />
              <SearchModal />
              <LoginModal />
              <RentModal />
              <RegisterModal />
              <NavBar currentUser={currentUser} />
              <div className="pb-20 pt-28 w-full  text-slate-900">
                {children}
              </div>
            </UiProvider>
          </AuthProvider>
        </ClientSessionProvider>
      </body>
    </html>
  )
}
