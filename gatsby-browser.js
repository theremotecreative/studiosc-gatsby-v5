// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.css";

// --- Global route hook to manage Projects filter flags ---
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window === "undefined") return;

  const from = prevLocation?.pathname || "";
  const to = location.pathname || "";

  // If we navigated AWAY from /projects (including /projects/slug), clear flags
  const wasInProjects = from.startsWith("/projects/");
  const nowInProjects = to.startsWith("/projects/");

  if (wasInProjects && !nowInProjects) {
    try {
      window.sessionStorage.removeItem("persistProjectFilter");
      window.sessionStorage.removeItem("projectFilterKey");
    } catch {}
  }

  // On a hard reload / first visit (no prevLocation), if we didn't land on /projects,
  // clear any stale flags so the next /projects visit starts at "All".
  if (!prevLocation && !nowInProjects) {
    try {
      window.sessionStorage.removeItem("persistProjectFilter");
      window.sessionStorage.removeItem("projectFilterKey");
    } catch {}
  }

  // Optional one-time migration: if any old localStorage keys exist, drop them.
  try {
    window.localStorage?.removeItem("projectFilterKey");
  } catch {}
};
