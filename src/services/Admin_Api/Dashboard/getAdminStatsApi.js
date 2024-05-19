import axiosInstance from "../../axiosInstance";

export const getAdminStatsApi = async () => {

  const { data = {} } = await axiosInstance.get("/v1/user/admin/dashboard"); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
