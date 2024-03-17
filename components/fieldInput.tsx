import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoHelpCircleOutline } from "react-icons/io5";

interface FieldInputProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  tooltip?: string;
}

export default function FieldInput({
  children,
  title,
  subtitle,
  tooltip,
}: FieldInputProps) {
  return (
    <>
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-row items-center mb-2 gap-2">
          <div>
            <h2 className="font-semibold">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  <IoHelpCircleOutline />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {children}
      </div>
    </>
  );
}
