# Skill: UK-Bid Now Contact Us System

## Objective
When user clicks the "UK-Bid Now" button, redirect them to a Contact Us page where they can submit an inquiry form. The submitted data must be stored in a MySQL database via Laravel 11 backend API.

---

## Feature Flow

1. User clicks "UK-Bid Now" button
2. Redirect to `/contact-us`
3. Contact Us form is displayed
4. User fills form fields
5. Form is submitted via API request
6. Laravel backend validates request
7. Data is stored in MySQL database
8. API returns success response
9. UI shows success message

---

## Frontend Requirements (React + Tailwind CSS)

### Navigation
- Button: **UK-Bid Now**
- On click → route to `/contact-us` using React Router

---

### Contact Form Fields

The form must include:

- First Name (required)
- Last Name (required)
- Email (required)
- Phone (optional)
- Message (required)

---

### Frontend UX Requirements

- Fully responsive (mobile, tablet, desktop)
- Tailwind CSS styled UI
- Loading state on submit button
- Success & error feedback messages
- Form reset after successful submission
- Axios or Fetch API for backend communication

---

## Backend Requirements (Laravel 11 + MySQL)

### API Endpoint

###  Validation Rules

- first_name → required|string|max:255
- last_name → required|string|max:255
- email → required|email
- phone → nullable|string|max:20
- message → required|string

---

### Controller Logic

- Validate request
- Store data using Eloquent model
- Return JSON response:

```json
{
  "status": "success",
  "message": "Contact form submitted successfully"
}
