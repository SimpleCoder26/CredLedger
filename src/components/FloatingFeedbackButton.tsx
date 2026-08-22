"use client";

import React from "react";
import { MessageSquarePlus } from "lucide-react";

export function FloatingFeedbackButton() {
  return (
    <a
      href="https://forms.gle/TyfSWMwf9fFKWXn19"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-primary text-pure-white p-4 rounded-full shadow-2xl hover:bg-inverse-surface hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300 group cursor-pointer"
      aria-label="Submit Review"
      title="Submit Review"
    >
      <MessageSquarePlus className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-300 ease-in-out whitespace-nowrap font-dot uppercase text-[14px] group-hover:ml-3">
        Submit Review
      </span>
    </a>
  );
}
