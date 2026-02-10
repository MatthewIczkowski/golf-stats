"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`SELECT * FROM rounds ORDER BY date DESC`;
    return data;
}

export async function createRound(formData: FormData) {
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
    const notes = formData.get("notes") as string || null;

    await sql`
        INSERT INTO rounds (date, course_name, slope, rating, score, fairways_hit, greens_in_regulation, putts, penalties, double_bogeys, notes)
        VALUES (${date}, ${course_name}, ${slope}, ${rating}, ${score}, ${fairways_hit}, ${greens_in_regulation}, ${putts}, ${penalties}, ${double_bogeys}, ${notes})
    `;
}