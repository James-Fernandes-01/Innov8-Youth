import { useEffect, useState } from 'react';

export default function Hero() {
    {/*Tracking mouse position for interactive effects*/}
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    
    const calendarSrc = "https://calendar.google.com/calendar/embed?wkst=1&ctz=America%2FNew_York&showPrint=0&src=MWE4NWIxNTg4MWIxY2Y0YjQwZDJjYTg1N2VlZDQ0Mzk2ZjA0ZWE3ZTM5YTNhNTk4YjYwYzVhYjJlYWMyY2EzMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f09300";

    return (
    <section className='grid grid-cols-1 md:grid-cols-2 relative min-h-screen pt-25 px-4 md:px-6 lg:px-8 overflow-hidden flex flex-col md:flex-row items-start gap-8'>
        {/* content column */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white">Welcome to Innov8Youth</h1>
            <p className="text-lg text-white">Empowering the Next Generation of Innovators with Robotics.</p>
            <img src="/temp_Hero.jpg" alt="Mentor working with robotics student" className='mt-2 rounded-lg shadow-lg'/>
        </div>

        {/* calendar column (narrow on md+) */}
        <div className="w-full mx-auto my-auto">
            <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 p-2">
                <div className="w-full h-64 md:h-100 xl:h-120">
                    <iframe
                        src={calendarSrc}
                        title="Innov8Youth Calendar"
                        className="w-full h-full rounded-md"
                        style={{ border: 0 }}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>

        

    </section>
    );
}


{/*
        <div className="relative order-2 w-full">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 sm:w-[385px]">
                <div className="bg-gradient-to-br from-sky-400/30 via-purple-400/30 to-pink-400/30 rounded-lg backdrop-blur-md overflow-hidden h-[280px] sm:w-[350px] border border-white/5">
                    
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">Learn to Code!</div>
                </div>
            </div>
        </div>
        */}


{/*useEffect(() => {
        function handleMouseMove(e) {
            setMousePosition({x: e.clientX, y: e.clientY})
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [])


    <div className="absolute inset-0 opacity-30"
        style={{background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 1), transparent 40%)`,
        }}></div>
    */}