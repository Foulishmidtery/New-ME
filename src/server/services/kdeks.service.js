import { kdeksRepository } from "@/server/repositories/kdeks.repository";

export const kdeksService = {
  // KDEKS
  list: (roleId, rolesProv) => {
    if (roleId == 1 || roleId == 2) return kdeksRepository.listAll();
    return kdeksRepository.listByProvince(rolesProv);
  },
  get: (id) => kdeksRepository.get(id),
  create: (data) => {
    const prov = data.id_province.split('-');
    data.id_province = prov[0];
    data.province_name = prov[1];
    return kdeksRepository.create(data);
  },
  update: async (id, data) => {
    const prov = data.id_province.split('-');
    data.id_province = prov[0];
    data.province_name = prov[1];
    const old = await kdeksRepository.get(id);
    if (!data.images) data.images = old?.images;
    if (!data.sk) data.sk = old?.sk;
    if (!data.structure) data.structure = old?.structure;
    return kdeksRepository.update(id, data);
  },
  remove: (id) => kdeksRepository.remove(id),
  
  // Province Info
  getAboutProvince: async (id) => {
    const res = await kdeksRepository.listByProvince(id);
    return res.filter(r => r.web_identity === 'kdeks');
  },
  getHistoryProvince: async (id) => {
    const res = await kdeksRepository.listByProvince(id);
    return res.filter(r => r.web_identity === 'kdeks');
  },

  // Pejabat KDEKS
  listPejabat: () => kdeksRepository.listPejabat(),
  getPejabat: (id) => kdeksRepository.getPejabat(id),
  createPejabat: (data) => {
    const splitprov = (data.id_provincet || data.id_province || "-").split('-');
    data.id_province = splitprov[0];
    data.name_province = splitprov[1];
    return kdeksRepository.createPejabat(data);
  },
  updatePejabat: async (id, data) => {
    const splitprov = data.id_province.split('-');
    data.id_province = splitprov[0];
    data.name_province = splitprov[1];
    const old = await kdeksRepository.getPejabat(id);
    if (!data.photo) data.photo = old?.photo;
    return kdeksRepository.updatePejabat(id, data);
  },
  removePejabat: (id) => kdeksRepository.removePejabat(id),

  // Anggota KDEKS
  listAnggota: () => kdeksRepository.listAnggota(),
  getAnggota: (id) => kdeksRepository.getAnggota(id),
  createAnggota: (data) => kdeksRepository.createAnggota(data),
  updateAnggota: async (id, data) => {
    const old = await kdeksRepository.getAnggota(id);
    if (!data.photo) data.photo = old?.photo;
    return kdeksRepository.updateAnggota(id, data);
  },
  removeAnggota: (id) => kdeksRepository.removeAnggota(id),

  // Sub Anggota KDEKS
  listSubAnggota: () => kdeksRepository.listSubAnggota(),
  getSubAnggota: (id) => kdeksRepository.getSubAnggota(id),
  createSubAnggota: (data) => kdeksRepository.createSubAnggota(data),
  updateSubAnggota: async (id, data) => {
    const old = await kdeksRepository.getSubAnggota(id);
    if (!data.photo) data.photo = old?.photo;
    return kdeksRepository.updateSubAnggota(id, data);
  },
  removeSubAnggota: (id) => kdeksRepository.removeSubAnggota(id),
  
  // Multi Structure
  getMultiStructure: async (idProvince) => {
    const og = await kdeksRepository.listPejabatByProvince(idProvince);
    const ag = await kdeksRepository.listAnggota();
    const sag = await kdeksRepository.listSubAnggota();

    return og.map(ogs => ({
        id: ogs.id,
        name: ogs.name,
        position: ogs.position,
        photo: ogs.photo,
        web_identity: ogs.web_identity,
        description: ogs.description,
        is_publish: ogs.is_publish,
        position_en: ogs.position_en,
        description_en: ogs.description_en,
        organization: ogs.organization,
        directorat: ogs.directorat,
        head: ogs.head,
        ag: ag
            .filter(ags => ags.id_pejabat === ogs.id)
            .map(ags => ({
                id: ags.id,
                name: ags.name,
                position: ags.position,
                photo: ags.photo,
                web_identity: ags.web_identity,
                description: ags.description,
                is_publish: ags.is_publish,
                position_en: ags.position_en,
                description_en: ags.description_en,
                organization: ags.organization,
                directorat: ags.directorat,
                head: ags.head,
                sag: sag.filter(t => t.id_anggota === ags.id)
            }))
    }));
  }
};
