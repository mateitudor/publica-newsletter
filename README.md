# Publica Newsletter Templates

This repository contains HTML email templates for Publica's newsletters. Publica is a Romanian publishing house specializing in non-fiction books, focusing on business, social sciences, biographies, and creative non-fiction.

## About Publica

Publica identifies and promotes business books that make a difference. The publishing house brings together authors who share professional excellence and vision, whether they are academics or practitioners. Publica specializes in publishing current and relevant non-fiction books across various categories including business, social sciences, biographies, and creative non-fiction.

The publishing house has organized the "Meet The Thinkers" conference series, facilitating encounters between their authors and intellectually curious people in Romania.

## Project Structure

```
.
├── 2025/                    # Current year newsletters
│   └── 03_19/              # March 19th edition
│       ├── img/            # Newsletter-specific images
│       ├── publica.ro-2025_03_19-G-dev.html    # Development version
│       ├── publica.ro-2025_03_19-G-prod.html   # Production (minified) version
│       ├── publica.ro-2025_03_19-R-dev.html    # Development version
│       └── publica.ro-2025_03_19-R-prod.html   # Production (minified) version
├── assets/                  # Shared assets
│   └── img/                # Global images
│       ├── audiobooks/     # Audiobook-related images
│       ├── books/          # Book cover images
│       ├── id/             # Identification images
│       ├── lines-*.png     # Decorative line images
│       └── logos/          # Brand logos
└── forms/                  # Email subscription forms
    ├── new/               # New form templates
    └── original/          # Original form templates
```

## Newsletter Naming Convention

Newsletter files follow this naming pattern:
- `publica.ro-YYYY_MM_DD-X-dev.html` - Development version
- `publica.ro-YYYY_MM_DD-X-prod.html` - Production (minified) version

Where:
- `YYYY_MM_DD` represents the date
- `X` is a letter indicating the newsletter type (e.g., G for general, R for specific)

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Navigate to the newsletter directory you want to work on:
   ```bash
   cd 2025/03_19
   ```

3. Run the build command to minify HTML:
   ```bash
   npm run build
   ```

This will create production-ready minified versions of your HTML files.

## Features

- Responsive email templates
- Optimized for various email clients
- Custom fonts support (Atkinson Hyperlegible, Piazzolla)
- Image optimization
- HTML minification for production

## Technologies Used

- HTML5
- CSS
- Webpack
- HTML Minifier

## Contributing

1. Create a new branch for your changes
2. Make your modifications to the `-dev.html` files
3. Run the build process to generate minified versions
4. Submit a pull request

## License

ISC 