import { ComponentProps } from "react";

type IconButtonProps = {
  transparent?: boolean;
} & ComponentProps<"button">;

export function IconButton({ transparent = false, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={
        transparent
          ? "bg-black border border-white/10 rounded-md p-1.5"
          : "bg-white/10 border border-white/10 rounded-md p-1.5"
      }
    />
  );
}
