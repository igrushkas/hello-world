#!/bin/bash
# Build script - minify JS and CSS before deploying
echo "Minifying app.js..."
terser app.js --compress --mangle --output app.min.js

echo "Minifying styles.css..."
cleancss -o styles.min.css styles.css

# Auto-bump service worker cache version (forces re-cache on deploy)
SW_VERSION="habit-magic-$(date +%Y%m%d%H%M%S)"
sed -i '' "s/var CACHE_VERSION = '.*'/var CACHE_VERSION = '${SW_VERSION}'/" sw.js
echo "SW cache version: $SW_VERSION"

echo "Done! Sizes:"
wc -c app.js app.min.js styles.css styles.min.css
