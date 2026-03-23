export const dynamic = "force-dynamic";
import { client as sanityClient } from "../../../../sanity/lib/client";
import styles from "../../admin.module.css";
import BackButton from "../../../../components/BackButton";

async function getClients() {
  const query = `*[_type == "client" && !(_id in path("drafts.**"))] | order(_createdAt desc){
    _id,
    name,
    email,
    phone,
    goal,
    startDate,
    notes
  }`;

  console.log('[Sanity] getClients called');
  try {
    const data = await sanityClient.fetch(query, {}, { perspective: 'published' });
    console.log('[Sanity] getClients result', {
      isArray: Array.isArray(data),
      length: Array.isArray(data) ? data.length : null,
      sampleIds: Array.isArray(data) ? data.slice(0, 3).map((r) => r._id) : null,
    });
    return data;
  } catch (err) {
    console.error('[Sanity] getClients fetch error', err);
    return [];
  }
}

export default async function ClientListPage() {
  const clients = await getClients();

  return (
    <main className={styles.adminContainer}>
      <BackButton />
      <header className={styles.adminHeader}>
        <h1 className={styles.adminTitle}>Clients</h1>
        <p className={styles.adminSubtitle}>
          View and manage all nutrition clients.
        </p>
      </header>

      <div className={styles.clientsTableWrapper}>
        <div className={styles.clientsTablePanel}>
          {clients.length === 0 ? (
            <div className={styles.clientsEmpty}>
              <div className={styles.clientsEmptyTitle}>No clients yet</div>
              <div className={styles.clientsEmptyText}>
                Add clients via Admin → Add Client (Sanity Studio) and publish.
                They appear in this table on refresh.
              </div>
            </div>
          ) : (
            <div className={styles.clientsTableScroll}>
              <div className={styles.clientsTableHead}>
                <div className={styles.clientsTh}>Name</div>
                <div className={styles.clientsTh}>Email</div>
                <div className={styles.clientsTh}>Phone</div>
                <div className={styles.clientsTh}>Goal</div>
                <div className={styles.clientsTh}>Start Date</div>
                <div className={styles.clientsTh}>Notes</div>
              </div>

              <div className={styles.clientsTableBody}>
                {clients.map((c) => (
                  <div key={c._id} className={styles.clientsTr}>
                    <div
                      className={`${styles.clientsTd} ${styles.clientsTdName}`}
                    >
                      {c.name || "—"}
                    </div>
                    <div className={styles.clientsTd}>{c.email || "—"}</div>
                    <div className={styles.clientsTd}>{c.phone || "—"}</div>
                    <div className={styles.clientsTd}>{c.goal || "—"}</div>
                    <div className={styles.clientsTd}>
                      {c.startDate || "—"}
                    </div>
                    <div className={styles.clientsTd}>{c.notes || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}