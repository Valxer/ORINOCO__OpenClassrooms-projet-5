class DataFetcher {
  items = null;
  constructor(url) {
    this.url = url;
  }

  /**
   * finds every item in the API
   *
   * @returns {Array} returns an Array containing the items
   */
  async fetchItems() {
    if (this.items !== null) return this.items;
    const result = await fetch(this.url);
    this.items = await result.json();
    return this.items;
  }

  /**
   * finds an item corresponding to the id passed as parameter
   *
   * @param {String} itemId	id of the requested object
   *
   * @returns {Object} 		returns the object having the given id
   */
  async getItem(itemId) {
    if (this.items === null) await this.fetchItems();
    return this.getFromArray(itemId);
  }

  /**
   * extract an object with the given id from the items array
   *
   * @param   {String}  itemId	id of the requested object
   *
   * @return  {Object}			returns the object having the given id
   */
  getFromArray(itemId) {
    for (let i = 0, size = this.items.length; i < size; i++) {
      if (this.items[i]._id === itemId) return this.items[i];
    }
    return {};
  }

  /**
   * saves the order (cart.js) in localStorage
   *
   * @param   {Object}  cart  cart content
   *
   * @return  {[Type]}        [return description]
   */
  saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /**
   * Looks for an existing cart in localStorage
   *
   * @return  {Object}  returns either an empty Arry if nothing is found or the cart object stored
   */
  getCart() {
    return localStorage.getItem("cart") === null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  }

  /**
   * Launches a fetch request with POST method with all needed informations for the order, creates a user in localStorage and redirects to the validation page
   *
   * @param   {String}  data  string containing personnal informations and all the products in the order
   */
  postOrder(data) {
    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data
    })
      .then((res) => {
        return res.json();
      })
      .then((r) => {
        localStorage.setItem("user", JSON.stringify(r.contact));
        window.location.assign("/Front/html/validation.html?orderId=" + r.orderId);
      })
      .catch((e) => {
        console.error("erreur : " + e.name);
      });
  }
}
