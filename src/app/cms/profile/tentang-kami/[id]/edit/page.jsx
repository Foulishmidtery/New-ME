import { MigratedLegacyPage } from "@/components/migrated-legacy-page";

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <MigratedLegacyPage pageKey="profile/tentang_kami/tentang_kami_edit" params={resolvedParams} />;
}
