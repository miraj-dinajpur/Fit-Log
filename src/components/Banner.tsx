
import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="container mx-auto my-10">
      <section className="relative overflow-hidden rounded-2xl border border-[#252836] bg-[#1a1d27] px-6 py-10 sm:px-8 md:px-12 md:py-14">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#ccff00]">
              Workout Library
            </p>

            <h1 className="oswald mb-4 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Train With Intent.
              <br />
              <span className="text-[#ccff00]">Log Every Set.</span>
            </h1>

            <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-[#8b95a9] md:mx-0 md:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add
              up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition duration-300 hover:brightness-90"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Browse Workouts
            </a>
          </div>

          {/* Hero image */}
          <div className="relative h-56 w-56 shrink-0 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <Image
              src="/assets/banner.png"
              alt="Workout illustration"
              fill
              sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Banner;

