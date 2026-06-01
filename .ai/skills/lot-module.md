# Lot Module

Requirements:

* Auction lots management
* Piano listing system
* Lot image gallery
* Live bidding support
* Lot status management

Fields:

* auction_id
* title
* slug
* lot_number
* description
* brand
* model
* serial_number
* year
* condition
* starting_bid
* reserve_price
* current_bid
* bid_increment
* featured_image
* gallery
* ends_at
* status
* is_active

Relationships:

* Lot belongsTo Auction
* Lot hasMany Bids

Status Values:

* draft
* published
* live
* sold
* unsold
* withdrawn

Generate:

* migration
* model
* controller
* validation
* API routes
* API resources
* service layer
* Filament resource

Business Rules:

* Each lot belongs to an auction
* Lot numbers must be unique per auction
* Current bid auto updates
* Reserve price hidden from public
* Sold lots cannot accept bids
* Support multiple images
* Use eager loading
* Use API resources
* Use service classes
