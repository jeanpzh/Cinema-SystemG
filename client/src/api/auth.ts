import axios from "axios";

export const login = async (username: string, password: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
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
