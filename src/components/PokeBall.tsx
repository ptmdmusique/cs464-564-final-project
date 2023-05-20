import Image from "next/image";

export const PokeBall = ({ className }: { className?: string }) => {
  return (
    <Image
      alt="Pokeball logo"
      src="/images/pokeball.png"
      width="32"
      height="32"
      className={className}
    />
  );
};
