<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Blog::published()->latest('published_at');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $blogs = $query->get()->map(fn (Blog $blog) => $this->formatBlog($blog));

        return response()->json($blogs);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::published()->where('slug', $slug)->firstOrFail();

        return response()->json($this->formatBlog($blog, true));
    }

    private function resolveImage(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return asset('storage/' . $path);
    }

    private function formatBlog(Blog $blog, bool $full = false): array
    {
        $data = [
            'id'           => $blog->id,
            'title'        => $blog->title,
            'slug'         => $blog->slug,
            'excerpt'      => $blog->excerpt,
            'category'     => $blog->category,
            'published_at' => $blog->published_at?->format('d/m/Y'),
            'featured_image' => $this->resolveImage($blog->featured_image),
        ];

        if ($full) {
            $data['content'] = $blog->content;
        }

        return $data;
    }
}
