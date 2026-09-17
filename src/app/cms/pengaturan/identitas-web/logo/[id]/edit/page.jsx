import { MigratedLegacyPage } from "@/components/migrated-legacy-page";

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <MigratedLegacyPage pageKey="pengaturan/identitas_web/edit_logo" params={resolvedParams} />;
}
