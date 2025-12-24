import { useEffect, useState } from 'react';

export default function Hero() {
    {/*Tracking mouse position for interactive effects*/}
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    
    

    const embedCode = `
    <iframe src="https://calendar.google.com/calendar/embed?height=500&wkst=1&ctz=America%2FNew_York&showPrint=0&src=MWE4NWIxNTg4MWIxY2Y0YjQwZDJjYTg1N2VlZDQ0Mzk2ZjA0ZWE3ZTM5YTNhNTk4YjYwYzVhYjJlYWMyY2EzMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f09300" 
    style="border-width:0" width="500" height="500" frameborder="0" scrolling="no" overflow-auto></iframe>
    `;

    return (
    <section className='relative min-h-screen pt-25 px-4 md:px-6 lg:px-8 overflow-hidden grid grid-flow-col grid-rows-2 md:grid-rows-1 gap-4'>

        <div className="relative max-w-3xl px-4 sm:px-6 lg:px-8 row-span-1 md:row-span-2">
            <h1 className="text-4xl font-bold text-white">Welcome to Innov8Youth</h1>
            <p className="text-lg text-white">Empowering the Next Generation of Innovators with Robotics.</p>
            <img src="/temp_Hero.jpg" alt="Mentor working with robotics student" className='mt-2 rounded-lg shadow-lg'/>
        </div>

        <div className="max-w-2xl mx-auto row-2 py-10 md:py-19"
        dangerouslySetInnerHTML={{ __html: embedCode }} />

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