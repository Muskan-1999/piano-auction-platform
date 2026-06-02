# FAQ Feature Specification

## Route

`/faq`

## Goal

Recreate the Piano Auctions Ltd FAQ page.

Reference:

https://pianoauctions.co.uk/faq/

Use provided screenshot as primary design reference.

---

# Page Sections

## 1. General Information

Section title:

General Information

Left-aligned with decorative left border accent.

Accordion FAQ items:

* Who are Piano Auctions Limited?
* How can I contact Piano Auctions Limited?
* Where are the auctions held?
* What is your privacy policy?
* How do I stay updated on upcoming auctions and events?

Each item:

* Collapsed by default
* Expand/collapse on click
* Plus (+) icon toggles to minus (−) on open
* Smooth open/close animation
* Divider line between each item

Background:

White

---

## 2. Buying A Piano At Auction

Section title:

Buying A Piano At Auction

Left-aligned with decorative left border accent.

Accordion FAQ items:

* How do I participate/register for an auction?
* What types of pianos are available for auction?
* Can I view the pianos before bidding?
* How can I place a bid?
* What payment methods are accepted?
* What if I cannot attend the auction in person?
* How do I arrange for the delivery of my purchased piano?
* Are there any guarantees on the pianos sold?

Each item:

* Collapsed by default
* Expand/collapse on click
* Plus (+) icon toggles to minus (−) on open
* Smooth open/close animation
* Divider line between each item

Background:

Warm cream / light beige (`#f5ede4` or equivalent)

---

## 3. Selling A Piano At Auction

Section title:

Selling A Piano At Auction

Left-aligned with decorative left border accent.

Accordion FAQ items:

* How do I sell my piano through Piano Auctions Limited?
* What are the fees for selling a piano?
* What is the process for consigning my piano to an auction?
* How should I prepare my piano for sale?
* When will I receive payment for my sold piano?
* What happens if my piano does not sell?
* Can I set a reserve price for my piano?
* How will my piano be marketed?
* Are there any restrictions on the types of pianos you accept for auction?

Each item:

* Collapsed by default
* Expand/collapse on click
* Plus (+) icon toggles to minus (−) on open
* Smooth open/close animation
* Divider line between each item

Background:

White

---

## 4. Further Information

Section label (small caps, above heading):

USE OUR SERVICES TODAY

Section title:

Further Information

Three info cards displayed in a row:

### Piano Prices

Image of pianos in warehouse/showroom.

Description text below image.

Read More button.

### Our Auctions

Image of grand pianos at auction.

Description text below image.

Read More button.

### Value My Piano

Image of upright or grand piano.

Description text below image.

Read More button.

Background:

Dark / black

Cards contain:

* Full-width image
* Title
* Short description
* Read More button (outlined or ghost style)

Hover effect on cards.

---

## Components

Create:

* FaqPage.jsx
* FaqSection.jsx
* FaqAccordion.jsx
* FaqItem.jsx
* FurtherInformation.jsx

---

## SEO

Title:

FAQ | Piano Auctions Ltd

Meta Description:

Frequently asked questions about buying and selling pianos at auction with Piano Auctions Limited.

---

## Design Rules

Match provided screenshot exactly.

Use same design language as:

* Home page
* News & Insights
* Sell My Piano

Luxury auction styling.

Section backgrounds alternate between white and warm cream for buying section.

Further Information section uses dark/black background.

Left border accent on all section headings (thin vertical line, dark colour).

Accordion items separated by full-width horizontal dividers.

Plus/minus icon right-aligned on each accordion row.

Fully responsive.

Desktop:

Two-column layout — section heading left, accordion items right.

Mobile:

Single column, section heading stacked above accordion items.