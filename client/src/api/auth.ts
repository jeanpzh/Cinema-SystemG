import axios from "axios";

export const login = async (username: string, password: string) => {
  const res = await axios.post(
    "http://localhost:3000/login",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};
