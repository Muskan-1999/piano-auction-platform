# Piano Auction Platform Requirements

## Public Website

Navbar:

- Home
- Buy A Piano
  - Upright Pianos
  - Grand Pianos
  - Piano Brands
- Sell My Piano
- Value My Piano
- Our Auctions
  - Auction Catalogue
  - Auction Calendar
  - View Appointments
  - Bidding
  - Delivery
  - Beginners Auction Guide
- About
  - News & Insights
  - FAQ
- Contact

## Homepage

Sections:

- Fullscreen Hero
- Latest Auctions
- Featured Pianos
- Sell Your Piano
- Value Your Piano
- Why Choose Us
- Testimonials
- Footer

Style:

- Luxury auction house
- Inspired by Piano Auctions UK
- Full-width layout
- Black, white, gold theme

---

## Authentication

Users can:

- Register
- Login
- Verify Email
- Forgot Password
- Reset Password

Requirements:

- Email verification required
- Unverified users cannot bid

---

## Bidding Portal

Separate navigation after login:

Navbar:

- Live Auctions
- Catalogue
- My Bids
- Watchlist
- Account
- Logout

Features:

- Realtime bidding
- Current bid display
- Bid history
- Countdown timer
- Auction status
- Auto refresh via Laravel Reverb

---

## Auction Lots

Fields:

- Title
- Description
- Images
- Brand
- Piano Type
- Year
- Condition
- Starting Bid
- Current Bid
- Reserve Price
- Auction Date

---

## User Dashboard

Features:

- Profile
- Watchlist
- Bid History
- Won Auctions
- Notifications

---

## Admin Panel

Filament Admin

Manage:

- Users
- Auctions
- Lots
- Bids
- Categories
- Piano Brands
- Appointments
- News Articles
- Contact Forms

---

## Realtime System

Laravel Reverb

Events:

- BidPlaced
- AuctionStarted
- AuctionEnded

Frontend:

- React
- Laravel Echo
- Realtime updates

---

## MVP Priority

Phase 1:

- Homepage
- Navbar
- Authentication
- Email Verification
- Auction Catalogue
- Live Bidding
- Realtime Updates

Phase 2:

- Watchlist
- Notifications
- News
- Insights
- Delivery Management