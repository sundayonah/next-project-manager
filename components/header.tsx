'use client';

import { useTheme } from 'next-themes';
import { navMenu } from '@/components/navMenu';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Moon, Sun, X, ArrowBigDown } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
   const { theme, setTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setMounted(true);
   }, []);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen((prev) => !prev);
   };

   if (!mounted) return null;

   return (
      <header>
         <div className="flex justify-between items-center pt-6 px-8 mb-20">
            <Link href="/">
               <Image
                  src="/assets/my-avatar.webp"
                  alt="logo"
                  width={40}
                  height={30}
               />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 rounded-full p-2 px-6 dark:bg-[#252529] bg-white shadow-xl">
               {navMenu.map((n) => (
                  <Link
                     key={n.id}
                     href={n.link}
                     className={`text-black dark:text-[#d6d6d9] hover:text-[#046af8] dark:hover:text-[#046af8] ${
                        pathname === n.link
                           ? 'text-[#046af8] dark:text-[#046af8]'
                           : ''
                     }`}
                  >
                     {n.name}
                  </Link>
               ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex space-x-4">
               <button
                  onClick={toggleMobileMenu}
                  className="block md:hidden text-black dark:text-[#d6d6d9] p-2"
               >
                  <div className="flex items-center rounded-2xl py-2 px-4 dark:bg-[#252529] bg-white space-x-2 shadow-lg">
                     <p className="font-bold">Menu</p>
                     <ArrowBigDown className="w-5 h-5" />
                  </div>
               </button>

               {/* Theme Toggle Button */}
               <div className="flex space-x-4 items-center">
                  <button
                     onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                     }
                     className="text-black dark:text-[#d6d6d9] dark:bg-[#252529] bg-white p-2 rounded-md shadow-lg"
                  >
                     {theme === 'light' ? <Moon /> : <Sun />}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu Modal */}
         {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50 md:hidden flex justify-center items-start backdrop-blur-sm">
               <div className="relative  w-full mx-8 bg-white dark:bg-[#18181b]  rounded-2xl shadow-lg p-6 mt-12">
                  {/* Close Button */}
                  <button
                     onClick={toggleMobileMenu}
                     className="absolute top-4 right-4 text-black dark:text-[#d6d6d9]"
                  >
                     <X className="w-6 h-6" />
                  </button>
                  {/* Navigation Links */}
                  <ul className="space-y-6">
                     {navMenu.map((n, index) => (
                        <li key={n.id}>
                           <Link
                              href={n.link}
                              className={`block text-lg pb-2 text-black dark:text-[#d6d6d9] hover:text-[#046af8] dark:hover:text-[#046af8] ${
                                 pathname === n.link
                                    ? 'text-[#046af8] dark:text-[#046af8]'
                                    : ''
                              }`}
                              onClick={toggleMobileMenu} // Close modal when nav link is clicked
                           >
                              {n.name}
                           </Link>
                           {index < navMenu.length - 1 && (
                              <hr className="border-1 border-[#eeeef0] dark:border-[#3a3a3f]" />
                           )}{' '}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         )}
      </header>
   );
};

export default Header;
