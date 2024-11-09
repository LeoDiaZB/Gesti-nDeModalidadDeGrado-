import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import { Outlet, Link, useLocation } from 'react-router-dom'

import rootData from '../utils/constants/root'

function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userInfo')
    navigate('/login')
  }

  function getRootData() {
    const storedUserInfo = localStorage.getItem('userInfo')
    var userRol = ""
    if (storedUserInfo) {
      userRol = JSON.parse(storedUserInfo)?.rol
    }
    const newRootData = rootData.filter(value => {
      if (value.rol == null) {
        return true
      } else {
        return value.rol === userRol
      }
    })
    return newRootData
  }

  return (
    <>
      <header className="bg-white">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <img
              src="https://www.usco.edu.co/imagen-institucional/favicon.ico"
              alt="USCO"
              className="h-12 w-auto"
            />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Abrir menú</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {
              getRootData().map((element, index) =>
                <Link
                  key={index}
                  to={element.to}
                  className={`text-m font-semibold leading-6 ${location.pathname === element.to ? 'text-primary' : 'text-gray-900'}`}
                >
                  {element.label}
                </Link>
              )
            }
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => logOut()}
              className="text-m font-semibold leading-6 text-gray-900"
            >
              {'Cerrar sesión '}
            </button>{' '}
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <img
                src="https://www.usco.edu.co/imagen-institucional/favicon.ico"
                alt="USCO"
                className="h-8 w-auto"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {
                    rootData.map((element, index) =>
                      <Link
                        key={index}
                        to={element.to}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${location.pathname === element.to ? 'text-primary' : 'text-gray-900'} hover:bg-gray-50`}
                      >
                        {element.label}
                      </Link>
                    )
                  }
                </div>
                <div className="py-6">
                  <button
                    onClick={() => logOut()}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {'Cerrar sesión '}
                  </button>{' '}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <Outlet />
    </>
  )
}

export default Root
