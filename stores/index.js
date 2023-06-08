import { observable, action } from "mobx";
import { format } from "date-fns";

class CustmomerStore {
  @observable name = "Aravind M";
  @observable email = "araviindm@gmail.com";
  @observable orders = [
    {
      order_id: "2",
      created: 1686256029000,
    },
    {
      order_id: "3",
      created: 1686256029000,
    },
    {
      order_id: "4",
      created: 1686256029000,
    },
    {
      order_id: "5",
      created: 1686256029000,
    },
  ];
  @observable cart = [];

  @action prepareOrders(books) {
    let customerOrders = [];
    this.orders.forEach((order) => {
      const date = new Date(order.created);
      const created = format(date, "dd/MM/yy, h:mm a");
      let result = books.find((book) => book._id === order.order_id);
      let customerOrder = {
        _id: order.order_id,
        title: result.title,
        author: result.author,
        cover_image_url: result.cover_image_url,
        created: created,
      };
      customerOrders.push(customerOrder);
    });
    return customerOrders;
  }
}

class UserStore {
  @observable isLoggedIn = true;
  @observable jwtToken = "";

  @action setIsLoggedIn(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
}

class BookStore {
  @observable books = [
    {
      _id: "1",
      title: "It Ends with Us",
      author: "Colleen Hoover",
      description:
        'It Ends with Us is a romance novel by Colleen Hoover, published by Atria Books on August 2, 2016. Based on the relationship between her mother and father, Hoover described it as "the hardest book I\'ve ever written".',
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 274,
      genre: "romance",
      publication_date: 1470076200000,
      customer_ratings: 4,
    },
    {
      _id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      description:
        "THE PHENOMENAL INTERNATIONAL BESTSELLER - 1 MILLION COPIES SOLDTransform your life with tiny changes in behaviour - starting now. People think that when you want to change your life, you need to think big.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 551,
      genre: "self help",
      publication_date: 1539801000000,
      customer_ratings: 4.5,
    },
    {
      _id: "3",
      title: "Ikigai",
      author: "Francesc Miralles",
      description:
        "INTERNATIONAL BESTSELLER • 1.5 MILLION+ COPIES SOLD WORLDWIDE“Workers looking for more fulfilling positions should start by identifying their ikigai.”",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 391,
      genre: "self help",
      publication_date: 1504722600000,
      customer_ratings: 4,
    },
    {
      _id: "4",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      description:
        "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 455,
      genre: "history",
      publication_date: 1430332200000,
      customer_ratings: 4.5,
    },
    {
      _id: "5",
      title: "Wings of Fire",
      author: "Apj Abdul Kalam",
      description:
        "Wings of Fire: An Autobiography is an autobiographical novel that tells the readers a story about unlocking their inner potential. Kalam does a great deal to throw light on his journey to igniting the fire within himself.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 356,
      genre: "biography",
      publication_date: 915993000000,
      customer_ratings: 4,
    },
    {
      _id: "6",
      title: "All the Light We Cannot See",
      author: "Anthony Doerr",
      description:
        "The novel is set during World War II and centers around the characters Marie-Laure Leblanc, a blind French girl who takes refuge in her uncle's house in Saint-Malo after Paris is invaded by Nazi Germany, and Werner Pfennig, a bright German boy who is accepted into a military school because of his skills in radio technology, before being sent to the military.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 358,
      genre: "fiction",
      publication_date: 1447871400000,
      customer_ratings: 4,
    },
    {
      _id: "7",
      title: "Rich Dad Poor Dad",
      author: "Robert T Kiyosaki",
      description:
        "It's been nearly 25 years since Robert Kiyosaki's Rich Dad Poor Dad first made waves in the Personal Finance arena. It has since become the #1 Personal Finance book of all time... translated into dozens of languages and sold around the world.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 516,
      genre: "finance",
      publication_date: 954527400000,
      customer_ratings: 4,
    },
    {
      _id: "8",
      title: "All-In on AI",
      author: "Tom Davenport",
      description:
        "Written by bestselling author Tom Davenport and Deloitte's Nitin Mittal, All-In on AI looks at artificial intelligence at its cutting edge from the viewpoint of established companies like Anthem, Ping An, Airbus, and Capital One.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 1880,
      genre: "internet",
      publication_date: 1680114600000,
      customer_ratings: 4,
    },
    {
      _id: "9",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      description:
        "Timeless lessons on wealth, greed, and happiness doing well with money isn?t necessarily about what you know. It?s about how you behave. And behavior is hard to teach, even to really smart people. ",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 295,
      genre: "business",
      publication_date: 1598898600000,
      customer_ratings: 4.5,
    },
    {
      _id: "10",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      description:
        "The Silent Patient is a shocking psychological thriller of a woman’s act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
      cover_image_url: require("@/assets/placeholder.jpg"),
      price: 679,
      genre: "crime",
      publication_date: 1576089000000,
      customer_ratings: 4,
    },
  ];
}

class RootStore {
  constructor() {
    this.custmomerStore = new CustmomerStore();
    this.userStore = new UserStore();
    this.bookStore = new BookStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
