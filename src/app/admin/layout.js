import AdminAuthGuard from "@/components/AdminAuthGuard";

export const metadata = {
  title: "Admin - DietLab",
  description: "DietLab administration dashboard.",
};

/**
 * All routes under `/admin` use this layout only. AdminAuthGuard runs here so
 * every admin page (including nested segments) checks `sessionStorage.isLoggedIn`
 * on load and on each client navigation before rendering dashboard UI.
 */
export default function AdminLayout({ children }) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
