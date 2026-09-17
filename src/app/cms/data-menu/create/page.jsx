import { ResourceForm } from "@/components/resource-form";
import { resources } from "@/config/resources";

export default function CreateDataMenuPage() {
  return <ResourceForm resource={resources["data-menu"]} mode="create" />;
}
