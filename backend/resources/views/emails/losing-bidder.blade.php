<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Auction Has Ended</title>
<style>
  body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f5f5; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 40px auto; background: #111; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-bottom: 2px solid #555; padding: 40px 40px 32px; text-align: center; }
  .logo-mark { display: inline-block; width: 48px; height: 48px; background: #333; border-radius: 8px; line-height: 48px; font-size: 24px; margin-bottom: 16px; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 0.04em; color: #fff; }
  .header p { margin: 8px 0 0; color: #888; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; }
  .body { padding: 40px; }
  .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #1f1f1f; font-size: 14px; }
  .detail-label { color: #888; }
  .detail-value { color: #e5e5e5; font-weight: 500; }
  .section-title { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin: 32px 0 16px; }
  .info-box { background: #1a1a1a; border-radius: 6px; padding: 20px; font-size: 14px; line-height: 1.7; color: #ccc; }
  .final-amount { font-size: 28px; color: #e5e5e5; font-weight: 700; text-align: center; padding: 20px; background: #1a1a1a; border-radius: 6px; margin: 16px 0; }
  .cta-btn { display: block; margin: 32px auto 0; background: #c9a84c; color: #111; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-align: center; max-width: 220px; }
  .footer { background: #0d0d0d; padding: 24px 40px; text-align: center; font-size: 12px; color: #555; border-top: 1px solid #1f1f1f; }
  .footer a { color: #888; text-decoration: none; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="logo-mark">🔔</div>
    <h1>Auction Has Ended</h1>
    <p>{{ $lot->title }}</p>
  </div>

  <div class="body">
    <p style="font-size:15px;line-height:1.7;color:#ccc;">
      Dear {{ $recipient->name }},<br><br>
      Thank you for participating in the auction for
      <strong style="color:#e5e5e5;">Lot {{ $lot->lot_number }} — {{ $lot->title }}</strong>
      at <strong style="color:#e5e5e5;">{{ $lot->auction?->title }}</strong>.
    </p>

    <p style="font-size:15px;line-height:1.7;color:#ccc;">
      The auction has now closed. While this particular lot went to another bidder,
      we truly appreciate your participation and hope to see you at our upcoming auctions.
    </p>

    <div class="section-title">Final Result</div>

    <div class="detail-row">
      <span class="detail-label">Auction</span>
      <span class="detail-value">{{ $lot->auction?->title }}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Lot</span>
      <span class="detail-value">Lot {{ $lot->lot_number }} — {{ $lot->title }}</span>
    </div>
    @if($lot->brand)
    <div class="detail-row">
      <span class="detail-label">Piano</span>
      <span class="detail-value">{{ $lot->brand }} {{ $lot->model }}</span>
    </div>
    @endif
    <div class="detail-row" style="border-bottom:none;">
      <span class="detail-label">Final Winning Bid</span>
      <span class="detail-value">
        £{{ number_format($lot->winning_bid_amount ?? $lot->current_bid, 0, '.', ',') }}
      </span>
    </div>

    <div class="section-title">Browse Our Next Auctions</div>
    <div class="info-box">
      We regularly list exceptional pianos from world-renowned makers.
      Register for our upcoming auctions and you may find your perfect instrument.
    </div>

    <a href="{{ config('app.url') }}/auction-portal/catalogue" class="cta-btn">
      Browse Upcoming Auctions
    </a>
  </div>

  <div class="footer">
    <p>© {{ date('Y') }} Piano Auctions. All rights reserved.</p>
    <p>You received this email because you placed a bid in our auction system.</p>
  </div>
</div>
</body>
</html>
