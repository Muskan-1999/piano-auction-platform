<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ValueMyPianoImage extends Model
{
    protected $fillable = ['value_my_piano_id', 'image_path'];

    public function valueMyPiano(): BelongsTo
    {
        return $this->belongsTo(ValueMyPiano::class);
    }
}
