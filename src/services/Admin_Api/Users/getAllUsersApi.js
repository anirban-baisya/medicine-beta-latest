import axiosInstance from "../../axiosInstance";

export const getAllUsersApi = async () => {

  const { data = {} } = await axiosInstance.get("/v1/user/getAll"); //if we dont recive any respons then it give rspons like this data = {}
 
  return data;
};
