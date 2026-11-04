import { Caveat, Homemade_Apple } from "next/font/google";

/** The handwriting for the "letter to my future self" on /about: a casual hand for the lines, a looping
 *  cursive for the greeting and the signature. */
export const letterHand = Caveat({
  variable: "--font-letter-hand",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const letterScript = Homemade_Apple({
  variable: "--font-letter-script",
  subsets: ["latin"],
  weight: "400",
});
