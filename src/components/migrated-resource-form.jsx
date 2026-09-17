"use client";

import { useEffect, useMemo, useState } from "react";

function Field({ field, value, options }) {
  const common = { id: field.name, name: field.name, required: field.required };
  if (field.type === "textarea") return <textarea {...common} rows={5} defaultValue={value ?? ""} />;
  if (field.type === "select") {
    return (
      <select {...common} multiple={field.multiple} defaultValue={field.multiple ? String(value || "").split(",") : value ?? ""}>
        {!field.multiple ? <option value="">Pilih...</option> : null}
        {(options || field.options || []).map((option, index) => <option key={`${field.name}-${index}-${option.value}`} value={option.value}>{option.label || option.value}</option>)}
      </select>
    );
  }
  if (field.type === "checkbox" || field.type === "radio") return <input {...common} type={field.type} value="1" defaultChecked={Boolean(value)} />;
  return <input {...common} type={field.type || "text"} multiple={field.multiple} defaultValue={value ?? ""} />;
}

export function MigratedResourceForm({ definition, params }) {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({});
  const [dynamicOptions, setDynamicOptions] = useState({});
  const action = useMemo(() => definition.forms?.[0]?.action || "", [definition]);
  const method = definition.forms?.[0]?.method || "POST";
  const detailEndpoint = params?.id && definition.endpoints?.[0];

  useEffect(() => {
    if (!detailEndpoint) return;
    fetch(`${detailEndpoint}${params.id}`, { credentials: "include" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setValues(Array.isArray(data) ? data[0] || {} : data || {}))
      .catch(() => setMessage("Data edit gagal dimuat."));
  }, [detailEndpoint, params?.id]);

  useEffect(() => {
    const endpoints = {
      province: "/provinces", categories: "/categories", category_id: "/categories", directorat: "/directorat_fe",
      kdeks: "/api_kdeks", role_id: "/roles", tagging: "/tagging", institution: "/institutions",
      instansi: "/institutions", opening: "/pembuka", participants: "/peserta", area: "/area",
      kbli: "/kbli", age: "/usia", gender: "/gender",
    };
    definition.fields.filter((field) => field.type === "select" && endpoints[field.name]).forEach((field) => {
      fetch(endpoints[field.name], { credentials: "include" })
        .then((response) => response.ok ? response.json() : [])
        .then((rows) => setDynamicOptions((current) => ({ ...current, [field.name]: (Array.isArray(rows) ? rows : []).map((row) => ({ value: row.id ?? row.value ?? row.kode ?? row.name, label: row.name ?? row.title ?? row.province_name ?? row.label ?? row.value ?? row.kode })) })))
        .catch(() => undefined);
    });
  }, [definition.fields]);

  async function submit(event) {
    event.preventDefault();
    setMessage("");
    if (!action) {
      setMessage("Form JSX sudah dimigrasikan. Endpoint submit legacy tidak dideklarasikan pada tag form lama; integrasi tetap menggunakan kandidat endpoint legacy yang tercatat di bawah.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const endpoint = action.replace(/:id\b/g, params?.id || "");
    const response = await fetch(endpoint, { method, body: formData, credentials: "include" });
    setMessage(response.ok ? "Data berhasil dikirim." : `Permintaan gagal (${response.status}).`);
  }

  return (
    <form className="cms-form" onSubmit={submit} encType="multipart/form-data">
      {params?.id ? <input type="hidden" name="id" value={values.id ?? params.id} readOnly /> : null}
      {definition.fields.map((field) => (
        <div className="cms-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}{field.required ? " *" : ""}</label>
          <Field key={`${field.name}-${values.id ?? "new"}`} field={field} value={values[field.name]} options={dynamicOptions[field.name]} />
        </div>
      ))}
      <div className="cms-actions"><button type="submit">Simpan</button></div>
      {message ? <p role="status">{message}</p> : null}
    </form>
  );
}
