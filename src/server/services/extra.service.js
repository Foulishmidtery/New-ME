import { extraRepository } from "@/server/repositories/extra.repository";

export const extraService = {
  // Provinces
  listProvinces: () => extraRepository.listProvinces(),
  getProvince: (id) => extraRepository.getProvince(id),
  createProvince: (data) => extraRepository.createProvince(data),
  updateProvince: (id, data) => extraRepository.updateProvince(id, data),
  deleteProvince: (id) => extraRepository.deleteProvince(id),

  // Zona Khas
  listZonaKhas: async () => {
    const provinces = await extraRepository.listProvinces();
    return Promise.all(provinces.map(async (item) => {
      const allZonakhas = await extraRepository.listZonaKhas();
      const zone = allZonakhas.filter(z => z.province == item.id);
      const aar = zone.map(elem => ({
        id: elem?.id,
        khas_zone: elem?.khas_zone,
        city: elem?.city,
        province: elem?.province,
        province_names: item?.province_name,
        inauguration: elem?.inauguration,
        tenant: elem?.tenant,
        inaugurated: elem?.inaugurated,
        status: elem?.status
      }));
      return {
        id: item?.id,
        province_name: item?.province_name,
        zonakhas: aar
      };
    }));
  },
  getZonaPeta: () => extraRepository.listZonaKhas(),
  getZonaKhas: (id) => extraRepository.getZonaKhas(id),
  createZonaKhas: (data) => extraRepository.createZonaKhas(data),
  updateZonaKhas: (id, data) => extraRepository.updateZonaKhas(id, data),
  deleteZonaKhas: (id) => extraRepository.deleteZonaKhas(id),

  // Tagging
  listTaggings: () => extraRepository.listTaggings(),
  getTagging: (id) => extraRepository.getTagging(id),
  createTagging: (data) => extraRepository.createTagging(data),
  updateTagging: (id, data) => extraRepository.updateTagging(id, data),
  deleteTagging: (id) => extraRepository.deleteTagging(id),

  // Opini
  listOpini: () => extraRepository.listOpini(),
  getOpini: (id) => extraRepository.getOpini(id),
  createOpini: (data) => extraRepository.createOpini(data),
  updateOpini: (id, data) => extraRepository.updateOpini(id, data),
  deleteOpini: (id) => extraRepository.deleteOpini(id),

  // Photo
  listPhotos: (roleId) => extraRepository.listPhotos(roleId),
  getPhoto: (id) => extraRepository.getPhoto(id),
  createPhoto: (data) => extraRepository.createPhoto(data),
  updatePhoto: (id, data) => extraRepository.updatePhoto(id, data),
  deletePhoto: (id) => extraRepository.deletePhoto(id),

  // Video
  listVideos: (roleId) => extraRepository.listVideos(roleId),
  getVideo: (id) => extraRepository.getVideo(id),
  createVideo: (data) => extraRepository.createVideo(data),
  updateVideo: (id, data) => extraRepository.updateVideo(id, data),
  deleteVideo: (id) => extraRepository.deleteVideo(id),
};
