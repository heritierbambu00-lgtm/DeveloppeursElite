# Walkthrough - Job Application Feature & Supabase Integration

Implemented the job application feature ("Formulaire pour Postuler") requested by the CEO, along with Supabase backend synchronization, team viewing access, and COO validation workflow.

## Changes

### [NEW] [supabase_applications.sql](file:///C:/Users/HERITIER/Desktop/JHJ/.artifacts/5adec7e9-d4ad-431e-a57f-0aa34fa8c176/scratch/supabase_applications.sql)
- SQL script to create the `applications` table and Supabase Storage bucket (`cvs`) for candidate CV uploads.

### [NEW] [ApplyForm.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/ApplyForm.jsx)
- Created the job application form section on the landing page allowing candidates to submit their name, email, phone, target position, cover letter, and CV file.

### [NEW] [ApplicationsManager.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/pages/admin/ApplicationsManager.jsx)
- Created an admin dashboard module where all team members can view submitted applications, and the COO can validate / update candidate statuses (Pending, Under Review, Accepted, Rejected).

### [MODIFY] [App.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/App.jsx)
- Integrated `<ApplyForm />` into the landing page flow.
- Registered `/admin/applications` route for team and COO access.

### [MODIFY] [Navbar.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/components/Navbar.jsx) & [AdminLayout.jsx](file:///C:/Users/HERITIER/Desktop/JHJ/src/layouts/AdminLayout.jsx)
- Added quick navigation links ("Postuler" / "Candidatures") both publicly and in the admin panel.

## Verification Results

### Automated Tests
- Ran `npm run build` successfully with zero errors. All assets and lazy-loaded chunks compiled cleanly.

### SQL Execution
> [!IMPORTANT]
> Remember to execute the SQL script located at [.artifacts/5adec7e9-d4ad-431e-a57f-0aa34fa8c176/scratch/supabase_applications.sql](file:///C:/Users/HERITIER/Desktop/JHJ/.artifacts/5adec7e9-d4ad-431e-a57f-0aa34fa8c176/scratch/supabase_applications.sql) in your Supabase SQL Editor to create the `applications` table and `cvs` storage bucket.
