import axiosInstance from "../../axiosInstance";

export const createProductApi = async (payload) => {

  const { data = {} } = await axiosInstance.post("/v1/admin/item/createItemAdmin" , payload); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
