"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 50,
        padding: "8px 16px",
        borderRadius: "999px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        color: "#111827",
        fontSize: "0.875rem",
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        cursor: "pointer",
        transition:
          "transform 0.12s ease, box-shadow 0.12s ease, background-color 0.12s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow =
          "0 8px 18px rgba(15, 23, 42, 0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 12px rgba(15, 23, 42, 0.08)";
      }}
    >
      <span>←</span>
      <span>Back</span>
    </button>
  );
}

