import axiosInstance from "../../axiosInstance";

export const getAllOrderListForAdminApi = async () => {
  const { data = {} } = await axiosInstance.get(`/v1/user/order/viewOrderForadmin`); //if we dont recive any respons then it give rspons like this data = {}

  return data;
};
