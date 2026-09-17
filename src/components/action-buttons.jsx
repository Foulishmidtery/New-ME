import Link from "next/link";

export function ActionButtons({ editHref, detailHref, onDelete }) {
  return (
    <div className="cms-actions" aria-label="Aksi data">
      {detailHref ? <Link href={detailHref}>Detail</Link> : null}
      {editHref ? <Link href={editHref}>Ubah</Link> : null}
      {onDelete ? <button type="button" onClick={onDelete}>Hapus</button> : null}
    </div>
  );
}
