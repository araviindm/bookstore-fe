import { observable, action, computed } from "mobx";
import { format } from "date-fns";
import handler from "@/utils/apiHandler";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

class CartStore {
  @observable cart = [];
}

class OrderStore {
  @observable orders = [];
}

class UserStore {
  @observable isLoggedIn = false;
  @observable jwtToken = "";
  @observable _id = "";
  @observable name = "";
  @observable email = "";
  @observable cart = [];
  @observable orders = [];

  @action
  async login(body) {
    let apiCall = {
      method: "POST",
      url: `${apiUrl}/api/login`,
      body: body,
    };
    return await handler(apiCall);
  }
}

class BookStore {
  @observable books = [];

  @action
  async getBooks() {
    let apiCall = {
      method: "GET",
      url: `${apiUrl}/api/book`,
    };
    return await handler(apiCall);
  }
}

class RootStore {
  constructor() {
    this.userStore = new UserStore();
    this.bookStore = new BookStore();
    this.cartStore = new CartStore();
    this.orderStore = new OrderStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
