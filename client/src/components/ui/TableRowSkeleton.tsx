import { TableCell, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";

interface TableRowSkeletonProps {
  children: ReactNode;
}

export function TableRowSkeleton({ children }: TableRowSkeletonProps) {
  return <TableRow>{children}</TableRow>;
}

interface TableCellSkeletonProps {
  children?: ReactNode;
  className?: string;
}

export function TableCellSkeleton({
  children,
  className,
}: TableCellSkeletonProps) {
  return <TableCell className={className}>{children}</TableCell>;
}
