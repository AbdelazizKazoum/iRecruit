import clientApi from "@/libs/clientApi";

export const jobOffersService = {
  getAllJobOffers: async function (params?: {
    page?: number;
    limit?: number;
    title?: string;
    date?: string;
    city?: string;
    department?: string;
  }) {
    const { data } = await clientApi.get("/job-offers/admin", { params });

    return data;
  },

  getJobOfferById: async function (id: string) {
    const { data } = await clientApi.get(`/job-offers/${id}`);
    return data;
  },

  createJobOffer: async function (
    payload: Record<string, unknown>,
    imageFile?: File | null
  ) {
    if (imageFile) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("image", imageFile);
      const { data } = await clientApi.post("/job-offers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    }
    const { data } = await clientApi.post("/job-offers", payload);
    return data;
  },

  updateJobOffer: async function (
    id: string,
    payload: Record<string, unknown>,
    imageFile?: File | null
  ) {
    if (imageFile) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("image", imageFile);
      const { data } = await clientApi.patch(`/job-offers/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    }
    const { data } = await clientApi.patch(`/job-offers/${id}`, payload);
    return data;
  },

  deleteJobOffer: async function (id: string) {
    const { data } = await clientApi.delete(`/job-offers/${id}`);
    return data;
  },
};
