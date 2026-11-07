import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="container mx-auto  border-t border-[#252836] bg-[#0c0d10]">
      <div className="mx-auto  flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-wide text-white font-['Oswald']"
        >
          <Image src="/assets/logo.png" alt="FitLog" width={22} height={22} />
          FitLog
        </Link>
        <p className="text-center text-sm text-[#8b95a9]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
