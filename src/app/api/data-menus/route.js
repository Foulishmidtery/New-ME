import { dataMenuService } from "@/server/services/data-menu.service";

export async function GET() { return Response.json(await dataMenuService.list()); }
export async function POST(request) {
  try { return Response.json(await dataMenuService.create(await request.json()), { status: 201 }); }
  catch (error) { return Response.json({ message: error.message }, { status: error.status || 500 }); }
}
