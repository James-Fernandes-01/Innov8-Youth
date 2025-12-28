import { ArrowUp } from "lucide-react";

export default function Footer(){
    return(
        <footer className="bg-gray-800 text-white py-4 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <p className="text-sm">© 2025 Innov8Youth. All rights reserved.</p>
            <a href="#top" className="flex items-center">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Back to top</span>
            </a>
        </footer>
    )
}