
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CommunitySkeleton = () => {
  return (
    <Card className="cyber-card">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full dark:bg-gray-600 light:bg-gray-300" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4 dark:bg-gray-600 light:bg-gray-300" />
            <Skeleton className="h-4 w-1/2 dark:bg-gray-700 light:bg-gray-200" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full dark:bg-gray-700 light:bg-gray-200" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 dark:bg-gray-600 light:bg-gray-300" />
          <Skeleton className="h-8 w-24 dark:bg-gray-600 light:bg-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunitySkeleton;
