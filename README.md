# Sentinel Man — Marketing Site

The marketing website for [Sentinel Man](https://sentinelman.com) — a men's performance intelligence system.

## Stack

- **[Astro](https://astro.build/)** — static site generator with component-based architecture
- **Plain CSS** — no framework, design tokens via CSS custom properties
- **Cloudflare Pages** — auto-deploys on push to `main`

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  layouts/
    BaseLayout.astro    Shared <html>, nav, footer
  components/
    Nav.astro           Top nav (centred logo + links)
    Footer.astro        Footer (logo in centre)
    Hero.astro          Home hero + phone mockup
    Engines.astro       4-engine grid
    Arc.astro           90-day timeline
    Proof.astro         Testimonials
    Pricing.astro       Pricing card
    FinalCTA.astro      Closing CTA
  pages/
    index.astro         Home
    how-it-works.astro  (stub)
    the-arc.astro       (stub)
    about.astro         (stub — Nick's founding story)
    pricing.astro
    privacy.astro       (stub)
    terms.astro         (stub)
  styles/
    global.css          All site styles
public/
  logo.png              Salute / shield logo
```

## Deployment

- **Production**: Cloudflare Pages auto-deploys on push to `main`
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Domain**: sentinelman.com

## Brand tokens

- Navy `#001F3F` (background)
- Gold `#FFDC00` (primary accent)
- Midnight `#0D0D1A` (deep panel)
- Body `#8BA4C8`, Text `#F1F5F9`
- Fonts: JetBrains Mono (technical/numbers) + Rubik (body)

## Voice

Performance intelligence, not wellness. Incisive clarity. Impersonal command. Data-driven ruthlessness. Never therapy language.
