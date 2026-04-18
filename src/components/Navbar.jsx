import {Menu, X} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export default function Navbar() {

    {/*Tracking state of whether mobile menu is open or not*/}
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            
            if (currentUser) {
                // Check if user is admin by listening to their user document
                const userDocRef = doc(db, "users", currentUser.uid);
                const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists() && docSnap.data().role === "admin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                });
                return unsubscribeUser;
            } else {
                setIsAdmin(false);
            }
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
            setMobileMenuIsOpen(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    return(
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-sky-200/20 backdrop-blur-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
                    
                    <Link to="/" className="flex items-center space-x-1 group cursor-pointer">
                        <div>
                            <img src="/Innov8_Logo_V1.png" alt="Innov8 Youth" className="w-8 h-8 sm:w-10 sm:h-10"/>
                        </div>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold"> 
                            {/* Span classes here allow for easy changes in text fonts, color, etc.*/}
                            <span className="text-white">Innov</span>
                            <span className="text-white">8</span>
                            <span className="text-blue-400">Youth</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-6 text-lg items-center ml-6 md:ml-10">  
                        <a href="#about" className="font-medium hover:text-gray-300 text-sm lg:text-base">About</a>
                     
                        <a href="#contact" className="font-medium hover:text-gray-300 text-sm lg:text-base">Contact</a>

                        <a href="#volunteers" className='font-medium hover:text-gray-300 text-sm lg:text-base'>Volunteers</a>

                        {user && <Link to="/log-hours" className="font-medium hover:text-gray-300 text-sm lg:text-base">Log Hours</Link>}

                        {user && <Link to="/track-hours" className="font-medium hover:text-gray-300 text-sm lg:text-base">Track Hours</Link>}

                        {user && isAdmin && <Link to="/admin" className="font-medium hover:text-gray-300 text-sm lg:text-base">Admin</Link>}

                        {!user && <Link to="/login" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-medium transition duration-200 text-sm lg:text-base">Login</Link>}

                        {user && <button onClick={handleLogout} className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-200 text-sm lg:text-base">Logout</button>}
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
                     
                        <a href="#contact" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Contact</a>
                    
                        <a href="#volunteers" className='font-medium hover:text-gray-300 text-sm lg:text-base' onClick={() => setMobileMenuIsOpen(false)}>Volunteers</a>

                        {user && <Link to="/log-hours" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Log Hours</Link>}

                        {user && <Link to="/track-hours" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Track Hours</Link>}

                        {user && isAdmin && <Link to="/admin" className="block font-medium hover:text-gray-300 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Admin</Link>}

                        {!user && <Link to="/login" className="block mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-medium transition duration-200 text-sm lg:text-base" onClick={() => setMobileMenuIsOpen(false)}>Login</Link>}

                        {user && <button onClick={handleLogout} className="block w-full mt-4 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-200 text-sm lg:text-base">Logout</button>}
                    </div>
                </div>
            )}

        </nav>
    );
}