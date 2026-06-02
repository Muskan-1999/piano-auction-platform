# News & Insights Feature Specification

## Route

`/news-insight`

## Goal

Recreate the Piano Auctions UK News & Insights page.

Reference:

https://pianoauctions.co.uk/news/

Use provided screenshot as primary design reference.

---

# Page Sections

## 1. Hero Banner

Full width.

Background piano image.

Dark overlay.

Breadcrumb:

Home > Piano News & Insights

Label:

BLOG & NEWS

Heading:

Piano News & Insights

Description:

Buy your piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.

Quick links:

* Auction Tips
* Piano Guides
* Piano Brands

---

## 2. Featured Categories

Section title:

Featured Categories

Three cards:

### Auction Tips

Image
Description

### Piano Guides

Image
Description

### Piano Brands

Image
Description

Hover effect.

Clickable cards.

---

## 3. Latest Insights

Responsive blog grid.

Desktop:

3 columns

Tablet:

2 columns

Mobile:

1 column

Card contains:

* Featured image
* Title
* Excerpt
* Read More
* Published date

---

## Blog Categories

Add category field:

* Auction Tips
* Piano Guides
* Piano Brands

---

## Backend

Create Blog model.

Fields:

id
title
slug
excerpt
content
featured_image
category
published_at
is_published
created_at
updated_at

---

## Filament

Create BlogResource.

Admin can:

* Create article
* Edit article
* Delete article
* Upload image
* Select category
* Publish article

---

## API

GET /api/blogs

GET /api/blogs/{slug}

GET /api/blogs?category=auction-tips

GET /api/blogs?category=piano-guides

GET /api/blogs?category=piano-brands

---

## Components

Create:

* NewsInsightPage.jsx
* FeaturedCategories.jsx
* BlogGrid.jsx
* BlogCard.jsx

---

## SEO

Title:

Piano News & Insights | Piano Auctions Ltd

Meta Description:

Latest piano auction news, piano buying guides, valuation advice and industry insights.

---

## Design Rules

Match provided screenshot exactly.

Use same design language as:

* Home page
* Sell My Piano
* Value My Piano

Luxury auction styling.

Fully responsive.
