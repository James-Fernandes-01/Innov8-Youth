const volunteers = [
    {
        id: 1,
        title: "Co-Founder",
        name: "Jia Modi",
        description: "Hello! I'm Jia, a high school sophomore with a passion for STEM and teaching. As a co-founder of Innov8Youth, I hope to share my passion for robotics and other STEM fields by mentoring younger students and helping them foster a love for engineering and problem solving. I aim to ignite the same excitement and confidence in STEM that has shaped my own journey!",
        image: "/Jia_Modi.jpg",
        tags: ["VEX States Champion","VEX Worlds Competitor"],
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
        title: "Co-Founder",
        name: "Arjun Modi",
        description: "Hello! I'm Arjun, a high school freshman who loves engineering and robotics. With hands-on experience in both VEX and FIRST Robotics, I'm excited to share my passion and help younger students discover the joy of building and programming robots.",
        image: "/Arjun_Modi.png",
        tags: ["VEX States Champion", "VEX Worlds Competitor and Award Recipient", "FIRST Robotics Competition Team 8592 Mechanical Subteam"],
    }

]

export default function Volunteers() {
    return(
        <section id="volunteers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-extrabold text-center">Our Volunteers</h2>
            <p className="mt-4 text-lg text-center">
                Meet our volunteers!
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {volunteers.map((volunteer) => (
                    <div key={volunteer.id} className="bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-400">
                        <img src={volunteer.image} alt={volunteer.name} className="w-32 h-32 rounded-full mx-auto object-cover"/>
                        <h3 className="mt-4 text-xl md:text-2xl font-semibold text-center">{volunteer.name}</h3>
                        <p className="mt-2 text-center text-sm md:text-lg italic">{volunteer.title}</p>
                        <p className="mt-4 text-sm md:text-base text-center">{volunteer.description}</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {volunteer.tags.map((tag, index) => (
                                <span key={index} className="text-center text-white text-sm md:text-base font-medium px-2 py-0 rounded-full">{tag}</span>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}