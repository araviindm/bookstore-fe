import store from "@/stores";
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
        Authorization: `Bearer ${store.jwtToken}`,
      },
    });
    return {
      status: 200,
      data: resp.data,
    };
  } catch (error) {
    console.log(error.response.status);
    return {
      code: error.code,
      message: error.response.data.detail,
    };
  }
}
