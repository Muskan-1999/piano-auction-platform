# Value My Piano Feature Specification

## Overview

Create a complete "Value My Piano" feature for the Piano Auction Platform.

Route:

/value-my-piano

This feature allows visitors (authenticated or unauthenticated) to submit a piano valuation request.

The page design should closely replicate the provided Value My Piano reference screenshot and follow the styling of Piano Auctions UK.

---

## Goals

* Public valuation request form
* Multi-step modal form
* Guest submissions allowed
* Store valuation requests in database
* Manage requests through Filament Admin
* Mobile responsive
* Match provided UI reference

---

## Frontend Stack

* React
* Tailwind CSS
* React Router
* Axios
* React Hook Form

---

## Backend Stack

* Laravel 11
* Sanctum
* Filament 3
* MySQL

---

# Page Layout

## Hero Section

Full-width hero section.

Background image:

Use the provided reference image.

Layout:

Left Side:

* Breadcrumb
* Small subtitle:
  "Professional Written Piano Valuation"
* Large heading:
  "Value My Piano"
* Description text

Right Side:

* White valuation form card
* Same design as provided screenshot

Height:

* 650px desktop
* Responsive mobile

Overlay:

* Dark transparent overlay over image

---

# Valuation Form

Display inside hero card.

## Step 1: Personal Details

Fields:

* First Name *
* Last Name *
* Email *
* Phone *

Button:

Next

Validation:

All required.

---

## Step 2: Piano Details

Fields:

### Valuation Type

Dropdown

Options:

* Auction Valuation
* Insurance Valuation
* Probate Valuation
* Private Sale Valuation

### Piano Type

Dropdown

Options:

* Upright Piano
* Grand Piano
* Baby Grand Piano
* Digital Piano
* Player Piano
* Other

### Piano Make

Text

### Piano Model

Text

### Piano Colour

Text

### Serial Number

Text

### Dimensions

Text

### Ivory Keys

Dropdown

Options:

* Yes
* No
* Unknown

### Tuned

Dropdown

Options:

* Yes
* No

### Reconditioned

Dropdown

Options:

* Yes
* No

### Ownership History

Textarea

### Piano Images

Upload

Maximum:
5 images

Accepted:

* jpg
* jpeg
* png
* webp

Button:

Next

Back button available.

---

## Step 3: Address Details

Fields:

### Address Line 1 *

Text

### Address Line 2

Text

### Postcode *

Text

### Country *

Dropdown

Default:

United Kingdom

Button:

Submit Valuation Request

Back button available.

---

# Success State

After successful submission:

Close current step.

Display success modal.

Title:

Valuation Request Submitted

Message:

Thank you for your valuation request.

Our piano specialists will review your submission and contact you shortly.

Button:

Close

---

# Database Structure

Table:

value_my_pianos

Columns:

id

first_name
string

last_name
string

email
string

phone
string

valuation_type
string

piano_type
string

piano_make
string

piano_model
string

piano_colour
string

serial_number
string nullable

dimensions
string nullable

ivory_keys
string nullable

tuned
string nullable

reconditioned
string nullable

ownership_history
text nullable

address_line_1
string

address_line_2
string nullable

postcode
string

country
string

status
string default 'new'

notes
text nullable

created_at
timestamp

updated_at
timestamp

---

# File Uploads

Store images using Laravel Storage.

Folder:

value-my-pianos

Save uploaded image paths in separate table:

value_my_piano_images

Fields:

id
value_my_piano_id
image_path
created_at
updated_at

Relationship:

ValueMyPiano
hasMany images

---

# API Endpoints

POST

/api/value-my-piano

Create valuation request.

GET

/api/value-my-piano/options

Return dropdown options.

---

# Filament Admin

Navigation Group:

Customer Requests

Menu Label:

Value My Piano

Icon:

Heroicon::OutlinedCurrencyPound

Columns:

* ID
* Name
* Email
* Phone
* Piano Make
* Piano Type
* Valuation Type
* Country
* Status
* Created At

Filters:

* Status
* Piano Type
* Valuation Type

Actions:

* View
* Edit
* Delete

Status Options:

* New
* Contacted
* In Review
* Completed

---

# Page Sections Below Hero

Replicate the layout shown in the provided screenshot.

## Section 1

Formal Written Piano Valuation

Image right
Content left

Button:

Contact Us

---

## Section 2

View Our Past Piano Auctions

Dark promotional block.

Button:

View Piano Auction Catalogue

---

## Section 3

About Us

Image + content split layout.

Button:

Read More About Us

---

## Section 4

Piano Brands We Value

Carousel slider.

Example brands:

* Yamaha
* Steinway & Sons
* Kawai
* Bosendorfer
* Bluthner
* Bechstein
* Petrof
* Schimmel

---

## Footer

Reuse existing website footer component.

---

# Important Requirements

* Allow guest submissions
* No login required
* Use FormData uploads
* Validate backend requests
* Store uploaded images securely
* Use service classes for business logic
* Use API-first architecture
* Follow existing project structure
* Keep implementation modular
* Match provided screenshot closely
* Use responsive design
* Use React modal for multi-step form
