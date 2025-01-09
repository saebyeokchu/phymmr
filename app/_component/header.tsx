"use client"

import { useEffect, useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios';

const Menus = [
    { name : '포항역 머무름 쉐어하우스', link : '/', classes:''},
    { name : '공용공간 둘러보기', link : '/sharedspace', classes:''},
    { name : '방 둘러보기', link : '/rooms', classes:''},
    { name : '입실 문의하기', link : '/apply', classes:''},
    { name : '입실/퇴실절차 알아보기(준비중)', link : '/rent', classes:'pointer-events-none bg-slate-100'},
    { name : '고객센터', link : '/qna', classes:''}
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        console.log(
            localStorage.getItem("userId"),
            localStorage.getItem("userName"),
            localStorage.getItem("userToken") 
        );

        const token = localStorage.getItem("userToken") ;
        if(token){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    })

    const onLoginClick = (event : any) => {
        event.preventDefault();
        location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=cbeb67fe3c43dda09676e62a73a1408f&redirect_uri=http://localhost:3000/&response_type=code';
    }

    const getToken = async (token : string) => {
        console.log("Saebyeok",token);
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: 'cbeb67fe3c43dda09676e62a73a1408f',
            redirect_uri: 'http://localhost:3000/',
            code: token,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );
        await getUserData(res.data.access_token);
        return res;
      };

    const getUserData = async (token : string) => {
        const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        //kakao id, room number, 입실날짜
        localStorage.setItem("userId",user.data.id)
        localStorage.setItem("userName",user.data.properties.nickname);
        localStorage.setItem("userToken",token);
        setLoggedIn(true);
        //location.reload();
        return user.data;
    };

    const onLogOutClick = async () => {
        const token = localStorage.getItem('userToken');

        if(token){
            try {
                const datas = await axios.post(
                    'https://kapi.kakao.com/v1/user/logout',
                    {},
                    {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    }
                );
                setLoggedIn(false);
                localStorage.removeItem("userId")
                localStorage.removeItem("userName");
                localStorage.removeItem("userToken");
            } catch (error) {
                console.error('카카오 로그아웃 실패', error);
            }
        }
    }

    return (
        <header className="bg-white">
             <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div>
                    <a href="/">
                        <span className="sr-only">머무름 쉐어하우스 포항역점</span>
                        <img className="h-8 w-auto" src="/logo-no-background.png" alt="" />
                    </a>
                </div>
                <div className="flex ">
                    <button
                        type="button"
                        onClick={()=>setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className='h-6 w-6' aria-hidden="true" />
                    </button>
                </div>
                
            </nav>

            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
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
                                    { Menus.map((menu : any, index : number) => 
                                        <a
                                        key={`menu-item-${index}`}
                                        href={menu.link}
                                        className={`-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50 ${menu.classes}`}
                                        >
                                            {menu.name}
                                        </a>
                                    ) }
                                    
                                    { !loggedIn && <a
                                        href="/"
                                        onClick={onLoginClick}
                                        className="pointer-events-none bg-slate-100 -mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            로그인(준비중)
                                        </a> }
                                    {loggedIn &&  <a
                                        href="/mypage"
                                        className="pointer-events-none bg-slate-100 -mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            마이페이지(준비중)
                                        </a>}
                                    {loggedIn &&  <a
                                        onClick={onLogOutClick}
                                        className=" pointer-events-none bg-slate-100 -mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            로그아웃(준비중)
                                        </a>}
                                    </div>
                            </div>
                        </div>
                    </Dialog.Panel>
            </Dialog>
        </header>
    )
}