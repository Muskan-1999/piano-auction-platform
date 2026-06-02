# Auction Catalogue Feature Specification

## Route

`/auction-catalogue`

## Goal

Recreate the Auction Catalogue page.

Reference:

https://pianoauctions.co.uk/auction-catalogue/

Use provided screenshot as primary design reference.

---

# Page Sections

## 1. Hero / Intro Section

Two-column layout.

### Left Column

Left border accent (thin vertical line, same as FAQ / News pages).

Breadcrumb above heading:

Home » Auction Catalogue

Heading:

Auction Catalogue

Sub-heading:

Pianos for sale

Body text:

View our full grand piano and upright piano catalogue of over 100 instruments featuring a range of prices and world-class makes and models, including Yamaha, Steinway and Kawai.

Our auction catalogue is a great way to view each of our pianos online in detail before booking a viewing appointment with our specialists to get the opportunity to play test the piano you're interested in and get some insider knowledge from our experts.

Two buttons (side by side):

**View Auction Catalogue**
- Style: dark/black filled button
- Action: smooth scroll to `#catalogue` section on the same page

**View Past Auction Results**
- Style: outlined/ghost button
- Action: navigates to `/past-auctions`

### Right Column

Catalogue cover image (static asset):

```
https://pianoauctions.co.uk/wp-content/uploads/2024/02/piano-auction-catalogue.jpg
```

Below the image, a download button:

**⬇ Download Catalogue**
- Style: outlined button with download icon
- Action: calls `GET /api/auctions/upcoming/download` which streams the `catalogue_pdf` of the upcoming auction as a browser file download
- If no catalogue PDF exists, disable the button and show tooltip: "No catalogue available yet"

---

## 2. CTA Strip

Full-width dark/black background strip.

Two buttons centred:

**View Past Auctions**
- Action: navigates to `/past-auctions`

**Get In Touch**
- Action: navigates to `/contact`

---

## 3. Upcoming Auction Catalogue Grid

Section ID: `catalogue`

### Data Source

`GET /api/auctions/upcoming`

Returns the single upcoming auction (status = `published`, start_time in the future) with all its lots.

### Auction Date Heading

Display formatted auction date above the grid.

Format the `start_time` field from the API response.

e.g. **23rd June 2026**

### "Catalogue Available Soon" State

If the API returns no upcoming auction (null), hide the grid entirely and show a centred block:

```
PIANO AUCTIONS LTD
Catalogue Available Soon.
```

With two buttons below:

- **View Past Auctions** → `/past-auctions`
- **Get In Touch** → `/contact`

### Piano Grid

Responsive grid of lot cards.

Desktop: 5 columns
Tablet: 3 columns
Mobile: 2 columns

### Lot Card

Fields from the `lots` table:

- `featured_image` — show as card image; if null show Piano Auctions Ltd logo placeholder with "Awaiting Images..." text (reuse existing PianoCard placeholder logic)
- `title` — piano name display (e.g. – Petrof (c1997) Upright Piano –)
- `starting_bid` + `reserve_price` — display as estimate range: **Est. £800-£1,000**

On card click: navigate to the piano detail page based on `brand`:

- Steinway, Yamaha, Kawai, Bechstein, Blüthner, Bösendorfer, Petrof, Schimmel, August Förster, Kawai, Grotrian → determine type from `model` or add a `type` field (grand / upright / other):
  - grand → `/shop/grand-pianos/:slug`
  - upright → `/shop/upright-pianos/:slug`
  - other/historic → `/shop/other/:slug`

Use the `slug` field from the lots table for the URL param.

Hover effect: subtle shadow or border highlight.

---

## 4. Brands Strip

Below the catalogue grid.

A horizontally centred row of featured piano brand logos.

Brands (use project asset files):

- C. Bechstein
- Blüthner
- Bösendorfer
- Boston

Greyscale by default, full colour on hover.

Horizontally scrollable on mobile.

---

# Backend

## Existing Tables (DO NOT recreate — already migrated and seeded)

