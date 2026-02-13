#!/bin/bash
# Build script - minify JS and CSS before deploying
echo "Minifying app.js..."
terser app.js --compress --mangle --output app.min.js

echo "Minifying styles.css..."
cleancss -o styles.min.css styles.css

echo "Done! Sizes:"
wc -c app.js app.min.js styles.css styles.min.css
