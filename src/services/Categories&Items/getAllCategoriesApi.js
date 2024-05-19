import axiosInstance from "../axiosInstance";

export const getAllCategoriesApi = async () => {
  const { data = {} } = await axiosInstance.get(`/v1/admin/item/getAllCategory`); //if we dont recive any respons then it give rspons like this data = {}

  return data;
};
