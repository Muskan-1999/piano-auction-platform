<?php

namespace App\Services;

use App\Models\SellMyPiano;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class SellMyPianoService
{
    public function store(array $data, array $imageFiles = []): SellMyPiano
    {
        $data['images'] = $this->storeImages($imageFiles);
        $data['status'] = SellMyPiano::STATUS_PENDING;
        $data['collection_address_different'] = (bool) ($data['collection_address_different'] ?? false);

        return SellMyPiano::create($data);
    }

    private function storeImages(array $files): array
    {
        $paths = [];

        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $path = $file->store('sell-my-piano', 'public');
                $paths[] = $path;
            }
        }

        return $paths;
    }
}
