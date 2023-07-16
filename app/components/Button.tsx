import * as React from "react";
import { twMerge } from "tailwind-merge";

function Button({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      className={twMerge(
        "border rounded-md px-4 py-2 bg-black text-white border-black",
        className
      )}
      {...props}
    />
  );
}

export default Button;
