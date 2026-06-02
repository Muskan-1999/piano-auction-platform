<?php

namespace App\Services;

use App\Models\ValueMyPiano;
use Illuminate\Http\UploadedFile;

class ValueMyPianoService
{
    public function store(array $data, array $imageFiles = []): ValueMyPiano
    {
        $data['status'] = ValueMyPiano::STATUS_NEW;

        $valuation = ValueMyPiano::create($data);

        foreach ($imageFiles as $file) {
            if ($file instanceof UploadedFile) {
                $path = $file->store('value-my-pianos', 'public');
                $valuation->images()->create(['image_path' => $path]);
            }
        }

        return $valuation->load('images');
    }
}
