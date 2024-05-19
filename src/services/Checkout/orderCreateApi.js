import axiosInstance from "../axiosInstance";

export const orderCreateApi = async (payload) => {

  const { data = {} } = await axiosInstance.post("/v1/user/order/create" , payload); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
