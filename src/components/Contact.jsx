import { Mail, } from "lucide-react";

export default function Contact() {

    const formSrc = "https://docs.google.com/forms/d/e/1FAIpQLSfIdKBeMbX3NzPScSLG-uwAUD1S0WtWBXsZsXPOklPwWw9RRw/viewform?embedded=true";

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="contact">
            {/* embedded google form */}
            <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
            <p className="mt-2 text-lg text-center">Have questions or want to get involved? Reach out to us and sign up for the email list!</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 p-2">
                    <div className="w-full h-128 md:h-[520px]"> {/* explicit height so h-full works */}
                        <iframe
                            src={formSrc}
                            title="Innov8Youth Contact Form"
                            className="w-full h-full rounded-md"
                            style={{ border: 0 }}
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="text-center w-full text-lg bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 p-4">
                        <p className="text-2xl font-semibold">Get In Touch</p>
                        <div className="mt-4 text-lg">
                            <Mail className="h-6 w-6 inline-block" />
                            <p className="mb-2">For general inquiries: <a href="mailto:jminnovations3@gmail.com">jminnovations3@gmail.com</a></p>
                        </div>
                    </div>

                    <div className="w-full overflow-hidden rounded-lg">
                        <img
                            src="/contactSectionImage.jpg"
                            alt="Robotics students working"
                            className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}