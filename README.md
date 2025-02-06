# 🏗️ WOODME Website

## Project Overview

A high-performance website for WOODME - a company specializing in custom woodworking, interior design, and architectural solutions. Built with modern technologies focusing on performance, accessibility, and user experience.

## Tech Stack

- **[Astro](https://astro.build)**: Core framework for static site generation
- **[Sanity.io](https://sanity.io)**: Headless CMS for content management
- **[TurboPack](https://turbo.build)**: Monorepo build system
- **[TypeScript](https://www.typescriptlang.org)**: End-to-end type safety
- **[SCSS](https://sass-lang.com)**: Advanced styling
- **[Preact](https://preactjs.com)**: Lightweight React alternative
- **[Bun](https://bun.sh)**: JavaScript runtime and package manager

## Project Structure

- `apps/astro`: Main website application
- `apps/sanity`: Content management system

## Features

### 🎨 Component Library

- 45+ custom Astro components including:
  - Animated project references
  - Dynamic blog system with reading time estimation
  - Interactive galleries and sliders
  - Expandable content sections
  - Contact forms with international phone support
- Fully managed through Sanity Studio with live previews

### 🎯 Performance

- Zero-JS by default with selective hydration
- Optimized image pipeline with:
  - Automated WebP conversion
  - Responsive images with proper srcset
  - Lazy loading implementation
- Client-side routing for faster page transitions
- Minified and bundled assets via TurboPack

### ♿ Accessibility

- WCAG 2.0 compliance with:
  - Semantic HTML structure
  - ARIA attributes
  - Proper heading hierarchy
- Interactive elements with minimum 44px touch targets
- Keyboard navigation support
- High contrast color scheme

### 🔍 SEO & Meta

- Automated meta tags generation
- Dynamic sitemap.xml and robots.txt
- Structured data for:
  - Organization
  - Blog posts
  - Projects
- OpenGraph and Twitter card support
- Canonical URL management

## Why This Approach

### ⚡ Technical Architecture

- Astro-powered static generation for optimal performance
- Strategic hydration with client:load, client:idle, and client:visible directives
- Automated asset optimization pipeline
- Type-safe development with TypeScript and Astro's built-in checking

### 💻 Developer Workflow

- Monorepo structure with TurboPack for efficient builds
- Organized component library with 45+ reusable sections
- Consistent code style with ESLint and Prettier
- Hot module replacement for rapid development

### 🎯 Business Advantages

- Content management through intuitive Sanity Studio interface
- Real-time preview capabilities for content editors
- Optimized Core Web Vitals for better SEO rankings
- Scalable architecture supporting future growth

## Authors

- [@oliwiersellig](https://github.com/OliwierSellig)
