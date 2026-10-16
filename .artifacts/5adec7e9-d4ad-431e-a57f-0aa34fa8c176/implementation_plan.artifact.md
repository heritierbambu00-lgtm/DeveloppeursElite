# Implementation Plan - Job Application Form (Formulaire pour Postuler)

Add a dedicated job application form ("Formulaire pour Postuler") to the platform as requested by the CEO, allowing candidates to apply for positions, submit their CV/details, and store submissions in Supabase (and notify admins/CEO).

## User Review Required

> [!IMPORTANT]
> Please review the proposed components and fields for the application form:
> - Name, Email, Phone, Position applied for (e.g., Software Engineer, AI Specialist, UI/UX Designer, Marketing, Other), Cover Letter / Message, and CV (file upload or link).

## Open Questions

- Should the application form be integrated directly as a section on the landing page (e.g., `#postuler`) or as a dedicated subpage/modal? *(Proposed: A prominent section on the landing page + quick navigation link in Navbar/Footer)*.
- Should applications be stored in a new Supabase table `applications`? *(Proposed: Yes, with admin notification support)*.

## Proposed Changes

### Component & UI Layer

#### [NEW] [ApplyForm.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/ApplyForm.jsx)
- Create a modern, responsive application form component matching the site's dark/light aesthetics (Bricolage Grotesque, Tailwind CSS).
- Fields: Full Name, Email, Phone Number, Position/Role selector, Cover Letter textarea, and CV upload input.
- Handling: Supabase insertion into an `applications` table (or contact/applications table), success feedback state.

#### [MODIFY] [Navbar.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/Navbar.jsx)
- Add a "Postuler" / "Carrières" quick link in the navigation menu pointing to the application section.

#### [MODIFY] [Footer.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/Footer.jsx)
- Add quick links for careers / application.

#### [MODIFY] [App.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/App.jsx)
- Integrate `<ApplyForm />` into the landing page flow.

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure all components compile without errors.

### Manual Verification
- Deploy/run locally and test submitting the application form with various fields.
- Verify success feedback and database insertion.
