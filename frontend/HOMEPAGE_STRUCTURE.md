# Homepage UI Documentation

## Overview
The Homepage has been built with a premium luxury design featuring multiple sections and reusable components. All styling uses TailwindCSS with a custom luxury color palette.

## Directory Structure
```
frontend/src/
├── components/
│   ├── index.js                      # Component exports
│   ├── Button.jsx                    # Reusable button component
│   ├── CountdownTimer.jsx            # Auction countdown timer
│   ├── AuctionCard.jsx               # Reusable auction card
│   ├── LotCard.jsx                   # Reusable piano lot card
│   ├── NavBar.jsx                    # Responsive navigation bar
│   ├── Footer.jsx                    # Comprehensive footer
│   ├── HeroSection.jsx               # Hero banner with stats
│   ├── FeaturedAuctionsSection.jsx   # Featured auctions grid
│   ├── LiveAuctionsSection.jsx       # Live auctions with badges
│   ├── FeaturedLotsSection.jsx       # Featured piano lots grid
│   ├── WhyChooseUsSection.jsx        # Features & testimonials
│   └── NewsletterSection.jsx         # Newsletter signup
├── pages/
│   └── Home.jsx                      # Homepage main page
└── styles/
    ├── index.css                     # Global styles
    └── tailwind.css                  # Tailwind directives

```

## Sections

### 1. Hero Section (`HeroSection.jsx`)
- Premium gradient background (luxury purple)
- Main heading and tagline
- Dual CTA buttons (Browse Auctions, Watch Live)
- Statistics bar showing platform metrics
- Decorative blur effects

### 2. Featured Auctions (`FeaturedAuctionsSection.jsx`)
- Grid layout (1 col mobile → 4 cols desktop)
- 4 featured auction cards
- Section title and description
- "View All Auctions" CTA

### 3. Live Auctions (`LiveAuctionsSection.jsx`)
- Red-themed section indicating live activity
- Pulsing indicators showing real-time activity
- 3 live auction cards with glow effect
- "Join Live Bidding" CTA

### 4. Featured Piano Lots (`FeaturedLotsSection.jsx`)
- 6 featured piano lots in a responsive grid
- Current bid display
- Countdown timers per lot
- Piano type badges

### 5. Why Choose Us (`WhyChooseUsSection.jsx`)
- 6 feature cards with emojis
- Features: Expert Authentication, Global Access, Premium Selection, Live Bidding, Shipping, Experience
- Testimonial section with customer quote

### 6. Newsletter (`NewsletterSection.jsx`)
- Email subscription form
- Social media links
- Dark luxury background

## Reusable Components

### AuctionCard
Props:
- `auction` (object) - Auction data with title, location, image, dates, etc.

Features:
- Hover scale animation on image
- Status badge
- Lot count display
- Countdown timer
- View details button

### LotCard
Props:
- `lot` (object) - Lot data with title, type, price, image, etc.

Features:
- LIVE badge with pulse animation
- Current bid display
- Lot description preview
- Countdown timer
- View details button

### CountdownTimer
Props:
- `endDate` (string/date) - Auction/lot end date

Features:
- Real-time countdown (days, hours, minutes, seconds)
- Visual countdown boxes
- "Auction Ended" message when expired
- Auto-updates every second

### Button
Props:
- `variant` - 'primary', 'secondary', 'outline', 'ghost', 'danger'
- `size` - 'sm', 'md', 'lg'
- `className` - Additional custom classes

### NavBar
Features:
- Responsive design (hidden nav on mobile, hamburger menu)
- User authentication display
- Links to all main sections
- Sticky positioning

### Footer
Features:
- 4-column layout (brand, auctions, bidding, info)
- Footer links
- Social media icons
- Copyright info

## Color Palette (Luxury Theme)

```
luxury-50:  #f9f7fb (very light)
luxury-100: #efe9fb
luxury-200: #e0d0fa
luxury-300: #c2a6f6
luxury-400: #9b6ef0
luxury-500: #7a3de6 (primary)
luxury-600: #5e2bbf (hover)
luxury-700: #441f8f
luxury-800: #2e145f
luxury-900: #1a0b34 (very dark)

Additional:
- accent: #7a3de6
- muted: #6b6375
- surface: #ffffff
- border: #e9e7ef
```

## Data Structure

### Auction Object
```javascript
{
  id: number,
  title: string,
  slug: string,
  location: string,
  status: 'Active' | 'Upcoming' | 'LIVE NOW',
  image_url: string,
  starts_at: date,
  ends_at: date,
  lots: array
}
```

### Lot Object
```javascript
{
  id: number,
  title: string,
  slug: string,
  type: string,
  description: string,
  status: 'LIVE' | 'UPCOMING',
  image_url: string,
  starting_price: number,
  current_bid: number,
  lot_end_date: date
}
```

## TailwindCSS Configuration

### Fonts
- **sans** (body): Inter, system-ui
- **heading** (titles): Georgia, serif

### Shadows
- **shadow-luxury**: Premium shadow for cards and containers

### Spacing
- Custom container padding for responsive design
- Consistent gap and padding utilities

## Responsive Design

All sections use Tailwind's responsive utilities:
- **Mobile (default)**: 1 column layout, full width
- **Tablet (md:)**: 2 columns, adjusted padding
- **Desktop (lg:)**: 3-4 columns, optimized spacing

## Features

✅ Premium luxury design aesthetic
✅ Fully responsive (mobile, tablet, desktop)
✅ Reusable card components
✅ Animated countdown timers
✅ Live auction indicators with pulse animations
✅ Hover effects and transitions
✅ Newsletter subscription integration
✅ Social media links
✅ Mobile navigation menu
✅ Accessibility considerations (semantic HTML, ARIA labels)

## Next Steps

1. **Connect to Backend API**: Replace hardcoded data with real API calls
2. **Implement Echo/Reverb**: Wire real-time updates for live auctions
3. **Add More Pages**: Implement auction detail, lot detail, search pages
4. **Form Validation**: Add form validation for newsletter signup
5. **Analytics**: Add page tracking and conversion metrics
6. **Animations**: Add scroll-triggered animations for sections

## Component Import Example

```javascript
import { 
  HeroSection, 
  FeaturedAuctionsSection, 
  LiveAuctionsSection, 
  FeaturedLotsSection,
  WhyChooseUsSection,
  NewsletterSection,
  AuctionCard,
  LotCard,
  Button
} from '../components'
```

Or use individual imports:
```javascript
import HeroSection from '../components/HeroSection'
```
