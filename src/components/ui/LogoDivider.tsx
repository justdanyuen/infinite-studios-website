import Image from "next/image";

export default function LogoDivider() {
  return (
    <div className="relative z-10 h-0" aria-hidden>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/logo-dark.png"
          alt=""
          width={157}
          height={96}
          className="h-16 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] md:h-20"
        />
      </div>
    </div>
  );
}