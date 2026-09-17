import { MigratedLegacyPage } from "@/components/migrated-legacy-page";

export default async function Page({ params }) {
  const resolvedParams = await params;
  return <MigratedLegacyPage pageKey="news_management/news_category/edit" params={resolvedParams} />;
}
