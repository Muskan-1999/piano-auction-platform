<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Congratulations — You Won!</title>
<style>
  body { font-family: Georgia, serif; background: #0a0a0a; color: #f5f5f5; margin: 0; padding: 0; }
  .wrapper { max-width: 600px; margin: 40px auto; background: #111; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #111 0%, #1a1a1a 100%); border-bottom: 2px solid #c9a84c; padding: 40px 40px 32px; text-align: center; }
  .logo-mark { display: inline-block; width: 48px; height: 48px; background: #c9a84c; border-radius: 8px; line-height: 48px; font-size: 24px; margin-bottom: 16px; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 400; letter-spacing: 0.04em; color: #fff; }
  .header p { margin: 8px 0 0; color: #c9a84c; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; }
  .body { padding: 40px; }
  .greeting { font-size: 18px; margin-bottom: 24px; color: #e5e5e5; }
  .amount-box { background: #1a1a1a; border: 1px solid #c9a84c; border-radius: 6px; padding: 24px; text-align: center; margin: 24px 0; }
  .amount-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888; margin-bottom: 8px; }
  .amount-value { font-size: 40px; color: #c9a84c; font-weight: 700; letter-spacing: -0.02em; }
  .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #1f1f1f; font-size: 14px; }
  .detail-label { color: #888; }
  .detail-value { color: #e5e5e5; font-weight: 500; }
  .section-title { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a84c; margin: 32px 0 16px; }
  .payment-box { background: #1a1a1a; border-radius: 6px; padding: 20px; font-size: 14px; line-height: 1.7; color: #ccc; }
  .cta-btn { display: block; margin: 32px auto 0; background: #c9a84c; color: #111; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; text-align: center; max-width: 200px; }
  .footer { background: #0d0d0d; padding: 24px 40px; text-align: center; font-size: 12px; color: #555; border-top: 1px solid #1f1f1f; }
  .footer a { color: #888; text-decoration: none; }
</style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <div class="logo-mark">🔨</div>
    <h1>Congratulations!</h1>
    <p>You won the auction</p>
  </div>

  <div class="body">
    <p class="greeting">Dear {{ $lot->winner?->name ?? 'Bidder' }},</p>

    <p style="font-size:15px;line-height:1.7;color:#ccc;">
      We are delighted to inform you that you are the winning bidder for the following lot at
      <strong style="color:#e5e5e5;">{{ $lot->auction?->title }}</strong>.
    </p>

    <div class="amount-box">
      <div class="amount-label">Winning Bid</div>
      <div class="amount-value">£{{ number_format($lot->winning_bid_amount ?? $lot->current_bid, 0, '.', ',') }}</div>
    </div>

    <div class="section-title">Auction Details</div>

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
    <div class="detail-row">
      <span class="detail-label">Auction Date</span>
      <span class="detail-value">
        {{ $lot->auction?->start_time?->format('l, j F Y') ?? 'N/A' }}
      </span>
    </div>
    <div class="detail-row" style="border-bottom:none;">
      <span class="detail-label">Winning Amount</span>
      <span class="detail-value" style="color:#c9a84c;">
        £{{ number_format($lot->winning_bid_amount ?? $lot->current_bid, 0, '.', ',') }}
      </span>
    </div>

    <div class="section-title">Payment Instructions</div>
    <div class="payment-box">
      <p style="margin:0 0 12px;">To complete your purchase, please arrange payment within <strong>5 business days</strong>:</p>
      <ul style="margin:0;padding-left:20px;">
        <li>Bank transfer to the details provided by our team</li>
        <li>Full payment required before collection or delivery</li>
        <li>Our team will contact you within 24 hours with next steps</li>
      </ul>
    </div>

    <div class="section-title">Contact Us</div>
    <div class="payment-box">
      If you have any questions about payment or collection, please do not hesitate to contact us:<br><br>
      <strong>Email:</strong> <a href="mailto:{{ config('mail.from.address') }}" style="color:#c9a84c;">{{ config('mail.from.address') }}</a><br>
      <strong>Website:</strong> <a href="{{ config('app.url') }}" style="color:#c9a84c;">{{ config('app.url') }}</a>
    </div>

    <a href="{{ config('app.url') }}/auction-portal/auctions/{{ $lot->auction?->slug }}" class="cta-btn">
      View Auction
    </a>
  </div>

  <div class="footer">
    <p>© {{ date('Y') }} Piano Auctions. All rights reserved.</p>
    <p>You received this email because you placed a bid in our auction system.</p>
  </div>
</div>
</body>
</html>
