"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
  href?: string;
}

interface SelectProps {
  value: string;
  options: Option[];
  onSelect?: (value: string) => void;
}

export function Select({ options, value, onSelect }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onSelect?.(option.value);
  };

  const selectedLabel = options.find((option) => option.value === value)?.label;

  console.log({ options, value, selectedLabel });

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="w-full border-gray-700 border text-black px-4 py-2 rounded-md flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <ChevronDownIcon className="w-6 h-6" />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.href ? (
                <Link href={option.href}>{option.label}</Link>
              ) : (
                option.label
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
