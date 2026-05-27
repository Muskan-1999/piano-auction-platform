# Auction Module

Requirements:

* Auction CRUD
* Auction status
* Auction schedule
* Auction catalogue

Fields:

* title
* slug
* description
* banner_image
* start_time
* end_time
* status

Relationships:

* Auction has many Lots

Status Values:

* upcoming
* live
* ended

Generate:

* migration
* model
* controller
* validation
* middleware
* routes
* API resource
* Filament resource
