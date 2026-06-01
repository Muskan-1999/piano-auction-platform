# Sell My Piano Feature Specification

## Overview

The Sell My Piano feature allows visitors and registered users to submit their piano for valuation and potential auction sale.

This feature must support guest submissions.

The design should match the Piano Auctions UK Sell My Piano page and use the provided screenshots as the primary UI reference.

---

## Route

Frontend:

/sell-my-piano

API:

POST /api/sell-my-piano

---

## Business Goal

Allow piano owners to:

* Request a valuation
* Submit piano details
* Upload piano images
* Provide collection address
* Receive contact from auction specialists

---

## User Flow

### Step 1 - Personal Details

Displayed inside hero section card.

Fields:

* First Name *
* Last Name *
* Email Address *
* Phone Number *

Button:

Next

Validation:

* All fields required
* Email must be valid
* Phone must be valid

---

### Step 2 - Piano Details

Displayed inside modal wizard.

Section Title:

Use Our Piano Valuation Form

Fields:

#### Valuation Information

Type Of Valuation *

Options:

* Auction Valuation
* Insurance Valuation
* Sale Valuation

#### Piano Information

Piano Type *

Options:

* Upright Piano
* Grand Piano
* Baby Grand Piano
* Digital Piano

Piano Make *

Examples:

* Yamaha
* Steinway & Sons
* Kawai
* Petrof
* Bluthner
* Bechstein

Piano Model

Piano Colour *

Examples:

* Black
* Mahogany
* Walnut
* White

Serial Number

Dimensions

Examples:

* Height
* Width
* Length

Age Of Piano

Ivory Keys *

Options:

* Yes
* No
* Unknown

Tuned Recently *

Options:

* Yes
* No

Reconditioned *

Options:

* Yes
* No

Ownership History *

Textarea

Example:

Family owned since 1995.

Condition Description *

Textarea

Describe:

* Scratches
* Damage
* Repairs
* General condition

Additional Notes

Textarea

---

### Piano Images

Allow multiple uploads.

Accepted:

* jpg
* jpeg
* png
* webp

Maximum:

5 Images

Maximum File Size:

5MB each

Suggested Images:

* Full front
* Keyboard
* Internal mechanism
* Pedals
* Any damage

Buttons:

Previous
Next

---

### Step 3 - Address Details

Fields:

Address Line 1 *

Address Line 2

Town / City *

County / State

Postcode *

Country *

Default:

United Kingdom

Collection Address Different?

Options:

* Yes
* No

Preferred Contact Method *

Options:

* Email
* Phone

Preferred Contact Time

Options:

* Morning
* Afternoon
* Evening

Additional Notes

Textarea

Buttons:

Previous
Submit Valuation

---

## Success State

After successful submission:

Replace modal content with:

✓ Form Submitted Successfully

Thank you for submitting your piano valuation request.

Our specialists will review your piano details and contact you shortly.

Button:

Close

---

## Database Table

sell_my_pianos

Columns:

id

first_name
last_name
email
phone

valuation_type

piano_type
piano_make
piano_model
piano_colour

serial_number
dimensions
age_of_piano

ivory_keys
tuned_recently
reconditioned

ownership_history
condition_description
additional_notes

address_line_1
address_line_2

city
state
postcode
country

collection_address_different

preferred_contact_method
preferred_contact_time

images

status

estimated_value

admin_notes

contacted_at

assigned_to

created_at
updated_at

---

## Status Workflow

Default:

Pending

Available Statuses:

* Pending
* Under Review
* Contacted
* Valuation Sent
* Accepted
* Scheduled For Auction
* Sold
* Rejected

---

## Filament Resource

Resource:

SellMyPianoResource

Navigation Group:

Auction Management

Columns:

* ID
* Customer Name
* Email
* Phone
* Piano Make
* Piano Type
* Status
* Created Date

Filters:

* Pending
* Under Review
* Contacted
* Sold
* Rejected

Actions:

* View
* Edit
* Delete

Bulk Actions:

* Change Status
* Delete

---

## File Storage

Store images in:

storage/app/public/sell-my-piano

Save image paths as JSON.

Use Laravel Storage facade.

---

## Backend Requirements

Generate:

* Migration
* Model
* Form Request
* Service Class
* API Controller
* API Resource
* Routes
* Filament Resource

Business logic must be handled inside Service classes.

Controllers must remain thin.

Use Form Request validation.

Use API Resources.

---

## Frontend Requirements

Create:

pages/
SellMyPianoPage.jsx

components/sell-piano/

HeroSection.jsx

ValuationFormCard.jsx

ValuationModal.jsx

PersonalDetailsStep.jsx

PianoDetailsStep.jsx

AddressDetailsStep.jsx

SuccessStep.jsx

services/

sellMyPianoService.js

Use:

* React
* Tailwind CSS
* Axios
* React Hook Form

---

## UI Requirements

Match provided screenshots.

Requirements:

* Full width layout
* Luxury piano auction styling
* Dark hero image overlay
* White valuation card
* Multi-step modal wizard
* Mobile responsive
* Desktop responsive

Use existing site branding and navigation.

Keep implementation modular and MVP-friendly.
