# Grand Pianos Feature Specification

## Routes

`/shop/grand-pianos` — Listing page

`/shop/grand-pianos/:slug` — Piano detail page

---

# PAGE 1 — Grand Pianos Listing

## Goal

Recreate the Grand Pianos catalogue/listing page.

Reference:

https://pianoauctions.co.uk/shop/grand-pianos/

Use Image 1 screenshot as primary design reference.

---

## 1. Hero Banner

Full width.

Background: dark piano warehouse/showroom image with overlay.

Breadcrumb:

Home > Grand Pianos

Heading:

Grand Pianos

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

* Piano image (if available; fallback to Piano Auctions Ltd logo placeholder with "Awaiting Images..." text)
* Piano name / title (e.g. – August Förster (c1975) Grand Piano –)
* Estimate (e.g. | Est. £1,000-£1,500)

Clicking a card navigates to `/shop/grand-pianos/:slug`

Hover effect: subtle shadow or border highlight.

---

## Static Piano Data

Use the following pianos as static data (no backend required):

```js
const grandPianos = [
  { slug: "august-forster-c1975", name: "August Förster (c1975) Grand Piano", est: "£1,000-£1,500", hasImage: true },
  { slug: "bechstein-c1938", name: "Bechstein (c1938) Grand Piano", est: "£1,200-£1,800", hasImage: false },
  { slug: "yamaha-c1977", name: "Yamaha (c1977) Grand Piano", est: "£2,500-£3,500", hasImage: false },
  { slug: "yamaha-c1987", name: "Yamaha (c1987) Grand Piano", est: "£4,000-£6,000", hasImage: false },
  { slug: "kawai-c1991", name: "Kawai (c1991) Grand Piano", est: "£3,000-£5,000", hasImage: false },
  { slug: "bechstein-c1960", name: "Bechstein (c1960) Grand Piano", est: "£6,000-£8,000", hasImage: false },
  { slug: "steinway-c1884", name: "Steinway (c1884) Grand Piano", est: "£15,000-£20,000", hasImage: false },
  { slug: "steinway-c1905", name: "Steinway (c1905) Grand Piano", est: "£10,000-£15,000", hasImage: false },
  { slug: "steinway-c1925", name: "Steinway (c1925) Grand Piano", est: "£20,000-£25,000", hasImage: true },
  { slug: "bechstein-c2000", name: "Bechstein (c2000) Grand Piano", est: "£10,000-£15,000", hasImage: true },
];
```

---

## SEO

Title:

Grand Pianos | Piano Auctions Ltd

Meta Description:

Buy your piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.

---

---

# PAGE 2 — Piano Detail Page

## Goal

Recreate the individual piano listing/detail page.

Reference:

https://pianoauctions.co.uk/august-forster-c1975-grand-piano-est-1000-1500/

Use Image 2 screenshot as primary design reference.

---

## 1. Piano Detail — Top Section

Two-column layout:

Left: Image gallery

Right: Piano info + action buttons

### Left — Image Gallery

Large primary image with zoom icon (magnifier).

Thumbnail strip below with all additional images.

Clicking thumbnail updates the primary image.

Clicking the zoom icon opens a lightbox / full-screen view.

### Right — Piano Info

Piano title:

e.g. – August Förster (c1975) Grand Piano – | Est. £1,000-£1,500

Category badge / tag:

Grand Piano (links to `/shop/grand-pianos`)

Short description:

e.g. A 6ft 3in (191cm) grand piano in a bright ebonised case on square tapered legs; together with a stool.

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

Action: smooth scroll to `#booking-bidding` section on the same page (Book Your Appointment / Register To Bid section)

#### Book Viewing

Style: blue filled button

Action: smooth scroll to `#booking-bidding` section on the same page

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

Left side content:

Heading:

Insure This Piano!

Description:

Exciting news! Piano Auctions has partnered with Lark Insurance who offer specialised piano insurance. This collaboration ensures that your recently purchased piano is protected with comprehensive coverage that suits your needs.

Button:

GET YOUR QUOTE

Style: outlined/ghost button, white border and white text

Right side:

Lark Music Insurance logo

"Part of HOWDEN" text

