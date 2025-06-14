
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const RoomSkeleton = () => {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <Skeleton className="h-6 w-3/4 dark:bg-gray-600 light:bg-gray-300" />
            <Skeleton className="h-4 w-1/2 dark:bg-gray-700 light:bg-gray-200" />
          </div>
          <Skeleton className="h-6 w-12 dark:bg-gray-600 light:bg-gray-300" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-10 w-full dark:bg-gray-600 light:bg-gray-300" />
        <Skeleton className="h-16 w-full dark:bg-gray-700 light:bg-gray-200" />
        <Skeleton className="h-12 w-full dark:bg-gray-600 light:bg-gray-300" />
      </CardContent>
    </Card>
  );
};

export default RoomSkeleton;
