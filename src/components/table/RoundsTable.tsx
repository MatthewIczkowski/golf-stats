"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Round {
  id: string;
  date: string | Date;
  course_name: string;
  slope: string | number;
  rating: string | number;
  score: string | number;
  user_id: string | null;
}

function formatDate(date: string | Date): string {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function RoundsTable({ rounds }: { rounds: Round[] | Record<string, unknown>[] }) {
  const typedRounds = rounds as Round[];

  const average =
    typedRounds.length > 0
      ? (
          typedRounds.reduce((sum, round) => sum + Number(round.score), 0) /
          typedRounds.length
        ).toFixed(1)
      : "0.0";

  return (
    <Table>
      {/*<TableCaption>A list of recent scores.</TableCaption>*/}
      <TableHeader>
        <TableRow>
          {/*<TableHead className="w-[100px] font-bold">UUID</TableHead>*/}
          <TableHead className="font-bold">User ID</TableHead>
          <TableHead className="font-bold">Date</TableHead>
          <TableHead className="font-bold">Course</TableHead>
          <TableHead className="font-bold">Slope</TableHead>
          <TableHead className="font-bold">Rating</TableHead>
          <TableHead className="text-right font-bold">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {typedRounds.length === 0 ? (
          <TableRow key="empty-state">
            <TableCell colSpan={2} className="text-center">
              No rounds found
            </TableCell>
          </TableRow>
        ) : (
          typedRounds.map((round, index) => (
            <TableRow key={round.id || `round-${index}`}>
              {/*<TableCell className="font-medium">{round.id}</TableCell>*/}
              <TableCell>{round.user_id ?? "—"}</TableCell>
              <TableCell>{formatDate(round.date)}</TableCell>
              <TableCell>{round.course_name}</TableCell>
              <TableCell>{round.slope}</TableCell>
              <TableCell>{round.rating}</TableCell>
              <TableCell className="text-right">{round.score}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold">
            Score Average
          </TableCell>
          <TableCell className="text-right">{average}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
