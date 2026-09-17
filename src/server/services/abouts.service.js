import { aboutsRepository } from "@/server/repositories/abouts.repository";

export const aboutsService = {
  getEsAbouts: () => aboutsRepository.getEsAbouts(),
  getKneksAbouts: () => aboutsRepository.getKneksAbouts(),
  getKdeksAboutsList: () => aboutsRepository.getKdeksAboutsList(),
  getKdeksAbouts: () => aboutsRepository.getKdeksAbouts(),
  getKdeksHistory: () => aboutsRepository.getKdeksHistory(),
  getKdeksAboutProvince: async (idProvince) => {
    const row = await aboutsRepository.getKdeksProvinceProfile(idProvince);
    if (!row) return [];
    return [{
      id: row?.id,
      title: row?.title,
      title_en: row?.title_en,
      abouts: row?.abouts,
      abouts_en: row?.abouts_en,
      historys: row?.historys,
      historys_en: row?.historys_en,
      web_identity: row?.web_identity,
      id_province: row?.id_province,
      images: row?.images,
      province_name: row?.province_name,
      structure: row?.structure,
      sk: row?.sk,
      twitter: row?.twitter,
      facebook: row?.facebook,
      linkedin: row?.linkedin,
      instagram: row?.instagram,
      youtube: row?.youtube,
      address: row?.address,
      phone_number: row?.phone_number,
      fax: row?.fax,
      email: row?.email,
      maps: row?.maps,
      officials: row?.officials,
    }];
  },
  getKdeksHistoryProvince: async (idProvince) => {
    const row = await aboutsRepository.getKdeksProvinceProfile(idProvince);
    if (!row) return [];
    return [{
      id: row?.id,
      title: row?.title,
      title_en: row?.title_en,
      abouts: row?.abouts,
      abouts_en: row?.abouts_en,
      historys: row?.historys,
      historys_en: row?.historys_en,
      web_identity: row?.web_identity,
      id_province: row?.id_province,
      images: row?.images,
    }];
  },
  getAboutById: (id) => aboutsRepository.getAboutById(id),
  updateAbout: (id, data) => aboutsRepository.updateAbout(id, data),
  deleteAbout: (id) => aboutsRepository.deleteAbout(id),
  deleteKdeksAbouts: () => aboutsRepository.deleteKdeksAbouts(),
  getMapsKdeks: async () => {
    const results = await aboutsRepository.getMapsKdeks();
    return { success: true, data: results };
  }
};
