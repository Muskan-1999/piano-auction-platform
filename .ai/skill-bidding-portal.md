# Bidding Portal Requirements

## Purpose

This is a separate auction bidding portal.

Users enter this portal when clicking:

* UK - BID NOW
* EU - BID NOW

from the homepage hero section.

Route:

/auction-portal

This portal uses a completely separate layout from the public website.

---

# Navigation

Before Login

Navbar should contain:

* Logo
* Live Auctions
* Auction Catalogue
* Register To Bid
* Login

After Login

Navbar should contain:

* Live Auctions
* Auction Catalogue
* My Bids
* Bid History
* Watchlist
* Account
* Logout

---

# Authentication

Use existing Laravel Sanctum authentication.

Features:

* Register
* Login
* Logout
* Forgot Password
* Email Verification

Only verified users can place bids.

Unverified users can:

* Browse auctions
* View lots
* View catalogue

Unverified users cannot:

* Place bids
* Submit proxy bids
* Submit absentee bids

---

# Registration Flow

User clicks Register To Bid.

Fields:

* First Name
* Last Name
* Email
* Phone Number
* Password
* Confirm Password

After registration:

1. Create account
2. Send email verification
3. Redirect to verification pending page

Message:

"Please verify your email before bidding."

---

# Auction Catalogue

Display:

* Auction Image
* Auction Title
* Auction Date
* Status
* Number of Lots

Statuses:

* Upcoming
* Live
* Closed

---

# Live Auction Page

Route:

/auction-portal/live

Display:

* Current Lot Number
* Piano Image
* Piano Title
* Piano Description
* Piano Brand
* Current Bid
* Reserve Status
* Bid Increment
* Countdown Timer

---

# Live Bidding

Use Laravel Reverb.

Requirements:

* Realtime updates
* No page refresh
* Broadcast bid changes instantly
* Broadcast lot changes instantly
* Broadcast auction status instantly

Events:

* BidPlaced
* LotChanged
* AuctionStarted
* AuctionPaused
* AuctionEnded

---

# Bidding Actions

If user is verified:

Show:

* Place Bid
* Auto Bid
* Watch Lot

If user is not verified:

Show:

"Verify your email to place bids."

---

# Bid History

Route:

/auction-portal/bid-history

Use existing bids table.

Display:

* Auction
* Lot Number
* Piano Name
* Bid Amount
* Bid Date
* Bid Status

Statuses:

* Highest Bidder
* Outbid
* Won
* Lost

Allow filtering by:

* Date
* Auction
* Status

---

# My Bids

Route:

/auction-portal/my-bids

Display:

* Active Bids
* Highest Bid Amount
* Current Lot Status
* Auction Status

---

# Watchlist

Users can:

* Add lots
* Remove lots
* View watched lots

---

# Account

Display:

* Profile Information
* Verification Status
* Bid Statistics
* Won Auctions

---

# Admin Requirements

Filament Admin

Manage:

* Auctions
* Lots
* Bidders
* Bid History
* Auction Status
* Realtime Controls

---

# Design Requirements

UI Inspiration:

https://pianoauctions.co.uk/

Style:

* Luxury
* Modern
* Professional
* Auction House Design

Colors:

* Black
* White
* Gold

Layout:

* Full Width
* Responsive
* Premium Typography

Avoid:

* Bootstrap
* Generic Admin Styling

Use:

* Tailwind CSS
* React Components
* Clean Cards
* Elegant Tables

---

# Technical Requirements

Backend:

* Laravel 11
* Sanctum
* Reverb
* Filament

Frontend:

* React
* React Router
* Axios
* Tailwind CSS

Architecture:

* API First
* Service Layer Pattern
* Realtime WebSockets

Important:

Use existing bids table.

Do not create a new bids table.

Check the existing Admin Requirements if already exist dont recreate it .

Reuse current bidding data structure.
