import { useState, useEffect } from "react";

// export function useBreakpoint(breakpoint = 768) {
//   const [matches, setMatches] = useState(window.innerWidth >= breakpoint);

//   useEffect(() => {
//     const handler = () => {
//       setMatches(window.innerWidth >= breakpoint);
//     };

//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, [breakpoint]);

//   return matches;
// }

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = event => setMatches(event.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
