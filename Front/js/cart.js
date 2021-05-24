export class Cart {
  /* constructs cart HTML element */
  constructor(domTarget) {
    this.content = data.dataFetcher.getCart();
    this.DOM = document.createElement("cart");
    domTarget.appendChild(this.DOM);
    this.render();
  }

  /**
   * creates the HTML input depending in the number of articles
   */
  render() {
    this.DOM.innerHTML = `<a href="./order.html" class="iconCart">
		  <span>Mon panier</span>
		  <i class="fas fa-shopping-cart">${this.content.length}</i>
		</a>`;
  }

  /**
   * adds the product in parameter at the end of the array, then refreshes the HTML input and saves the cart in localStorage
   * @param {ObjectId} 	itemId	id of the product we want to add
   * @param {Int} 		qty		number of given product we want to add by default 1
   */
  add(itemId, qty = 1) {
    for (let i = 0; i < qty; i++) {
      this.content.push(itemId);
    }
    this.render();
    data.dataFetcher.saveCart(this.content);
  }

  /**
   * suppresses one iteration of the product which id was given in parameter, then refreshes the HTML input and saves the cart in localStorage
   * @param {ObjectId}	itemId	id of the product we want to substract
   */
  sub(itemId) {
    this.content.splice(this.content.indexOf(itemId), 1);
    this.render();
    data.dataFetcher.saveCart(this.content);
  }

  /**
   * suppresses all iteration of a product which id is given in parameter, then refreshes the HTML input and saves the cart in localStorage
   * @param {ObjectId}	itemId id of the product we want to suppress
   */
  delete(itemId) {
    const newContent = [];
    for (let i = 0, size = this.content.length; i < size; i++) {
      if (this.content[i] !== itemId) newContent.push(this.content[i]);
    }
    this.content = newContent;
    this.render();
    data.dataFetcher.saveCart(this.content);
  }

  /**
   * resets the content to an empty array, then refreshes the HTML input and saves the cart in localStorage
   */
  deleteAll() {
    this.content = [];
    this.render();
    data.dataFetcher.saveCart(this.content);
  }
}