"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SearchPagination } from "@/components/search-pagination";
import { legacyListEndpoints } from "@/config/legacy-list-endpoints";
import { legacyListActions } from "@/config/legacy-list-actions";

export function MigratedResourceTable({ definition }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const columns = definition.columns?.length ? definition.columns : ["Data"];
  const endpoint = legacyListEndpoints[definition.key];
  const actions = legacyListActions[definition.key];

  function resolveAction(path, row) {
    return path.replace(/:([A-Za-z0-9_]+)/g, (_token, name) => {
      const aliases = {
        foto: ["foto", "photo", "img", "image", "path"],
        file: ["file", "fl", "path"],
      };
      const value = [name, ...(aliases[name] || [])]
        .map((key) => row[key])
        .find((item) => item !== undefined && item !== null && item !== "");
      if (value === undefined) return "";
      const filename = typeof value === "string" && /^(https?:)?\//.test(value) ? value.split("/").pop() : value;
      return encodeURIComponent(filename);
    });
  }

  async function runAction(path, label) {
    if (!window.confirm(`${label} data ini?`)) return;
    const response = await fetch(path, { credentials: "include" });
    if (!response.ok) { setError(`${label} gagal.`); return; }
    setRows((current) => current.filter((row) => path.includes(`/${row.id}`) === false));
  }

  useEffect(() => {
    if (!endpoint) {
      setLoading(false);
      setError("Endpoint daftar belum tersedia untuk modul ini.");
      return;
    }
    let active = true;
    fetch(endpoint, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setRows(Array.isArray(data) ? data : data.data || data.rows || []);
      })
      .catch(() => active && setError("Data gagal dimuat."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [endpoint]);

  const filtered = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pagedRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <SearchPagination query={query} onQueryChange={(value) => { setQuery(value); setPage(1); }} page={page} totalPages={totalPages} onPageChange={setPage} />
      <div className="cms-table-wrap">
        <table>
          <thead><tr>{columns.map((column, index) => <th key={`${column}-${index}`} scope="col">{column || `Kolom ${index + 1}`}</th>)}</tr></thead>
          <tbody>{loading ? <tr><td colSpan={columns.length}>Memuat data...</td></tr> : null}
            {error ? <tr><td colSpan={columns.length}>{error}</td></tr> : null}
            {!loading && !error && pagedRows.length === 0 ? <tr><td colSpan={columns.length}>Belum ada data.</td></tr> : null}
            {pagedRows.map((row, rowIndex) => {
              const keys = Object.keys(row);
              return <tr key={row.id || `${rowIndex}-${JSON.stringify(row)}`}>
                {columns.map((column, columnIndex) => {
                  const isAction = /aksi|actions/i.test(column);
                  if (isAction) return <td key={column}>
                    <Link href={`/cms${definition.route}/${row.id}/edit`}>Ubah</Link>{" "}
                    {actions?.approve ? <button type="button" onClick={() => runAction(resolveAction(actions.approve, row), "Setujui")}>Setujui</button> : null}{" "}
                    {actions?.remove ? <button type="button" onClick={() => runAction(resolveAction(actions.remove, row), "Hapus")}>Hapus</button> : null}
                  </td>;
                  const value = row[keys[columnIndex]];
                  return <td key={column}>{typeof value === "object" ? JSON.stringify(value) : String(value ?? "-")}</td>;
                })}
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
