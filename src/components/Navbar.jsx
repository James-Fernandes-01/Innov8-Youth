
export default function Navbar() {
    return(
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-sky-200/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="flex items-center space-x-6 lg:space-x-8">  
                        <a href="#features" className="font-medium hover:text-gray-300 text-sm lg:text-base">Features</a>
                     
                        <a href="#schedule" className="font-medium hover:text-gray-300 text-sm lg:text-base">Schedule</a>
                    
                        <a href="#testimonials" className="font-medium hover:text-gray-300 text-sm lg:text-base">Testimonials</a>
                    </div>

                </div>
            </div>
        </nav>
    );
}