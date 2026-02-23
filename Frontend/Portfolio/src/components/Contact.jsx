import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
    return (
        <div className="bg-black text-white p-30">
            <div
                className="bg-gray-800 p-6 rounded-2xl transition-all duration-300 
                         hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
            >
                <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
                <p className="mb-4">If you would like to get in touch with me, please feel free to reach out through any of the following methods:</p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                        <Mail className="text-green-500" size={20} />
                        <a
                            href="mailto:abhishekgs8676@gmail.com"
                            className="text-blue-400 hover:underline"
                        >
                            abhishekgs8676@gmail.com
                        </a>
                    </li>

                    <li className="flex items-center gap-3">
                        <Linkedin className="text-green-500" size={20} />
                        <a
                            href="https://www.linkedin.com/in/abhishek-g-solanki"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            LinkedIn Profile
                        </a>
                    </li>

                    <li className="flex items-center gap-3">
                        <Github className="text-green-500" size={20} />
                        <a
                            href="https://github.com/ABHISHEKGSOLANKI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                        >
                            GitHub Profile
                        </a>
                    </li>
                </ul>
                <p className="mb-4">I look forward to hearing from you!</p>
            </div>
        </div>
    )
}