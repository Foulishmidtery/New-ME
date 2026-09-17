export const resources = {
  "data-menu": {
    label: "Data Menu",
    description: "Kelola menu data portal.",
    fields: [
      { name: "title", label: "Nama Pendek [ID]", required: true },
      { name: "title_en", label: "Nama Pendek [EN]", required: true },
      { name: "long_title", label: "Nama Panjang [ID]", required: true },
      { name: "long_title_en", label: "Nama Panjang [EN]", required: true },
      { name: "link_menu_data", label: "Link Data", required: true },
      { name: "narations_menu", label: "Narasi", type: "textarea" },
      { name: "narations_menu_en", label: "Narasi [EN]", type: "textarea" },
      { name: "data_sort", label: "Urutan Data", type: "number", required: true },
    ],
    columns: [
      { key: "title", label: "Nama Pendek" },
      { key: "long_title", label: "Nama Panjang" },
      { key: "data_sort", label: "Urutan" },
    ],
  },
};

export const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "News", href: "/news" },
  { label: "Agenda", href: "/agenda" },
  { label: "Users", href: "/users" },
  { label: "Profile", href: "/profile/contacts" },
  { label: "Banners", href: "/banners" },
  { label: "KDEKS", href: "/kdeks" },
  { label: "Struktur", href: "/struktur" },
  { label: "Data", href: "/data/menu" },
  { label: "Data Menu API", href: "/data-menu" },
  { label: "Files", href: "/files" },
  { label: "Pengaturan", href: "/pengaturan/menu" },
];
