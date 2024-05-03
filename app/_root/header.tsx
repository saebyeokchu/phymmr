"use client"

import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <header className="bg-white">
             <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div>
                    <a href="/">
                        <span className="sr-only">pohangyuk-meomureum</span>
                        <img className="h-8 w-auto" src="https://phymmr.s3.us-east-2.amazonaws.com/logo-no-background.png" alt="" />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={()=>setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
                        포항역 머무름 쉐어하우스
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        1번방(준비중)
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        2번방(준비중)
                    </a>
                    <a href="/inquiry" className="text-sm font-semibold leading-6 text-gray-900">
                        하우스투어 예약하기
                    </a>
                    <a href="/guide" className="text-sm font-semibold leading-6 text-gray-900">
                        포항역 머무름 사용설명서
                    </a>
                </Popover.Group>
            </nav>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">포항역 머무름 쉐어하우스</span>
                            <img
                                className="h-8 w-auto"
                                src="https://phymmr.s3.us-east-2.amazonaws.com/logo-no-background.png"
                                alt=""
                            />
                            </a>
                            <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                            >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        포항역 머무름 쉐어하우스
                                    </a>
                                    <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        1번방(준비중)
                                    </a>
                                    <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        2번방(준비중)
                                    </a>
                                    <a
                                    href="/inquiry"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        하우스투어 예약하기
                                    </a>
                                    <a
                                    href="/guide"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        포항역 머무름 사용설명서
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
            </Dialog>
        </header>
    )
}