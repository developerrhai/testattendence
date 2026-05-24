"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type {
  AttendanceRecord,
  AttendanceSummary,
  FilterState,
  SyncResult,
} from "@/types/attendance";

const today = new Date().toISOString().split("T")[0];

const defaultFilter: FilterState = {
  search: "",
  status: "",
  date: today,
};

const defaultSummary: AttendanceSummary = {
  total: 0,
  present: 0,
  absent: 0,
  late: 0,
  onLeave: 0,
};

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>(defaultSummary);
  const [filter, setFilter] = useState<FilterState>(defaultFilter);
  const [syncing, setSyncing] = useState(false);
  const [syncedAt, setSyncedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const PER_PAGE = 10;

  const sync = useCallback(async (date?: string) => {
    setSyncing(true);
    setError(null);

    const syncDate = date ?? filter.date;

    try {
      const res = await fetch(`/api/attendance?date=${syncDate}`);
      const data: SyncResult = await res.json();

      if (!data.success) {
        setError(data.error ?? "Sync failed");
        return;
      }

      setRecords(data.records);
      setSummary(data.summary);
      setSyncedAt(data.syncedAt);
      setPage(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setSyncing(false);
    }
  }, [filter.date]);

  useEffect(() => {
    sync();
  }, [filter.date, sync]);

  const markLeave = useCallback(async (studentCode: string) => {
    const date = filter.date;
    try {
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentCode, date }),
      });

      // Optimistically update UI
      setRecords((prev) =>
        prev.map((r) =>
          r.student.code === studentCode
            ? { ...r, status: "On Leave" }
            : r
        )
      );

      // Recompute summary
      setSummary((prev) => ({
        ...prev,
        absent: Math.max(0, prev.absent - 1),
        onLeave: prev.onLeave + 1,
      }));
    } catch {
      setError("Failed to mark leave");
    }
  }, [filter.date]);

  const updateFilter = useCallback((patch: Partial<FilterState>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
    setPage(0);
  }, []);

  const filtered = useMemo(() => {
    const q = filter.search.toLowerCase();
    return records.filter((r) => {
      const matchSearch =
        !q ||
        r.student.name.toLowerCase().includes(q) ||
        r.student.contact.includes(q) ||
        r.student.code.includes(q);

      const matchStatus = !filter.status || r.status === filter.status;

      return matchSearch && matchStatus;
    });
  }, [records, filter.search, filter.status]);

  const filteredSummary: AttendanceSummary = useMemo(() => ({
    total: filtered.length,
    present: filtered.filter((r) => r.status === "Present").length,
    absent: filtered.filter((r) => r.status === "Absent").length,
    late: filtered.filter((r) => r.status === "Late").length,
    onLeave: filtered.filter((r) => r.status === "On Leave").length,
  }), [filtered]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return {
    records: paged,
    summary: records.length ? filteredSummary : summary,
    filter,
    updateFilter,
    syncing,
    syncedAt,
    error,
    page,
    totalPages,
    totalFiltered: filtered.length,
    setPage,
    sync,
    markLeave,
  };
}
