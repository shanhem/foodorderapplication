import React from 'react'
import Logo from '/Users/shan/Documents/wekravefinal/src/img/logo.png'
import { MdShoppingBag, MdAdd, MdLogout } from 'react-icons/md'
import profilepic from '/Users/shan/Documents/wekravefinal/src/img/avatar.png'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { async } from '@firebase/util'
import { useStateValue } from '../context/StateProvider'
import { actionType } from "../context/Reducer"
import { useState } from "react";



const Header = () => {

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider();

    const [{ user,cartShow,cartItems}, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);


    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } }
                = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }
        else {
            setIsMenu(!isMenu);
        }
    };

    const logout = () => {
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    return (
        //configuring screen size depending on the size of screen md = medium size
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>

            {/* Deskot menu*/}

            <div className='hidden md:flex w-full h-full items-center justify-between'>
                <Link to={'/'} className='flex items-cneter gap-2'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={Logo} className="w-5 object-cover" alt="logo" />
                    <p className="text-green-600 text-xl font-bold">WeKrave</p>
                </Link>


                {/* Right Side of Menu*/}
                <div className='flex items-center gap-7'>
                    <motion.ul initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 20 }}
                        exit={{ opacity: 0, x: 20 }}

                        className='flex items-center gap-8'>
                            <Link to={"/"}>
                        <li className='text-base text-textColor hover:textheadingColor duration-100 transition all ease-in-out cursor-pointer'>Home</li>
                        </Link>
                        <li className='text-base text-textColor hover:textheadingColor duration-100 transition all ease-in-out cursor-pointer'>About Us</li>
                        <Link to={'service'}>
                        <li className='text-base text-textColor hover:textheadingColor duration-100 transition all ease-in-out cursor-pointer'>Service</li>
                        </Link>
                    </motion.ul>

                    {/*Shopping Basket*/}

                    <div className='relative flex items-center justify-center' onClick={showCart}>
                    <MdShoppingBag className='text-textColor text-2xl ml-7 cursor-pointer' />
                       {cartItems && cartItems.length > 0 && (
                         <div className=' absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                             <p className='text-xs text-white font-semibold '>{cartItems.length}</p>
                         </div>
                       )}
                    </div>



                    {/* framer motion for profile pic gives a movement when clicked on the profile*/}

                    <div className='relative'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : profilepic}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-l cursor-pointer rounded-full"
                            alt="profilepicture"
                            onClick={login}
                        />

                        {isMenu && (
                            <motion.div initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 2, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40  bg-neutral-100 shadow-xl rounded-lg top-12 right-1 
            flex px-4 py-2 flex-col absolute'>
                                {
                                    user && user.email == "shannenhemrom11@gmail.com" && (
                                        <Link to={'/createItem'}>
                                            <p className='px4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-all duration-100 ease-in-out text-textColor text-base '
                                                onClick={() => setIsMenu(false)}
                                            >New Item<MdAdd /></p>
                                        </Link>
                                    )
                                }
                                <p className='px4 py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-all duration-100 ease-in-out text-textColor text-base '
                                    onClick={logout}

                                >Log Out<MdLogout /></p>

                            </motion.div>
                        )}

                    </div>



                </div>

            </div>











            {/* Mobile menu*/}
            {/*-----------------------------------------------*/}
            <div className='flex w-full h-full items-center justify-between md:hidden'>

                <div className='relative flex items-center justify-center' onClick={showCart}>
                    <MdShoppingBag className='text-textColor text-2xl ml-7 cursor-pointer' />
                    {cartItems && cartItems.length > 0 && (
                         <div className=' absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                             <p className='text-xs text-white font-semibold '>{cartItems.length}</p>
                         </div>
                       )}
                </div>



                <Link to={'/'} className='flex items-cneter gap-2 '>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={Logo} className="w-5 object-cover" alt="logo" />
                    <p className="text-green-600 text-xl font-bold">WeKrave</p>
                </Link>



                <div className='relative'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : profilepic}
                        className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                        alt="profilepicture"
                        onClick={login}
                    />

                    {isMenu && (
                        <motion.div initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 2, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className='w-40 bg-neutral-50 shadow-xl rounded-lg top-12 right-1 
            flex px-4 py-2 flex-col absolute'>
                            {
                                user && user.email == "shannenhemrom11@gmail.com" && (
                                    <Link to={'/createItem'}>
                                        <p className='rounded-md px4 m-2  py-2 flex items-center gap-3 cursor-pointer hover:bg-neutral-50 transition-all duration-100 ease-in-out text-textColor text-base '
                                            onClick={() => setIsMenu(false)}
                                        >

                                            New Item<MdAdd />
                                        </p>
                                    </Link>
                                )
                            }

                            <ul

                                className='flex flex-col'>
                                    <Link to={'/'}>
                                <li className='rounded-md text-base text-textColor hover:textheadingColor cursor-pointer  hover:bg-neutral-50 transition-all duration-100 ease-in-out px-4 py-2'
                                    onClick={() => setIsMenu(false)}
                                >Home</li>
                                </Link>
                                
                                <li className='rounded-md text-base text-textColor hover:textheadingColor cursor-pointer  hover:bg-neutral-50 transition-all duration-100 ease-in-out px-4 py-2'
                                    onClick={() => setIsMenu(false)}
                                >About Us</li>
                                <Link to={'service'}>
                                <li className='rounded-md text-base text-textColor hover:textheadingColor cursor-pointer  hover:bg-neutral-50 transition-all duration-100 ease-in-out px-4 py-2'
                                    onClick={() => setIsMenu(false)}
                                >Service</li>
                                </Link>

                            </ul>

                            <p className='m-2 p-2 rounded-md shadow-lg px4 py-2 flex items-center gap-3 cursor-pointer
                 bg-slate-200 justify-center hover:bg-slate-100 transition-all duration-100 ease-in-out
                  text-textColor text-base '

                                onClick={logout}

                            >
                                Log Out
                                <MdLogout /></p>

                        </motion.div>
                    )}

                </div>
            </div>


        </header>
    )
}

export default Header