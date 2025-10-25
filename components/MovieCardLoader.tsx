import { Card, CardContent } from "@/components/ui/card";

export default function MovieCardLoader() {
  return (
    <Card className="border-none shadow-md rounded-xl overflow-hidden animate-pulse">
      {/* Poster Placeholder */}
      <div className="relative w-full aspect-[2/3] bg-gray-200" />

      <CardContent className="p-4">
        {/* Movie Title */}
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>

        {/* Release Date */}
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </CardContent>
    </Card>
  );
}
