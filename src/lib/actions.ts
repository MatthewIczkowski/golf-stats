"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
    const sql = neon(process.env.DATABASE_URL as string);
    const data = await sql`SELECT * FROM rounds`;
    return data;
}