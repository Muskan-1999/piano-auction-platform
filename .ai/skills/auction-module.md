# Auction Module

## Goal

Implement the Auction Management Module for the Piano Auction Platform.

This module will manage:

* auction creation
* auction scheduling
* auction catalogue
* auction visibility
* auction lifecycle
* live auction handling

This is the core module of the platform.

---

# Auction Features

Required Features:

* Create Auction
* Update Auction
* Delete Auction
* List Auctions
* View Single Auction
* Change Auction Status
* Start Live Auction
* End Auction
* Auction Catalogue Management

---

# Auction Types

Supported Auction Types:

* online
* live
* hybrid

Default:

* online

---

# Auction Statuses

Supported Statuses:

* draft
* upcoming
* live
* ended

Default Status:

* draft

---

# Database Table

## auctions table

Required Fields:

* id
* title
* slug
* description
* banner_image
* auction_type
* start_time
* end_time
* preview_start_time
* status
* location
* is_featured
* is_live
* created_by
* created_at
* updated_at

---

# Field Rules

## title

* required
* string
* max 255

## slug

* auto-generated from title
* unique

## description

* nullable

## banner_image

* nullable
* store image path

## auction_type

Allowed Values:

* online
* live
* hybrid

## start_time

* required
* datetime

## end_time

* required
* datetime
* must be after start_time

## preview_start_time

* nullable
* used for catalogue preview

## status

Allowed Values:

* draft
* upcoming
* live
* ended

## location

* nullable

## is_featured

* boolean
* default false

## is_live

* boolean
* default false

## created_by

* foreign key to users table

---

# Relationships

## Auction Relationships

Auction:

* belongsTo User (creator)
* hasMany Lots

---

# Required Backend Structure

Generate:

* Auction migration
* Auction model
* AuctionController
* StoreAuctionRequest
* UpdateAuctionRequest
* AuctionResource
* AuctionCollection
* AuctionService
* Middleware protection
* API routes
* Filament Resource

---

# API Routes

## Public Routes

GET /api/auctions
GET /api/auctions/{id}
GET /api/live-auctions

---

## Admin Protected Routes

POST /api/admin/auctions
PUT /api/admin/auctions/{id}
DELETE /api/admin/auctions/{id}
PATCH /api/admin/auctions/{id}/status

---

# Route Protection

Admin routes must use:

* auth:sanctum
* role:admin

---

# Validation Rules

## Store Auction

Required:

* title
* auction_type
* start_time
* end_time

Optional:

* description
* banner_image
* preview_start_time
* location
* is_featured

---

# Business Rules

* Only admin users can create auctions
* Only admin users can update auctions
* Only admin users can delete auctions
* Only one auction can be live at a time
* Auction end_time must be greater than start_time
* Ended auctions cannot accept bids
* Live auctions will later integrate with Reverb realtime bidding

---

# Controller Rules

* Keep controllers thin
* Use Form Requests
* Use API Resources
* Use Services for business logic
* Return JSON responses only

---

# Filament Resource Rules

Generate:

* Filament forms
* Filament tables
* Filters
* Status badges
* Auction actions

Include:

* image upload
* status select
* date time pickers
* featured toggle
* live toggle

---

# Response Format

## Success Response Example

{
"success": true,
"message": "Auction created successfully",
"data": {}
}

## Error Response Example

{
"success": false,
"message": "Validation failed"
}

---

# Architecture Rules

* API-first architecture
* React frontend will consume APIs
* No Blade UI
* Modular architecture
* Service-based architecture
* Use eager loading
* Optimize for scalability and MVP speed

---

# Future Integration Notes

This module will later integrate with:

* Lots/Pianos module
* Realtime bidding module
* Telephone bidding
* Absentee bidding
* Reverb live updates

---

# Important Git Rules

* NEVER auto commit
* NEVER auto push
* ALWAYS ask before Git operations
* NEVER overwrite existing files without confirmation
