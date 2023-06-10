import { observable, action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import handler from "@/utils/apiHandler";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

class Store {
  @observable jwtToken = "";
  @observable isLoggedIn = false;
  @observable _id = "";
  @observable name = "";
  @observable email = "";
  @observable cart = [];
  @observable books = [];

  @action async signup(body) {
    let apiCall = {
      method: "POST",
      url: `${apiUrl}/api/register`,
      body: body,
    };
    let resp = await handler(apiCall);

    if (resp.status === 200) {
      let data = resp.data;
      this._id = data._id;
      this.name = data.name;
      this.email = data.email;
      this.cart = data.cart;
      this.orders = data.orders;
      this.jwtToken = data.access_token;
      this.isLoggedIn = true;

      return true;
    } else {
      return resp;
    }
  }

  @action async login(body) {
    let apiCall = {
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: body,
    };
    let resp = await handler(apiCall);

    if (resp.status === 200) {
      let data = resp.data;
      this._id = data._id;
      this.name = data.name;
      this.email = data.email;
      this.jwtToken = data.access_token;
      this.isLoggedIn = true;

      return true;
    } else {
      return resp;
    }
  }

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "store",
      properties: ["jwtToken", "isLoggedIn", "_id", "name", "email"],
      storage: window.localStorage,
    });
  }
}

const store = new Store();
export default store;
