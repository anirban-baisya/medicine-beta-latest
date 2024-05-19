import axiosInstance from "../axiosInstance";

export const getItemsByCIdApi = async (categoryId) => {
  const { data = {} } = await axiosInstance.get(`/v1/admin/item/getAll/?categoryId=${categoryId}`); //if we dont recive any respons then it give rspons like this data = {}

  return data;
};
