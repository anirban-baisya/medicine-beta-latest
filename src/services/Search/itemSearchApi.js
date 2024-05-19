import axiosInstance from "../axiosInstance";

export const findItemsBySearchQueryApi = async (payload) => {
  const { data = {} } = await axiosInstance.get(`v1/admin/item/search?page=${payload.page}&itemName=${payload.searchQuery}`); //if we dont recive any respons then it give rspons like this data = {}

  return data;
};
