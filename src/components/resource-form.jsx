"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResourceForm({ resource, initialData, mode }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = mode === "edit";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const body = Object.fromEntries(new FormData(event.currentTarget));
    const url = isEditing ? `/api/data-menus/${initialData.id}` : "/api/data-menus";
    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setIsSubmitting(false);
    if (!response.ok) {
      setError("Data gagal disimpan. Periksa kembali input dan koneksi database.");
      return;
    }
    router.push("/cms/data-menu");
    router.refresh();
  }

  return (
    <section>
      <h1>{isEditing ? `Ubah ${resource.label}` : `Tambah ${resource.label}`}</h1>
      <p>{isEditing ? "Perbarui data di bawah ini." : "Isi data baru di bawah ini."}</p>
      <form onSubmit={handleSubmit}>
        {resource.fields.map((field) => (
          <p key={field.name}>
            <label htmlFor={field.name}>{field.label}</label><br />
            {field.type === "textarea" ? (
              <textarea id={field.name} name={field.name} defaultValue={initialData?.[field.name] ?? ""} />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type || "text"}
                required={field.required}
                defaultValue={initialData?.[field.name] ?? ""}
              />
            )}
          </p>
        ))}
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Simpan Data"}
        </button>
      </form>
    </section>
  );
}
