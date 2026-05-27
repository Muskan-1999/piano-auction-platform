# Piano Auction Platform Architecture

## Project Structure

piano-auction/
│
├── backend/      → Laravel 12 API Backend
├── frontend/     → React Frontend
│
├── PROJECT_CONTEXT.md
└── ARCHITECTURE.md

---

# Backend Architecture

Framework:

* Laravel 12

Purpose:

* API-first backend
* Business logic
* Authentication
* Realtime bidding
* Admin panel

Backend Stack:

* Laravel Sanctum
* Filament Admin
* Laravel Reverb
* MySQL

Backend Folder Structure:

app/
│
├── Models/
├── Services/
├── Events/
├── Policies/
├── Http/
│   ├── Controllers/API/
│   ├── Requests/
│   └── Resources/
│
├── Providers/
└── Filament/

Database Structure:

* users
* auctions
* lots
* lot_images
* bids
* telephone_bids
* absentee_bids
* sell_piano_requests
* valuation_requests
* contact_messages

Backend Responsibilities:

* Authentication
* Auction management
* Lot management
* Bid validation
* Realtime broadcasting
* Form submissions
* Admin management

Business Logic Rules:

* Controllers should remain thin
* Use Service classes for complex logic
* Use Form Requests for validation
* Use API Resources
* Use Eloquent relationships
* Use eager loading
* Use transactions for bidding operations

---

# Frontend Architecture

Framework:

* React + Vite

Frontend Stack:

* React
* Tailwind CSS
* Axios
* React Query
* React Router

Frontend Folder Structure:

src/
│
├── api/
├── pages/
├── components/
├── hooks/
├── layouts/
├── routes/
├── context/
├── utils/
└── assets/

Frontend Responsibilities:

* UI rendering
* Routing
* User interaction
* Form handling
* Realtime UI updates
* Responsive design

Frontend Modules:

* Homepage
* Buy A Piano
* Live Bidding
* Telephone Bid
* Absentee Bid
* Sell My Piano
* Value My Piano
* Our Auctions
* About
* FAQ
* Contact

---

# Realtime Auction Flow

User Places Bid
↓
Laravel Validates Bid
↓
Bid Saved in Database
↓
Current Bid Updated
↓
BidPlaced Event Broadcast
↓
React UI Updates Instantly

Realtime Stack:

* Laravel Reverb
* Laravel Echo

---

# Development Rules

Important:

* Backend first development
* Frontend after APIs are ready
* Avoid overengineering
* Build modular code
* Optimize for MVP speed
* Use reusable components
* Keep architecture clean

Priority Order:

1. Authentication
2. Auctions
3. Lots
4. Bidding
5. Realtime Events
6. Telephone Bids
7. Absentee Bids
8. Frontend UI
