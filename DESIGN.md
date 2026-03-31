# Design System Document

## 1. Overview & Creative North Star

### The Creative North Star: "The Institutional Guardian"
This design system moves away from the generic "tech startup" aesthetic toward an authoritative, editorial-led experience tailored for the Filipino enterprise sector. We are not just building a software interface; we are creating a digital institution. 

The system achieves a high-trust, B2B feel through **Intentional Asymmetry** and **Tonal Depth**. By moving away from rigid, bordered grids and embracing sophisticated layering, the interface feels like a physical suite of premium corporate documents—clean, decisive, and permanent. We use the contrast between the Deep Navy and Eucalyptus Green to signal a balance between heritage (Navy) and forward-thinking vitality (Green).

---

## 2. Colors & Surface Logic

Our palette is rooted in the institutional stability of **Deep Navy (#001148)**, balanced by the professional energy of **Eucalyptus Green (#1B9AAA)**.

### The "No-Line" Rule
To achieve a premium 2026 feel, **1px solid borders are prohibited for sectioning.** Hierarchy must be defined through background color shifts.
- **Section Transition:** Use a shift from `surface` (`#f7f9fc`) to `surface_container_low` (`#f2f4f7`) to define the end of a hero area and the start of a feature grid.
- **Visual Soul:** Apply a subtle linear gradient to major CTAs and Hero backgrounds (transitioning from `primary` to `primary_container`). This adds a "lithographic" quality that flat colors lack.

### Surface Hierarchy & Glassmorphism
Treat the UI as a series of nested physical layers. 
- **The Base:** Everything sits on `background` (`#f7f9fc`).
- **Nesting:** A card using `surface_container_lowest` (`#ffffff`) should sit atop a `surface_container_low` section to provide natural, effortless lift.
- **The Glass Rule:** For floating navigation or modal overlays, use semi-transparent `surface` colors with a `backdrop-blur` (12px–20px). This ensures the "Institutional Guardian" feels modern and integrated, rather than heavy and static.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to bridge the gap between high-level brand messaging and functional data density.

*   **Primary Headings (Plus Jakarta Sans):** Used for `display`, `headline`, and `label` roles. Its geometric yet open character conveys modern Filipino innovation.
*   **Secondary/Body (Inter):** Used for `title` and `body` roles. Inter provides the clinical legibility required for high-trust B2B environments.

| Role | Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Plus Jakarta Sans | 3.5rem | High-impact hero statements. |
| **Headline** | `headline-md` | Plus Jakarta Sans | 1.75rem | Section titles; authoritative and clear. |
| **Title** | `title-md` | Inter | 1.125rem | Sub-headers and card titles. |
| **Body** | `body-md` | Inter | 0.875rem | Primary reading text; high legibility. |
| **Label** | `label-md` | Plus Jakarta Sans | 0.75rem | Metadata, caps allowed for "B2B" feel. |

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows often feel "dirty" in high-end enterprise design. We use **Ambient Shadows** and **Tonal Layering** to create a clean, professional depth.

*   **The Layering Principle:** Depth is achieved by stacking surface tokens.
    *   *Example:* Place a `surface_container_highest` (`#e0e3e6`) element inside a `surface_container` (`#eceef1`) parent to create an "inset" feel.
*   **Ambient Shadows:** If a shadow is required for a floating component (like a Primary CTA or Modal), it must be:
    *   **Color:** Tinted with `on_surface` (Navy-tinted grey), never pure black.
    *   **Spec:** `0px 10px 30px rgba(0, 17, 72, 0.06)`. It should feel like a soft glow of light, not a drop shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use `outline_variant` at **15% opacity**. A 100% opaque border is a failure of the design system's elegance.

---

## 5. Components

### Buttons
*   **Primary:** Eucalyptus Green (`secondary`) with `on_secondary` (#FFFFFF) text. Use `xl` (0.75rem) roundedness. 
*   **Secondary (B2B variant):** Deep Navy (`primary_container`) with a subtle gradient to `primary`. 
*   **Tertiary:** Text-only in `primary`, using `0.5rem` horizontal padding to maintain a "ghost" hit area.

### Cards & Lists
*   **Strict Rule:** No divider lines between list items or card sections. Use `1.5rem` (Spacing-6) of vertical white space or a subtle background shift to `surface_container_low`.
*   **Interactive Cards:** On hover, do not change the border. Instead, shift the background color from `surface_container_lowest` to `surface_bright` or increase the Ambient Shadow diffusion.

### Input Fields
*   **Style:** Minimalist. No 4-sided borders. Use a `surface_container_high` background with a 2px bottom-accent in `outline` that expands to `secondary` (Eucalyptus Green) on focus.
*   **Error States:** Use `error` (#ba1a1a) sparingly. Use a `surface_container` tint for the input background to make the error feel integrated.

### Suggested Component: The "Institutional Breadcrumb"
A custom, high-contrast navigation element using `label-md` in all-caps, separated by a low-opacity Eucalyptus Green slash. This reinforces the "Guardian" persona of the platform.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where text is weighted to the left and Eucalyptus Green accents/images are weighted to the right.
*   **Do** use the Eucalyptus Green (`secondary`) for "Success" and "Action" states to provide a sense of growth and health.
*   **Do** lean into the Filipino Enterprise feel by using large, high-quality photography of modern Manila/BGC architecture as subtle, low-opacity background watermarks.

### Don't
*   **Don't** use standard 1px borders to separate content. It breaks the "premium editorial" flow.
*   **Don't** use pure black (#000000) for text. Always use `on_surface` or `primary` (Navy) to maintain the sophisticated color profile.
*   **Don't** crowd elements. If in doubt, double the spacing token (e.g., move from `1rem` to `2rem`). Premium design is defined by what you leave out.