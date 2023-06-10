import { observable, action, computed } from "mobx";
import { create, persist } from "mobx-persist";
import handler from "@/utils/apiHandler";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

class UserStore {
  @persist @observable _id = "";
  @persist @observable name = "";
  @persist @observable email = "";
  // @persist("list") @observable cart = [];
  // @persist("list") @observable orders = [];
  @persist @observable jwtToken = "";
  @persist @observable isLoggedIn = false;

  @action
  async signup(body) {
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

  @action
  async login(body) {
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
      this.cart = data.cart;
      this.orders = data.orders;
      this.jwtToken = data.access_token;
      this.isLoggedIn = true;

      return true;
    } else {
      return resp;
    }
  }
}

// class BookStore {
//   @observable books = [];

//   @action
//   async getBooks() {
//     let apiCall = {
//       method: "GET",
//       url: `${apiUrl}/api/book`,
//     };
//     let resp = await handler(apiCall);
//   }
// }

// class CartStore {
//   @observable cart = [];
// }

// class OrderStore {
//   @observable orders = [];

//   @action async getOrders(custId) {
//     let apiCall = {
//       method: "GET",
//       url: `${apiUrl}/api/order/${custId}`,
//     };
//     let resp = await handler(apiCall);
//     if (resp.status === 200) {
//       let data = resp.data;
//       this.orders = data;
//     } else {
//       return resp;
//     }
//   }
// }

const hydrate = create({
  storage: localStorage,
  jsonify: true,
});

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    // this.bookStore = new BookStore();
    // this.cartStore = new CartStore();
    // this.orderStore = new OrderStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
hydrate("store", rootStore).then(() =>
  console.log("rootStore has been hydrated")
);
