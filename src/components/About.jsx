export default function About() {
    return(
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="about">
            <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
            <div className="text-lg grid grid-cols-2 gap-8 px-5">
                <div className="text-center justify-center flex flex-col">
                    <div className="text-2xl font-semibold mb-6">
                        Free, Accessible, Impactful
                    </div>
                    <div>
                        We are a team of passionate individuals committed to making a difference in the community.
                        Based out of the Jim Scott Teen Center in Oakton, Virginia, we bring expertise to youth with
                        a wide range of resources at no expense.
                    </div>
                    <div>
                        <button className="mt-6 bg-white text-gray-800 font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <a href="#contact">Get In Touch!</a>
                        </button>
                    </div>

                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-400">
                        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                        <p>To ignite curiosity and confidence in youth through accessible, hands-on robotics education.</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-400">
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p>To create a world where every child has the opportunity to become a creator and innovator through technology.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}