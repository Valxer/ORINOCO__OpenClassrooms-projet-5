class Order {
  content = {};
  constructor(domTarget) {
    this.domTarget = domTarget;
    this.setItemList(data.Cart.content);
    this.displayOrder();
  }

  /**
   * Changes the array from the cart to an array of itemId associated to an howMany property that gives the number of iteration of this item
   * @param	{Array} cart	list of all items in the cart
   */
  setItemList(cart) {
    this.content = {};

    for (let i = 0; i < cart.length; i++) {
      if (this.content[cart[i]] === undefined)
        this.content[cart[i]] = { howMany: 1 };
      else this.content[cart[i]].howMany++;
    }
  }

  /**
   * Displays the table summarizing the products the user wants to order
   */
  displayOrder() {
    let html = "";
    let i = 0;
    let properties;
    let total = 0;

    try {
      for (const [key, value] of Object.entries(this.content)) {
        i++;
        properties = await data.DataFetcher.getItem(key);
        html += this.itemHTML({
          ...value,
          ...properties,
          number: i,
        });
        total += (properties.price * value.howMany) / 100;
      }
      if (html === "") html = this.noItemHTML();
    } catch (e) {
      console.error(e);
      html.errorHTML();
    }
    this.domTarget[0].innerHTML = html;
    this.displayTotal(total);
  }

  /**
   *Returns the HTML string to implement if the user has item(s)in his cart
   * @param {Object} properties 			Item properties
   * @param {String} properties._id			Id of the item in the API
   * @param {String} properties.imageUrl	Image
   * @param {String} properties.name		Item name
   * @param {Number} properties.howMany		Desired quantity of item
   * @param {Number} properties.number		Number attributed to the item
   * @param {Number} properties.price		Price of a single item
   *
   * @returns {String}						HTML text to implement
   */
  itemHTML(properties) {
    return `
	<tr>
      <td>
        <img src="${properties.imageUrl}" alt="ours ${properties.number}">
      </td>
      <td>
        <h3>${properties.name}</h3>
      </td>
      <td>
        <div class="howMany">
          <div class="subBtn">
            <i class="fas fa-minus"></i>
          </div>
          <input type="text" class="field" value="${
            properties.howMany
          }" aria-label="Nombre d'ours voulus">
          <div class="addBtn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </td>
      <td>
        <p>total = ${(properties.howMany * properties.price) / 100},00€</p>
      </td>
      <td>
        <i class="fas fa-trash-alt trashIcon"></i>
      </td>
    </tr>
	`;
  }

  /**
   * Returns the HTML string to implement in case the user has no item in his cart
   */
  noItemHTML() {
    return `
	<p>Votre panier est vide.<br/>Ajoutez des articles pour continuer.</p>
  `;
  }

  /**
   * Returns the HTML string to implement in case an error occurred while loading the cart content
   */
  errorHTML() {
    return `
      <p>Une erreur est apparue. Rechargez la page et vérifiez la connexion au serveur</p>
    `;
  }

  displayTotal(total) {
    document.querySelector("tfoot.orderPrice").innerHTML = `
      <tr>
        <td class="totalCart" >
          <p>Total du panier = <span id="total">${total}</span>,00€</p>
        </td>
      </tr>
    `;
    //this.displayForm();
    //this.listen(total);
  }
}
