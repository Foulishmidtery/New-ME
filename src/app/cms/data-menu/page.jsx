import { ResourceTable } from "@/components/resource-table";
import { resources } from "@/config/resources";
import { listDataMenus } from "@/lib/data-menu";

export const dynamic = "force-dynamic";

export default async function DataMenuPage() {
  const rows = await listDataMenus();
  return <ResourceTable resource={resources["data-menu"]} rows={rows} />;
}
