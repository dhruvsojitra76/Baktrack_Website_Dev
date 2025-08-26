import Image from "next/image"
import Link from "next/link";

type HeaderProps = {
    scrolled: boolean;
}


const Header = ({ scrolled }: HeaderProps) => {
    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 top-4 flex items-center justify-between w-[90%] z-50 transition-all duration-300
                ${scrolled
                    ? "max-w-2xl py-2 rounded-lg shadow-lg"
                    : "max-w-6xl py-2 rounded-2xl shadow-md"} 
                    bg-white px-4`}
        >
            {/* Logo */}
            <div className="flex items-center">
                <Link href="/">
                <Image
                    src="/baktrack_logo_large.svg"
                    alt="Baktrack"
                    width={48}
                    height={48}
                    className={`transition-all duration-300 ${scrolled ? "h-12" : "h-12"
                        } w-auto`}
                />
                </Link>
            </div>

            {/* Links */}
            <div className="hidden md:flex space-x-8">
                {["Features", "Benefits", "Pricing", "Contact"].map((item) => (
                    <a
                        key={item}
                        href={item === "Contact" ? "/ContactUs" : `#${item.toLowerCase()}`}
                        className="text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                ))}
            </div>


            {/* CTA Button */}
            <button className="bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 hover:shadow-lg px-6 py-2 rounded-lg text-white font-semibold">
                Purchase
            </button>
        </nav>
    )
}

export default Header;