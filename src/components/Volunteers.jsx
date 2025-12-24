const volunteers = [
    {
        id: 1,
        title: "Co-Founder",
        name: "Jia Modi",
        description: "Hey there! I'm Jia, a high school Sophomore with a passion for robotics and mentoring." +
        " As the co-founder of Innov8Youth, I love inspiring young minds to explore the exciting world of STEM through hands-on learning and teamwork.",
        image: "/Jia_Modi.jpg",
        tags: ["VEX National Competitor"],
    },

    {
        id: 2,
        title: "Co-Founder",
        name: "James Fernandes",
        description: "Hello! I'm James, a high school Junior that loves everything robotics." +
        " My goal is to share my experiences in STEM with others and help them grow their skills and confidence in this amazing field.",
        image: "/James_Fernandes.PNG",
        tags: ["FIRST Robotics Competition Team 8592 Mechanical Subteam"],
    },

    {
        id: 3,
        title: "Volunteer",
        name: "Arjun Modi",
        description: "Hi! I'm Arjun, a high school Freshman that loves engineering." + 
        " With experience in both VEX and FIRST Robotics, I'm excited to help younger students discover the joy of building and programming robots.",
        image: "/Arjun_Modi.png",
        tags: ["VEX National Competitor", "FIRST Robotics Competition Team 8592 Mechanical Subteam"],
    }

]

export const Volunteers = () => {
    return(
        <section id="volunteers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-extrabold text-center">Our Volunteers</h2>
            <p className="mt-4 text-lg text-center">
                We are a group of passionate individuals dedicated to inspiring the next generation of engineers.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {volunteers.map((volunteer) => (
                    <div key={volunteer.id} className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-400">
                        <img src={volunteer.image} alt={volunteer.name} className="w-32 h-32 rounded-full mx-auto object-cover"/>
                        <h3 className="mt-4 text-xl font-semibold text-center">{volunteer.name}</h3>
                        <p className="mt-2 text-center text-sm italic">{volunteer.title}</p>
                        <p className="mt-4 text-sm text-center">{volunteer.description}</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {volunteer.tags.map((tag, index) => (
                                <span key={index} className="text-center bg-blue-400 text-white text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}