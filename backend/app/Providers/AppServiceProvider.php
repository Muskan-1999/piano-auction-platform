<?php

namespace App\Providers;

use App\Http\Middleware\EnsureUserHasRole;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->bound('router')) {
            $this->app->make(Router::class)->aliasMiddleware('role', EnsureUserHasRole::class);
        }

        ResetPassword::createUrlUsing(function (object $user, string $token) {
            return 'http://localhost:5173/reset-password?token='
                . $token
                . '&email='
                . urlencode($user->email);
        });
    }
}
