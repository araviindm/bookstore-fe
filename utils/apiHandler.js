import rootStore from "@/stores";
import axios from "axios";
export default async function handler(request) {
  const { method, url, body } = request;

  try {
    let resp = await axios({
      method: method,
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootStore.userStore.jwtToken}`,
      },
    });
    return {
      status: 200,
      data: resp.data,
    };
  } catch (error) {
    return {
      status: 404,
      code: error.code,
      message: error.message,
    };
  }
}
