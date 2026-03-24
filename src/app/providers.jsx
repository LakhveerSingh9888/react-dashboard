import React from "react";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { usePassThrough } from "primereact/passthrough";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
import { store } from "@/shared/store";

// Override the focus shadow on all input-like components — the Tailwind preset
// applies focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] which creates a wide
// solid box-shadow that looks like a blue background fill inside the input.
const CustomTailwind = usePassThrough(
  Tailwind,
  {
    inputtext: {
      root: {
        className:
          "focus:shadow-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500/30 focus:border-blue-500",
      },
    },
    inputtextarea: {
      root: {
        className:
          "focus:shadow-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500/30 focus:border-blue-500",
      },
    },
    dropdown: {
      input: { className: "focus:shadow-none" },
    },
    multiselect: {
      labelContainer: { className: "focus:shadow-none" },
    },
  },
  {
    mergeSections: true,
    mergeProps: true,
    classNameMergeFunction: twMerge,
  },
);

const primeReactConfig = {
  unstyled: true,
  pt: CustomTailwind,
  ptOptions: {
    classNameMergeFunction: twMerge,
  },
};

export const AppProviders = ({ children }) => {
  return (
    <PrimeReactProvider value={primeReactConfig}>
      <Provider store={store}>{children}</Provider>
    </PrimeReactProvider>
  );
};
