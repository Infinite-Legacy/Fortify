import Link from "next/link";
import Image from "next/image";
import logo from "../../public/images/fortify-logo.png";

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={logo} alt="logo" className="w-40 h-40" />
    </Link>
  );
}
