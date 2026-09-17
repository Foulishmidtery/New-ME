import Link from "next/link";
import { legacyPages } from "@/config/legacy-pages";
import { MigratedResourceForm } from "@/components/migrated-resource-form";
import { MigratedResourceTable } from "@/components/migrated-resource-table";
import { MigratedResourceDetail } from "@/components/migrated-resource-detail";

export function MigratedLegacyPage({ pageKey, params = {} }) {
  const definition = legacyPages[pageKey];
  if (!definition) return <section><h1>Halaman tidak ditemukan</h1></section>;
  const isForm = definition.fields?.length > 0 && ["create", "edit"].includes(definition.kind);
  const isList = definition.kind === "list" || definition.columns?.length > 0;

  return (
    <section className="cms-page">
      <header className="cms-page-header">
        <div>
          <p className="cms-eyebrow">Migrasi Next.js</p>
          <h1>{definition.title || pageKey}</h1>
          <p>Sumber lama: <code>legacy/views/{definition.source}</code></p>
        </div>
        {definition.kind === "list" ? <Link className="cms-button" href={`/cms${definition.route.replace(/\/$/, "")}/create`}>Tambah Data</Link> : null}
      </header>

      {isForm ? <MigratedResourceForm definition={definition} params={params} /> : null}
      {!isForm && isList ? <MigratedResourceTable definition={definition} /> : null}
      {!isForm && !isList ? <MigratedResourceDetail definition={definition} params={params} /> : null}

      {definition.endpoints?.length ? (
        <details className="cms-card">
          <summary>Endpoint legacy yang dipertahankan</summary>
          <ul>{definition.endpoints.map((endpoint) => <li key={endpoint}><code>{endpoint}</code></li>)}</ul>
        </details>
      ) : null}
    </section>
  );
}
