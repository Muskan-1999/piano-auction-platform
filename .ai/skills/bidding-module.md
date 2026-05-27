# Realtime Bidding Module

Requirements:

* User can place bids
* Bid must be greater than current bid
* Update lot current_bid
* Save bid history
* Broadcast realtime bid event

Tables:

* bids

Relationships:

* Bid belongs to User
* Bid belongs to Lot

Fields:

* user_id
* lot_id
* amount

Events:

* BidPlaced

Rules:

* Reject lower bids
* Reject bids if auction ended
* Use transactions where needed

Generate:

* migration
* model
* controller
* validation
* event
* broadcasting
* routes
