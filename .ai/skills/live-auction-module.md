# Live Auction Module

Requirements:

* Real-time live bidding
* WebSocket broadcasting
* Live bid updates
* Auction countdown timer
* Current highest bid updates
* Real-time bidder notifications
* Live auction state management

Features:

* Broadcast bids instantly
* Broadcast current highest bid
* Broadcast auction status
* Real-time lot updates
* Live countdown synchronization
* Bid acceptance/rejection events

Events:

* BidPlaced
* BidOutbid
* AuctionStarted
* AuctionEnded
* LotStarted
* LotEnded

Channels:

* auction.{auctionId}
* lot.{lotId}

Generate:

* event classes
* broadcasting configuration
* Reverb integration
* websocket channels
* listeners
* services
* API endpoints

Business Rules:

* Only approved live lots accept bids
* Broadcast successful bids instantly
* Broadcast current highest bid
* Prevent bidding after lot ends
* Sync live auction state
* Use transactions
* Use queueable broadcasting
* Secure private channels
