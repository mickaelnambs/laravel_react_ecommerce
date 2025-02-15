<?php

namespace App\Traits;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;

trait UploadFile
{
    protected function saveImage(UploadedFile $file, string $path = 'products'): string
    {
        $imageName = sprintf('%s_%s', time(), $file->getClientOriginalName());
        $folderPath = sprintf('images/%s', $path);

        $file->storeAs($folderPath, $imageName, 'public');

        return sprintf('storage/%s/%s', $folderPath, $imageName);
    }

    protected function removeFile(?string $file): void
    {
        if ($file) {
            $path = public_path($file);
            if (File::exists($path)) {
                File::delete($path);
            }
        }
    }
}