### `auctions` table

```
id
title               // e.g. "23rd June 2026 Auction"
slug
description
banner_image        // nullable
catalogue_pdf       // nullable — storage path e.g. "catalogues/june-2026-catalogue.pdf"
auction_type        // e.g. "online"
preview_start_time  // datetime nullable
start_time          // datetime
end_time            // datetime
status              // draft | published | completed
location            // nullable
is_featured         // tinyint
is_live             // tinyint
created_by          // bigint FK → users.id
created_at
updated_at
```

### `lots` table

```
id
auction_id          // FK → auctions.id
title               // e.g. "– Petrof (c1997) Upright Piano – | Est. £800-£1,000"
slug                // e.g. "petrof-c1997-upright-piano-est-800-1000"
lot_number          // int
description         // text nullable
brand               // varchar nullable
model               // varchar nullable
serial_number       // varchar nullable
year                // smallint nullable
condition           // varchar nullable
starting_bid        // decimal(10,2)
reserve_price       // decimal(10,2) nullable
current_bid         // decimal(10,2) nullable
bid_increment       // decimal(10,2) default 50.00
featured_image      // varchar nullable — URL or storage path
gallery             // longtext (JSON array of image URLs)
ends_at             // datetime nullable
status              // draft | published | sold
is_active           // tinyint
winner_id           // bigint nullable FK → users.id
winning_bid_amount  // decimal(10,2) nullable
sold_at             // datetime nullable
created_at
updated_at
```

---

## Laravel Models

Use existing `Auction` and `Lot` models.

Add the following to the `Auction` model if not already present:

```php
public function lots()
{
    return $this->hasMany(Lot::class);
}

public function scopeUpcoming($query)
{
    return $query->where('status', 'published')
                 ->where('start_time', '>', now())
                 ->orderBy('start_time', 'asc');
}

public function scopeCompleted($query)
{
    return $query->where('status', 'completed')
                 ->orderBy('start_time', 'desc');
}
```

---

## API Endpoints

### GET /api/auctions/upcoming

Returns the next upcoming published auction with all its lots.

Controller: `AuctionController@upcoming`

Logic:

```php
$auction = Auction::upcoming()->with('lots')->first();

if (!$auction) {
    return response()->json(['auction' => null, 'message' => 'Catalogue Available Soon.']);
}

return response()->json([
    'id'            => $auction->id,
    'title'         => $auction->title,
    'start_time'    => $auction->start_time,
    'end_time'      => $auction->end_time,
    'catalogue_pdf' => $auction->catalogue_pdf
                        ? asset('storage/' . $auction->catalogue_pdf)
                        : null,
    'lots'          => $auction->lots->map(fn($lot) => [
        'id'            => $lot->id,
        'title'         => $lot->title,
        'slug'          => $lot->slug,
        'lot_number'    => $lot->lot_number,
        'brand'         => $lot->brand,
        'model'         => $lot->model,
        'year'          => $lot->year,
        'condition'     => $lot->condition,
        'starting_bid'  => $lot->starting_bid,
        'reserve_price' => $lot->reserve_price,
        'featured_image'=> $lot->featured_image,
        'gallery'       => json_decode($lot->gallery, true) ?? [],
        'description'   => $lot->description,
        'status'        => $lot->status,
    ]),
]);
```

### GET /api/auctions/upcoming/download

Streams the catalogue PDF of the upcoming auction as a browser file download.

Controller: `AuctionController@downloadCatalogue`

Logic:

```php
$auction = Auction::upcoming()->first();

if (!$auction || !$auction->catalogue_pdf) {
    return response()->json(['error' => 'No catalogue available.'], 404);
}

$path = storage_path('app/public/' . $auction->catalogue_pdf);

if (!file_exists($path)) {
    return response()->json(['error' => 'File not found.'], 404);
}

return response()->download($path);
```

### GET /api/auctions/past

Returns all completed past auctions with their lots (for the `/past-auctions` page).

