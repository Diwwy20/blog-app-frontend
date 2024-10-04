import React, { useState } from 'react';
import { RiMenuLine, RiCloseLargeLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { images } from '../constants';
import { logout } from '../store/actions/user';

// const navItemsInfo = [
//     {name: "Home", type: "link", href: "/" },
//     {name: "Articles", type: "link", href: "/articles" },
//     {name: "Pages", type: "dropdown", items: [{title: "About Us", href: "/about"}, {title: "Contact Us", href: "/contact"}] },
//     {name: "Pricing", type: "link", href: "/pricing" },
//     {name: "Faq", type: "link", href: "/faq" }
// ];

const navItemsInfo = [
    {name: "Home", type: "link", href: "/" },
    {name: "Articles", type: "link", href: "/" },
    {name: "Pages", type: "dropdown", items: [{title: "About Us", href: "/"}, {title: "Contact Us", href: "/"}] },
    {name: "Pricing", type: "link", href: "/" }
];

const NavItem = ({ item }) => {

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdownHandler = () => {
        setDropdown((currentState) => {
            return !currentState;
        })
    };

    return(
        <li className='relative group'>
            {item.type === "link" ? (
                <>
                   <Link to={item.href} className='px-4 py-[6px] relative group'>
                        {item.name}
                        <span className='absolute h-[5px] left-1 bottom-0 w-0 bg-dark-light transition-all duration-500 group-hover:w-[90%]'></span>
                    </Link>
                </> 
            ) : (
            <div className='flex flex-col items-center'>
                <button className='flex gap-x-1 px-4 py-2 items-center' onClick={toggleDropdownHandler}>
                    <span>{item.name}</span>
                    <IoMdArrowDropdown />
                </button>
                
                <div className={`${dropdown ? "block" : "hidden"  
                } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full group-hover:block w-max`}>
                    <ul className='bg-dark-hard lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
                        {item.items.map((page, index) => (
                            
                                <Link 
                                key={index} 
                                to={page.href} 
                                className='hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft'
                                >
                                    {page.title}
                                </Link>
                            
                        ))}
                    </ul>
                </div>
            </div>
            )}
        </li> 
    )
   
}

const Header = () => {
    const navigate = useNavigate();    
    const dispatch = useDispatch();
    const [navIsVisible, setNavIsVisible] = useState(false);
    const userState = useSelector((state) => state.user);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const navVisibilityHandler = () => {
        setNavIsVisible((currentState) => {
            return !currentState
        })
    };

    const logoutHandler = () => {
        dispatch(logout());
    }

  return (
    <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
        <header className='container mx-auto px-5 flex justify-between py-4 items-center'>
            <Link to="/">
                <img src={images.Logo} alt="logo" className='w-[200px]' />
            </Link>
            <div className='lg:hidden z-50'>
                {navIsVisible ? (
                    <RiCloseLargeLine 
                    className='w-6 h-6' 
                    onClick={navVisibilityHandler} 
                    />
                ) : (
                    <RiMenuLine 
                    className='w-6 h-6' 
                    onClick={navVisibilityHandler} 
                    />
                )}
            </div>
            <div className={`${
                navIsVisible ? "right-0" : "-right-full"
                } transition-all duration-300 mt-[80px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}>
                <ul className='text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold'>
                   {navItemsInfo.map((item) => (
                        <NavItem key={item.name} item={item} />
                   ))}
                </ul>
                {userState.userInfo ? (
                    <div className='text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold'>
                        <div className='relative group'>
                            <div className='flex flex-col items-center'>
                                <button className='flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300' onClick={() => setProfileDropdown(!profileDropdown)}>
                                    <span>Account</span>
                                    <IoMdArrowDropdown />
                                </button>
                                
                                <div className={`${profileDropdown ? "block" : "hidden"  
                                } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full group-hover:block w-max`}>
                                    <ul className='bg-dark-hard lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
                                        {userState?.userInfo.admin && (
                                            <button
                                            onClick={() => navigate('/admin')} 
                                            type='button'
                                            className='hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft'
                                            >
                                                Admin Dashboard
                                            </button>
                                        )}
              
                                        <button
                                        onClick={() => navigate('/profile')} 
                                        type='button'
                                        className='hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft'
                                        >
                                            Profile Page
                                        </button>
                                        <button
                                        onClick={logoutHandler}
                                        type='button'
                                        className='hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft'
                                        >
                                            Logout
                                        </button>
                                    </ul>
                                </div>
                            </div> 
                        </div>                       
                    </div> 
                ) : (
                    <button 
                    onClick={() => navigate('/login')} 
                    className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'
                    >
                        Sign in
                    </button>
                )}
            </div>
        </header>
    </section>
  )
}

export default Header