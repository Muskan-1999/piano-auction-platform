# Bid Module

Requirements:

* Online bidding system
* Live bidding support
* Auto bid updates
* Bid validation
* Bid history tracking

Fields:

* lot_id
* user_id
* amount
* bid_type
* status
* ip_address
* user_agent
* placed_at
* is_winning

Relationships:

* Bid belongsTo Lot
* Bid belongsTo User

Bid Types:

* online
* telephone
* absentee
* admin

Status Values:

* active
* winning
* outbid
* cancelled

Generate:

* migration
* model
* controller
* validation
* API routes
* API resources
* service layer
* event broadcasting
* Filament resource

Business Rules:

* Bid amount must be greater than current bid
* Use bid increment validation
* Sold lots cannot accept bids
* Auto update current bid on lot
* Mark previous winning bid as outbid
* Store bid history
* Broadcast live bid updates
* Use transactions for consistency
* Use eager loading
* Use API resources
* Use service classes
