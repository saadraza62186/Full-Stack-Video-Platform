"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Upload, Home, LogOut, LogIn, UserPlus } from "lucide-react"
import { useNotification } from "./Notification"
import Image from "next/image"

const Header = () => {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { showNotification } = useNotification()

  const handleSignOut = async () => {
    try {
      await signOut()
      showNotification("Signed out successfully", "success")
    } catch (error) {
      showNotification("Failed to sign out", "error")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          <div className="navbar-start">
            <Link href="/" className="text-xl font-bold">
            <div className="flex items-center">
              {/* <Image width={100} height={100} alt={""} src="/logo.png" className="h-[60px] w-[100px]"/> */}
              Clipzy
            </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="navbar-end lg:hidden">
            <button className="btn btn-ghost btn-circle" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">
              <li>
                <Link href="/" className="flex items-center gap-2">
                  <Home size={18} />
                  Home
                </Link>
              </li>

              {session ? (
                <>
                  <li>
                    <Link href="/upload" className="flex items-center gap-2">
                      <Upload size={18} />
                      Upload
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="flex items-center gap-2">
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="flex items-center gap-2">
                      <LogIn size={18} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="flex items-center gap-2 btn btn-primary">
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <ul className="menu menu-vertical w-full gap-2">
              <li>
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <Home size={18} />
                  Home
                </Link>
              </li>

              {session ? (
                <>
                  <li>
                    <Link href="/upload" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                      <Upload size={18} />
                      Upload
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                      <LogIn size={18} />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="btn btn-primary w-full justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus size={18} />
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
