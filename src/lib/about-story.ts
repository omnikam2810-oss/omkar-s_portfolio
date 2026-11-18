/**
 * The content of the About story (/about) and its card on the home page. Edit the words here.
 */

/** Shown in the page metadata and on the home-page card. */
export const ABOUT_META = {
  title: "I didn’t come this far just to stay the same.",
  excerpt:
    "A story of curiosity, courage and becoming: the person behind the screen, the life outside it, and a letter to the one I’m becoming.",
  readTime: "4 min read",
  updated: "November 2026",
};

/**
 * Photos for the story. Put your own pictures in public/about and set `src` (e.g. "/about/bike.jpg").
 * Until then each slot shows a warm placeholder plate.
 */
export type PhotoId = "workspace" | "bike" | "workout" | "nature" | "horizon";

export const PHOTOS: Record<
  PhotoId,
  {
    src: string | null;
    alt: string;
    label: string;
    position?: string;
    /** Shown in black and white until it is hovered. */
    grayscale?: boolean;
  }
> = {
  workspace: {
    src: "/about/portrait-blue.jpg",
    alt: "Portrait of Omkar in a dark collared shirt against a blue technology-themed background",
    label: "workspace",
    // a square photo in a tall frame: keep the face centred
    position: "50% 30%",
    grayscale: true,
  },
  bike: {
    src: "/about/bike.jpg",
    alt: "View over the handlebars of a motorcycle riding down an open highway",
    label: "bike ride",
    position: "50% 55%",
  },
  workout: {
    src: "/about/workout.webp",
    alt: "Black and white portrait of Omkar from behind, mid-pose in the gym",
    label: "workout",
    // The photo is tall and the card is wide, so keep the shoulders and back in frame.
    position: "50% 35%",
  },
  nature: {
    src: "/about/nature.jpg",
    alt: "Black and white view of jagged mountain peaks in drifting cloud",
    label: "trek or nature",
    position: "50% 40%",
  },
  horizon: {
    src: "/about/horizon-f1.jpg",
    alt: "Side view of a black and red Formula 1 car in a dark studio",
    label: "wide horizon",
    // the car sits on the right of the box; the dark left side carries the headline
    position: "85% 75%",
  },
};

/** The four stages of the mindset, in the order they are revealed. */
export const PRINCIPLES = [
  {
    word: "FAIL.",
    quote: "Some lessons only come from trying.",
    text: "Because trying something difficult is always better than never trying at all. Action produces feedback; hesitation produces nothing.",
  },
  {
    word: "LEARN.",
    quote: "Every experience leaves something behind.",
    text: "Because every setback has something to teach. Dissect mistakes without shame and keep what they show you.",
  },
  {
    word: "REBUILD.",
    quote: "Progress begins when you choose to try again.",
    text: "Because one failure should never define the whole story. Return to the desk with sharper instincts and stronger resolve.",
  },
  {
    word: "REPEAT.",
    quote: "Growth isn’t a destination. It’s a continuous process.",
    text: "Because the point was never to arrive. It’s to keep going, a little sharper each time.",
  },
];
