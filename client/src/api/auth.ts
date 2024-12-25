import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;


export const login = async (username: string, password: string) => {
  const res = await axios.post(
    `${apiUrl}/login`,	
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
