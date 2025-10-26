import Image from "next/image";
import Logo from "@/public/images/tmdb.png";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8 py-4 border-b border-border shadow-sm">
            <Link href="/" className="flex items-center justify-center gap-2">
                <Image src={Logo} alt="TMDB Logo" width={40} height={40} />
                <p className="text-2xl font-bold text-primary">TMDB</p>
            </Link>
        </header>
    );
}
