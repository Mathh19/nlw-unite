import { ComponentProps } from "react";

type NavLinkProps = {
  children: string;
} & ComponentProps<"a">;

export function NavLink(props: NavLinkProps) {
  return (
    <a {...props} className="text-sm font-medium">
      {props.children}
    </a>
  );
}
