import Link from "next/link";
import { navigation } from "@/config/resources";

export function CmsShell({ children }) {
  return (
    <div className="cms-shell">
      <header className="cms-topbar">
        <Link className="cms-brand" href="/cms/dashboard">CMS KNEKS</Link>
        <nav aria-label="Navigasi atas">
          <Link href="/cms/dashboard">Dashboard</Link>
          <Link href="/cms/profile/contacts">Profil</Link>
          <Link href="/cms/pengaturan/menu">Pengaturan</Link>
        </nav>
      </header>
      <div className="cms-body">
        <aside className="cms-sidebar" aria-label="Sidebar">
          <nav aria-label="Navigasi CMS">
            <ul>{navigation.map((item) => <li key={item.href}><Link href={`/cms${item.href}`}>{item.label}</Link></li>)}</ul>
          </nav>
        </aside>
        <main className="cms-content" id="main-content">{children}</main>
      </div>
    </div>
  );
}
