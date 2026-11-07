import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="oswald text-8xl font-bold text-[#ccff00]">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2>

      <p className="mt-3 max-w-md text-[#8b95a9]">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#ccff00] px-6 py-3 font-semibold text-black transition hover:bg-[#b8e600]"
      >
        Back to Home
      </Link>
    </div>
  );
}
