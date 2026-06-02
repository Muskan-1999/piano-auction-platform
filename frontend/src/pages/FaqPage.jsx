import React from 'react'
import FaqSection from '../components/faq/FaqSection'
import FaqFurtherInformation from '../components/faq/FurtherInformation'

const GENERAL_FAQS = [
  {
    question: 'Who are Piano Auctions Limited?',
    answer:
      'Piano Auctions Limited is a specialist piano auction house based in Bedford, UK. With over 35 years of experience, we are one of the world\'s largest auctioneers dedicated exclusively to pianos, serving buyers and sellers from across the globe including Australia, China, Japan, USA, and throughout Europe.',
  },
  {
    question: 'How can I contact Piano Auctions Limited?',
    answer:
      'You can contact us via our online contact form, by telephone, or by email. Our team is available Monday to Friday during normal business hours and will respond to all enquiries as quickly as possible. Please visit our Contact page for full details.',
  },
  {
    question: 'Where are the auctions held?',
    answer:
      'Our piano auctions are held at our premises in Bedford, UK, and are also conducted online, allowing bidders from around the world to participate remotely. All upcoming auction dates and venues are listed on our Auctions page.',
  },
  {
    question: 'What is your privacy policy?',
    answer:
      'We are committed to protecting your personal data in accordance with the UK GDPR and the Data Protection Act 2018. We only collect information necessary to provide our services, and we never sell or share your data with third parties without your consent. You can request a full copy of our privacy policy via our contact page.',
  },
  {
    question: 'How do I stay updated on upcoming auctions and events?',
    answer:
      'The best way to stay informed is to sign up to our newsletter via the footer of our website. You can also follow us on social media and regularly check our Auctions page for the latest dates, catalogues, and viewing appointments.',
  },
]

const BUYING_FAQS = [
  {
    question: 'How do I participate/register for an auction?',
    answer:
      'To participate in one of our auctions, you need to register on our website and then register to bid for the specific auction you are interested in. Once your registration is approved, you will receive confirmation and can bid online, by telephone, or in person.',
  },
  {
    question: 'What types of pianos are available for auction?',
    answer:
      'We auction a wide range of pianos including upright pianos, grand pianos, baby grands, concert grands, and digital pianos. Brands we regularly feature include Steinway & Sons, Bösendorfer, Yamaha, Kawai, Bechstein, Blüthner, Petrof, Schimmel, and many more.',
  },
  {
    question: 'Can I view the pianos before bidding?',
    answer:
      'Yes, we offer viewing appointments prior to each auction. Viewing dates are published on each auction listing. We strongly encourage prospective buyers to attend a viewing in person or request a detailed condition report if they are unable to attend.',
  },
  {
    question: 'How can I place a bid?',
    answer:
      'You can place bids online through our bidding portal, by telephone with one of our specialists, or by submitting an absentee bid in advance. Live online bidding is also available for all of our auctions.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept bank transfer (BACS/CHAPS), debit cards, and in some cases credit cards. Full payment details are provided upon successful purchase. Please note that payment must be received within the timeframe specified in our terms and conditions.',
  },
  {
    question: 'What if I cannot attend the auction in person?',
    answer:
      'If you cannot attend in person, you can participate via online bidding, telephone bidding, or by placing an absentee bid. Our team will ensure you have the best possible chance of securing your chosen piano regardless of your location.',
  },
  {
    question: 'How do I arrange for the delivery of my purchased piano?',
    answer:
      'We work with specialist piano carriers who can arrange delivery anywhere in the UK and internationally. Once you have made your purchase, our team will be happy to recommend trusted transport partners and help coordinate the collection and delivery of your piano.',
  },
  {
    question: 'Are there any guarantees on the pianos sold?',
    answer:
      'Pianos are sold as seen at auction. However, we provide detailed condition reports and encourage viewing appointments so that buyers can make an informed decision. All lots are described as accurately as possible and we are transparent about any known defects.',
  },
]

const SELLING_FAQS = [
  {
    question: 'How do I sell my piano through Piano Auctions Limited?',
    answer:
      'Simply submit your piano details via our online valuation form or contact us directly. Our specialist team will review your submission and provide you with a free auction estimate based on current market conditions and comparable sales.',
  },
  {
    question: 'What are the fees for selling a piano?',
    answer:
      'Our commission fees are competitive and are deducted from the hammer price following a successful sale. Full fee details will be provided in your Auction Contract prior to your piano being entered into a sale. There are no upfront costs.',
  },
  {
    question: 'What is the process for consigning my piano to an auction?',
    answer:
      'After receiving your valuation, you agree to the terms and we send you a digital Auction Contract to sign. Once confirmed, we arrange collection by one of our trusted specialist carriers, catalogue the piano, and list it in the next suitable auction.',
  },
  {
    question: 'How should I prepare my piano for sale?',
    answer:
      'Ideally, the piano should be clean and in reasonable cosmetic condition. If it has been recently tuned, please let us know. Our specialists will assess the piano upon collection and include all relevant details in the auction catalogue listing.',
  },
  {
    question: 'When will I receive payment for my sold piano?',
    answer:
      'Payment is typically processed within 28 days of the auction, once the buyer\'s funds have cleared. You will receive a settlement cheque or bank transfer for the hammer price minus our applicable charges as detailed in your contract.',
  },
  {
    question: 'What happens if my piano does not sell?',
    answer:
      'If your piano does not meet its reserve price, we will discuss your options with you. We may re-enter the piano in a future auction at an adjusted estimate, or explore alternative selling routes. There is no charge if your piano does not sell.',
  },
  {
    question: 'Can I set a reserve price for my piano?',
    answer:
      'Yes, you can set a reserve price in agreement with our specialists. The reserve is the minimum price below which the lot will not be sold. Our team will advise you on a realistic reserve based on current market data.',
  },
  {
    question: 'How will my piano be marketed?',
    answer:
      'All pianos are listed in our online auction catalogue with detailed descriptions and photographs. We also promote our auctions through our website, email newsletters, social media channels, and relevant trade publications to attract the widest possible audience.',
  },
  {
    question: 'Are there any restrictions on the types of pianos you accept for auction?',
    answer:
      'We accept most acoustic pianos in resaleable condition. We do not typically accept heavily damaged instruments or those requiring extensive restoration unless they have significant historical or collector value. Contact us to discuss your specific piano.',
  },
]

export default function FaqPage() {
  return (
    <div className="w-full">
      <FaqSection
        title="General Information"
        items={GENERAL_FAQS}
        background="white"
      />
      <FaqSection
        title="Buying A Piano At Auction"
        items={BUYING_FAQS}
        background="cream"
      />
      <FaqSection
        title="Selling A Piano At Auction"
        items={SELLING_FAQS}
        background="white"
      />
      <FaqFurtherInformation />
    </div>
  )
}
