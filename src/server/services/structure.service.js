import { structureRepository } from "@/server/repositories/structure.repository";

export const structureService = {
  // Pejabat
  listPejabat: () => structureRepository.listPejabat(),
  getPejabat: (id) => structureRepository.getPejabat(id),
  createPejabat: (data) => structureRepository.createPejabat(data),
  updatePejabat: (id, data) => structureRepository.updatePejabat(id, data),
  deletePejabat: (id) => structureRepository.deletePejabat(id),

  // Anggota
  listAnggota: () => structureRepository.listAnggota(),
  getAnggota: (id) => structureRepository.getAnggota(id),
  createAnggota: (data) => structureRepository.createAnggota(data),
  updateAnggota: (id, data) => structureRepository.updateAnggota(id, data),
  deleteAnggota: (id) => structureRepository.deleteAnggota(id),

  // Sub Anggota
  listSubAnggota: () => structureRepository.listSubAnggota(),
  getSubAnggota: (id) => structureRepository.getSubAnggota(id),
  createSubAnggota: (data) => structureRepository.createSubAnggota(data),
  updateSubAnggota: (id, data) => structureRepository.updateSubAnggota(id, data),
  deleteSubAnggota: (id) => structureRepository.deleteSubAnggota(id),

  getMultiStructure: async () => {
    const { og, ag, sag } = await structureRepository.getMultiStructure();
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
