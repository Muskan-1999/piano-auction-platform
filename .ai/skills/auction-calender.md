# Auction Calendar Feature Specification

## Route

`/auction-calendar`

---

# Goal

Create the Auction Calendar page matching the provided design reference.

Reference:

* Uploaded Auction Calendar screenshot
* Existing Piano Auctions Ltd design system

Backend already exists.

Consume auction data from existing API.

---

# API Integration

Use existing auction endpoint.

Example:

GET /api/auctions

Display:

* Published auctions only
* Upcoming auctions only
* Ordered by auction date ascending

Do not create backend code.

Frontend only.

---

# Hero Section

Full-width hero banner.

Background:

Luxury piano warehouse image.

Overlay:

Dark overlay.

Content:

Small Label:

PIANO AUCTIONS LTD

Main Heading:

Auction Calendar

Breadcrumb:

Home > Auction Calendar

Layout:

Centered vertically.

Height:

500px desktop

350px mobile

---

# Auction Carousel Section

Background:

White

Container:

max-width 1280px

Centered.

Padding top/bottom:

80px+

---

# Auction Carousel

Use Swiper.js.

Show all auctions returned by API.

Desktop:

3 cards

Tablet:

2 cards

Mobile:

1 card

Features:

* Navigation arrows
* Pagination dots
* Infinite loop
* Smooth transitions

---

# Auction Card Design

Replicate screenshot exactly.

Card Structure:

Image

Auction Title

Date & Time

Venue Address

View Event Link

Example:

UK Piano Auction 23rd June 2026

12:00 pm – 5:00 pm

1 Sydney Road
Watford
WD18 7XX

View Event

---

# View Event

Link to:

`/auction/{slug}`

Use slug returned by API.

---

# Loading State

Show skeleton cards while loading.

Minimum:

3 placeholder cards.

---

# Empty State

If no auctions exist:

"No upcoming auctions currently available."

---

# Further Information Section

Replicate screenshot exactly.

Background:

Black luxury patterned section.

Heading:

USE OUR SERVICES TODAY

Title:

Further Information

Three cards:

Buy a Piano

Sell My Piano

Value My Piano

Each contains:

* Image
* Title
* Description
* Read More button

Links:

Buy a Piano → /buy-a-piano

Sell My Piano → /sell-my-piano

Value My Piano → /value-my-piano

---

# Components

Create:

AuctionCalendarPage.jsx

AuctionHero.jsx

AuctionCarousel.jsx

AuctionCard.jsx

AuctionSkeleton.jsx

FurtherInformation.jsx

---

# SEO

Title:

Auction Calendar | Piano Auctions Ltd

Meta Description:

Browse upcoming piano auctions and auction dates from Piano Auctions Ltd.

---

# Design Requirements

Match the provided screenshot as closely as possible.

Maintain:

* Luxury styling
* Serif headings
* Large whitespace
* Elegant card layout
* Fully responsive

Reuse existing:

* Navbar
* Footer

Follow project architecture.
