import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const CACHE_TTL = 60 * 60; // 1 hour

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const query = searchParams.get("query") || "";

    const cacheKey = `movies:${query || "popular"}:page:${page}`;

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            console.log('Serving from cache:', cacheKey);
            return NextResponse.json({ movies: cached });
        }

        console.log('Fetching from TMDB API:', cacheKey);

        const endPoint = query 
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

        const res = await fetch(endPoint);
        
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch movies" }, { status: res.status });
        }

        const data = await res.json();
        const movies = data.results;

        await redis.set(cacheKey, JSON.stringify(movies), { ex: CACHE_TTL });

        return NextResponse.json({ movies: data.results });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}