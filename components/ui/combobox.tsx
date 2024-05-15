"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  options: { label: string; value: string }[] | null;
  value?: string;
  onChange: (value: string) => void;
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const Combobox = ({ options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks?.find((option) => option.value === value)?.label
            : "Select option..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options?.map((option, index) => (
              <CommandList>
                <CommandItem
                  key={index}
                  value={option?.value}
                  onSelect={() => {
                    onChange(option?.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option?.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;

// import React from "react";

// const Combobox = ({ options, value, onChange }: Props) => {
//   console.log(options);
//   return (
//     <div className="">
//       {options.map((option) => (
//         <>
//           <p>{option.label}</p>
//           <p>{value}</p>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Combobox;
