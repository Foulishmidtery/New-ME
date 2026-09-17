import { bannersRepository } from "@/server/repositories/banners.repository";

export const bannersService = {
  // Slideshow
  listSlideshows: () => bannersRepository.listSlideshows(),
  getSlideshow: (id) => bannersRepository.getSlideshow(id),
  createSlideshow: (data) => bannersRepository.createSlideshow(data),
  updateSlideshow: (id, data) => bannersRepository.updateSlideshow(id, data),
  deleteSlideshow: (id) => bannersRepository.deleteSlideshow(id),

  // Login Banners
  listLoginBanners: async () => {
    const rows = await bannersRepository.listLoginBanners();
    return rows.map(element => ({
      id: element?.id,
      name: element?.name,
      path: element?.path,
      date_created: element?.date_created,
      status: element?.status,
      imgs: element?.path?.split('/')[5],
    }));
  },
  getLoginBanner: (id) => bannersRepository.getLoginBanner(id),
  createLoginBanner: (data) => bannersRepository.createLoginBanner(data),
  updateLoginBanner: (id, data) => bannersRepository.updateLoginBanner(id, data),
  deleteLoginBanner: (id) => bannersRepository.deleteLoginBanner(id),

  // Struktur Logo
  listSLogo: async () => {
    const rows = await bannersRepository.listSLogo();
    return rows.map(element => ({
      id: element?.id,
      name: element?.name,
      path: element?.path,
      date_created: element?.date_created,
      status: element?.status,
      imgs: element?.path?.split('/')[5],
    }));
  },
  getSLogo: (id) => bannersRepository.getSLogo(id),
  createSLogo: (data) => bannersRepository.createSLogo(data),
  updateSLogo: (id, data) => bannersRepository.updateSLogo(id, data),
  deleteSLogo: (id) => bannersRepository.deleteSLogo(id),

  // Welcome Pages
  listWelcomePages: async () => {
    const rows = await bannersRepository.listWelcomePages();
    return rows.map(element => ({
      id: element?.id,
      name: element?.name,
      path: element?.path,
      date_created: element?.date_created,
      status: element?.status,
      imgs: element?.path?.split('/')[5],
    }));
  },
  getWelcomePage: (id) => bannersRepository.getWelcomePage(id),
  createWelcomePage: (data) => bannersRepository.createWelcomePage(data),
  updateWelcomePage: (id, data) => bannersRepository.updateWelcomePage(id, data),
  deleteWelcomePage: (id) => bannersRepository.deleteWelcomePage(id),
};