Controller: `AuctionController@past`

Logic:

```php
$auctions = Auction::completed()->with('lots')->get();

return response()->json($auctions->map(fn($auction) => [
    'id'         => $auction->id,
    'title'      => $auction->title,
    'slug'       => $auction->slug,
    'start_time' => $auction->start_time,
    'end_time'   => $auction->end_time,
    'lots'       => $auction->lots->map(fn($lot) => [
        'id'                  => $lot->id,
        'title'               => $lot->title,
        'slug'                => $lot->slug,
        'lot_number'          => $lot->lot_number,
        'brand'               => $lot->brand,
        'featured_image'      => $lot->featured_image,
        'starting_bid'        => $lot->starting_bid,
        'winning_bid_amount'  => $lot->winning_bid_amount,
        'sold_at'             => $lot->sold_at,
        'status'              => $lot->status,
    ]),
]));
```

### Routes (add to `routes/api.php`)

```php
Route::get('/auctions/upcoming',          [AuctionController::class, 'upcoming']);
Route::get('/auctions/upcoming/download', [AuctionController::class, 'downloadCatalogue']);
Route::get('/auctions/past',              [AuctionController::class, 'past']);
```

---

## Filament (Admin Panel)

Use existing Filament setup. Create `AuctionResource` if not already present.

Admin can:

- View all auctions (upcoming + past) in a table
- Create / edit an auction with all fields from the `auctions` table
- Upload `catalogue_pdf` via Filament file upload (stored at `storage/app/public/catalogues/`)
- Toggle `status` (draft / published / completed)
- Toggle `is_featured` and `is_live`

Create `LotResource` as a **RelationManager** inside `AuctionResource`.

Admin can:

- Add / edit / delete lots per auction
- Upload `featured_image`
- Upload `gallery` (multiple images, stored as JSON array)
- Set `lot_number`, `brand`, `model`, `year`, `condition`
- Set `starting_bid`, `reserve_price`, `bid_increment`
- Set `status` (draft / published / sold)
- Set `winning_bid_amount` and `sold_at` when marking as sold

---

## Components

Create:

- `AuctionCataloguePage.jsx` — page root, fetches from API on mount
- `CatalogueHero.jsx` — two-column intro section with download button
- `CatalogueCtaStrip.jsx` — dark strip with two nav buttons
- `CatalogueLotGrid.jsx` — responsive grid, renders lot cards
- `CatalogueLotCard.jsx` — single lot card; reuses PianoCard placeholder logic for null images; formats starting_bid + reserve_price as "Est. £X-£Y"; routes by brand/slug
- `CatalogueAvailableSoon.jsx` — shown when no upcoming auction exists
- `BrandsStrip.jsx` — brand logo row with greyscale/hover effect

---

## Frontend Data Flow

```
AuctionCataloguePage mounts
  → fetch GET /api/auctions/upcoming
  → if auction: show date heading + CatalogueLotGrid
  → if null: show CatalogueAvailableSoon

Download Catalogue button clicked
  → window.location.href = '/api/auctions/upcoming/download'
  → browser triggers file download automatically
```

Loading state: show skeleton cards in the grid while fetching.

Error state: show "Unable to load catalogue. Please try again later."

---

## SEO

Title:

Auction Catalogue | Piano Auctions Ltd

Meta Description:

Explore Piano Auctions Ltd's extensive piano catalogue of grand and upright pianos. View over 100 instruments including Yamaha, Steinway and Kawai before bidding at auction.

---

## Design Rules

Match provided screenshot exactly.

Use same design language as Grand Pianos, Upright Pianos, and FAQ pages.

Luxury auction styling. Fully responsive.

Desktop:
- Hero: two columns (text left, catalogue image right)
- Grid: 5 columns
- Brands strip: single row

Tablet:
- Hero: two columns (condensed)
- Grid: 3 columns

Mobile:
- Hero: stacked (text top, image below)
- Grid: 2 columns
- Brands strip: horizontally scrollable