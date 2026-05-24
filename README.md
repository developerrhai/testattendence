# Student Attendance Module — Next.js

Biometric attendance integration for your Institute Management System using the SmartOffice API.

---

## Folder structure

```
attendance-module/
├── app/
│   ├── attendance/
│   │   └── page.tsx              ← Main attendance page
│   └── api/
│       └── attendance/
│           └── route.ts          ← API proxy (GET sync, POST mark leave)
├── components/
│   └── attendance/
│       ├── StatCards.tsx         ← 4 summary stat cards
│       ├── FilterBar.tsx         ← Search, date, status, section filters
│       ├── AttendanceTable.tsx   ← Data table with pagination + expand
│       └── StatusBadge.tsx       ← Present / Absent / Late / On Leave badge
├── hooks/
│   └── useAttendance.ts          ← All state, filtering, sync logic
├── lib/
│   └── smartoffice.ts            ← SmartOffice API calls + attendance computation
├── types/
│   └── attendance.ts             ← TypeScript types
└── .env.local.example            ← Required environment variables
```

---

## Setup

### 1. Copy files into your Next.js project

Drop all files into your existing Next.js project root. If using the App Router (Next.js 13+), the `app/` folder merges directly.

### 2. Install dependencies

```bash
npm install
# or
yarn
```

No extra packages needed — uses only Next.js built-ins.

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
SMARTOFFICE_BASE_URL=http://YOUR_SERVER_IP:PORT
SMARTOFFICE_API_KEY=your_api_key_here
```

> **Never expose your API key to the browser.** The `lib/smartoffice.ts` file runs server-side only (inside the API route).

### 4. Set up Tailwind CSS (if not already)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:
```js
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

### 5. Connect your student database

In `app/api/attendance/route.ts`, replace `MOCK_STUDENTS` with a real DB query:

```ts
// With Prisma:
import { prisma } from "@/lib/prisma";
const students = await prisma.student.findMany({
  where: { status: "active" },
  select: { id: true, code: true, name: true, gender: true, contact: true, section: true },
});
```

---

## How it works

### Sync flow

1. User clicks **Sync Biometric** button
2. Frontend calls `GET /api/attendance?date=YYYY-MM-DD`
3. API route fetches your student list from DB
4. Calls SmartOffice `GET /api/v2/WebAPI/GetDeviceLogs?APIKey=...&FromDate=...&ToDate=...`
5. Groups logs by `EmployeeCode`, computes `Present` / `Late` / `Absent`
6. Returns computed `AttendanceRecord[]` to frontend
7. Table and stat cards update

### Status logic

| Condition | Status |
|---|---|
| No biometric log found | Absent |
| Punch-in ≤ 09:15 | Present |
| Punch-in > 09:15 | Late |
| Manually marked | On Leave |

Change the threshold in `lib/smartoffice.ts`:
```ts
const LATE_HOUR = 9;
const LATE_MINUTE = 15;
```

### Mark as On Leave

Click the **Leave** button on any Absent student → calls `POST /api/attendance` → you can persist this to your DB.

---

## Customization

### Add more sections

In `FilterBar.tsx`:
```ts
const SECTION_OPTIONS = [
  { value: "", label: "All Sections" },
  { value: "A", label: "Section A" },
  { value: "D", label: "Section D" }, // ← add here
];
```

### Change late threshold

In `lib/smartoffice.ts`:
```ts
const LATE_HOUR = 9;
const LATE_MINUTE = 30; // ← change to 9:30
```

### Filter by specific biometric device

In `lib/smartoffice.ts`, pass `serialNumber` to `fetchBiometricLogs`:
```ts
const logs = await fetchBiometricLogs(date, date, "C26044C84F352331");
```

### Export to Excel

Install `xlsx`:
```bash
npm install xlsx
```

```ts
import * as XLSX from "xlsx";

function exportToExcel(records: AttendanceRecord[]) {
  const rows = records.map((r) => ({
    "Student Name": r.student.name,
    "Code": r.student.code,
    "Contact": r.student.contact,
    "Section": r.student.section,
    "Punch In": r.punchIn ?? "—",
    "Punch Out": r.punchOut ?? "—",
    "Status": r.status,
    "Date": r.date,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance");
  XLSX.writeFile(wb, `attendance-${new Date().toISOString().split("T")[0]}.xlsx`);
}
```

---

## API Reference (SmartOffice)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/v2/WebAPI/GetDeviceLogs` | GET | Fetch attendance logs by date range |
| `/api/v2/WebAPI/AddBiometric` | POST | Register a biometric device |
| `/api/v2/WebAPI/DeleteBiometric` | GET | Remove a biometric device |
| `/api/v2/WebAPI/UploadUser` | POST | Upload student to biometric device |
| `/api/v2/WebAPI/DeleteUser` | POST | Remove student from device |
| `/api/WebAPI/BlockUserinBiometric` | GET | Block/unblock a student |
| `/api/v2/WebAPI/SetUserExpiration` | GET | Set expiry date for a student |
