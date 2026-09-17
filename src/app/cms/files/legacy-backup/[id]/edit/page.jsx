import { MigratedLegacyPage } from "@/components/migrated-legacy-page";

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <MigratedLegacyPage pageKey="one_data_center/files/edit_backup" params={resolvedParams} />;
}
