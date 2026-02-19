import Image from "next/image";

export const Footer = () => (
  <footer className="w-full border-t border-[#d6d6d6] flex justify-center mt-10">
    <div className="h-20 max-w-[1400px] px-30 mx-auto w-full flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image src="/logo_new.png" width={140} height={40} alt="Logo" />
        <span>AI Post Generator</span>
      </div>

      <span>© 2025 PostFlow Systems, Inc.</span>
    </div>
  </footer>
);
