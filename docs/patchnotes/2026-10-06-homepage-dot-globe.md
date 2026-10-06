# Homepage Dot Globe

Release date: 2026-10-06
Version intent: MINOR

## Added

- Added a dotted animated globe to the QuickTools homepage hero.
- Added responsive globe layouts for desktop, tablet, and mobile screens.
- Added automatic globe recoloring when users switch between light and dark themes.
- Added reduced-motion support that keeps the globe static when requested by the operating system.

## Improved

- Expanded the shared homepage content width so the heading and globe remain clearly separated on desktop.
- Added browser checks for globe rendering, animation, theme changes, reduced motion, and responsive overflow.
- Refreshed the inactive server scaffold lockfile to clear production dependency audit failures without enabling a server runtime.

## Developer Notes

- The globe is decorative and excluded from the accessibility tree.
- The dependency-free globe script is served from `client/public/dot-globe.js` and initialized only by the homepage.
- Tool routes and browser-local processing behavior are unchanged.
