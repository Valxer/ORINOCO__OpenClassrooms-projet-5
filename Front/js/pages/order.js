class Order {
  content = {};
  constructor(domTarget) {
    this.domTarget = domTarget[0];
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
  async displayOrder() {
    let html = "";
    let i = 0;
    let item;
    let item2;
    let total = 0;
    let anything = true;

    try {
      for (const [key, value] of Object.entries(this.content)) {
        i++;
        item = await data.DataFetcher.getItem(key);
        console.log({ ...value, ...item, number: i });
        html += this.itemHTML({
          ...value,
          ...item,
          number: i,
        });
        total += (item.price * value.howMany) / 100;
      }
      if (html === "") {
        html = this.noItemHTML();
        anything = false;
      }
    } catch (e) {
      console.error(e);
      html = errorHTML();
      anything = false;
    }
    this.domTarget.innerHTML = html;
    if (anything) this.displayTotal(total);
  }

  /**
   *Returns the HTML string to implement if the user has item(s)in his cart
   * @param {Object} item 			Item properties
   * @param {String} item._id			Id of the item in the API
   * @param {String} item.imageUrl	Image
   * @param {String} item.name		Item name
   * @param {Number} item.howMany		Desired quantity of item
   * @param {Number} item.number		Number attributed to the item
   * @param {Number} item.price		Price of a single item
   *
   * @returns {String}						HTML text to implement
   */
  itemHTML(item) {
    return `
	<tr>
      <td>
        <img src="${item.imageUrl}" alt="ours ${item.number}">
      </td>
      <td>
        <h3>${item.name}</h3>
      </td>
      <td>
        <div class="howMany">
          <div class="subBtn">
            <i class="fas fa-minus"></i>
          </div>
          <input type="text" class="field" value="${
            item.howMany
          }" aria-label="Nombre d'ours voulus">
          <div class="addBtn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </td>
      <td>
        <p>total = ${(item.howMany * item.price) / 100},00€</p>
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

  /**
   * Displays the total price if the user has something in his cart
   * @param {Number} total  Total price of the cart the user desires
   */
  displayTotal(total) {
    document.querySelector("tfoot.orderPrice").innerHTML = `
      <tr>
        <td class="totalCart" >
          <p>Total du panier = <span id="total">${total}</span>,00€</p>
        </td>
      </tr>
    `;
    this.displayForm();
    this.listen(total);
  }

  /**
   * displays the form if the user has ordered something
   */
  displayForm() {
    document.getElementById("orderForm").innerHTML = /*html*/ `
      <label for="firstName">Prénom<span>*</span></label>
      <input type="text" name="firstName" id="firstName" placeholder="Prénom" pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$" required oninput="orinoco.page.checkField(this,'Ne doit contenir que des lettres (au moins 2)')">
      <label for="lastName">Nom de famille<span>*</span></label>
      <input type="text" name="lastName" id="lastName" placeholder="Nom"   pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$" required oninput="orinoco.page.checkField(this,'Ne doit contenir que des lettres (au moins 2)')">
      <label for="address">Adresse<span>*</span></label>
      <input type="text" name="address" id="address" placeholder="Adresse" pattern="[a-zA-Z0-9À-ÿ '-]{2,}" required oninput="orinoco.page.checkField(this,'Ne doit contenir que des lettres et des chiffres (au moins 2)')">
      <label for="city">Ville<span>*</span></label>
      <input type="text" name="city" id="city" placeholder="Ville"   pattern="^[a-zA-Z]{1}[a-zA-Z'À-ÿ -]+$" required oninput="orinoco.page.checkField(this,'Ne doit contenir que des lettres (au moins 2)')">
      <label for="email">Adresse de messagerie<span>*</span></label>
      <input type="email" name="email" id="email"  placeholder="E-mail" pattern="^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required oninput="orinoco.page.checkField(this,'Doit respecter le format email')">
      <button class="formBtn" type="submit">Finaliser la commande</button>
      <p class="notice">Les champs marqués d'un <span>*</span> sont obligatoires afin de pouvoir valider votre commande</p>
    `;
    this.previousUser();
  }

  /**
   * Checks if a user is already registered and if it's the case adds the user informations in the form
   */
  previousUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    if(user != null){
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("address").value = user.address;
      document.getElementById("city").value = user.city;
      document.getElementById("email").value = user.email;
    }
  }

  /**
   * Generates all the eventListeners on the page and if the form is sent registers the total price in localStorage
   * @param {Number} price the total price of the cart
   */
  listen(price) {
    let sub = document.getElementsByClassName("subBtn");
    let add = document.getElementsByClassName("addBtn");
    let trash = document.getElementsByClassName("trashIcon");

    for (let i = 0; i < sub.length; i++) {
      console.log(sub[i]);
      sub[i].addEventListener("click", this.subOne);      //onclick="data.Page.subOne('${item._id}')"
      add[i].addEventListener("click", this.addOne);      //onclick="data.Page.addOne('${item._id}')"
      trash[i].addEventListener("click", this.trashItem); //onclick="data.Page.trashItem('${item._id}')"
    }

    price = price;
    //listenForm(price);
  }

  subOne() {
    alert("yes");
  }

  addOne() {
    alert("no");
  }

  trashItem() {
    alert("maybe");
  }
}
