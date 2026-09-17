"use client";

import { useEffect, useState } from "react";

export function MigratedResourceDetail({ definition, params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const endpoint = definition.endpoints?.[0];

  useEffect(() => {
    if (!endpoint) return;
    const url = params?.id ? `${endpoint}${params.id}` : endpoint;
    fetch(url, { credentials: "include" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload) => setData(Array.isArray(payload) ? payload[0] || {} : payload))
      .catch(() => setError("Data gagal dimuat."));
  }, [endpoint, params?.id]);

  if (!endpoint) return <div className="cms-card"><p>Belum ada endpoint data untuk halaman ini.</p></div>;
  if (error) return <div className="cms-card"><p>{error}</p></div>;
  if (data === null) return <div className="cms-card"><p>Memuat data...</p></div>;

  return (
    <dl className="cms-card">
      {Object.entries(data).map(([key, value]) => (
        <div key={key}><dt>{key}</dt><dd>{typeof value === "object" ? JSON.stringify(value) : String(value ?? "-")}</dd></div>
      ))}
    </dl>
  );
}
