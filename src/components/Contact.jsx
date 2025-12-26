export default function Contact() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="contact">
            {/* embedded google form */}
            <div>
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
            <p className="mt-2 text-lg text-center">Have questions or want to get involved? Reach out to us and sign up for the email list!</p>
            </div>
            <div className="mt-8 flex grid grid-cols-2">
                <div className="mt-10 bg-white/5 rounded-lg overflow-hidden shadow-lg border border-white/10 p-4">
                    <iframe src="" frameborder="0"></iframe>
                </div>
            </div>
        </section>
    );
}