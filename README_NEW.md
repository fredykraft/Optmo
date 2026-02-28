# OPTMO Website Reference

This file is a quick reference for maintaining the current OPTMO website implementation.

## Core Sections in index.html

- Fixed top header with search, notifications, and account menu
- Collapsible sidebar navigation
- Hero section with primary CTA
- Automation workflow highlight section
- Recent projects grid with category filters
- Membership pricing cards
- Platform statistics table
- Footer and cookie consent banner

## Styling Notes (css/styles.css)

- Uses CSS custom properties in `:root` for branding and spacing
- Layout uses Flexbox and Grid for responsive behavior
- Mobile-friendly behavior includes sidebar overlay and compact spacing

## Script Notes (js/main.js)

- Handles sidebar toggling and dropdown behavior
- Applies smooth-scroll and active-nav updates
- Filters project cards by selected category
- Stores cookie consent in `localStorage`
- Includes placeholder tracking hooks (`trackEvent`)

## Quick Start

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Maintenance Checklist

- Keep section IDs and navigation links in sync
- Keep filter button values aligned with project card `data-filter`
- Validate cookie banner IDs before modifying tracking logic

Last updated: February 28, 2026