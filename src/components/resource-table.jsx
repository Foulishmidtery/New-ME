import Link from "next/link";

export function ResourceTable({ resource, rows }) {
  return (
    <section>
      <header>
        <div>
          <h1>{resource.label}</h1>
          <p>{resource.description}</p>
        </div>
        <Link href="/cms/data-menu/create">Tambah {resource.label}</Link>
      </header>
      <table>
        <thead>
          <tr>
            <th scope="col">No.</th>
            {resource.columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              {resource.columns.map((column) => <td key={column.key}>{row[column.key]}</td>)}
              <td><Link href={`/cms/data-menu/${row.id}/edit`}>Ubah</Link></td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={resource.columns.length + 2}>Belum ada data.</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
