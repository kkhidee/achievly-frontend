import { NavLink } from "react-router-dom";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavigationLinkProps = {
  to: string;
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const NavigationLink = ({
  to,
  title,
  icon: Icon,
}: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          "flex flex-col items-center hover:text-amber-500",
          isPending ? "pending" : "",
          isActive ? "text-amber-500" : "",
          isTransitioning ? "transitioning" : "",
        ].join(" ")
      }
    >
      <Icon />
      {title}
    </NavLink>
  );
};
