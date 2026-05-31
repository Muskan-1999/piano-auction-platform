<?php

namespace App\Providers;

use App\Events\LotSold;
use App\Http\Middleware\EnsureUserHasRole;
use App\Listeners\HandleLotSold;
use App\Models\AbsenteeBid;
use App\Models\AuctionRegistration;
use App\Models\Lot;
use App\Models\TelephoneBid;
use App\Policies\AbsenteeBidPolicy;
use App\Policies\AuctionRegistrationPolicy;
use App\Policies\LotPolicy;
use App\Policies\TelephoneBidPolicy;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        // ── Middleware alias ─────────────────────────────────────────────────
        if ($this->app->bound('router')) {
            $this->app->make(Router::class)->aliasMiddleware('role', EnsureUserHasRole::class);
        }

        // ── Policies ─────────────────────────────────────────────────────────
        Gate::policy(TelephoneBid::class,       TelephoneBidPolicy::class);
        Gate::policy(AbsenteeBid::class,        AbsenteeBidPolicy::class);
        Gate::policy(AuctionRegistration::class, AuctionRegistrationPolicy::class);
        Gate::policy(Lot::class,                LotPolicy::class);

        // ── Event listeners ──────────────────────────────────────────────────
        Event::listen(LotSold::class, HandleLotSold::class);

        // ── Password reset URL ───────────────────────────────────────────────
        ResetPassword::createUrlUsing(function (object $user, string $token) {
            return 'http://localhost:5173/reset-password?token='
                . $token
                . '&email='
                . urlencode($user->email);
        });
    }
}
