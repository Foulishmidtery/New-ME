import { dataMenuService } from "@/server/services/data-menu.service";

export async function GET(_request, { params }) {
  const { id } = await params; const item = await dataMenuService.get(id);
  return item ? Response.json(item) : Response.json({ message: "Data tidak ditemukan." }, { status: 404 });
}
export async function PUT(request, { params }) {
  try { const { id } = await params; const item = await dataMenuService.update(id, await request.json()); return item ? Response.json(item) : Response.json({ message: "Data tidak ditemukan." }, { status: 404 }); }
  catch (error) { return Response.json({ message: error.message }, { status: error.status || 500 }); }
}
export async function DELETE(_request, { params }) {
  const { id } = await params; const item = await dataMenuService.remove(id);
  return item ? new Response(null, { status: 204 }) : Response.json({ message: "Data tidak ditemukan." }, { status: 404 });
}
