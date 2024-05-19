import axiosInstance from "../../axiosInstance";

export const editCategoryApi = async (payload) => {

  const { data = {} } = await axiosInstance.post("/v1/admin/item/update/category" , payload); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
