# Vittorio Massa

Open `index.html` for the updated website.

Keep `assets/` and `faccia.png` beside both HTML files. 

No installation or build is required. The logo works offline; the existing website still requests its Google Fonts.

Eight symbols: treble clef, bass clef, quarter note, eighth note, quarter rest, sharp, flat, fermata. Artwork uses vector outlines from Steinberg's Bravura; the original license is included in `assets/Bravura-LICENSE.txt`.

The logo holds for 1.45 seconds, then morphs for 460 ms at at most 30 path updates per second. It makes no animation-frame requests during holds, stops offscreen or in hidden tabs, and respects changes to the reduced-motion preference. An inline SVG remains visible if JavaScript fails or is disabled. It inherits the website's theme color. The loader uses the same animation, with an 80 ms initial hold, 220 ms subsequent holds, and 420 ms morphs, showing three symbols during its short introduction.

`assets/logo.js` contains the timing and animation lifecycle. `assets/logo-data.js` contains exact outlines and precomputed matched contours. There is no canvas, glow, particle effect, runtime font dependency, path measurement, or contour matching. `assets/logo.svg` is the static mark.

The photograph, biography, qualifications, locations, prices, and existing testimonials are retained. The Italian promotional copy and six course descriptions have been expanded, and the about illustration is a local SVG.

The contact form is a free, backend-free email composer. It validates the fields and opens a prepared message to `info@vittoriomassa.it` in the visitor's mail app. The visitor must press Send there. It never claims delivery; a copy-message option is available if no mail app opens. The receiving inbox must exist to receive mail. No email service or API keys are needed. Check this behavior with `node tools/check-contact.cjs`.

Both Superprof links intentionally use the user-requested placeholder `https://www.superprof.com/profile`. Replace both occurrences in `demo.html` with the actual public profile URL. This placeholder is not a verified review/profile page. Instagram, YouTube, and Spotify still need their actual URLs.

Responsive refinements live in `assets/responsive.css`: a two-column tablet hero, scrollable mobile navigation, larger touch controls and form text, stacked phone timelines, wrapping contact text, and a single scroll area for course dialogs with visible previous/next controls. Resizing an open mobile menu to desktop releases its scroll lock. The logo study's symbol grid adapts to smaller screens as well. Browser visual verification of these latest responsive refinements was blocked by the preview tool's URL policy; JavaScript syntax, local asset references, and logo lifecycle checks were run.

Development: `node tools/check-logo.cjs` verifies lifecycle behavior. `tools/build-logo.py` regenerates the vector data using FontTools, `tools/Bravura.otf`, and SMuFL's `tools/glyphnames.json`; these tools are not needed to run the website.
