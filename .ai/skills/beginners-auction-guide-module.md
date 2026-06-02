# Beginner Auction Guide Page

## Route

`/beginners-auction-guide`

---

# Goal

Create a premium luxury piano auction guide page that exactly replicates the supplied UI design.

Reference screenshot is the primary source of truth.

The page must visually match:

* Layout
* Typography
* Spacing
* Colors
* Button styles
* Card styles
* Section hierarchy

Use the same design language as:

* Home Page
* About Us Page
* FAQ Page
* Auction Calendar Page
* News & Insights Page

---

# PDF Downloads

Two PDF files already exist.

## UK Guide

PAL-Beginners-Guide-Online-New.pdf

## EU Guide

PAL-Beginners-Guide-Online-New-Dutch-German.pdf

Store inside:

storage/app/public/guides/

Downloads must be real file downloads.

No placeholder buttons.

---

# Page Structure

---

## Section 1 — Hero Content

Background:

White

Container:

max-width container

Two-column layout.

Desktop:

50 / 50 split

Mobile:

Single column

---

### Left Column

Display decorative vertical black accent line.

Large heading:

Beginner's Auction Guide for Piano Auctions

Breadcrumb:

Home > Beginners Auction Guide

Body content:

Explain:

* Buying a piano at auction
* Viewing pianos
* Registration
* Online bidding
* Telephone bidding
* Absentee bidding
* Payment process
* Collection and delivery

Content should match luxury piano auction tone.

Use same typography as screenshot.

---

### Right Column

Large piano warehouse image.

Use provided image assets.

Image should:

* Fill container
* Maintain aspect ratio
* Rounded corners optional
* Match screenshot positioning

---

## Section 2 — Guide Features

Background:

#f7f7f7

Centered content.

Large heading:

What our beginners auction guide includes:

Display features using check icons.

Items:

✓ Viewing Process

✓ Registration Steps

✓ Types of Bidding

✓ Auction Process

✓ Commission & Charges

✓ Payment Process

✓ Checklists & Extras

Layout:

Desktop:
Horizontal rows

Tablet:
2-column grid

Mobile:
Single column

Use generous spacing.

---

## Section 3 — Download Guide Area

Large horizontal divider.

Centered button row.

Buttons:

### Button 1

Download Beginners Guide (UK)

Downloads:

PAL-Beginners-Guide-Online-New.pdf

### Button 2

Download Beginners Guide (EU)

Downloads:

PAL-Beginners-Guide-Online-New-Dutch-German.pdf

Button styling:

* White background
* Black border
* Download icon
* Hover transition
* Match screenshot

Desktop:
Side by side

Mobile:
Stacked

---

# Backend Requirements

Create controller:

GuideDownloadController

Route:

GET /api/guides/download/{type}

Supported values:

uk
eu

Mapping:

uk => PAL-Beginners-Guide-Online-New.pdf

eu => PAL-Beginners-Guide-Online-New-Dutch-German.pdf

Use:

Storage::disk('public')

Return:

response()->download()

Validation:

404 if invalid type supplied.

---

# React Service

Create:

services/guideService.js

Methods:

downloadUkGuide()

downloadEuGuide()

These methods should trigger browser downloads.

---

# Further Information Section

Reuse existing component.

DO NOT duplicate code.

Use the same Further Information section already implemented on:

* FAQ
* About Us
* Auction Calendar

Dark luxury background.

Section label:

USE OUR SERVICES TODAY

Heading:

Further Information

Cards:

## Buy a Piano

Image:
Warehouse / piano image

Description:
Learn about our online piano auctions and how to purchase the perfect grand or upright piano.

Button:
Read More

Route:
/buy-a-piano

---

## Sell My Piano

Image:
Piano showroom image

Description:
Find out how to sell your instrument in one of our world-leading auctions.

Button:
Read More

Route:
/sell-my-piano

---

## Value My Piano

Image:
Valuation image

Description:
Find out how much your piano is worth at auction.

Button:
Read More

Route:
/value-my-piano

---

# SEO

Title:

Beginner Auction Guide | Piano Auctions Ltd

Meta Description:

Download our beginner piano auction guide and learn how to buy a piano safely and confidently at auction.

---

# Components

Create:

pages/BeginnersAuctionGuidePage.jsx

components/guides/GuideHero.jsx

components/guides/GuideFeatures.jsx

components/guides/GuideDownloads.jsx

services/guideService.js

app/Http/Controllers/Api/GuideDownloadController.php

---

# Design Requirements

Match screenshot exactly.

Luxury piano auction styling.

Large typography.

Generous whitespace.

Subtle hover effects.

Responsive across:

* Desktop
* Tablet
* Mobile

No placeholder content.

No dummy buttons.

All download buttons must work.

Use existing site layout components:

* Navbar
* Footer
* Further Information section

Maintain consistency across the entire platform.
