import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/resource-form";
import { resources } from "@/config/resources";
import { getDataMenu } from "@/lib/data-menu";

export const dynamic = "force-dynamic";

export default async function EditDataMenuPage({ params }) {
  const { id } = await params;
  const data = await getDataMenu(id);
  if (!data) notFound();
  return <ResourceForm resource={resources["data-menu"]} initialData={data} mode="edit" />;
}
