# Absentee Bid Module

Requirements:

* Public absentee bidding form
* Maximum proxy bid system
* Guest and authenticated user support
* Admin management panel
* Bid approval workflow

Fields:

* lot_id
* user_id nullable
* guest_name
* email
* phone
* address_1
* address_2
* city
* postcode
* country
* max_bid_amount
* status
* notes
* approved_by nullable

Relationships:

* AbsenteeBid belongsTo Lot
* AbsenteeBid belongsTo User
* AbsenteeBid belongsTo Admin User

Status Values:

* pending
* approved
* rejected
* active
* completed

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

* Guest users allowed
* User account optional
* Maximum bid required
* Closed lots cannot accept absentee bids
* Admin can approve/reject requests
* Admin can manage proxy bidding
* Store bidder details
* Use eager loading
* Use API resources
* Use service classes
* Keep controllers thin
