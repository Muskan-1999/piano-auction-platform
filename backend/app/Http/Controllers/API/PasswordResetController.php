<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\PasswordResetService;
use Illuminate\Http\JsonResponse;

class PasswordResetController extends Controller
{
    public function __construct(private PasswordResetService $resetService)
    {
    }

    public function sendResetLink(ForgotPasswordRequest $request): JsonResponse
    {
        $status = $this->resetService->sendResetLink($request->validated()['email']);

        return match ($status) {
            \Illuminate\Support\Facades\Password::RESET_LINK_SENT => response()->json([
                'success' => true,
                'message' => 'Password reset link sent',
            ]),
            default => response()->json([
                'success' => false,
                'message' => 'Unable to send reset link',
            ], 422),
        };
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $status = $this->resetService->reset($request->validated());

        return match ($status) {
            \Illuminate\Support\Facades\Password::PASSWORD_RESET => response()->json([
                'success' => true,
                'message' => 'Password reset successful',
            ]),
            default => response()->json([
                'success' => false,
                'message' => 'Reset token invalid or expired',
            ], 422),
        };
    }
}
