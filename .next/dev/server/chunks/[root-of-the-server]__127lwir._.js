module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/smartoffice.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAttendanceRecords",
    ()=>buildAttendanceRecords,
    "computeSummary",
    ()=>computeSummary,
    "fetchBiometricLogs",
    ()=>fetchBiometricLogs,
    "syncAttendance",
    ()=>syncAttendance
]);
const SMARTOFFICE_BASE = process.env.SMARTOFFICE_BASE_URL ?? "http://YOUR_SERVER_IP:PORT";
const API_KEY = process.env.SMARTOFFICE_API_KEY ?? "";
// ─── SmartOffice API calls (server-side only) ───────────────────────────────
function generateMockLogs(date) {
    return [
        {
            EmployeeCode: "101",
            LogDate: `${date} 08:45:12`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "in",
            Temperature: 98.2,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "101",
            LogDate: `${date} 16:30:22`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "out",
            Temperature: 98.4,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "102",
            LogDate: `${date} 09:05:43`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "in",
            Temperature: 98.6,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "102",
            LogDate: `${date} 16:35:10`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "out",
            Temperature: 98.7,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "103",
            LogDate: `${date} 09:22:15`,
            SerialNumber: "SO-9988-B",
            PunchDirection: "in",
            Temperature: 99.1,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "103",
            LogDate: `${date} 16:40:00`,
            SerialNumber: "SO-9988-B",
            PunchDirection: "out",
            Temperature: 98.9,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "104",
            LogDate: `${date} 08:55:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "in",
            Temperature: 98.4,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "104",
            LogDate: `${date} 16:15:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "out",
            Temperature: 98.5,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "106",
            LogDate: `${date} 09:45:00`,
            SerialNumber: "SO-9988-B",
            PunchDirection: "in",
            Temperature: 101.2,
            TemperatureState: "High"
        },
        {
            EmployeeCode: "106",
            LogDate: `${date} 16:50:00`,
            SerialNumber: "SO-9988-B",
            PunchDirection: "out",
            Temperature: 100.8,
            TemperatureState: "High"
        },
        {
            EmployeeCode: "108",
            LogDate: `${date} 08:30:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "in",
            Temperature: 97.9,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "108",
            LogDate: `${date} 16:00:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "out",
            Temperature: 98.1,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "110",
            LogDate: `${date} 09:10:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "in",
            Temperature: 98.5,
            TemperatureState: "Normal"
        },
        {
            EmployeeCode: "110",
            LogDate: `${date} 16:20:00`,
            SerialNumber: "SO-9988-A",
            PunchDirection: "out",
            Temperature: 98.3,
            TemperatureState: "Normal"
        }
    ];
}
async function fetchBiometricLogs(fromDate, toDate, serialNumber) {
    // If API configuration is missing/placeholder, run in static mock mode
    if (!API_KEY || API_KEY === "your_api_key_here" || SMARTOFFICE_BASE.includes("YOUR_SERVER_IP")) {
        console.log(`[SmartOffice] Running in static data mode for date: ${fromDate}`);
        return generateMockLogs(fromDate);
    }
    try {
        const params = new URLSearchParams({
            APIKey: API_KEY,
            FromDate: fromDate,
            ToDate: toDate,
            ...serialNumber ? {
                SerialNumber: serialNumber
            } : {}
        });
        const url = `${SMARTOFFICE_BASE}/api/v2/WebAPI/GetDeviceLogs?${params}`;
        const res = await fetch(url, {
            cache: "no-store"
        });
        if (!res.ok) {
            throw new Error(`SmartOffice responded with status ${res.status}`);
        }
        const data = await res.json();
        // API returns error as { status: false, message: "..." }
        if (!Array.isArray(data)) {
            if (data?.status === false) {
                throw new Error(data.message ?? "SmartOffice API error");
            }
            throw new Error("Unexpected response format from SmartOffice");
        }
        return data;
    } catch (error) {
        console.warn(`[SmartOffice] Failed to fetch live logs, falling back to static mock data. Error:`, error instanceof Error ? error.message : error);
        return generateMockLogs(fromDate);
    }
}
// ─── Attendance computation logic ────────────────────────────────────────────
const LATE_HOUR = 9;
const LATE_MINUTE = 15; // punch-in after 09:15 = Late
function parseLogDate(logDate) {
    // SmartOffice format: "2026-05-21 08:45:29"
    return new Date(logDate.replace(" ", "T"));
}
function formatTime(date) {
    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}
function computeStatus(logs, dateStr) {
    if (!logs.length) return {
        status: "Absent",
        punchIn: null,
        punchOut: null
    };
    const sorted = [
        ...logs
    ].sort((a, b)=>parseLogDate(a.LogDate).getTime() - parseLogDate(b.LogDate).getTime());
    const first = parseLogDate(sorted[0].LogDate);
    const last = sorted.length > 1 ? parseLogDate(sorted[sorted.length - 1].LogDate) : null;
    const lateThreshold = new Date(first);
    lateThreshold.setHours(LATE_HOUR, LATE_MINUTE, 0, 0);
    const status = first > lateThreshold ? "Late" : "Present";
    return {
        status,
        punchIn: formatTime(first),
        punchOut: last ? formatTime(last) : null
    };
}
function buildAttendanceRecords(students, logs, date) {
    // Group logs by EmployeeCode
    const byCode = new Map();
    for (const log of logs){
        const code = log.EmployeeCode.trim();
        const existing = byCode.get(code) ?? [];
        existing.push(log);
        byCode.set(code, existing);
    }
    return students.map((student)=>{
        const studentLogs = byCode.get(student.code.trim()) ?? [];
        const { status, punchIn, punchOut } = computeStatus(studentLogs, date);
        const latestLog = studentLogs[0];
        return {
            student,
            date,
            punchIn,
            punchOut,
            serialNumber: latestLog?.SerialNumber ?? "—",
            status,
            temperature: latestLog?.Temperature,
            temperatureState: latestLog?.TemperatureState,
            logCount: studentLogs.length
        };
    });
}
function computeSummary(records) {
    return {
        total: records.length,
        present: records.filter((r)=>r.status === "Present").length,
        absent: records.filter((r)=>r.status === "Absent").length,
        late: records.filter((r)=>r.status === "Late").length,
        onLeave: records.filter((r)=>r.status === "On Leave").length
    };
}
async function syncAttendance(students, date) {
    try {
        const logs = await fetchBiometricLogs(date, date);
        const records = buildAttendanceRecords(students, logs, date);
        const summary = computeSummary(records);
        return {
            success: true,
            records,
            summary,
            syncedAt: new Date().toISOString()
        };
    } catch (error) {
        return {
            success: false,
            records: [],
            summary: {
                total: 0,
                present: 0,
                absent: 0,
                late: 0,
                onLeave: 0
            },
            syncedAt: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
}),
"[project]/app/api/attendance/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$smartoffice$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/smartoffice.ts [app-route] (ecmascript)");
;
;
// In production, replace this with a real DB query:
// import { db } from "@/lib/db";
// const students = await db.student.findMany({ where: { status: "active" } });
const MOCK_STUDENTS = [
    {
        id: "1",
        code: "101",
        name: "Anand Sharma",
        gender: "Male",
        contact: "9922425925",
        standard: "12th"
    },
    {
        id: "2",
        code: "102",
        name: "Priya Desai",
        gender: "Female",
        contact: "9876543210",
        standard: "11th"
    },
    {
        id: "3",
        code: "103",
        name: "Rahul Patil",
        gender: "Male",
        contact: "8745874587",
        standard: "12th"
    },
    {
        id: "4",
        code: "104",
        name: "Sneha Kulkarni",
        gender: "Female",
        contact: "9988776655",
        standard: "10th"
    },
    {
        id: "6",
        code: "106",
        name: "Aisha Khan",
        gender: "Female",
        contact: "9001234567",
        standard: "12th"
    },
    {
        id: "7",
        code: "107",
        name: "Rohan Mehta",
        gender: "Male",
        contact: "9812345678",
        standard: "10th"
    },
    {
        id: "8",
        code: "108",
        name: "Kavita Nair",
        gender: "Female",
        contact: "9654321098",
        standard: "11th"
    },
    {
        id: "9",
        code: "109",
        name: "Suresh Yadav",
        gender: "Male",
        contact: "9778899001",
        standard: "12th"
    },
    {
        id: "10",
        code: "110",
        name: "Deepa Iyer",
        gender: "Female",
        contact: "9234567890",
        standard: "10th"
    }
];
// Simple in-memory storage for leaves in local development session
const markedLeaves = new Set(); // Format: "studentCode:date"
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    if (!date) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "date query param is required (YYYY-MM-DD)"
        }, {
            status: 400
        });
    }
    // Validate date format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Invalid date format. Use YYYY-MM-DD"
        }, {
            status: 400
        });
    }
    // Replace MOCK_STUDENTS with your actual DB query
    const students = MOCK_STUDENTS;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$smartoffice$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncAttendance"])(students, date);
    if (!result.success) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result, {
            status: 502
        });
    }
    // Apply marked leaves to result records
    result.records = result.records.map((record)=>{
        if (markedLeaves.has(`${record.student.code}:${date}`)) {
            return {
                ...record,
                status: "On Leave",
                punchIn: null,
                punchOut: null
            };
        }
        return record;
    });
    // Re-calculate summary to reflect the leave status
    result.summary = {
        total: result.records.length,
        present: result.records.filter((r)=>r.status === "Present").length,
        absent: result.records.filter((r)=>r.status === "Absent").length,
        late: result.records.filter((r)=>r.status === "Late").length,
        onLeave: result.records.filter((r)=>r.status === "On Leave").length
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
}
async function POST(request) {
    const body = await request.json();
    const { studentCode, date } = body;
    if (!studentCode || !date) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "studentCode and date are required"
        }, {
            status: 400
        });
    }
    // Save leave record to our in-memory cache for local development
    markedLeaves.add(`${studentCode}:${date}`);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true,
        message: `Leave marked for ${studentCode} on ${date}`
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__127lwir._.js.map