---

## 4. Book Appointment / Register To Bid

Section ID: `booking-bidding`

(Bid On Piano and Book Viewing buttons both scroll here)

Two side-by-side cards:

### Card 1 — Book Your Appointment

Label (pill/badge above card, purple background):

PIANO VIEWING APPOINTMENTS

Card heading:

Book Your Appointment

Description:

Book your viewing appointment, play our pianos for sale to find your perfect one before buying a piano at auction.

Two sub-options inside card:

**EU Auction View →**

Text: Our Auction Views June TBC – EU / (TBC) Auction. PLEASE MAKE SURE YOU HAVE READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking Fees...

**UK Auction View →**

Text: Our Auction Views June 19th – UK / (22nd June 2026) – UK (22nd June). Auction. PLEASE MAKE SURE YOU HAVE READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking Fees...

### Card 2 — Register To Bid

Label (pill/badge above card, blue background):

ONLINE BIDDING

Card heading:

Register To Bid

Description:

Bid for your favourite piano or watch the latest auction live with easyliveauction.com

Two buttons:

**🇬🇧 UK – BID NOW**

Action: navigates to auction portal URL (already configured, use placeholder `/auction-portal`)

**OTHER WAYS TO BID**

Action: navigates to `/bidding`

---

## 5. Get A Piano Delivery Quote

Section heading:

Get A Piano Delivery Quote

Sub-heading:

If you are buying a piano, get a quote to have it delivered.

Multi-step form with 3 steps. Progress indicator at top showing:

Step 1: Personal details

Step 2: Piano details

Step 3: Delivery details

### Step 1 — Personal Details

Fields:

* First Name (required)
* Last Name (required)
* Email (required)
* Phone (required)

Button: **Next**

### Step 2 — Piano Details

Fields:

* Piano Make
* Piano Model
* Piano Type (dropdown: Grand Piano / Upright Piano)
* Estimated Value

Button: **Next**

### Step 3 — Delivery Details

Fields:

* Address Line 1 (required)
* Address Line 2
* City (required)
* Postcode (required)
* Are there stairs? (Yes / No toggle or radio)
* If yes: Number of stairs (number input)
* Additional delivery notes (textarea)

Button: **Submit**

On submit: show a success message:

"Thank you! We will be in touch with your delivery quote shortly."

---

## 6. Frequently Asked Questions

Section heading:

Frequently Asked Questions

Accordion FAQ items (collapsed by default):

* What Kind of Pianos Can I Buy?
* Can I View The Pianos In The Auctions?
* How Do I Take Part In Your Piano Auctions?
* How Will My Piano be Delivered?

Each item:

* Plus (+) icon right-aligned, toggles to minus (−) on open
* Divider line between each item
* Smooth open/close animation

Background: white

---

## SEO

Title:

[Piano Name] | Piano Auctions Ltd

Meta Description:

[Piano short description] — Est. [price range]. Bid online or in person at Piano Auctions Ltd.

---

## Components

Create:

* GrandPianosPage.jsx — listing grid
* PianoCard.jsx — individual card in grid
* PianoDetailPage.jsx — full detail page
* PianoImageGallery.jsx — main image + thumbnails + lightbox
* PianoAccordion.jsx — Condition Report / Additional Info accordions
* ImportantInformationBanner.jsx — ivory notice
* InsureBanner.jsx — Lark Insurance banner
* BookingBiddingSection.jsx — Book Appointment + Register To Bid cards
* DeliveryQuoteForm.jsx — multi-step delivery quote form
* PianoFAQ.jsx — FAQ accordion at bottom

---

## Routing

`/shop/grand-pianos` → GrandPianosPage

`/shop/grand-pianos/:slug` → PianoDetailPage (look up piano by slug from static data)

---

## Design Rules

Match provided screenshots exactly.

Use same design language as:

* Home page
* FAQ page
* News & Insights

Luxury auction styling.

Fully responsive.

Desktop:

Piano detail — two column (image left, info right)

Booking section — two cards side by side

Delivery form — centred card, max-width ~600px

Mobile:

Piano detail — stacked (image top, info below)

Booking section — stacked cards

Grid — 2 columns