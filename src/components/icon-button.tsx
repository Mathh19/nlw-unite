import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  transparent?: boolean;
} & ComponentProps<"button">;

export function IconButton({ transparent = false, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "rounded-md border border-white/10 p-1.5",
        transparent ? "bg-black/20" : "bg-white/10",
        props.disabled ? "opacity-50" : null,
      )}
    />
  );
}
