import { MigratedLegacyPage } from "@/components/migrated-legacy-page";

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <MigratedLegacyPage pageKey="hot_issue_management/hot_issue_category/edit" params={resolvedParams} />;
}
