import Image from "next/image";
import Logo from "@/public/images/tmdb.png";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex items-center justify-between pb-4">
            <Link href="/" className="flex items-center justify-center gap-2">
                <Image src={Logo} alt="TMDB Logo" width={40} height={40} />
                <p className="text-2xl font-bold text-primary">TMDB</p>
            </Link>
        </header>
    );
}
