import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import clsx from "clsx";
import { ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function renderError(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  if (error && "status" in error) {
    toast.error("Unexpected Error Happened");
  }
  if (error && "originalStatus" in error) {
    if (error.originalStatus >= 500) {
      toast.error("Unexpected Error Happened");
    } else {
      toast.error(error.data);
    }
  }
}
