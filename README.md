# VICE Frontend Code Test

## Overview
Below is a HTML/CSS/JS exercise that involves building out a component of a page which involves switching between various shows.

Use SASS for css, but no other frameworks or libraries and no JS plugins.

You can use the latest and greatest HTML5 and CSS3 features to build this out.

## Exercise
In index.html, rebuild the designs in the designs folder in Semantic HTML, CSS, and JS. The designs represent layouts in a smaller screen and a larger screen. It is not 2 pages.

### Specs:
- There are 4 shows on this channel, each with a show id (use the shows.json object).
- Each show has a cover image, title and episode count.
- When landing on the page initially, the first show should be selected.
- When clicking through the show selector, the single show image, title and episode count also updates.
- The url updates with the currently selected show. (http://{{page_url}}?id=2, if second show is selected)
- A url with http://{{page_url}}?id=2 should have the second show selected on page reload.
- When clicking between shows, hitting “Back” and “Forward” on the browser will also update the url, cover image, title and episode count according to the show id.
- The minimum width of the screen is 320px. The horizontal breakpoint is at 980px. Built with a mobile first approach.

Pay attention details and the layout of the page. Keep it DRY.
