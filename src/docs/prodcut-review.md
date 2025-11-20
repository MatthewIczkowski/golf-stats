# Golf Stat Tracker – Product Review & Updated Technical Plan (Neon + NextAuth)

## 1. Product Overview

Your golf stat tracker has evolved from a static Next.js demo into a fully planned public-facing application with secure, authenticated editing. The current build includes:

* **Monthly scoring average chart** (static data)
* **Rounds table** listing all recorded rounds
* **Skills matrix** (1–100 scale) for driving, approach, short game, and putting

The next phase transitions this from a static portfolio project into a dynamic, data-driven web application backed by a modern, scalable database.

---

## 2. Product Goals

1. **Move from static to dynamic data** using a real database.
2. **Create a secure public portfolio site** where users can view your stats.
3. **Add owner-only editing** using authentication to unlock data entry.
4. **Enable long-term tracking** of performance, scores, and skills.
5. **Lay groundwork for future analytics** (trendlines, projections, strokes gained).

---

## 3. Technical Direction

### 3.1 Database: Neon (Postgres)

Neon acts as the primary data store:

* Serverless Postgres
* Fast, scalable, and reliable
* Branching for development
* No bundled auth or APIs → perfect with Prisma + Next.js

### 3.2 ORM: Prisma

Prisma provides:

* Schema management and migrations
* Type-safe queries
* Prisma Studio for inspecting/editing data

### 3.3 Authentication: NextAuth.js

To support making the site public while retaining exclusive write access:

* OAuth provider: GitHub or Google
* JWT sessions
* Define `OWNER_EMAIL` in environment variables
* Condition UI and server actions on authenticated owner

**Outcome:**
Public users can **view**, but only you can **edit**.

### 3.4 Data Models

**Rounds Table**

* id (uuid)
* date
* course_name
* score
* fairways_hit
* greens_in_regulation
* putts
* penalties
* driving_distance_avg
* notes

**Skills Table**

* id
* date
* driving_distance
* driving_accuracy
* approach
* around_green
* putting

Optional future: **User Table** for permissions.

### 3.5 Editing Lock System

* Public view → all forms hidden or disabled
* “Unlock to Edit” button triggers NextAuth.js login
* Server actions validate the authenticated user:

```ts
if (session?.user?.email !== process.env.OWNER_EMAIL) {
  throw new Error("Unauthorized");
}
```

* Only owner sees editable UI elements

---

## 4. Application Features

### 4.1 Core User Flow (Public)

Visitors can:

* View scoring averages
* Explore rounds table
* Review skill matrix
* Browse portfolio explanation page

### 4.2 Core User Flow (Owner)

After authenticating:

* Add new rounds
* Update skills
* Modify existing data
* See additional analytics tools

---

## 5. Dynamic Frontend Updates

Using live database data:

* **Scoring Chart** pulls aggregated averages
* **Rounds Table** loads dynamic rows with sorting/filtering
* **Skills Matrix** shows most recent skill entry
* Future charts: scoring trends, rolling averages, skill progression

---

## 6. Roadmap

### Phase 0 – Authentication & Edit Locking

* [ ] Install NextAuth.js
* [ ] Configure GitHub/Google OAuth
* [ ] Add `OWNER_EMAIL` to `.env`
* [ ] Add “Unlock to Edit” button
* [ ] Lock all forms unless owner is authenticated
* [ ] Validate owner email in server actions

### Phase 1 – Database Setup (Neon + Prisma)

* [ ] Create Neon project and branches
* [ ] Add connection URL to Next.js
* [ ] Create Prisma schema for Rounds + Skills
* [ ] Run Prisma migrations
* [ ] Verify schema via Prisma Studio

### Phase 2 – Data Entry

* [ ] Build round submission form
* [ ] Add skill update form (sliders or inputs)
* [ ] Establish server actions to write to Neon

### Phase 3 – Dynamic UI

* [ ] Convert all charts to dynamic data
* [ ] Convert rounds table to dynamic data
* [ ] Add filters + sorting
* [ ] Add skills matrix from DB

### Phase 4 – Portfolio Enhancements

* [ ] Add landing page & project overview
* [ ] Add GitHub link
* [ ] Add authentication indicator (e.g., “Unlocked as Owner”)
* [ ] Improve visual polish with Tailwind + shadcn

### Phase 5 – Advanced Analytics (Optional)

* [ ] Personal bests page
* [ ] Year-over-year stats
* [ ] Course performance breakdown
* [ ] Early strokes-gained modeling
* [ ] AI-driven insights (optional)

---

## 7. Tech Stack Summary

* **Next.js App Router**
* **Neon** (serverless Postgres)
* **Prisma** (ORM)
* **NextAuth.js** (authentication)
* **Tailwind + shadcn** (UI)
* **Recharts** (charts)
* **Next.js Server Actions** (secure DB writes)

---

## 8. Next Steps Checklist

* [ ] Set up Neon + Prisma
* [ ] Implement NextAuth.js
* [ ] Build secure editing lock
* [ ] Add round + skill input forms
* [ ] Update charts and tables with live data
* [ ] Polish UI for portfolio launch

---

This document reflects your updated technical direction using **Neon + NextAuth.js** and ensures your golf stat tracker is both public-friendly and secure. Let me know if you’d like mockups, schema files, or a full code scaffold next.
