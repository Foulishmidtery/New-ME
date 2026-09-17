import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]);
const DOCUMENT_EXTENSIONS = new Set([".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".ppt", ".pptx", ".txt"]);
const ALLOWED_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, ...DOCUMENT_EXTENSIONS]);
const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 50 * 1024 * 1024);

export function validateUpload(file) {
  if (!file || typeof file.arrayBuffer !== "function") throw new UploadValidationError("File upload tidak valid.");
  if (file.size <= 0) throw new UploadValidationError("File upload kosong.");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadValidationError(`Ukuran file melebihi batas ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`);

  const originalName = path.basename(file.name || "upload");
  const extension = path.extname(originalName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(extension)) throw new UploadValidationError("Ekstensi file tidak diizinkan.");

  const mime = String(file.type || "").toLowerCase();
  const isImage = mime.startsWith("image/") && IMAGE_EXTENSIONS.has(extension);
  const isDocument = DOCUMENT_EXTENSIONS.has(extension) && (
    mime === "" || mime === "application/octet-stream" || mime === "text/plain" || mime === "text/csv" ||
    mime === "application/pdf" || mime.includes("word") || mime.includes("excel") || mime.includes("spreadsheet") || mime.includes("presentation") || mime.includes("powerpoint")
  );
  if (!isImage && !isDocument) throw new UploadValidationError("MIME type file tidak sesuai dengan ekstensi yang diizinkan.");

  return { originalName, extension };
}

export function safeUploadDirectory(relativeDirectory) {
  const normalized = String(relativeDirectory || "").replaceAll("\\", "/");
  if (!normalized || normalized.startsWith("/") || normalized.split("/").some((segment) => segment === ".." || segment === ".")) {
    throw new UploadValidationError("Folder upload tidak valid.");
  }
  return normalized;
}

export class UploadValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "UploadValidationError";
    this.status = 400;
  }
}
