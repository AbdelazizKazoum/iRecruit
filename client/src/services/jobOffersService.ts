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
};
