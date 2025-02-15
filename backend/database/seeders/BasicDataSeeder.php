<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Size;
use Illuminate\Database\Seeder;

class BasicDataSeeder extends Seeder
{
    public function run()
    {
        $colors = ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow'];
        foreach ($colors as $color) {
            Color::create(['name' => $color]);
        }

        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
        foreach ($sizes as $size) {
            Size::create(['name' => $size]);
        }
    }
}
