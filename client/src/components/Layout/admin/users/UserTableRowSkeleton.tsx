import {
  TableRowSkeleton,
  TableCellSkeleton,
} from "@/components/ui/TableRowSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function UserTableRowSkeleton() {
  return (
    <TableRowSkeleton>
      <TableCellSkeleton>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </TableCellSkeleton>
      <TableCellSkeleton>
        <Skeleton className="h-4 w-20" />
      </TableCellSkeleton>
      <TableCellSkeleton>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCellSkeleton>
      <TableCellSkeleton className="text-right">
        <Skeleton className="h-8 w-8" />
      </TableCellSkeleton>
    </TableRowSkeleton>
  );
}
