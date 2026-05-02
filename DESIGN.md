---
name: Referral System
colors:
  surface: "#f8f9ff"
  surface-dim: "#cbdbf5"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4ff"
  surface-container: "#e5eeff"
  surface-container-high: "#dce9ff"
  surface-container-highest: "#d3e4fe"
  on-surface: "#0b1c30"
  on-surface-variant: "#424754"
  inverse-surface: "#213145"
  inverse-on-surface: "#eaf1ff"
  outline: "#727785"
  outline-variant: "#c2c6d6"
  surface-tint: "#005ac2"
  primary: "#0058be"
  on-primary: "#ffffff"
  primary-container: "#2170e4"
  on-primary-container: "#fefcff"
  inverse-primary: "#adc6ff"
  secondary: "#4648d4"
  on-secondary: "#ffffff"
  secondary-container: "#6063ee"
  on-secondary-container: "#fffbff"
  tertiary: "#595c5e"
  on-tertiary: "#ffffff"
  tertiary-container: "#727577"
  on-tertiary-container: "#fbfdff"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d8e2ff"
  primary-fixed-dim: "#adc6ff"
  on-primary-fixed: "#001a42"
  on-primary-fixed-variant: "#004395"
  secondary-fixed: "#e1e0ff"
  secondary-fixed-dim: "#c0c1ff"
  on-secondary-fixed: "#07006c"
  on-secondary-fixed-variant: "#2f2ebe"
  tertiary-fixed: "#e0e3e5"
  tertiary-fixed-dim: "#c4c7c9"
  on-tertiary-fixed: "#191c1e"
  on-tertiary-fixed-variant: "#444749"
  background: "#f8f9ff"
  on-background: "#0b1c30"
  surface-variant: "#d3e4fe"
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: "600"
    lineHeight: "1.3"
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
    letterSpacing: "0"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.5"
    letterSpacing: "0"
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.4"
    letterSpacing: 0.01em
  button:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  margin: 32px
---

## Brand & Style

The brand personality is rooted in transparency, growth, and effortless connection. As a referral platform, the design system must convey trust and scalability while maintaining the agile energy of a modern startup.

The design style follows a **Corporate / Modern** aesthetic with strong **Minimalist** influences. It prioritizes clarity and high whitespace to reduce cognitive load during complex campaign setups. To differentiate from standard enterprise software, the system incorporates subtle gradients and soft elevation to create a friendly, "human" interface that encourages user engagement and sharing.

## Colors

The palette is anchored by a vibrant **Soft Blue** (#3b82f6), representing technology and reliability. This is complemented by a **Indigo** secondary color, used sparingly for interactive highlights and subtle gradients.

- **Backgrounds:** Use a tiered neutral system starting with pure white (#ffffff) for primary content areas and a very light gray-blue (#f8fafc) for page backgrounds to define structural boundaries without heavy lines.
- **Accents:** Incorporate subtle linear gradients (e.g., Primary Blue to Secondary Indigo) for call-to-action buttons and progress indicators to add a sense of "premium" polish.
- **Feedback:** Use standard semantic colors (Success: Emerald, Warning: Amber, Error: Rose) but desaturate them slightly to align with the soft professional aesthetic.

## Typography

This design system utilizes **Inter** for all typographic needs to maintain a systematic, utilitarian, and clean feel. The type hierarchy relies on significant weight shifts and ample line heights rather than excessive color changes.

- **Headlines:** Use tighter letter-spacing and heavier weights to create a strong visual anchor.
- **Body:** Prioritize legibility with a generous 1.5x-1.6x line height.
- **Labels:** Use Medium (500) or SemiBold (600) weights at smaller sizes to ensure they remain legible against soft-colored backgrounds.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for dashboard views and a centered, high-margin layout for marketing and landing pages. A 12-column grid is standard, with 24px gutters to provide breathing room between data-heavy components.

Spacing is based on a **4px baseline shift**, ensuring all margins and paddings are multiples of 4 or 8. High whitespace is the primary tool for grouping elements; use the `lg` (2.5rem) and `xl` (4rem) units to separate distinct functional sections, such as "Referral Stats" from "Campaign List."

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and **Tonal Layers**. Avoid heavy borders in favor of soft depth indicators.

- **Low Elevation:** Use for cards and interactive containers. A very diffused shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)`.
- **High Elevation:** Reserved for modals and dropdown menus. A more pronounced, deep shadow: `0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)`.
- **Container Tiers:** Use subtle background color shifts (#f8fafc) to distinguish sidebar or header areas from the main canvas without using a physical border.

## Shapes

The shape language is consistently **Rounded**, utilizing an 8px to 12px radius to evoke a modern, friendly feel.

- **Standard Elements:** (Buttons, Inputs) Use a 0.5rem (8px) radius.
- **Large Elements:** (Cards, Modals) Use a 1rem (16px) radius for a more distinctive, "startup" container look.
- **Interactive States:** Hover states should not change the radius, but may increase the shadow depth to simulate a lift effect.

## Components

### Buttons

Primary buttons use the Soft Blue (#3b82f6) with a subtle vertical gradient and white text. Secondary buttons use a ghost style with a 1px border in a light neutral tone. Always use 16px horizontal and 10px vertical padding.

### Input Fields

Inputs use a white background with a light neutral border (#e2e8f0). On focus, the border transitions to the primary blue with a 3px soft outer glow (box-shadow) using 20% opacity of the primary color.

### Cards

Cards are the primary container for referral data. They feature a white background, the `low-elevation` ambient shadow, and a 16px corner radius. Padding inside cards should be generous (24px to 32px).

### Referral Chips & Badges

Small, pill-shaped indicators for status (e.g., "Active," "Pending"). Use high-transparency versions of semantic colors (e.g., 10% opacity Emerald background with 100% opacity Emerald text).

### Progress Bars

Use the primary-to-secondary gradient for the fill of progress bars to track referral milestones, providing a sense of momentum and achievement.

### Lists

Data lists should avoid horizontal borders. Instead, use a subtle hover state with a 4px left-accent bar in the primary blue to highlight the active row.
