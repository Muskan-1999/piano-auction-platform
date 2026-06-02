# Delivery Page

## Route

`/delivery`

---

# Goal

Create a luxury piano delivery page that exactly replicates the supplied Delivery page screenshot.

Reference screenshot is the primary design source.

Match:

* Layout
* Typography
* Spacing
* Colors
* Card styling
* Form styling
* Section spacing
* Hero design

Use the same design language as:

* Home Page
* Sell My Piano
* Value My Piano
* About Us
* FAQ
* Auction Calendar

---

# Backend

Delivery Quote backend already exists.

DO NOT create new database tables.

DO NOT create new migrations.

DO NOT create new models.

Reuse the existing Delivery Quote API and database structure.

Use the same fields already implemented in the backend.

The same delivery quote submission process should be used.

---

# Page Structure

---

## Section 1 — Hero Banner

Full-width hero image.

Use supplied delivery banner image.

Dark overlay.

Centered content.

Display:

Small Label:

PIANO AUCTIONS LTD

Main Heading:

Delivery

Breadcrumb:

Home > Delivery

Hero height:

400px–500px desktop

Responsive on mobile.

---

## Section 2 — Delivery Introduction

Background:

White

Centered content.

Heading:

Our Simple Ways To Get Your Piano Delivered

Description:

Explain:

All pianos purchased at auction must be removed from the auction venue before the collection deadline.

Customers may arrange collection through approved piano transport companies.

Storage and transfer charges may apply if collection deadlines are missed.

Include a reference to Terms & Conditions.

Centered CTA Button:

Get Your Delivery Quote

Button scrolls to quote form section.

---

## Section 3 — Delivery Partners

Background:

Black

Padding top and bottom.

Three cards in a row.

Desktop:

3 columns

Tablet:

2 columns

Mobile:

1 column

---

### Card 1

Griffin Transport UK

Logo/Image

Description:

Professional UK piano transportation and collection service.

Website Button:

View Website

External URL:

https://griffintransport.co.uk

Open in new tab.

---

### Card 2

Butler Smith Piano Carriers

Logo/Image

Description:

Specialist piano transport and delivery company.

Website Button:

View Website

External URL:

https://www.butlersmith.co.uk

Open in new tab.

---

### Card 3

Griffioen Transport (EU)

Logo/Image

Description:

European piano transportation specialist.

Website Button:

View Website

External URL:

https://griffioentransport.nl

Open in new tab.

---

Card Design

Match screenshot exactly.

White card.

Image/logo at top.

Content section underneath.

Border styling.

Hover effect.

---

## Section 4 — Delivery Quote Form

Background:

White

Centered section.

Small Label:

PIANO AUCTIONS LTD

Heading:

Get A Delivery Quote

Use same multi-step design language as:

* Sell My Piano
* Value My Piano

---

# Form Wizard

Three-step form.

Use existing backend fields.

Unauthenticated users can submit.

No login required.

---

## Step 1 — Personal Details

Fields:

First Name *
Last Name *
Email *
Phone *

Validation:

Required

Next Button

---

## Step 2 — Piano Details

Use fields already available in Delivery Quote backend.

Example:

Piano Type *
Piano Make *
Piano Model
Dimensions
Floor Level
Lift Available
Access Restrictions
Special Instructions

Required fields should match backend validation.

Next Button

Previous Button

---

## Step 3 — Delivery Details

Use fields already available in backend.

Include:

Collection Address Line 1 *
Collection Address Line 2
Collection City *
Collection Postcode *
Collection Country *

Delivery Address Line 1 *
Delivery Address Line 2
Delivery City *
Delivery Postcode *
Delivery Country *

Preferred Delivery Date

Additional Notes

Previous Button

Submit Button

---

# Success State

After successful submission:

Show modal.

Title:

Quote Request Submitted

Message:

Thank you for requesting a delivery quote.

Our team will review your request and contact you shortly.

Button:

Close

Reset form after successful submission.

---

# API Integration

Use existing backend endpoints.

Do not create new APIs.

Use existing Delivery Quote service.

Create:

services/deliveryQuoteService.js

Handle:

Create quote

Validation errors

Loading states

Success states

---

# Further Information

Reuse existing component.

Do not duplicate code.

Section title:

Further Information

Cards:

Buy a Piano
Sell My Piano
Value My Piano

Same implementation already used on:

* FAQ
* Auction Calendar
* Beginners Guide

---

# SEO

Title:

Delivery | Piano Auctions Ltd

Meta Description:

Arrange piano collection and delivery through our trusted piano transport partners and request a delivery quote online.

---

# Components

Create:

pages/DeliveryPage.jsx

components/delivery/DeliveryHero.jsx

components/delivery/DeliveryIntro.jsx

components/delivery/DeliveryPartners.jsx

components/delivery/DeliveryQuoteForm.jsx

services/deliveryQuoteService.js

---

# Design Requirements

Replicate screenshot exactly.

Luxury piano auction styling.

Large typography.

Generous spacing.

Smooth hover effects.

Smooth step transitions.

Responsive.

Desktop:

Three delivery partner cards in one row.

Mobile:

Single column.

Maintain consistency with entire Piano Auctions platform.

Use existing Navbar, Footer, SEO, Layout, and FurtherInformation components.
