import axiosInstance from "../../axiosInstance";

export const createCategoryApi = async (payload) => {

  const { data = {} } = await axiosInstance.post("/v1/admin/item/create/category" , payload); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
