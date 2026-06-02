# About Us Feature Specification

## Route

`/about`

## Goal

Create an About Us page that visually matches Piano Auctions UK's About page.

Reference:
https://pianoauctions.co.uk/about/

Design references:

* About page screenshot provided
* News & Insights screenshot provided
* FAQ screenshot provided

The page should feel premium, luxury, clean, and consistent with the rest of the Piano Auctions platform.

---

# Page Sections

## 1. Hero Banner

Full-width hero section.

Background:

* Piano warehouse image
* Dark overlay

Content:

Breadcrumb:

Home > About

Small label:

PIANO AUCTIONS LTD

Main Heading:

About Our Auctions

Hero height:

500px desktop
350px mobile

Text centered vertically and horizontally.

---

## 2. Company History Section

White background section.

Centered content.

Small label:

ALL ABOUT US

Heading:

The History of Piano Auctions Ltd

Description paragraph:

Use placeholder company history content.

Max width:

900px

Text aligned center.

---

## 3. Timeline Section

Create a vertical timeline component.

Alternating cards:

Left
Right
Left
Right

Timeline years:

2003
2010
2016
2018
2019
2020
2020-2023
2022
2023
2024

Each item contains:

* Year
* Title
* Description

Example:

Year: 2003
Title: The Beginning

Year: 2020
Title: The Global Pandemic

Year: 2023
Title: Freddie Mercury

Timeline should closely replicate the reference design.

Desktop:

Alternating layout.

Mobile:

Single column.

---

## 4. Further Information Section

Dark luxury background.

Section heading:

Further Information

Cards:

### Buy A Piano

Image
Description
Read More button

Links to:

`/buy-a-piano`

---

### Sell My Piano

Image
Description
Read More button

Links to:

`/sell-my-piano`

---

### Value My Piano

Image
Description
Read More button

Links to:

`/value-my-piano`

Display:

3 columns desktop
1 column mobile

---

## 5. Footer

Reuse existing footer component.

Do not duplicate code.

---

# SEO

Title:

About Us | Piano Auctions Ltd

Meta Description:

Learn about Piano Auctions Ltd, our history, expertise, and specialist piano auction services.

---

# Technical Requirements

Frontend:

React
Tailwind CSS

Backend:

No backend required.

Static page.

---

# Components

Create:

* AboutPage.jsx
* HeroBanner.jsx
* CompanyHistory.jsx
* TimelineSection.jsx
* FurtherInformation.jsx

Keep components reusable.

---

# Navigation

Navbar About dropdown contains:

1. News & Insights
2. FAQ

About page remains:

`/about`

News & Insights:

`/news-insight`

FAQ:

`/faq`

---

# Design Rules

Use same:

* Typography
* Colors
* Spacing
* Hero style
* Card style

as the existing Sell My Piano and Value My Piano pages.

Avoid overengineering.

Mobile responsive.

Production ready.
