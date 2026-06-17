# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Peter Ziegler. Goal: professional online presence for recruiters and hiring managers, showcasing projects, work experience, skills, and education.

## Stack

- **Framework**: Astro 5 (static output + Vercel adapter)
- **CMS**: Keystatic (local YAML storage, admin at `/keystatic`)
- **Styling**: Tailwind CSS v4 + CSS custom properties (theming)
- **UI**: Astro components + React (required by Keystatic)
- **Fonts**: Plus Jakarta Sans + JetBrains Mono (Google Fonts)
- **Analytics**: Umami Cloud (`PUBLIC_UMAMI_ID` env var, production only)
- **Deploy**: Vercel

## Commands

- **Install deps**: `npm install`
- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Preview production build**: `npm run preview`
- **Type check**: `npm run astro check`

## Content

All content is managed via Keystatic at `/keystatic` (local dev) or by editing YAML files directly:

- `src/content/projects/` — project cards
- `src/content/experience/` — work history
- `src/content/education/` — education entries

Singletons (about bio, skills list) are in `src/content/` root as `about.yaml` and `skills.yaml`.

## Environment Variables

Copy `.env.example` to `.env` and fill in:

- `PUBLIC_UMAMI_ID` — Umami website ID for analytics (production only)

## Design System

CSS tokens live in `src/styles/global.css`. Dark mode via `.dark` class on `<html>`. Key tokens:

- `--bg`, `--bg-subtle`, `--bg-card` — backgrounds
- `--text`, `--text-muted`, `--text-faint` — text hierarchy
- `--accent`, `--accent-light` — brand blue
- `--border`, `--border-strong` — borders
