import axiosInstance from "../../axiosInstance";

export const updateOrderStatusByIdApi = async (payload) => {

  const { data = {} } = await axiosInstance.post("/v1/user/order/updateOrderStatus" , payload); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
