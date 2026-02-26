# ERP API Integration Guide (V2)

This guide documents the integration process for submitting job applications directly to the MTM ERP system, replacing the legacy Supabase-based lead generation.

---

## 1. API Endpoint Overview

The form submissions are sent to the following endpoint:
`POST https://erp.mtm-hub.com/api/v2/method/opening_jobs_api/apply_for_a_job`

### Payload Format: `FormData`
All data must be submitted as `multipart/form-data`.

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `cv_attach` | File | Yes | The applicant's CV/Resume (PDF/DOCX) |
| `cover_latter_attach` | File | Yes | The applicant's Cover Letter (PDF/DOCX) |
| `video` | File | No | Optional video introduction (MP4/MOV) |
| `applicant_name` | String | Yes | Full Name of the applicant |
| `email_id` | String | Yes | Email address |
| `phone_number` | String | Yes | Contact number (including country code) |
| `when_can_join` | String | Yes | ISO Date string or description |
| `nationality` | String | Yes | Applicant's nationality |
| `job_title` | String | Yes | The internal Job Opening ID (e.g., `HR-OPN-2026-0002`) |

---

## 2. Implementation Example (Next.js)

### Submission Function

```javascript
async function submitApplication(data) {
    const formData = new FormData();
    
    // Append Files
    formData.append('cv_attach', data.cvFile);
    formData.append('cover_latter_attach', data.coverLetterFile);
    if (data.videoFile) formData.append('video', data.videoFile);
    
    // Append Strings
    formData.append('applicant_name', data.name);
    formData.append('email_id', data.email);
    formData.append('phone_number', `${data.countryCode} ${data.phone}`);
    formData.append('when_can_join', data.availabilityDate.toISOString());
    formData.append('nationality', data.nationality);
    formData.append('job_title', "HR-OPN-2026-0002"); // Static ID for this landing page

    try {
        const response = await fetch('https://erp.mtm-hub.com/api/v2/method/opening_jobs_api/apply_for_a_job', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        
        if (response.ok) {
            return { success: true };
        } else {
            throw new Error(result.message || "Submission failed");
        }
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, error: error.message };
    }
}
```

---

## 3. Key Differences from Supabase

1. **No Client Side SDK**: Uses standard `fetch` API.
2. **Direct to ERP**: Data is posted directly to the MTM management system, bypassing the intermediate `leads` table in Supabase.
3. **Multi-File Support**: Handles multiple specialized file attachments in a single request.
4. **Environment Variables**: No longer requires `SUPABASE_URL`, `SUPABASE_ANON_KEY`, or `BRAND_ID`. The `job_title` acts as the primary identifier.

---

## 4. Troubleshooting

- **CORS Issues**: Ensure the landing page domain is whitelisted on the ERP server if applicable.
- **File Size**: The ERP API may have limits on video upload sizes. Our implementation currently handles files up to 100MB client-side.
- **Field Names**: Ensure exact matches for field names (note the typo `cover_latter_attach` in the API).
