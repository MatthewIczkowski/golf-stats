"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getData } from "@/lib/actions";

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

export function RoundsTable() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRounds() {
      try {
        const data = await getData();
        setRounds(data as Round[]);
      } catch (error) {
        console.error("Error fetching rounds:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRounds();
  }, []);

  const average =
    rounds.length > 0
      ? (
          rounds.reduce((sum, round) => sum + Number(round.score), 0) /
          rounds.length
        ).toFixed(1)
      : "0.0";

  if (isLoading) {
    return (
      <Table>
        {/*<TableCaption>A list of recent scores.</TableCaption>*/}
        <TableBody>
          <TableRow key="loading">
            <TableCell colSpan={2} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

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
        {rounds.length === 0 ? (
          <TableRow key="empty-state">
            <TableCell colSpan={2} className="text-center">
              No rounds found
            </TableCell>
          </TableRow>
        ) : (
          rounds.map((round, index) => (
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
