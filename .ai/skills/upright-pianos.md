# Upright Pianos Feature Specification

## Routes

`/shop/upright-pianos` — Listing page

`/shop/upright-pianos/:slug` — Piano detail page

---

# PAGE 1 — Upright Pianos Listing

## Goal

Recreate the Upright Pianos catalogue/listing page.

Reference:

https://pianoauctions.co.uk/shop/upright-pianos/

Use Image 1 screenshot as primary design reference.

---

## 1. Hero Banner

Full width.

Background: dark piano warehouse/showroom image with overlay.

No breadcrumb (heading only).

Heading:

Upright Pianos

Description:

Buy your piano at auction with our trust experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.

---

## 2. Piano Grid

Responsive grid of piano cards.

Desktop: 5 columns

Tablet: 3 columns

Mobile: 2 columns

### Piano Card

Contains:

* Piano image (if `image` is null, show Piano Auctions Ltd logo placeholder with "Awaiting Images..." text)
* Piano name / title
* Estimate (display exactly as provided, including "Plus VAT" where present)

Clicking a card navigates to `/shop/upright-pianos/:slug`

Hover effect: subtle shadow or border highlight.

---

## Static Piano Data

```js
const uprightPianos = [
  {
    slug: "yamaha-c1984-upright-piano-est-1800-2200-plus-vat",
    name: "Yamaha (c1984) Upright Piano",
    est: "£1,800-£2,200 Plus VAT",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "yamaha-c1979-upright-piano-est-1800-2200-plus-vat",
    name: "Yamaha (c1979) Upright Piano",
    est: "£1,800-£2,200 Plus VAT",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "yamaha-c1987-upright-piano-est-1400-1800-plus-vat",
    name: "Yamaha (c1987) Upright Piano",
    est: "£1,400-£1,800 Plus VAT",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "kawai-c1973-upright-piano-est-800-1200-plus-vat",
    name: "Kawai (c1973) Upright Piano",
    est: "£800-£1,200 Plus VAT",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "liedermann-upright-piano-est-1200-1800-plus-vat",
    name: "Liedermann Upright Piano",
    est: "£1,200-£1,800 Plus VAT",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "yamaha-c2008-upright-piano-est-2500-3500",
    name: "Yamaha (c2008) Upright Piano",
    est: "£2,500-£3,500",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "steinmeyer-upright-piano-est-300-400",
    name: "Steinmeyer Upright Piano",
    est: "£300-£400",
    image: null,
    description: "Awaiting description.",
  },
  {
    slug: "yamaha-c1979-upright-piano-est-2000-2500",
    name: "Yamaha (c1979) Upright Piano",
    est: "£2,000-£2,500",
    image: "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17891Jun26-600x624.jpg",
    images: [
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17891Jun26.jpg",
    ],
    description: "A Model U3 upright piano in a traditional bright ebonised case; together with a stool.",
  },
  {
    slug: "schimmel-c1991-upright-piano-est-1800-2200",
    name: "Schimmel (c1991) Upright Piano",
    est: "£1,800-£2,200",
    image: "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26201-600x450.jpg",
    images: [
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26201.jpg",
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26202.jpg",
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17885Jun26203.jpg",
    ],
    description: "A Model T130 upright piano in a traditional bright walnut case.",
  },
  {
    slug: "petrof-c1997-upright-piano-est-800-1000",
    name: "Petrof (c1997) Upright Piano",
    est: "£800-£1,000",
    image: "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26201-600x800.jpg",
    images: [
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26201.jpg",
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26202.jpg",
      "https://pianoauctions.co.uk/wp-content/uploads/2026/05/17879Jun26203.jpg",
    ],
    description: "A Model Sonatina upright piano in a modern satin mahogany case.",
  },
];
```

> **Note:** Only pianos with confirmed live image URLs from pianoauctions.co.uk are populated. All others use `image: null` and display the "Awaiting Images..." placeholder. Add more entries as new pianos are listed.

---

## SEO

Title:

Upright Pianos | Piano Auctions Ltd

Meta Description:

Buy your upright piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.

---

---

# PAGE 2 — Upright Piano Detail Page

## Goal

Recreate the individual upright piano detail page.

Use Image 2 screenshot as primary design reference.

Design is identical to Grand Piano detail page — reuse the same components with `type="Upright Piano"` passed as a prop.

---

## 1. Piano Detail — Top Section

Two-column layout:

Left: Image gallery

Right: Piano info + action buttons

### Left — Image Gallery

Large primary image with zoom icon (magnifier).

Thumbnail strip below with all additional images (use `images[]` array from static data).

If only one image exists, hide thumbnail strip.

Clicking thumbnail updates the primary image.

Clicking the zoom icon opens a lightbox / full-screen view.

If `image` is null, show the Piano Auctions Ltd logo placeholder centred in the gallery area.

### Right — Piano Info

Piano title:

e.g. – Yamaha (c1982) Upright Piano – | Est. £2,000-£2,500

Category badge / tag:

Upright Piano (links to `/shop/upright-pianos`)

Short description from static data `description` field.

---

### Accordion Items (collapsed by default)

#### Condition Report

Content:

