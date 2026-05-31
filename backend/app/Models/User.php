<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail as MustVerifyEmailContract;
use App\Models\AuctionRegistration;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmailContract
{
    use HasApiTokens, HasFactory, Notifiable, MustVerifyEmail;

    public const ROLE_ADMIN = 'admin';
    public const ROLE_BIDDER = 'bidder';

    protected $attributes = [
        'role' => self::ROLE_BIDDER,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'postal_code',
        'country',
        'role',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function hasRole(array|string $roles): bool
    {
        $roles = is_array($roles) ? $roles : explode('|', $roles);

        return in_array($this->role, $roles, true);
    }

    public function auctionRegistrations(): HasMany
    {
        return $this->hasMany(AuctionRegistration::class);
    }

    public function hasApprovedAuctionRegistration(int $auctionId): bool
    {
        return $this->auctionRegistrations()
            ->where('auction_id', $auctionId)
            ->where('status', AuctionRegistration::STATUS_APPROVED)
            ->exists();
    }
}
