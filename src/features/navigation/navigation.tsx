import { FOOTER_LINKS } from "@/app/constants/core";
import { NavigationLink } from "@/features/navigation/ui/link";

export const Navigation = () => {
  return (
    <footer className="sticky bottom-0 flex w-full justify-around bg-background pb-8 pt-6 text-sm font-normal text-zinc-300">
      {FOOTER_LINKS.map((link) => (
        <NavigationLink
          key={link.id}
          to={link.url}
          title={link.title}
          icon={link.icon}
        />
      ))}
    </footer>
  );
};