Available soon! This report is based on a cursory examination and is our opinion only. It does not constitute a guarantee and potential buyers should satisfy themselves about the lot before bidding.

#### Additional Information

Content:

Buyer's Premium: 24% plus VAT.

Delivery: Fill out our form below to receive your transport quote.

This piano is sold by Piano Auctions Ltd. For more information: info@pianoauctions.co.uk

---

### Action Buttons (three buttons in a row)

#### Enquire Now

Style: dark/black filled button

Action: navigates to `/contact`

#### Bid On Piano

Style: purple/violet filled button

Action: smooth scroll to `#booking-bidding` section

#### Book Viewing

Style: blue filled button

Action: smooth scroll to `#booking-bidding` section

---

## 2. Important Information Banner

Background: warm cream / light beige

Section title:

Important Information

Icon: prohibited/no symbol (circle with line)

Content:

**Ivory:** It is now illegal to sell a piano with an ivory keyboard dating post 1975 without an Ivory Registration Number. Pianos with ivory keyboards dating pre 1975 will have been registered with APHA on the government website. All pianos dating from 1947–1975 with ivory keys will have an Article 10 certificate in place.

---

## 3. Insure This Piano — Banner

Full-width dark/black background with piano image overlay.

Left side:

Heading: Insure This Piano!

Description: Exciting news! Piano Auctions has partnered with Lark Insurance who offer specialised piano insurance. This collaboration ensures that your recently purchased piano is protected with comprehensive coverage that suits your needs.

Button: GET YOUR QUOTE (outlined/ghost, white border and white text)

Right side: Lark Music Insurance logo + "Part of HOWDEN" text

---

## 4. Book Appointment / Register To Bid

Section ID: `booking-bidding`

Two side-by-side cards:

### Card 1 — Book Your Appointment

Label (pill/badge, purple background): PIANO VIEWING APPOINTMENTS

Heading: Book Your Appointment

Description: Book your viewing appointment, play our pianos for sale to find your perfect one before buying a piano at auction.

Two sub-options:

**EU Auction View →**

Text: Our Auction Views June TBC – EU / (TBC) Auction. PLEASE MAKE SURE YOU HAVE READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking Fees...

**UK Auction View →**

Text: Our Auction Views June 19th – UK / (22nd June 2026). Auction. PLEASE MAKE SURE YOU HAVE READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking Fees...

### Card 2 — Register To Bid

Label (pill/badge, blue background): ONLINE BIDDING

Heading: Register To Bid

Description: Bid for your favourite piano or watch the latest auction live with easyliveauction.com

Buttons:

**🇬🇧 UK – BID NOW** → navigates to `/auction-portal`

**OTHER WAYS TO BID** → navigates to `/bidding`

---

## 5. Get A Piano Delivery Quote

Section heading: Get A Piano Delivery Quote

Sub-heading: If you are buying a piano, get a quote to have it delivered.

Multi-step form — progress indicator at top:

Step 1: Personal details → Step 2: Piano details → Step 3: Delivery details

### Step 1 — Personal Details

* First Name (required)
* Last Name (required)
* Email (required)
* Phone (required)

Button: Next

### Step 2 — Piano Details

* Piano Make
* Piano Model
* Piano Type (dropdown: Grand Piano / Upright Piano) — default: Upright Piano
* Estimated Value

Button: Next

### Step 3 — Delivery Details

* Address Line 1 (required)
* Address Line 2
* City (required)
* Postcode (required)
* Are there stairs? (Yes / No toggle)
* If Yes: Number of stairs (number input)
* Additional delivery notes (textarea)

Button: Submit

On submit: show success message — "Thank you! We will be in touch with your delivery quote shortly."

---

## 6. Frequently Asked Questions

Section heading: Frequently Asked Questions

Accordion items (collapsed by default):

* What Kind of Pianos Can I Buy?
* Can I View The Pianos In The Auctions?
* How Do I Take Part In Your Piano Auctions?
* How Will My Piano be Delivered?

Plus (+) icon right-aligned, toggles to minus (−) on open. Divider between items. Smooth animation.

---

## Components

Reuse from Grand Pianos (pass props):

* UprightPianosPage.jsx — listing grid
* PianoCard.jsx — reuse, pass `category="upright"`
* PianoDetailPage.jsx — reuse, pass `type="Upright Piano"` and `backLink="/shop/upright-pianos"`
* PianoImageGallery.jsx — reuse
* PianoAccordion.jsx — reuse
* ImportantInformationBanner.jsx — reuse
* InsureBanner.jsx — reuse
* BookingBiddingSection.jsx — reuse
* DeliveryQuoteForm.jsx — reuse, default Piano Type to "Upright Piano"
* PianoFAQ.jsx — reuse

---

## Routing

`/shop/upright-pianos` → UprightPianosPage

`/shop/upright-pianos/:slug` → PianoDetailPage (look up by slug from static upright data)

---

## Design Rules

Identical to Grand Pianos pages.

Differences from Grand Piano detail:

* Category badge: "Upright Piano" → links to `/shop/upright-pianos`
* Delivery form Piano Type defaults to "Upright Piano"

Fully responsive.

Desktop: image left / info right. Booking cards side by side. Form centred max-width ~600px.

Mobile: stacked. Grid 2 columns.