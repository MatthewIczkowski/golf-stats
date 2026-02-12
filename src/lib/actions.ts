"use server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth/server";

export async function getData() {
  const sql = neon(process.env.DATABASE_URL as string);
  const session = await auth.getSession();
  const user_id = session?.data?.user?.id;

  if (user_id) {
    return await sql`SELECT * FROM rounds WHERE user_id = ${user_id} ORDER BY date DESC`;
  }
  return await sql`SELECT * FROM rounds WHERE user_id IS NULL ORDER BY date DESC`;
}

export async function getPerformanceStats() {
  const sql = neon(process.env.DATABASE_URL as string);
  const session = await auth.getSession();
  const user_id = session?.data?.user?.id;

  if (user_id) {
    const data = await sql`
      SELECT
        ROUND(AVG(fairways_hit)::numeric, 1) AS avg_fairways_hit,
        ROUND(AVG(greens_in_regulation)::numeric, 1) AS avg_gir,
        ROUND(AVG(putts)::numeric, 1) AS avg_putts
      FROM rounds
      WHERE user_id = ${user_id}
    `;
    return data[0];
  }
  const data = await sql`
    SELECT
      ROUND(AVG(fairways_hit)::numeric, 1) AS avg_fairways_hit,
      ROUND(AVG(greens_in_regulation)::numeric, 1) AS avg_gir,
      ROUND(AVG(putts)::numeric, 1) AS avg_putts
    FROM rounds
    WHERE user_id IS NULL
  `;
  return data[0];
}

export async function getMonthlyScoring() {
  const sql = neon(process.env.DATABASE_URL as string);
  const session = await auth.getSession();
  const user_id = session?.data?.user?.id;

  const query = user_id
    ? sql`
        SELECT
          TO_CHAR(date, 'YYYY-MM') AS month,
          ROUND(AVG(score)::numeric, 1) AS avg
        FROM rounds
        WHERE user_id = ${user_id}
        GROUP BY TO_CHAR(date, 'YYYY-MM')
        ORDER BY month
      `
    : sql`
        SELECT
          TO_CHAR(date, 'YYYY-MM') AS month,
          ROUND(AVG(score)::numeric, 1) AS avg
        FROM rounds
        WHERE user_id IS NULL
        GROUP BY TO_CHAR(date, 'YYYY-MM')
        ORDER BY month
      `;
  return await query;
}

export async function createRound(formData: FormData) {
  const session = await auth.getSession();
  if (!session?.data?.user?.id) {
    throw new Error("Not authenticated");
  }
  const user_id = session.data.user.id;

  const sql = neon(process.env.DATABASE_URL as string);

  const date = formData.get("date") as string;
  const course_name = formData.get("course_name") as string;
  const slope = Number(formData.get("slope"));
  const rating = Number(formData.get("rating"));
  const score = Number(formData.get("score"));
  const fairways_hit = Number(formData.get("fairways_hit"));
  const greens_in_regulation = Number(formData.get("greens_in_regulation"));
  const putts = Number(formData.get("putts"));
  const penalties = Number(formData.get("penalties"));
  const double_bogeys = Number(formData.get("double_bogeys"));
  const notes = (formData.get("notes") as string) || null;

  await sql`
        INSERT INTO rounds (date, course_name, slope, rating, score, fairways_hit, greens_in_regulation, putts, penalties, double_bogeys, notes, user_id)
        VALUES (${date}, ${course_name}, ${slope}, ${rating}, ${score}, ${fairways_hit}, ${greens_in_regulation}, ${putts}, ${penalties}, ${double_bogeys}, ${notes}, ${user_id})
    `;
}
