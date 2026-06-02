# viewing-appointments.md

## Route

`/viewing-appointments`

## Goal

Replicate Piano Auctions Ltd Viewing Appointments page exactly as per provided screenshots.

Must support:

* UK Auction View bookings
* EU Auction View bookings
* Date selection
* Time slot selection
* Appointment booking
* Confirmation message

---

## Backend

Backend already exists.

Use existing APIs:

### Available Dates

GET `/api/viewing-appointments/available-dates?type=uk`

### Available Slots

GET `/api/viewing-appointments/available-slots?type=uk&date=YYYY-MM-DD`

### Create Appointment

POST `/api/viewing-appointments`

---

## Page Sections

### 1. Hero Section

White background.

Content:

* Viewing Appointments
* Breadcrumb
* Description text
* Upcoming viewing dates

Display upcoming auction viewing dates dynamically from API.

---

### 2. Appointment Booking Widget

Main feature of page.

Large centered white card.

#### Default State

Show:

* Piano Auctions logo
* Welcome text
* EU Auction View option
* UK Auction View option

Clicking either option opens booking flow.

---

#### Calendar State

Two-column layout.

##### Left Panel

Show:

* Back button
* Logo
* Auction Type
* Duration (1 Hour)
* Location
* Booking Instructions
* Opening Times

##### Right Panel

Custom Calendar Component.

Requirements:

* No external date picker
* Fetch available dates from API
* Available dates highlighted
* Non-available dates disabled
* Selected date active state
* Month navigation

---

#### Time Slot State

After date selection:

Fetch available slots.

Display:

* 09:00
* 10:00
* 11:00
* etc

Selecting slot reveals:

* Confirm button

---

#### Booking Form State

Fields:

* First Name
* Last Name
* Email
* Phone
* Number Of Guests
* Notes

Submit via:

POST `/api/viewing-appointments`

Success:

Show confirmation message.

---

### 3. Auction Calendar Section

Background:
`#f5ede4`

Reuse existing Auction Calendar component/page.

Display:

* Upcoming Events label
* Auction Calendar heading
* Carousel of upcoming auctions
* View Auction Calendar button

Button URL:

`/auction-calendar`

---

### 4. Auction Location Section

White background.

Display two cards.

#### UK Location

Piano Auctions Ltd

1 Sydney Road
Watford
WD18 7XX

Google Map Embed

---

#### EU Location

Piano Auctions Ltd

Schumanweg 1
2411 NH Bodegraven
Netherlands

Google Map Embed

---

### 5. Brands Carousel

Reuse existing brand carousel.

Display:

* Fazioli
* Essex
* Boston
* Bösendorfer
* Blüthner

Same design used across site.

---

## Components

Create:

* ViewingAppointmentsPage.jsx
* ViewingHero.jsx
* BookingWidget.jsx
* BookingDefault.jsx
* BookingCalendar.jsx
* BookingTimeSlots.jsx
* BookingForm.jsx
* AuctionCalendarSection.jsx
* AuctionLocationSection.jsx
* BrandsCarousel.jsx

---

## Design Requirements

Must exactly match provided screenshots.

Use existing Piano Auctions design system:

* Luxury styling
* Serif headings
* Large whitespace
* Thin borders
* Warm cream sections
* Responsive layout

Desktop:

* Two-column booking widget

Tablet:

* Stacked layout

Mobile:

* Fully responsive

---

## SEO

Title:

Viewing Appointments | Piano Auctions Ltd

Description:

Book your piano viewing appointment with Piano Auctions Ltd before our upcoming auction.
