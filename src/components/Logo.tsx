interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-14 w-14' }: LogoProps) {
  return (
    <img
      src="/assets/images/LOGO.png"
      alt="CML Security B.V."
      className={`${className} object-contain`}
      draggable={false}
    />
  );
}
