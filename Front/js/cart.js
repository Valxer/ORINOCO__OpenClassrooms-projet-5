class Cart {
  /* constructs cart HTML element */
  constructor(domTarget) {
    this.content = data.DataFetcher.getCart();
    this.DOM = document.createElement("cart");
    domTarget.appendChild(this.DOM);
    this.render();
  }

  /**
   * creates the HTML input depending in the number of articles
   */
  render() {
    this.DOM.innerHTML = `<a href="./order.html" class="cartIcon">
		  <i class="fas fa-shopping-cart"> ${this.content.length}</i>
		  <p>Mon Panier</p>
		</a>`;
  }

  /**
   * adds the product in parameter at the end of the array, then refreshes the HTML input and saves the cart in localStorage
   * @param {String} 	itemId	id of the product we want to add
   * @param {Int} 		nbr		number of given product we want to add by default 1
   */
  add(itemId, nbr = 1) {
    for (let i = 0; i < nbr; i++) {
      this.content.push(itemId);
    }
    this.render();
    data.DataFetcher.saveCart(this.content);
  }

  /**
   * suppresses one iteration of the product which id was given in parameter, then refreshes the HTML input and saves the cart in localStorage
   * @param {String}	itemId	id of the product we want to substract
   */
  sub(itemId) {
    this.content.splice(this.content.indexOf(itemId), 1);
    this.render();
    data.DataFetcher.saveCart(this.content);
  }

  /**
   * suppresses all iteration of a product which id is given in parameter, then refreshes the HTML input and saves the cart in localStorage
   * @param {String}	itemId id of the product we want to suppress
   */
  delete(itemId) {
    const newContent = [];
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i] !== itemId) newContent.push(this.content[i]);
    }
    this.content = newContent;
    this.render();
    data.DataFetcher.saveCart(this.content);
  }

  /**
   * resets the content to an empty array, then refreshes the HTML input and saves the cart in localStorage
   */
  deleteAll() {
    this.content = [];
    this.render();
    data.DataFetcher.saveCart(this.content);
  }
}
