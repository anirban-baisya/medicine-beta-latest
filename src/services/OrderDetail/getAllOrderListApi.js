import axiosInstance from "../axiosInstance";

export const getAllOrderListApi = async (uId) => {
  const { data = {} } = await axiosInstance.get(`/v1/user/order/get/${uId}`); //if we dont recive any respons then it give rspons like this data = {}

  return data;
};
