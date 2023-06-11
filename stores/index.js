import { observable, action, makeAutoObservable } from "mobx";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import handler from "@/utils/apiHandler";

class Store {
  @observable jwtToken = "";
  @observable isLoggedIn = false;
  @observable _id = "";
  @observable name = "";
  @observable email = "";
  @observable apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

  @action async signup(body) {
    let apiCall = {
      method: "POST",
      url: `${this.apiUrl}/api/register`,
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

  @action async login(body) {
    let apiCall = {
      method: "POST",
      url: `${this.apiUrl}/api/login`,
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

  @action async search({ search }) {
    let url = new URL(`${this.apiUrl}/api/search`);
    if (search) {
      url.searchParams.append("search_query", search);
    }
    let apiCall = {
      method: "GET",
      url: url,
    };
    let resp = await handler(apiCall);
    if (resp.status === 200) {
      return resp;
    } else {
      return resp;
    }
  }

  @action async postOrder(book_id) {
    let apiCall = {
      method: "POST",
      url: `${store.apiUrl}/api/order`,
      body: {
        cust_id: this._id,
        order_date: Date.now(),
        book_id: book_id,
      },
    };
    let resp = await handler(apiCall);

    if (resp.status === 200) {
      return true;
    } else {
      return resp;
    }
  }

  @action async postCart(book_id) {
    let apiCall = {
      method: "POST",
      url: `${store.apiUrl}/api/cart`,
      body: {
        cust_id: this._id,
        book_id: book_id,
      },
    };
    let resp = await handler(apiCall);

    if (resp.status === 200) {
      return true;
    } else {
      return resp;
    }
  }

  @action async deleteCart(body) {
    let apiCall = {
      method: "DELETE",
      url: `${store.apiUrl}/api/cart`,
      body: body,
    };
    let resp = await handler(apiCall);
    if (resp.status === 200) {
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
