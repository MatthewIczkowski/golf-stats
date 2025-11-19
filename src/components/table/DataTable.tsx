import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const rounds = [
    {
      round: "0001",
      date: "10-19-2025",
      course: "Pinehurst #1",
      par: "72",
      score: "81",
    },
    {
      round: "0002",
      date: "10-20-2025",
      course: "Pebble Beach",
      par: "72",
      score: "73",
    },
    {
      round: "0003",
      date: "10-21-2025",
      course: "Merion Golf Club",
      par: "72",
      score: "75",
    },
    {
      round: "0004",
        date: "10-30-2025",
      course: "City Park Golf Course",
      par: "72",
      score: "76",
    },
    {
      round: "0005",
      date: "10-23-2025",
      course: "Willis Case Golf Course",
      par: "72",
      score: "74",
    },
  ]
  
  export function DataTable() {
    return (
      <Table>
        <TableCaption>A list of recent scores.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold">Round</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Course</TableHead>
            <TableHead className="font-bold">Par</TableHead>
            <TableHead className="text-right font-bold">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rounds.map((round) => (
            <TableRow key={round.round}>
              <TableCell className="font-medium">{round.round}</TableCell>
              <TableCell>{round.date}</TableCell>
              <TableCell>{round.course}</TableCell>
              <TableCell>{round.par}</TableCell>
              <TableCell className="text-right">{round.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="font-bold">Average</TableCell>
            <TableCell className="text-right">74.5</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  