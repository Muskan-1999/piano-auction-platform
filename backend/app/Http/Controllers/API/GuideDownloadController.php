<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class GuideDownloadController extends Controller
{
    private const FILES = [
        'uk' => [
            'path'     => 'guides/PAL-Beginners-Guide-Online-New.pdf',
            'filename' => 'PAL-Beginners-Guide-Online-New.pdf',
        ],
        'eu' => [
            'path'     => 'guides/PAL-Beginners-Guide-Online-New-Dutch-German.pdf',
            'filename' => 'PAL-Beginners-Guide-Online-New-Dutch-German.pdf',
        ],
    ];

    public function download(string $type)
    {
        if (!array_key_exists($type, self::FILES)) {
            abort(404);
        }

        $entry    = self::FILES[$type];
        $path     = $entry['path'];
        $filename = $entry['filename'];

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        $fullPath = Storage::disk('public')->path($path);

        return response()->download($fullPath, $filename, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
