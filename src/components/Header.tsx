import Image from "next/image";
import Link from "next/link";

export const Header = () => (
  <header className="fixed z-100 top-0 h-20 w-full border-b border-[#d6d6d6] flex justify-center backdrop-blur-sm br-[rgba(255, 255, 255, 0.7)]">
    <div className="max-w-[1400px] px-30 mx-auto w-full flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image src="/logo_new.png" width={140} height={40} alt="Logo" />
        <span>AI Post Generator</span>
      </div>

      <div className="flex gap-4">
        <Link href="/login">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  </header>
);
