<?php

namespace Database\Seeders;

use App\Models\PianoBrand;
use Illuminate\Database\Seeder;

class PianoBrandsSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            ['name' => 'Steinway',    'domain' => 'steinway.com'],
            ['name' => 'Yamaha',      'domain' => 'yamaha.com'],
            ['name' => 'Kawai',       'domain' => 'kawai.com'],
            ['name' => 'Bösendorfer', 'domain' => 'bosendorfer.com'],
            ['name' => 'Bechstein',   'domain' => 'bechstein.com'],
            ['name' => 'Fazioli',     'domain' => 'fazioli.com'],
            ['name' => 'Blüthner',    'domain' => 'bluthner.de'],
            ['name' => 'Broadwood',   'domain' => 'broadwood.co.uk'],
            ['name' => 'Petrof',      'domain' => 'petrof.com'],
            ['name' => 'Schimmel',    'domain' => 'schimmel-piano.de'],
            ['name' => 'Seiler',      'domain' => 'seiler-pianos.de'],
            ['name' => 'Grotrian',    'domain' => 'grotrian.de'],
        ];

        foreach ($brands as $brand) {
            PianoBrand::updateOrCreate(
                ['name' => $brand['name']],
                ['icon_url' => "https://logo.clearbit.com/{$brand['domain']}"]
            );
        }
    }
}
