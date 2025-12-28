import {Menu, X} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {

    {/*Tracking state of whether mobile menu is open or not*/}
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    
    return(
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-sky-200/20 backdrop-blur-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                    
                    <div className="flex items-center space-x-1 group cursor-pointer">
                        <div>
                            <img src="/Innov8_Logo_V1.png" alt="Innov8 Youth" className="w-8 h-8 sm:w-10 sm:h-10"/>
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold"> 
                            {/* Span classes here allow for easy changes in text fonts, color, etc.*/}
                            <span className="text-white">Innov</span>
                            <span className="text-white">8</span>
                            <span className="text-blue-400">Youth</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 text-lg items-center ml-6 md:ml-10">  
                        <a href="#about" className="font-medium hover:text-gray-300 text-sm lg:text-base">About</a>
                     
                        <a href="#contact" className="font-medium hover:text-gray-300 text-sm lg:text-base">Contact</a>

                        <a href="#volunteers" className='font-medium hover:text-gray-300 text-sm lg:text-base'>Volunteers</a>
                    </div>

                    {/* Mobile/Small Screen Menu Button */}
                    <button className='md:hidden p-2 text-white hover:text-white items-center' 
                    onClick={() => setMobileMenuIsOpen((prev) => !prev)}> {/* Toggle mobile menu state on click. Sets to opposite state */}
                        { mobileMenuIsOpen ? (<X className="w-5 h-5 sm:w-6 sm:h-6"/>) : (
                        <Menu className="w-5 h-5 sm:w-6 sm:h-6"/>
                        )
                        }
                    </button>

                </div>
            </div>

            {/* Mobile Menu Links */}
            {mobileMenuIsOpen && (
                <div className='md:hidden bg-sky-300/95 backdrop-blur-lg border-t border-white animate-in slide-in-from-top duration-300'> {/* Only show on mobile/small screens. Prevent two from popping up */}
                    <div className='px-4 py-4 sm:py-6 space-y-3 sm:space-y-4 text-center'>
                        <a href="#about" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>About</a>
                     
                        <a href="#testimonials" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Testimonials</a>
                    
                        <a href="#volunteers" className='font-medium hover:text-gray-300 text-sm lg:text-base'>Volunteers</a>
                    </div>
                </div>
            )}

        </nav>
    );
}