import { cn } from "@/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export default function Tooltip({
  content,
  children,
  side = "top",
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={cn(
              "tw-z-50 tw-overflow-hidden tw-rounded-md tw-bg-gray-900 tw-px-3 tw-py-1.5 tw-text-xs tw-text-white tw-animate-in tw-fade-in-0",
              "tw-duration-200"
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="tw-fill-gray-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
