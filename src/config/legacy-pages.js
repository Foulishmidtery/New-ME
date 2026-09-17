/** Static metadata extracted from legacy/views during migration; legacy HTML is not read at runtime. */
export const legacyPages = {
  "agenda/add": {
    "key": "agenda/add",
    "route": "/agenda/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "url",
        "label": "link )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "agenda_datetime",
        "label": "Tanggal & Waktu Agenda )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "place",
        "label": "Tempat )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "organizer",
        "label": "Penyelenggara )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link Zoom )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "project",
        "label": "Projek )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Keterangan )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "agenda_endtime",
        "label": "Agenda Selesai )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "manager",
        "label": "Pengelola )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "contributor",
        "label": "Kontributor )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "indicator",
        "label": "Indikator )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "impact",
        "label": "Impact )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "opening",
        "label": "Pembuka )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "participants",
        "label": "Peserta )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "area",
        "label": "Area )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "loc",
        "label": "Tingkat Konten )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "priority_participants",
        "label": "Peserta Prioritas )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "kbli",
        "label": "Kbli )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "age",
        "label": "Usia Peserta )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "gender",
        "label": "Genders )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "province",
        "label": "Provinsi )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "instansi",
        "label": "Instansi",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces",
      "/kbli",
      "/peserta",
      "/pembuka",
      "/gender",
      "/usia",
      "/area",
      "/prioritas",
      "/directorat_fe",
      "/institutions"
    ],
    "forms": [
      {
        "action": "/insertagenda",
        "method": "POST"
      }
    ],
    "source": "agenda/add.html"
  },
  "agenda/edit": {
    "key": "agenda/edit",
    "route": "/agenda/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "url",
        "label": "Link URL )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "agenda_datetime",
        "label": "Tanggal & Waktu Agenda )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "place",
        "label": "Tempat )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "organizer",
        "label": "Penyelenggara )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link Zoom )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "project",
        "label": "Projek )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Keterangan )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "agenda_endtime",
        "label": "Agenda Selesai )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "manager",
        "label": "Pengelola )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "contributor",
        "label": "Kontributor )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "indicator",
        "label": "Indikator )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "impact",
        "label": "Impact )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "opening",
        "label": "Pembuka )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "participants",
        "label": "Peserta )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "area",
        "label": "Area )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "loc",
        "label": "Tingkat Konten )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "priority_participants",
        "label": "Peserta Prioritas )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "kbli",
        "label": "Kbli )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "age",
        "label": "Usia Partisipan )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "gender",
        "label": "Genders )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "province",
        "label": "Provinsi )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "instansi",
        "label": "Instansi",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/agendadetails/",
      "/provinces",
      "/kbli",
      "/peserta",
      "/pembuka",
      "/gender",
      "/usia",
      "/area",
      "/prioritas",
      "/directorat_fe",
      "/institutions"
    ],
    "forms": [
      {
        "action": "/updateagenda",
        "method": "POST"
      }
    ],
    "source": "agenda/edit.html"
  },
  "agenda/list": {
    "key": "agenda/list",
    "route": "/agenda",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul",
      "Tempat",
      "Penyelenggara",
      "Tanggal Agenda",
      "Actions"
    ],
    "endpoints": [],
    "forms": [],
    "source": "agenda/list.html"
  },
  "banners/banner/add": {
    "key": "banners/banner/add",
    "route": "/banners/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "images",
        "label": "Gambar Slide Show )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertslideshow",
        "method": "POST"
      }
    ],
    "source": "banners/banner/add.html"
  },
  "banners/banner/edit": {
    "key": "banners/banner/edit",
    "route": "/banners/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal SlideShow )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "images",
        "label": "Gambar Slide Show )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailslideshow/"
    ],
    "forms": [
      {
        "action": "/updateslideshow",
        "method": "POST"
      }
    ],
    "source": "banners/banner/edit.html"
  },
  "banners/banner/list": {
    "key": "banners/banner/list",
    "route": "/banners",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Gambar",
      "Judul",
      "Tanggal",
      "Status",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "banners/banner/list.html"
  },
  "banners/login_banner/add": {
    "key": "banners/login_banner/add",
    "route": "/banners/login/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Judul Banner )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Login Banner",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertloginbanners",
        "method": "POST"
      }
    ],
    "source": "banners/login_banner/add.html"
  },
  "banners/login_banner/edit": {
    "key": "banners/login_banner/edit",
    "route": "/banners/login/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Judul Banners )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Login Banner )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal Banners )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_login_banner/"
    ],
    "forms": [
      {
        "action": "/updateloginbanners",
        "method": "POST"
      }
    ],
    "source": "banners/login_banner/edit.html"
  },
  "banners/login_banner/list": {
    "key": "banners/login_banner/list",
    "route": "/banners/login",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Judul",
      "Tanggal",
      "Status",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "banners/login_banner/list.html"
  },
  "banners/welcome/add": {
    "key": "banners/welcome/add",
    "route": "/banners/welcome/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Judul Banners )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Welcome Banner )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insert_welcome_pages",
        "method": "POST"
      }
    ],
    "source": "banners/welcome/add.html"
  },
  "banners/welcome/edit": {
    "key": "banners/welcome/edit",
    "route": "/banners/welcome/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Judul Welcome Banners )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Welcome Banner",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal Welcome Banners )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_welcome_pages/"
    ],
    "forms": [
      {
        "action": "/update_welcome_pages",
        "method": "POST"
      }
    ],
    "source": "banners/welcome/edit.html"
  },
  "banners/welcome/update": {
    "key": "banners/welcome/update",
    "route": "/banners/welcome/[id]/update",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Judul",
      "Tanggal",
      "Status",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "banners/welcome/update.html"
  },
  "data/dashboard/add": {
    "key": "data/dashboard/add",
    "route": "/data/dashboard/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "data_type",
        "label": "Menu )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "sub_statistic",
        "label": "Sub Menu )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "shorts_name",
        "label": "Masukan Nama Pendek [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "shorts_name_en",
        "label": "Masukan Nama Pendek [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name",
        "label": "Masukan Nama Panjang [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name_en",
        "label": "Masukan Nama Panjang [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "api",
        "label": "Masukan Link Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "publish",
        "label": "Publish",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "dataset",
        "label": "Dataset )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/data_menu",
      "/detail_submenu/",
      "/directorat_fe",
      "/tagging",
      "/provinces",
      "/sourcesdata"
    ],
    "forms": [
      {
        "action": "/insertapidashboard",
        "method": "POST"
      }
    ],
    "source": "data/dashboard/add.html"
  },
  "data/dashboard/list": {
    "key": "data/dashboard/list",
    "route": "/data/dashboard",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_menu",
        "label": "Search Menu",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      },
      {
        "name": "search_sub_menu",
        "label": "Search Sub Menu",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "NOMOR",
      "NAMA PENDEK",
      "NAMA PANJANG",
      "MENU",
      "SUB MENU",
      "TAYANG",
      "AKSI"
    ],
    "endpoints": [
      "/data_menu",
      "/data_submenu"
    ],
    "forms": [],
    "source": "data/dashboard/list.html"
  },
  "data/dashboard/naration": {
    "key": "data/dashboard/naration",
    "route": "/data/dashboard/[id]",
    "kind": "detail",
    "title": "Dashboard",
    "fields": [
      {
        "name": "month",
        "label": "Month",
        "type": "month",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "naration",
        "label": "Naration",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [
      "#",
      "Nama Narasi",
      "Keterangan",
      "Bulan/Tahun"
    ],
    "endpoints": [
      "/api_dashboard_detail/",
      "/dashboard_naration/",
      "/emptyapidashboards",
      "/updateapidashboards"
    ],
    "forms": [],
    "source": "data/dashboard/naration.html"
  },
  "data/dataset/add": {
    "key": "data/dataset/add",
    "route": "/data/datasets/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "dataset",
        "label": "Dataset [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "dataset_en",
        "label": "Dataset [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "source",
        "label": "Sumber Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "produsen_data",
        "label": "Produsen Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal_update",
        "label": "Tanggal Update",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "descriptions",
        "label": "Deskripsi )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "api_database",
        "label": "Api Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertsourcesdata",
        "method": "POST"
      }
    ],
    "source": "data/dataset/add.html"
  },
  "data/dataset/list": {
    "key": "data/dataset/list",
    "route": "/data/datasets",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_produsen_data",
        "label": "Search Produsen Data",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "NOMOR",
      "Dataset",
      "Produsen Data",
      "Aksi"
    ],
    "endpoints": [
      "/sourcesdata"
    ],
    "forms": [],
    "source": "data/dataset/list.html"
  },
  "data/dataset/view": {
    "key": "data/dataset/view",
    "route": "/data/datasets/[id]",
    "kind": "detail",
    "title": "Dashboard",
    "fields": [
      {
        "name": "dataset",
        "label": "Dataset [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "dataset_en",
        "label": "Dataset [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "source",
        "label": "Sumber Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "produsen_data",
        "label": "Produsen Data )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal_update",
        "label": "Tanggal Update )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "descriptions",
        "label": "Keterangan  )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "api_database",
        "label": "Api Data  )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/sourcesdatadetail/"
    ],
    "forms": [
      {
        "action": "/updatesourcedata",
        "method": "POST"
      }
    ],
    "source": "data/dataset/view.html"
  },
  "data/menu/add": {
    "key": "data/menu/add",
    "route": "/data/menu/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama Pendek [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Nama Pendek [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_title",
        "label": "Nama Panjang [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_title_en",
        "label": "Nama Panjang [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_menu_data",
        "label": "Link Data",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_menu",
        "label": "Narasi",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_menu_en",
        "label": "Narasi En",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "data_sort",
        "label": "Urutan Data",
        "type": "number",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insert_data_menu",
        "method": "POST"
      }
    ],
    "source": "data/menu/add.html"
  },
  "data/menu/edit": {
    "key": "data/menu/edit",
    "route": "/data/menu/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama Pendek [ID]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Nama Pendek [EN]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_title",
        "label": "Nama Panjang [ID]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_title_en",
        "label": "Nama Panjang [EN]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_menu_data",
        "label": "Link Data",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_menu",
        "label": "Narasi",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_menu_en",
        "label": "Narasi En",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "data_sort",
        "label": "Urutan Data",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_data_menus/"
    ],
    "forms": [
      {
        "action": "/update_data_menu",
        "method": "POST"
      }
    ],
    "source": "data/menu/edit.html"
  },
  "data/menu/list": {
    "key": "data/menu/list",
    "route": "/data/menu",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Nama Pendek",
      "Nama Panjang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "data/menu/list.html"
  },
  "data/slider/add_data": {
    "key": "data/slider/add_data",
    "route": "/data/sliders/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Variable [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Variable [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "amount",
        "label": "Nilai )*",
        "type": "number",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "date_created",
        "label": "Periode )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "image",
        "label": "Image )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertsliderdata",
        "method": "POST"
      }
    ],
    "source": "data/slider/add_data.html"
  },
  "data/slider/data": {
    "key": "data/slider/data",
    "route": "/data/sliders",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NOMOR",
      "Variable",
      "Variable EN",
      "Nilai",
      "Periode",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "data/slider/data.html"
  },
  "data/slider/edit": {
    "key": "data/slider/edit",
    "route": "/data/sliders/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Variable [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Variable [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "amount",
        "label": "Nilai",
        "type": "number",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "date_created",
        "label": "Periode",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "image",
        "label": "Image",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_slider_data/"
    ],
    "forms": [
      {
        "action": "/updatesliderdata",
        "method": "POST"
      }
    ],
    "source": "data/slider/edit.html"
  },
  "data/submenu/add": {
    "key": "data/submenu/add",
    "route": "/data/submenu/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "menu_id",
        "label": "Menu Data",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "short_name",
        "label": "Nama Pendek [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "short_name_en",
        "label": "Nama Pendek [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name",
        "label": "Nama Panjang [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name_en",
        "label": "Nama Panjang [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_submenu",
        "label": "Narasi",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_submenu_en",
        "label": "Narasi En",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_data",
        "label": "Link Metabase",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_image",
        "label": "Link Image Metabase",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/data_menu"
    ],
    "forms": [
      {
        "action": "/insert_submenu",
        "method": "POST"
      }
    ],
    "source": "data/submenu/add.html"
  },
  "data/submenu/edit": {
    "key": "data/submenu/edit",
    "route": "/data/submenu/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "short_name",
        "label": "Nama Pendek [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "short_name_en",
        "label": "Nama Pendek [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name",
        "label": "Nama Panjang [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "long_name_en",
        "label": "Nama Panjang [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_data",
        "label": "Link Data",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link_image",
        "label": "Link Image Metabase",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_submenu",
        "label": "Narasi",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "narations_submenu_en",
        "label": "Narasi En",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_submenus_edit/"
    ],
    "forms": [
      {
        "action": "/update_submenu",
        "method": "POST"
      }
    ],
    "source": "data/submenu/edit.html"
  },
  "data/submenu/list": {
    "key": "data/submenu/list",
    "route": "/data/submenu",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Nama Pendek",
      "Nama Panjang",
      "Menu",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "data/submenu/list.html"
  },
  "directorat/add": {
    "key": "directorat/add",
    "route": "/directorates/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "images",
        "label": "Icon Direktorat )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "banners",
        "label": "Banner Direktorat )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertdirectorats",
        "method": "POST"
      }
    ],
    "source": "directorat/add.html"
  },
  "directorat/detail": {
    "key": "directorat/detail",
    "route": "/directorates/[id]",
    "kind": "detail",
    "title": "Detail Gambar / Banner : Detail Gambar / Banner",
    "fields": [
      {
        "name": "images",
        "label": "Icon Direktorat",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "banners",
        "label": "Gambar Direktorat",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/directorat_detail/"
    ],
    "forms": [
      {
        "action": "/directorats_upload",
        "method": "POST"
      }
    ],
    "source": "directorat/detail.html"
  },
  "directorat/edit": {
    "key": "directorat/edit",
    "route": "/directorates/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "images",
        "label": "Icon Direktorat",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "banners",
        "label": "Banner Direktorat",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/directorat_detail/",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/directorats_update",
        "method": "POST"
      }
    ],
    "source": "directorat/edit.html"
  },
  "directorat/list": {
    "key": "directorat/list",
    "route": "/directorates",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama [ID]",
      "Nama [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "directorat/list.html"
  },
  "divisi/add": {
    "key": "divisi/add",
    "route": "/divisions/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama Divisi [ID] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Nama Divisi [EN] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorats_id",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/directorat_fe"
    ],
    "forms": [
      {
        "action": "/directorats_devisi_add",
        "method": "POST"
      }
    ],
    "source": "divisi/add.html"
  },
  "divisi/devisi": {
    "key": "divisi/devisi",
    "route": "/divisions",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Nama Divisi",
      "Direktorat",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "divisi/devisi.html"
  },
  "divisi/edit": {
    "key": "divisi/edit",
    "route": "/divisions/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama Divisi [ID]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Nama Divisi [EN]",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorats_id",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/directorats_devisi_detail/",
      "/directorat_fe"
    ],
    "forms": [
      {
        "action": "/directorats_devisi_edit",
        "method": "POST"
      }
    ],
    "source": "divisi/edit.html"
  },
  "home": {
    "key": "home",
    "route": "/dashboard",
    "kind": "list",
    "title": "Selamat Datang",
    "fields": [],
    "columns": [],
    "endpoints": [
      "/analitics"
    ],
    "forms": [],
    "source": "home.html"
  },
  "hot_issue_management/hot_issue/add": {
    "key": "hot_issue_management/hot_issue/add",
    "route": "/hot-issues/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "sub_category_id",
        "label": "Sub Kategori )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "excerpt",
        "label": "Kutipan [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "excerpt_en",
        "label": "Kutipan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_publish",
        "label": "Is Publish",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "issue_datetime",
        "label": "Tanggal",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/hotissuesubcategory",
      "/tagging",
      "/provinces",
      "/directorat_fe"
    ],
    "forms": [
      {
        "action": "/inserthotissue",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue/add.html"
  },
  "hot_issue_management/hot_issue/edit": {
    "key": "hot_issue_management/hot_issue/edit",
    "route": "/hot-issues/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "sub_category_id",
        "label": "Sub Kategori )*",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "excerpt",
        "label": "Kutipan [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "excerpt_en",
        "label": "Kutipan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "issue_datetime",
        "label": "Tanggal",
        "type": "datetime-local",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces",
      "/hotissuedetail/",
      "/hotissuesubcategory",
      "/tagging"
    ],
    "forms": [
      {
        "action": "/updatehotissue",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue/edit.html"
  },
  "hot_issue_management/hot_issue/list": {
    "key": "hot_issue_management/hot_issue/list",
    "route": "/hot-issues",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_kategori",
        "label": "Search Kategori",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      },
      {
        "name": "search_sub_kategori",
        "label": "Search Sub Kategori",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "No",
      "Judul",
      "Sub Kategori",
      "Tanggal",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [
      "/hotissuesubcategory"
    ],
    "forms": [],
    "source": "hot_issue_management/hot_issue/list.html"
  },
  "hot_issue_management/hot_issue_category/add": {
    "key": "hot_issue_management/hot_issue_category/add",
    "route": "/hot-issues/categories/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Kategori [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Kategori [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/inserthotissuecategory",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue_category/add.html"
  },
  "hot_issue_management/hot_issue_category/edit": {
    "key": "hot_issue_management/hot_issue_category/edit",
    "route": "/hot-issues/categories/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Kategori [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Kategori [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailhotissuecategory/"
    ],
    "forms": [
      {
        "action": "/updatehotissuecategory",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue_category/edit.html"
  },
  "hot_issue_management/hot_issue_category/list": {
    "key": "hot_issue_management/hot_issue_category/list",
    "route": "/hot-issues/categories",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Kategori [ID]",
      "Kategori [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "hot_issue_management/hot_issue_category/list.html"
  },
  "hot_issue_management/hot_issue_sub_category/add": {
    "key": "hot_issue_management/hot_issue_sub_category/add",
    "route": "/hot-issues/sub-categories/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Sub Kategori [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Sub Kategori [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "hot_category_id",
        "label": "Kategori )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/hotissuecategory"
    ],
    "forms": [
      {
        "action": "/inserthotissubcategory",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue_sub_category/add.html"
  },
  "hot_issue_management/hot_issue_sub_category/edit": {
    "key": "hot_issue_management/hot_issue_sub_category/edit",
    "route": "/hot-issues/sub-categories/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Sub Kategori [IN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Sub Kategori [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "hot_category_id",
        "label": "Kategori Isu Terkini )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailhotissuesubcategory/",
      "/hotissuecategory"
    ],
    "forms": [
      {
        "action": "/updatehotissuesubcategory",
        "method": "POST"
      }
    ],
    "source": "hot_issue_management/hot_issue_sub_category/edit.html"
  },
  "hot_issue_management/hot_issue_sub_category/list": {
    "key": "hot_issue_management/hot_issue_sub_category/list",
    "route": "/hot-issues/sub-categories",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Sub Kategori [ID]",
      "Sub Kategori [EN]",
      "Kategori",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "hot_issue_management/hot_issue_sub_category/list.html"
  },
  "kdeks/anggota/add": {
    "key": "kdeks/anggota/add",
    "route": "/kdeks/anggota/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_pejabat",
        "label": "-Organisasi-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/structurekdeks"
    ],
    "forms": [
      {
        "action": "/insertanggotakdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/anggota/add.html"
  },
  "kdeks/anggota/edit": {
    "key": "kdeks/anggota/edit",
    "route": "/kdeks/anggota/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_pejabat",
        "label": "-Organisasi-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailanggotakdeks/",
      "/structurekdeks"
    ],
    "forms": [
      {
        "action": "/updateanggotakdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/anggota/edit.html"
  },
  "kdeks/anggota/list": {
    "key": "kdeks/anggota/list",
    "route": "/kdeks/anggota",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/anggota/list.html"
  },
  "kdeks/kdeks/kdeks": {
    "key": "kdeks/kdeks/kdeks",
    "route": "/kdeks",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul [ID]",
      "Judul [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/kdeks/kdeks.html"
  },
  "kdeks/kdeks/kdeks_edit": {
    "key": "kdeks/kdeks/kdeks_edit",
    "route": "/kdeks/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailabouts/"
    ],
    "forms": [
      {
        "action": "/updateaboutkdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/kdeks/kdeks_edit.html"
  },
  "kdeks/kdeks/kdeks_form": {
    "key": "kdeks/kdeks/kdeks_form",
    "route": "/kdeks/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "about",
        "label": "Tentang Kami [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_en",
        "label": "Tentang Kami [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content",
        "label": "Konten Tentang Kami [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content_en",
        "label": "Konten Tentang Kami [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history",
        "label": "Sejarah [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_en",
        "label": "Sejarah [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content",
        "label": "Konten Sejarah [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content_en",
        "label": "Konten Sejarah [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation",
        "label": "Landasan Hukum [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_en",
        "label": "Landasan Hukum [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content",
        "label": "Konten Landasan Hukum [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content_en",
        "label": "Konten Landasan Hukum [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy",
        "label": "Filosofi Logo [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_en",
        "label": "Filosofi Logo [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content",
        "label": "Konten Filosofi Logo [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content_en",
        "label": "Konten Filosofi Logo [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task",
        "label": "Tugas KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_en",
        "label": "Tugas KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content",
        "label": "Konten Tugas KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content_en",
        "label": "Konten Tugas KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function",
        "label": "Fungsi KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_en",
        "label": "Fungsi KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content",
        "label": "Konten Fungsi KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content_en",
        "label": "Konten Fungsi KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailabouts/"
    ],
    "forms": [
      {
        "action": "/updateaboutkdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/kdeks/kdeks_form.html"
  },
  "kdeks/master/master": {
    "key": "kdeks/master/master",
    "route": "/kdeks/master",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Nama KDEKS",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/master/master.html"
  },
  "kdeks/master/master_add": {
    "key": "kdeks/master/master_add",
    "route": "/kdeks/master/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_province",
        "label": "Provinsi )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "officials",
        "label": "Nama Pejabat",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "abouts",
        "label": "Tentang",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "historys",
        "label": "Sejarah",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Logo",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "structure",
        "label": "Struktur",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "sk",
        "label": "Sk",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "twitter",
        "label": "Twitter",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "youtube",
        "label": "Youtube",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "address",
        "label": "Alamat",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "phone_number",
        "label": "No. Telepon",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "fax",
        "label": "No. Fax",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "maps",
        "label": "Maps",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertkdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/master/master_add.html"
  },
  "kdeks/master/master_edit": {
    "key": "kdeks/master/master_edit",
    "route": "/kdeks/master/[id]/edit",
    "kind": "edit",
    "title": "KDEKS BACKEND || Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_province",
        "label": "Provinsi )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "officials",
        "label": "Nama Pejabat",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "abouts",
        "label": "Tentang",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "historys",
        "label": "Sejarah",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Logo",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "structure",
        "label": "Struktur",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "sk",
        "label": "Sk",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "twitter",
        "label": "Twitter",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "youtube",
        "label": "Youtube",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "address",
        "label": "Alamat",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "phone_number",
        "label": "No. Telepon",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "fax",
        "label": "No. Fax",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "maps",
        "label": "Maps",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_kdeks/",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatekdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/master/master_edit.html"
  },
  "kdeks/pejabat/add": {
    "key": "kdeks/pejabat/add",
    "route": "/kdeks/pejabat/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_provincet",
        "label": "Provisi )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih Provinsi"
          }
        ]
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertstructurekdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/pejabat/add.html"
  },
  "kdeks/pejabat/edit": {
    "key": "kdeks/pejabat/edit",
    "route": "/kdeks/pejabat/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_province",
        "label": "Provinsi",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailstructurekdeks/",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatestructurekdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/pejabat/edit.html"
  },
  "kdeks/pejabat/list": {
    "key": "kdeks/pejabat/list",
    "route": "/kdeks/pejabat",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Provinsi",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/pejabat/list.html"
  },
  "kdeks/province/add": {
    "key": "kdeks/province/add",
    "route": "/kdeks/provinces/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "code",
        "label": "Kode Provinsi",
        "type": "number",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "provinces",
        "label": "Nama Provinsi",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertprovince",
        "method": "POST"
      }
    ],
    "source": "kdeks/province/add.html"
  },
  "kdeks/province/edit": {
    "key": "kdeks/province/edit",
    "route": "/kdeks/provinces/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "code",
        "label": "Kode Provinsi",
        "type": "number",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "province_name",
        "label": "Nama Provinsi",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces_detail/"
    ],
    "forms": [
      {
        "action": "/updateprovince",
        "method": "POST"
      }
    ],
    "source": "kdeks/province/edit.html"
  },
  "kdeks/province/list": {
    "key": "kdeks/province/list",
    "route": "/kdeks/provinces",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Kode",
      "Provinsi",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/province/list.html"
  },
  "kdeks/sub_anggota/add": {
    "key": "kdeks/sub_anggota/add",
    "route": "/kdeks/sub-anggota/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_anggota",
        "label": "-Direktorat-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/anggotaskdeks"
    ],
    "forms": [
      {
        "action": "/insertsubanggotakdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/sub_anggota/add.html"
  },
  "kdeks/sub_anggota/edit": {
    "key": "kdeks/sub_anggota/edit",
    "route": "/kdeks/sub-anggota/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_anggota",
        "label": "-Direktorat-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailsubanggotakdeks/",
      "/anggotaskdeks"
    ],
    "forms": [
      {
        "action": "/updatesubanggotakdeks",
        "method": "POST"
      }
    ],
    "source": "kdeks/sub_anggota/edit.html"
  },
  "kdeks/sub_anggota/list": {
    "key": "kdeks/sub_anggota/list",
    "route": "/kdeks/sub-anggota",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "kdeks/sub_anggota/list.html"
  },
  "login": {
    "key": "login",
    "route": "/login",
    "kind": "login",
    "title": "KNEKS BACKEND APPS",
    "fields": [
      {
        "name": "email",
        "label": "Email",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "password",
        "label": "Password",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/login_banners",
      "/do_login"
    ],
    "forms": [],
    "source": "login.html"
  },
  "news_management/news/add": {
    "key": "news_management/news/add",
    "route": "/news/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "category_id",
        "label": "Kategori Berita )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      },
      {
        "name": "excerpt",
        "label": "Kutipan [ID])*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "excerpt_en",
        "label": "Kutipan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN])*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo",
        "type": "file",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "news_datetime",
        "label": "Tanggal Publish",
        "type": "datetime-local",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_publish",
        "label": "Is Publish",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat_id",
        "label": "Direktorat",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": [
          {
            "value": "1",
            "label": "Industri Produk Halal"
          }
        ]
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "11",
            "label": "DKI Jakarta"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/tagging",
      "/categories",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertnews",
        "method": "POST"
      }
    ],
    "source": "news_management/news/add.html"
  },
  "news_management/news/edit": {
    "key": "news_management/news/edit",
    "route": "/news/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "news_category_id",
        "label": "Kategori Berita )*",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "excerpt",
        "label": "Kutipan [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "excerpt_en",
        "label": "Kutipan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo )*",
        "type": "file",
        "required": false,
        "multiple": true,
        "options": []
      },
      {
        "name": "news_datetime",
        "label": "Tanggal Publish )*",
        "type": "datetime-local",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Ganti/Ubah Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat_id",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/newsdetail/",
      "/categories",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatenews",
        "method": "POST"
      }
    ],
    "source": "news_management/news/edit.html"
  },
  "news_management/news/list": {
    "key": "news_management/news/list",
    "route": "/news",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_kategori_berita",
        "label": "Search Kategori Berita",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "No",
      "Judul",
      "Kategori",
      "Tanggal",
      "Pengunggah",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [
      "/categories"
    ],
    "forms": [],
    "source": "news_management/news/list.html"
  },
  "news_management/news_category/add": {
    "key": "news_management/news_category/add",
    "route": "/news/categories/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Konten [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Konten [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertnewscategory",
        "method": "POST"
      }
    ],
    "source": "news_management/news_category/add.html"
  },
  "news_management/news_category/edit": {
    "key": "news_management/news_category/edit",
    "route": "/news/categories/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Konten [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Konten [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailnewscategory/"
    ],
    "forms": [
      {
        "action": "/updatenewscategory",
        "method": "POST"
      }
    ],
    "source": "news_management/news_category/edit.html"
  },
  "news_management/news_category/list": {
    "key": "news_management/news_category/list",
    "route": "/news/categories",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "JUDUL [ID]",
      "Judul [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "news_management/news_category/list.html"
  },
  "one_data_center/files/add": {
    "key": "one_data_center/files/add",
    "route": "/files/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "file_category_id",
        "label": "Kategori)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      },
      {
        "name": "file_data",
        "label": "Berkas)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Abstrak/Ringkasan [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Abstrak/Ringkasan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "date",
        "label": "Tanggal",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_publish",
        "label": "Is Publish",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "writer",
        "label": "Penulis",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "publisher",
        "label": "Penerbit",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "synopsis",
        "label": "Sinopsis",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "isbn",
        "label": "Isbn",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "number_of_pages",
        "label": "Jumlah Halaman",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "width",
        "label": "Lebar",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "height",
        "label": "Tinggi",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": [
          {
            "value": "11",
            "label": "DKI Jakarta"
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "passcode",
        "label": "Passcode",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "downloadable",
        "label": "Downloadable",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/files_category",
      "/directorat_fe",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertfiles",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files/add.html"
  },
  "one_data_center/files/add_backup": {
    "key": "one_data_center/files/add_backup",
    "route": "/files/legacy-backup/create",
    "kind": "add-backup",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "file_category_id",
        "label": "Kategori)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "--"
          }
        ]
      },
      {
        "name": "file_data",
        "label": "Berkas)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "cover_file",
        "label": "Cover)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "date",
        "label": "Tanggal",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_publish",
        "label": "Is Publish",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "writer",
        "label": "Penulis )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "publisher",
        "label": "Penerbit )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "synopsis",
        "label": "Sinopsis )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "isbn",
        "label": "Isbn )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "number_of_pages",
        "label": "Jumlah Halaman",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "width",
        "label": "Lebar",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "height",
        "label": "Tinggi",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "passcode",
        "label": "Passcode",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "downloadable",
        "label": "Downloadable",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/files_category",
      "/directorat_fe",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertfiles",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files/add_backup.html"
  },
  "one_data_center/files/edit": {
    "key": "one_data_center/files/edit",
    "route": "/files/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "file_category_id",
        "label": "Kategori )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "file_data",
        "label": "Upload Berkas )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Abstrak/Ringkasi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Abstrak/Ringkasan [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "date",
        "label": "Tanggal Publish )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "writer",
        "label": "Penulis",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "publisher",
        "label": "Penerbit",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "synopsis",
        "label": "Sinopsis",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "isbn",
        "label": "Isbn",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "number_of_pages",
        "label": "Jumlah Halaman",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "width",
        "label": "Lebar",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "height",
        "label": "Tinggi",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "passcode",
        "label": "Passcode",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "downloadable",
        "label": "Downloadable",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces",
      "/filesdetails/",
      "/files_category",
      "/tagging"
    ],
    "forms": [
      {
        "action": "/updatefileupload",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files/edit.html"
  },
  "one_data_center/files/edit_backup": {
    "key": "one_data_center/files/edit_backup",
    "route": "/files/legacy-backup/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "file_category_id",
        "label": "Kategori )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "file_data",
        "label": "Upload Berkas )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "date",
        "label": "Tanggal Publish )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "writer",
        "label": "Penulis )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "publisher",
        "label": "Penerbit )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "synopsis",
        "label": "Sinopsis )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "isbn",
        "label": "Isbn )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "number_of_pages",
        "label": "Jumlah Halaman )*",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "width",
        "label": "Lebar",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "height",
        "label": "Tinggi",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": []
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "passcode",
        "label": "Passcode",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "downloadable",
        "label": "Downloadable",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces",
      "/filesdetails/",
      "/files_category",
      "/tagging"
    ],
    "forms": [
      {
        "action": "/updatefileupload",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files/edit_backup.html"
  },
  "one_data_center/files/list": {
    "key": "one_data_center/files/list",
    "route": "/files",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_kategori",
        "label": "Search Kategori",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "No",
      "Judul",
      "Kategori",
      "Tanggal",
      "Pengunggah",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [
      "/files_category"
    ],
    "forms": [],
    "source": "one_data_center/files/list.html"
  },
  "one_data_center/files/list_backup": {
    "key": "one_data_center/files/list_backup",
    "route": "/files/legacy-backup",
    "kind": "list-backup",
    "title": "Dashboard",
    "fields": [
      {
        "name": "search_kategori",
        "label": "Search Kategori",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "null",
            "label": "--"
          }
        ]
      }
    ],
    "columns": [
      "No",
      "Judul",
      "Kategori",
      "Tanggal",
      "Pengunggah",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [
      "/files_category"
    ],
    "forms": [],
    "source": "one_data_center/files/list_backup.html"
  },
  "one_data_center/files_category/add": {
    "key": "one_data_center/files_category/add",
    "route": "/files/categories/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Kategori [ID] *",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Kategori [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertfilescategory",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files_category/add.html"
  },
  "one_data_center/files_category/edit": {
    "key": "one_data_center/files_category/edit",
    "route": "/files/categories/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Kategori [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Kategori [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/files_category_detail/"
    ],
    "forms": [
      {
        "action": "/updatefilescategory",
        "method": "POST"
      }
    ],
    "source": "one_data_center/files_category/edit.html"
  },
  "one_data_center/files_category/list": {
    "key": "one_data_center/files_category/list",
    "route": "/files/categories",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Kategori [ID]",
      "Kategori [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "one_data_center/files_category/list.html"
  },
  "opini/opini": {
    "key": "opini/opini",
    "route": "/opini",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Judul",
      "Tanggal",
      "Pengunggah",
      "Tayang/Konsep",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "opini/opini.html"
  },
  "opini/opini_add": {
    "key": "opini/opini_add",
    "route": "/opini/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal_opini",
        "label": "Tanggal )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "image",
        "label": "Photo",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/tagging",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertopini",
        "method": "POST"
      }
    ],
    "source": "opini/opini_add.html"
  },
  "opini/opini_edit": {
    "key": "opini/opini_edit",
    "route": "/opini/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal_opini",
        "label": "Tanggal )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS )*",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "image",
        "label": "Photo",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_opini_detail/",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updateopini",
        "method": "POST"
      }
    ],
    "source": "opini/opini_edit.html"
  },
  "pengaturan/identitas_web/color": {
    "key": "pengaturan/identitas_web/color",
    "route": "/pengaturan/identitas-web/color",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Warna Web",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/identitas_web/color.html"
  },
  "pengaturan/identitas_web/edit_color": {
    "key": "pengaturan/identitas_web/edit_color",
    "route": "/pengaturan/identitas-web/color/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "web_color",
        "label": "Warna Web",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_detail_webprofile/"
    ],
    "forms": [
      {
        "action": "/updatewebcolor",
        "method": "POST"
      }
    ],
    "source": "pengaturan/identitas_web/edit_color.html"
  },
  "pengaturan/identitas_web/edit_header": {
    "key": "pengaturan/identitas_web/edit_header",
    "route": "/pengaturan/identitas-web/header/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "web_header",
        "label": "Url Header Web",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_detail_webprofile/"
    ],
    "forms": [
      {
        "action": "/updatewebheader",
        "method": "POST"
      }
    ],
    "source": "pengaturan/identitas_web/edit_header.html"
  },
  "pengaturan/identitas_web/edit_logo": {
    "key": "pengaturan/identitas_web/edit_logo",
    "route": "/pengaturan/identitas-web/logo/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "web_logo",
        "label": "Url Logo Web",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_detail_webprofile/"
    ],
    "forms": [
      {
        "action": "/updateweblogo",
        "method": "POST"
      }
    ],
    "source": "pengaturan/identitas_web/edit_logo.html"
  },
  "pengaturan/identitas_web/edit_title": {
    "key": "pengaturan/identitas_web/edit_title",
    "route": "/pengaturan/identitas-web/title/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "web_title",
        "label": "Judul Web",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_detail_webprofile/"
    ],
    "forms": [
      {
        "action": "/updatewebtitle",
        "method": "POST"
      }
    ],
    "source": "pengaturan/identitas_web/edit_title.html"
  },
  "pengaturan/identitas_web/header": {
    "key": "pengaturan/identitas_web/header",
    "route": "/pengaturan/identitas-web/header",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Header Web",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/identitas_web/header.html"
  },
  "pengaturan/identitas_web/logo": {
    "key": "pengaturan/identitas_web/logo",
    "route": "/pengaturan/identitas-web/logo",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Logo Web",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/identitas_web/logo.html"
  },
  "pengaturan/identitas_web/title": {
    "key": "pengaturan/identitas_web/title",
    "route": "/pengaturan/identitas-web/title",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul Web",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/identitas_web/title.html"
  },
  "pengaturan/menu/add": {
    "key": "pengaturan/menu/add",
    "route": "/pengaturan/menu/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "menu_name",
        "label": "Nama Menu ID*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "menu_name_en",
        "label": "Nama Menu EN*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "menu_link",
        "label": "Link Menu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "orders",
        "label": "Urutan Menu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertmenu",
        "method": "POST"
      }
    ],
    "source": "pengaturan/menu/add.html"
  },
  "pengaturan/menu/edit": {
    "key": "pengaturan/menu/edit",
    "route": "/pengaturan/menu/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "menu_name",
        "label": "Nama Menu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "menu_name_en",
        "label": "Nama Menu EN*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "menu_link",
        "label": "Link Menu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "orders",
        "label": "Urutan Menu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_menu_detail/"
    ],
    "forms": [
      {
        "action": "/updatemenu",
        "method": "POST"
      }
    ],
    "source": "pengaturan/menu/edit.html"
  },
  "pengaturan/menu/list": {
    "key": "pengaturan/menu/list",
    "route": "/pengaturan/menu",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama Menu",
      "Link Menu",
      "Urutan Menu",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/menu/list.html"
  },
  "pengaturan/sub_menu/add": {
    "key": "pengaturan/sub_menu/add",
    "route": "/pengaturan/sub-menu/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "menu_id",
        "label": "Menu ID",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "submenu_name",
        "label": "Nama SubMenu ID*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "submenu_name_en",
        "label": "Nama SubMenu En*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "submenu_link",
        "label": "Link SubMenu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "orders",
        "label": "Urutan SubMenu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_menu"
    ],
    "forms": [
      {
        "action": "/insertsubmenu",
        "method": "POST"
      }
    ],
    "source": "pengaturan/sub_menu/add.html"
  },
  "pengaturan/sub_menu/edit": {
    "key": "pengaturan/sub_menu/edit",
    "route": "/pengaturan/sub-menu/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "menu_id",
        "label": "Menu ID",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "submenu_name",
        "label": "Nama SubMenu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "submenu_name_en",
        "label": "Nama SubMenu En*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "submenu_link",
        "label": "Link SubMenu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "orders",
        "label": "Urutan SubMenu*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/api_submenu_detail/",
      "/api_menu"
    ],
    "forms": [
      {
        "action": "/updatesubmenu",
        "method": "POST"
      }
    ],
    "source": "pengaturan/sub_menu/edit.html"
  },
  "pengaturan/sub_menu/list": {
    "key": "pengaturan/sub_menu/list",
    "route": "/pengaturan/sub-menu",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Menu ID",
      "Nama Submenu",
      "Link Submenu",
      "Urutan",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "pengaturan/sub_menu/list.html"
  },
  "photos/add": {
    "key": "photos/add",
    "route": "/photos/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [IN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Foto )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [IN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo_datetime",
        "label": "Tanggal",
        "type": "datetime-local",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": [
          {
            "value": "1",
            "label": "Industri Produk Halal"
          }
        ]
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "11",
            "label": "DKI Jakarta"
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/tagging",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertphoto",
        "method": "POST"
      }
    ],
    "source": "photos/add.html"
  },
  "photos/edit": {
    "key": "photos/edit",
    "route": "/photos/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [IN] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Foto )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [IN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo_datetime",
        "label": "Tanggal )*",
        "type": "datetime-local",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Ganti/Ubah Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/photodetail/",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatephoto",
        "method": "POST"
      }
    ],
    "source": "photos/edit.html"
  },
  "photos/list": {
    "key": "photos/list",
    "route": "/photos",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Foto",
      "Judul",
      "Tanggal",
      "Pengunggah",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "photos/list.html"
  },
  "profile/contacts/edit": {
    "key": "profile/contacts/edit",
    "route": "/profile/contacts/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "address_building",
        "label": "Alamat Gedung",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "address",
        "label": "Alamat Lengkap",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "phone_number",
        "label": "Nomor Telpon",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "fax_number",
        "label": "Nomor Fax",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "email",
        "label": "Email",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/contacts"
    ],
    "forms": [
      {
        "action": "/updatecontacts",
        "method": "POST"
      }
    ],
    "source": "profile/contacts/edit.html"
  },
  "profile/contacts/list": {
    "key": "profile/contacts/list",
    "route": "/profile/contacts",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Alamat Gedung",
      "Nomor Telpon",
      "Email",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/contacts/list.html"
  },
  "profile/ekonomi_syariah/edit": {
    "key": "profile/ekonomi_syariah/edit",
    "route": "/profile/ekonomi-syariah/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/es_detailabouts/"
    ],
    "forms": [
      {
        "action": "/es_updateabout",
        "method": "POST"
      }
    ],
    "source": "profile/ekonomi_syariah/edit.html"
  },
  "profile/ekonomi_syariah/ekonomi_syariah": {
    "key": "profile/ekonomi_syariah/ekonomi_syariah",
    "route": "/profile/ekonomi-syariah",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul [ID]",
      "Judul [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/ekonomi_syariah/ekonomi_syariah.html"
  },
  "profile/ekonomi_syariah/ekonomi_syariah_form": {
    "key": "profile/ekonomi_syariah/ekonomi_syariah_form",
    "route": "/profile/ekonomi-syariah/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "about",
        "label": "Tentang Kami [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_en",
        "label": "Tentang Kami [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content",
        "label": "Konten Tentang Kami [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content_en",
        "label": "Konten Tentang Kami [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history",
        "label": "Sejarah [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_en",
        "label": "Sejarah [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content",
        "label": "Konten Sejarah [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content_en",
        "label": "Konten Sejarah [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation",
        "label": "Landasan Hukum [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_en",
        "label": "Landasan Hukum [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content",
        "label": "Konten Landasan Hukum [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content_en",
        "label": "Konten Landasan Hukum [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy",
        "label": "Filosofi Logo [ID]",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_en",
        "label": "Filosofi Logo [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content",
        "label": "Konten Filosofi Logo [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content_en",
        "label": "Konten Filosofi Logo [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task",
        "label": "Tugas KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_en",
        "label": "Tugas KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content",
        "label": "Konten Tugas KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content_en",
        "label": "Konten Tugas KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function",
        "label": "Fungsi KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_en",
        "label": "Fungsi KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content",
        "label": "Konten Fungsi KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content_en",
        "label": "Konten Fungsi KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/es_detailabouts/"
    ],
    "forms": [
      {
        "action": "/es_updateabout",
        "method": "POST"
      }
    ],
    "source": "profile/ekonomi_syariah/ekonomi_syariah_form.html"
  },
  "profile/institution/add": {
    "key": "profile/institution/add",
    "route": "/profile/institutions/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "tag",
        "label": "Tag )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_member",
        "label": "Logo )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link Website )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "order",
        "label": "Urutan )*",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insertinstitution",
        "method": "POST"
      }
    ],
    "source": "profile/institution/add.html"
  },
  "profile/institution/edit": {
    "key": "profile/institution/edit",
    "route": "/profile/institutions/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "tag",
        "label": "Tag)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "name",
        "label": "Nama)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_member",
        "label": "Logo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link Website)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "order",
        "label": "Urutan)*",
        "type": "number",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailinstitutions/"
    ],
    "forms": [
      {
        "action": "/updateinstitution",
        "method": "POST"
      }
    ],
    "source": "profile/institution/edit.html"
  },
  "profile/institution/list": {
    "key": "profile/institution/list",
    "route": "/profile/institutions",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Nama",
      "Link",
      "Logo",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/institution/list.html"
  },
  "profile/maps/edit": {
    "key": "profile/maps/edit",
    "route": "/profile/maps/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "embed",
        "label": "Tempel Embed Map",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/maps"
    ],
    "forms": [
      {
        "action": "/updatemaps",
        "method": "POST"
      }
    ],
    "source": "profile/maps/edit.html"
  },
  "profile/maps/list": {
    "key": "profile/maps/list",
    "route": "/profile/maps",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Embed Map",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/maps/list.html"
  },
  "profile/post_sosmed/add": {
    "key": "profile/post_sosmed/add",
    "route": "/profile/social-posts/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "link_post",
        "label": "Link Post Sosmed )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_sosmed",
        "label": "Sosmed )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih Sosmed"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/sosmed"
    ],
    "forms": [
      {
        "action": "/insertpostsosmed",
        "method": "POST"
      }
    ],
    "source": "profile/post_sosmed/add.html"
  },
  "profile/post_sosmed/edit": {
    "key": "profile/post_sosmed/edit",
    "route": "/profile/social-posts/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "link_post",
        "label": "Link Post Instagram )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_sosmed",
        "label": "Sosmed )*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih Sosmed"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/postdetailsosmed/",
      "/sosmed"
    ],
    "forms": [
      {
        "action": "/updatepostsosmed",
        "method": "POST"
      }
    ],
    "source": "profile/post_sosmed/edit.html"
  },
  "profile/post_sosmed/list": {
    "key": "profile/post_sosmed/list",
    "route": "/profile/social-posts",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Link Post Instagram",
      "Actions"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/post_sosmed/list.html"
  },
  "profile/scope/edit": {
    "key": "profile/scope/edit",
    "route": "/profile/scope/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Keterangan [ID]",
        "type": "textarea",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Keterangan [EN]",
        "type": "textarea",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "images",
        "label": "URL Gambar",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailscopes/"
    ],
    "forms": [
      {
        "action": "/updatescopes",
        "method": "POST"
      }
    ],
    "source": "profile/scope/edit.html"
  },
  "profile/scope/list": {
    "key": "profile/scope/list",
    "route": "/profile/scope",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul [ID]",
      "Judul [EN]",
      "Gambar",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/scope/list.html"
  },
  "profile/social_media/edit": {
    "key": "profile/social_media/edit",
    "route": "/profile/social-media/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama Sosmed",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo",
        "label": "URL Logo Sosmed",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "link",
        "label": "Link Sosmed",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailsosmed/"
    ],
    "forms": [
      {
        "action": "/updatesosmed",
        "method": "POST"
      }
    ],
    "source": "profile/social_media/edit.html"
  },
  "profile/social_media/list": {
    "key": "profile/social_media/list",
    "route": "/profile/social-media",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama Sosmed",
      "Link Sosmed",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/social_media/list.html"
  },
  "profile/tentang_kami/tentang_kami": {
    "key": "profile/tentang_kami/tentang_kami",
    "route": "/profile/tentang-kami",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Judul [ID]",
      "Judul [EN]",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "profile/tentang_kami/tentang_kami.html"
  },
  "profile/tentang_kami/tentang_kami_edit": {
    "key": "profile/tentang_kami/tentang_kami_edit",
    "route": "/profile/tentang-kami/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailabouts/"
    ],
    "forms": [
      {
        "action": "/updateabout",
        "method": "POST"
      }
    ],
    "source": "profile/tentang_kami/tentang_kami_edit.html"
  },
  "profile/tentang_kami/tentang_kami_form": {
    "key": "profile/tentang_kami/tentang_kami_form",
    "route": "/profile/tentang-kami/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "about",
        "label": "Tentang Kami [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_en",
        "label": "Tentang Kami [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content",
        "label": "Konten Tentang Kami [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "about_content_en",
        "label": "Konten Tentang Kami [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history",
        "label": "Sejarah [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_en",
        "label": "Sejarah [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content",
        "label": "Konten Sejarah [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "history_content_en",
        "label": "Konten Sejarah [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation",
        "label": "Landasan Hukum [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_en",
        "label": "Landasan Hukum [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content",
        "label": "Konten Landasan Hukum [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "legal_foundation_content_en",
        "label": "Konten Landasan Hukum [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_images",
        "label": "Filosofi Logo Upload",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy",
        "label": "Filosofi Logo [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_en",
        "label": "Filosofi Logo [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content",
        "label": "Konten Filosofi Logo [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "logo_philosophy_content_en",
        "label": "Konten Filosofi Logo [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task",
        "label": "Tugas KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_en",
        "label": "Tugas KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content",
        "label": "Konten Tugas KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "kneks_task_content_en",
        "label": "Konten Tugas KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function",
        "label": "Fungsi KNEKS [ID]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_en",
        "label": "Fungsi KNEKS [EN]",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content",
        "label": "Konten Fungsi KNEKS [ID]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "function_content_en",
        "label": "Konten Fungsi KNEKS [EN]",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailabouts/"
    ],
    "forms": [
      {
        "action": "/updateabout",
        "method": "POST"
      }
    ],
    "source": "profile/tentang_kami/tentang_kami_form.html"
  },
  "register": {
    "key": "register",
    "route": "/register",
    "kind": "register",
    "title": "Selamat Datang",
    "fields": [
      {
        "name": "username",
        "label": "Username",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "email",
        "label": "Email",
        "type": "email",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "password",
        "label": "Password",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "direktorat",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "Pilih Direktorat"
          }
        ]
      },
      {
        "name": "kdeks",
        "label": "Kdeks",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "Pilih KDEKS"
          }
        ]
      },
      {
        "name": "instansi",
        "label": "Instansi",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "Pilih Instansi"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/directorat_fe",
      "/institutions",
      "/provinces",
      "/insertreg"
    ],
    "forms": [],
    "source": "register.html"
  },
  "struktur/anggota/add": {
    "key": "struktur/anggota/add",
    "route": "/struktur/anggota/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_pejabat",
        "label": "-Organisasi-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/structure"
    ],
    "forms": [
      {
        "action": "/insertanggota",
        "method": "POST"
      }
    ],
    "source": "struktur/anggota/add.html"
  },
  "struktur/anggota/edit": {
    "key": "struktur/anggota/edit",
    "route": "/struktur/anggota/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_pejabat",
        "label": "-Organisasi-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailanggota/",
      "/structure"
    ],
    "forms": [
      {
        "action": "/updateanggota",
        "method": "POST"
      }
    ],
    "source": "struktur/anggota/edit.html"
  },
  "struktur/anggota/list": {
    "key": "struktur/anggota/list",
    "route": "/struktur/anggota",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "struktur/anggota/list.html"
  },
  "struktur/pejabat/add": {
    "key": "struktur/pejabat/add",
    "route": "/struktur/pejabat/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/structure"
    ],
    "forms": [
      {
        "action": "/insertstructure",
        "method": "POST"
      }
    ],
    "source": "struktur/pejabat/add.html"
  },
  "struktur/pejabat/edit": {
    "key": "struktur/pejabat/edit",
    "route": "/struktur/pejabat/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailstructure/"
    ],
    "forms": [
      {
        "action": "/updatestructure",
        "method": "POST"
      }
    ],
    "source": "struktur/pejabat/edit.html"
  },
  "struktur/pejabat/list": {
    "key": "struktur/pejabat/list",
    "route": "/struktur/pejabat",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "struktur/pejabat/list.html"
  },
  "struktur/struktur/add_s_logo": {
    "key": "struktur/struktur/add_s_logo",
    "route": "/struktur/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Nama Struktur Logo )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Struktur Logo )*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal Struktur Logo )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/insert_slogo",
        "method": "POST"
      }
    ],
    "source": "struktur/struktur/add_s_logo.html"
  },
  "struktur/struktur/edit_s_logo": {
    "key": "struktur/struktur/edit_s_logo",
    "route": "/struktur/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Judul Struktur Logo )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "files_image",
        "label": "Gambar Struktur Logo )*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "tanggal",
        "label": "Tanggal )*",
        "type": "date",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_s_logos/"
    ],
    "forms": [
      {
        "action": "/updateslogo",
        "method": "POST"
      }
    ],
    "source": "struktur/struktur/edit_s_logo.html"
  },
  "struktur/struktur/s_logo": {
    "key": "struktur/struktur/s_logo",
    "route": "/struktur/s-logo",
    "kind": "s-logo",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Judul",
      "Tanggal",
      "Status",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "struktur/struktur/s_logo.html"
  },
  "struktur/sub_anggota/add": {
    "key": "struktur/sub_anggota/add",
    "route": "/struktur/sub-anggota/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN])*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Gambar/Photo)*",
        "type": "file",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_anggota",
        "label": "-Direktorat-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/structure",
      "/anggotas"
    ],
    "forms": [
      {
        "action": "/insertsubanggota",
        "method": "POST"
      }
    ],
    "source": "struktur/sub_anggota/add.html"
  },
  "struktur/sub_anggota/edit": {
    "key": "struktur/sub_anggota/edit",
    "route": "/struktur/sub-anggota/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position",
        "label": "Posisi [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "position_en",
        "label": "Posisi [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "photo",
        "label": "Photo)*",
        "type": "file",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description",
        "label": "Deskripsi [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "description_en",
        "label": "Deskripsi [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "id_anggota",
        "label": "-Direktorat-",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "--",
            "label": "-Pilih Pejabat-"
          }
        ]
      },
      {
        "name": "x",
        "label": "X (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "facebook",
        "label": "Facebook (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "linkedin",
        "label": "Linkedin (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "instagram",
        "label": "Instagram (Sosmed)",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailsubanggota/",
      "/anggotas"
    ],
    "forms": [
      {
        "action": "/updatesubanggota",
        "method": "POST"
      }
    ],
    "source": "struktur/sub_anggota/edit.html"
  },
  "struktur/sub_anggota/list": {
    "key": "struktur/sub_anggota/list",
    "route": "/struktur/sub-anggota",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Foto",
      "Nama",
      "Jabatan",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "struktur/sub_anggota/list.html"
  },
  "tagging/add": {
    "key": "tagging/add",
    "route": "/tagging/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "tagging",
        "label": "Tagging)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [],
    "forms": [
      {
        "action": "/inserttagging",
        "method": "POST"
      }
    ],
    "source": "tagging/add.html"
  },
  "tagging/edit": {
    "key": "tagging/edit",
    "route": "/tagging/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "tagging",
        "label": "Tagging )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detailtagging/"
    ],
    "forms": [
      {
        "action": "/updatetagging",
        "method": "POST"
      }
    ],
    "source": "tagging/edit.html"
  },
  "tagging/list": {
    "key": "tagging/list",
    "route": "/tagging",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Tagging",
      "Actions"
    ],
    "endpoints": [],
    "forms": [],
    "source": "tagging/list.html"
  },
  "user_management/approve/list": {
    "key": "user_management/approve/list",
    "route": "/users/approve",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama",
      "Email",
      "Roles",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/approve/list.html"
  },
  "user_management/change_password/list": {
    "key": "user_management/change_password/list",
    "route": "/users/change-password",
    "kind": "list",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Nama",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "old_password",
        "label": "Password Lama",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "new_password",
        "label": "Password Baru",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "verify_password",
        "label": "Konfirmasi Password Baru",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/updatepassword"
    ],
    "forms": [
      {
        "action": "/changespassword",
        "method": "POST"
      }
    ],
    "source": "user_management/change_password/list.html"
  },
  "user_management/new_user/list": {
    "key": "user_management/new_user/list",
    "route": "/users/new-user",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama",
      "Email",
      "Roles",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/new_user/list.html"
  },
  "user_management/rejected/list": {
    "key": "user_management/rejected/list",
    "route": "/users/rejected",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama",
      "Email",
      "Roles",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/rejected/list.html"
  },
  "user_management/users/add": {
    "key": "user_management/users/add",
    "route": "/users/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "name",
        "label": "Nama *",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "email",
        "label": "Email",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "password",
        "label": "Password",
        "type": "password",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "role_id",
        "label": "Roles",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "directorat_id",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "id_province",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/roles",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertusers",
        "method": "POST"
      }
    ],
    "source": "user_management/users/add.html"
  },
  "user_management/users/edit": {
    "key": "user_management/users/edit",
    "route": "/users/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "names",
        "label": "Nama *",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "emails",
        "label": "Email",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "passwords",
        "label": "Password",
        "type": "password",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "roles_id",
        "label": "Roles",
        "type": "select",
        "required": false,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "directorat_id",
        "label": "Direktorat",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "id_province",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      }
    ],
    "columns": [],
    "endpoints": [
      "/users_detail/",
      "/roles",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updateusers",
        "method": "POST"
      }
    ],
    "source": "user_management/users/edit.html"
  },
  "user_management/users/list": {
    "key": "user_management/users/list",
    "route": "/users",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "No",
      "Nama",
      "Email",
      "Roles",
      "Direktorat",
      "KDEKS",
      "Persetujuan",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/users/list.html"
  },
  "user_management/whitelist/ipaddress": {
    "key": "user_management/whitelist/ipaddress",
    "route": "/users/whitelist/ip-address",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Email",
      "Persetujuan",
      "Persetujuan Oleh",
      "Tanggal Persetujuan",
      "IP",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/whitelist/ipaddress.html"
  },
  "user_management/whitelist/list": {
    "key": "user_management/whitelist/list",
    "route": "/users/whitelist",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Nama",
      "Email",
      "Roles ID",
      "Persetujuan",
      "Persetujuan Oleh",
      "Tanggal Persetujuan",
      "Whitelist IP",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "user_management/whitelist/list.html"
  },
  "videos/add": {
    "key": "videos/add",
    "route": "/videos/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "video",
        "label": "Masukan ID Video : )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "duration",
        "label": "Durasi )*",
        "type": "time",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "video_datetime",
        "label": "Tanggal )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "is_published",
        "label": "Is Published",
        "type": "checkbox",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Direktorat",
        "type": "select",
        "required": false,
        "multiple": true,
        "options": [
          {
            "value": "1",
            "label": "Industri Produk Halal"
          }
        ]
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "11",
            "label": "DKI Jakarta"
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Tagging )*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/tagging",
      "/directorat_fe",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertvideo",
        "method": "POST"
      }
    ],
    "source": "videos/add.html"
  },
  "videos/edit": {
    "key": "videos/edit",
    "route": "/videos/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "title",
        "label": "Judul [ID] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "title_en",
        "label": "Judul [EN] )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "video",
        "label": "Masukan ID Video : )*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "duration",
        "label": "Durasi )*",
        "type": "time",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content",
        "label": "Konten [ID] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "content_en",
        "label": "Konten [EN] )*",
        "type": "textarea",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "video_datetime",
        "label": "Tanggal )*",
        "type": "datetime-local",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "directorat",
        "label": "Pilih Direktorat",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": []
      },
      {
        "name": "kdeks",
        "label": "KDEKS",
        "type": "select",
        "required": true,
        "multiple": true,
        "options": [
          {
            "value": "0",
            "label": ""
          }
        ]
      },
      {
        "name": "taggings",
        "label": "Ganti/Ubah Tagging",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/videodetail/",
      "/tagging",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatevideo",
        "method": "POST"
      }
    ],
    "source": "videos/edit.html"
  },
  "videos/list": {
    "key": "videos/list",
    "route": "/videos",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "NO",
      "Video",
      "Judul",
      "Durasi",
      "Tanggal",
      "Pengunggah",
      "Tayang",
      "Aksi"
    ],
    "endpoints": [],
    "forms": [],
    "source": "videos/list.html"
  },
  "zona_khas/add": {
    "key": "zona_khas/add",
    "route": "/zona-khas/create",
    "kind": "create",
    "title": "Dashboard",
    "fields": [
      {
        "name": "khas_zone",
        "label": "Zona Khas)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "city",
        "label": "Kota)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "province",
        "label": "Provinsi)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "status",
        "label": "Status)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "",
            "label": "Pilih Status"
          },
          {
            "value": "rampung",
            "label": "Rampung"
          },
          {
            "value": "diresmikan",
            "label": "Diresmikan"
          }
        ]
      },
      {
        "name": "tenant",
        "label": "Jumlah Tenant)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "inauguration",
        "label": "Tanggal Peresmian)*",
        "type": "date",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "inaugurated",
        "label": "Diresmikan Oleh)*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/provinces"
    ],
    "forms": [
      {
        "action": "/insertzonakhas",
        "method": "POST"
      }
    ],
    "source": "zona_khas/add.html"
  },
  "zona_khas/edit": {
    "key": "zona_khas/edit",
    "route": "/zona-khas/[id]/edit",
    "kind": "edit",
    "title": "Dashboard",
    "fields": [
      {
        "name": "khas_zone",
        "label": "Zona Khas)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "city",
        "label": "Kota)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "province",
        "label": "Provinsi)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "0",
            "label": "Pilih"
          }
        ]
      },
      {
        "name": "status",
        "label": "Status)*",
        "type": "select",
        "required": true,
        "multiple": false,
        "options": [
          {
            "value": "",
            "label": "Pilih Status"
          },
          {
            "value": "rampung",
            "label": "Rampung"
          },
          {
            "value": "diresmikan",
            "label": "Diresmikan"
          }
        ]
      },
      {
        "name": "tenant",
        "label": "Jumlah Tenant)*",
        "type": "text",
        "required": true,
        "multiple": false,
        "options": []
      },
      {
        "name": "inauguration",
        "label": "Tanggal Peresmian)*",
        "type": "date",
        "required": false,
        "multiple": false,
        "options": []
      },
      {
        "name": "inaugurated",
        "label": "Diresmikan Oleh)*",
        "type": "text",
        "required": false,
        "multiple": false,
        "options": []
      }
    ],
    "columns": [],
    "endpoints": [
      "/detail_zona_khas/",
      "/provinces"
    ],
    "forms": [
      {
        "action": "/updatezonakhas",
        "method": "POST"
      }
    ],
    "source": "zona_khas/edit.html"
  },
  "zona_khas/list": {
    "key": "zona_khas/list",
    "route": "/zona-khas",
    "kind": "list",
    "title": "Dashboard",
    "fields": [],
    "columns": [
      "ID",
      "Zona Khas",
      "Kota",
      "Provinsi",
      "Status",
      "Tanggal Peresmian",
      "Jumlah Tenant",
      "Diresmikan Oleh",
      "Aksi"
    ],
    "endpoints": [
      "/provinces"
    ],
    "forms": [],
    "source": "zona_khas/list.html"
  }
};
