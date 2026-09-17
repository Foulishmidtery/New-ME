import { zonaKhasRepository } from "@/server/repositories/zona-khas.repository";

function normalizeCeremonyDates(data) {
  if (data?.status === "diresmikan") {
    return {
      ...data,
      inauguration: data.inauguration ? data.inauguration : null,
      inaugurated: data.inaugurated ? data.inaugurated : null,
    };
  }
  return { ...data, inauguration: null, inaugurated: null };
}

export const zonaKhasService = {
  async listNested() {
    const provinces = await zonaKhasRepository.listProvincesDesc();
    return Promise.all(provinces.map(async (item) => {
      const zones = await zonaKhasRepository.listByProvince(item?.id);
      return {
        id: item?.id,
        province_name: item?.province_name,
        zonakhas: zones.map((elem) => ({
          id: elem?.id,
          khas_zone: elem?.khas_zone,
          city: elem?.city,
          province: elem?.province,
          province_names: item?.province_name,
          inauguration: elem?.inauguration,
          tenant: elem?.tenant,
          inaugurated: elem?.inaugurated,
          status: elem?.status,
        })),
      };
    }));
  },

  listMap: () => zonaKhasRepository.listAll(),
  getRows: (id) => zonaKhasRepository.findRows(id),

  create(data) {
    return zonaKhasRepository.create(normalizeCeremonyDates(data));
  },

  update(data) {
    return zonaKhasRepository.update(normalizeCeremonyDates(data));
  },

  remove: (id) => zonaKhasRepository.remove(id),
};
