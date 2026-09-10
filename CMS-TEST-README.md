# V3 CMS TEST

This test version keeps the V3 design and adds editable content files for Pages CMS.

Editable:
- Hero role and intro
- Portrait
- Location / availability
- Contact links
- Homepage statement
- The 4 project titles, metadata, descriptions, links and cover images

Important:
- When you double-click index.html locally, the built-in V3 fallback content appears.
- The CMS-managed JSON content is loaded when the site is served through GitHub Pages (or another web server).
- The file `.pages.yml` creates the Pages CMS dashboard automatically once this repository is connected.

Files you should not edit manually:
- style.css
- index.html
- script.js
- cms-content.js

Files the CMS edits:
- data/site.json
- data/projects.json
- media/*
