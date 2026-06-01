# Public Auction API Module

Requirements:

* Public auction listing APIs
* Public lot catalogue APIs
* Single auction APIs
* Single lot APIs
* Live auction APIs
* Search and filter APIs
* Featured auctions APIs
* Homepage APIs

Public APIs:

* GET /api/public/homepage
* GET /api/public/featured-auctions
* GET /api/public/auctions
* GET /api/public/auctions/{slug}
* GET /api/public/lots
* GET /api/public/lots/{slug}
* GET /api/public/live-auctions
* GET /api/public/search

Features:

* Pagination
* Filtering
* Sorting
* Search
* Eager loading
* Optimized responses
* API resources
* Live auction status
* Current highest bid
* Featured lots
* Auction countdown data

Filters:

* auction type
* status
* piano brand
* price range
* live auctions
* featured lots

Generate:

* controllers
* routes
* API resources
* service classes
* filters
* search logic
* pagination

Business Rules:

* Hide reserve prices
* Show only published/live lots
* Hide admin-only fields
* Use eager loading
* Optimize API responses
* Use API Resources
* Support frontend consumption
