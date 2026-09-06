"use client";

import { useState } from "react";

type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

type BookingActionsProps = {
  bookingId: number;
  status: BookingStatus;
};

export default function BookingActions({
  bookingId,
  status,
}: BookingActionsProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [updating, setUpdating] = useState(false);

  async function updateStatus(newStatus: BookingStatus) {
    setUpdating(true);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update booking.");
      }

      setCurrentStatus(newStatus);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to update booking."
      );
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-(--muted)">
          Update Status
        </p>

        <span className="text-xs uppercase tracking-[0.15em]">
          {currentStatus}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentStatus === "PENDING" && (
          <>
            <button
              onClick={() => updateStatus("CONFIRMED")}
              disabled={updating}
              className="border border-(--accent) px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-(--accent) transition-colors hover:bg-(--accent) hover:text-black disabled:opacity-50"
            >
              Confirm
            </button>

            <button
              onClick={() => updateStatus("CANCELLED")}
              disabled={updating}
              className="border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-(--muted) transition-colors hover:border-white hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        )}

        {currentStatus === "CONFIRMED" && (
          <>
            <button
              onClick={() => updateStatus("COMPLETED")}
              disabled={updating}
              className="border border-(--accent) px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-(--accent) transition-colors hover:bg-(--accent) hover:text-black disabled:opacity-50"
            >
              Mark Completed
            </button>

            <button
              onClick={() => updateStatus("CANCELLED")}
              disabled={updating}
              className="border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-(--muted) transition-colors hover:border-white hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
          </>
        )}

        {currentStatus === "CANCELLED" && (
          <button
            onClick={() => updateStatus("PENDING")}
            disabled={updating}
            className="border border-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-(--muted) transition-colors hover:border-white hover:text-white disabled:opacity-50"
          >
            Reopen
          </button>
        )}

        {currentStatus === "COMPLETED" && (
          <span className="text-xs text-(--muted)">
            This booking is completed.
          </span>
        )}
      </div>
    </div>
  );
}