# Telephone Bid Module

Requirements:

* Public telephone bidding request form
* Guest and authenticated user support
* Admin management panel
* Bid approval workflow
* Telephone bidder tracking

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
* max_bid_amount nullable
* status
* notes
* approved_by nullable

Relationships:

* TelephoneBid belongsTo Lot
* TelephoneBid belongsTo User
* TelephoneBid belongsTo Admin User

Status Values:

* pending
* approved
* rejected
* contacted
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
* Lot must exist
* Closed lots cannot accept requests
* Admin can approve/reject requests
* Admin can add notes
* Store full bidder details
* Use eager loading
* Use API resources
* Use service classes
* Keep controllers thin
