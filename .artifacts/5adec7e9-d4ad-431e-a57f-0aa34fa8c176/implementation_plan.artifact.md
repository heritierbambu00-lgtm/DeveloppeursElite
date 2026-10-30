# Implementation Plan - Global Multi-Type & Multi-Color Three.js & GSAP Animations Everywhere

Expand Three.js 3D visuals and GSAP scroll animations across **every single page and layout** (Landing Page, Blog, Admin Dashboards, Login, etc.) with diverse 3D types (particles, floating rings, geometric cubes/spheres) and a rich palette of neon colors (Purple, Electric Blue, Neon Green, Orange).

## User Review Required

> [!IMPORTANT]
> - **Global Integration**: `<ThreeBackground />` and `<GsapScrollProvider />` will be moved to the root App level so they run across all pages and routes.
> - **Diverse 3D Elements & Colors**: Three.js scene will feature multi-colored particles, spinning geometric wireframe rings, and floating cubes with vibrant neon hues (`#9E7AFF`, `#53B1FD`, `#00ff88`, `#FF4D00`).

## Open Questions

- None.

## Proposed Changes

### Animation & 3D Core Components

#### [MODIFY] [ThreeBackground.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/ThreeBackground.jsx)
- Enhance with multiple Three.js geometry types (particle cloud + rotating wireframe torus rings + floating colored cubes).
- Introduce multi-colored materials (Purple, Blue, Green, Orange) with additive blending and smooth mouse/scroll reactivity.

#### [MODIFY] [GsapScrollProvider.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/GsapScrollProvider.jsx)
- Ensure GSAP ScrollTrigger activates globally on route changes and across all pages.

#### [MODIFY] [App.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/App.jsx)
- Lift `<ThreeBackground />` and `<GsapScrollProvider />` to the root router level so they persist and animate every page in the app.

## Verification Plan

### Automated Tests
- Run `npm run build` to verify clean compilation.

### Manual Verification
- Verify that 3D multi-color shapes and GSAP scroll animations are active across all views (Landing, Blog, Admin).
