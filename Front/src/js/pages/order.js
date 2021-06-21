import data from "../../data";

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
    let total = 0;

    try {
      for (const [key, value] of Object.entries(this.content)) {
        i++;
        item = await data.DataFetcher.getItem(key);
        html += this.itemHTML({
          ...value,
          ...item,
          number: i,
        });
        total += (item.price * value.howMany) / 100;
      }
      if (html === "") html = this.noItemHTML();
    } catch (e) {
      console.error(e);
      html = errorHTML();
    }
    this.domTarget.innerHTML = html;
    this.listenQty(i);
    this.displayTotal(total);
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
    const html = `
    <div class="orderItem">
      <figure class="orderItem__image">
        <img src="${item.imageUrl}" alt="ours ${item.number}">
      </figure>
      <div class="orderItem__details">
        <h3>${item.name}</h3>
        <div class="howMany">
            <i class="${item._id} fas fa-minus" id="minus${item.number}"></i>
          <input type="number" disabled class="field" value="${
            item.howMany
          }" aria-label="Nombre d'ours voulus">
            <i class="${item._id} fas fa-plus" id="plus${item.number}"></i>
        </div>
        <p>${(item.howMany * item.price) / 100},00€</p>
        <i class="${item._id} fas fa-trash-alt trashIcon" id="trash${
      item.number
    }"></i>
      </div>
    </div>
	`;
    return html;
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

  listenQty(nbrItems) {
    for (let i = 1; i <= nbrItems; i++) {
      document
        .getElementById(`plus${i}`)
        .addEventListener("click", function (e) {
          const itemId = document.getElementById(`plus${i}`).classList[0];
          data.Cart.add(itemId);
          data.Page.content[itemId].howMany++;
          data.Page.displayOrder();
        });
      document
        .getElementById(`minus${i}`)
        .addEventListener("click", function (e) {
          const itemId = document.getElementById(`minus${i}`).classList[0];
          data.Cart.sub(itemId);
          if (data.Page.content[itemId].howMany == 1) {
            if (confirm("Voulez vous vraiment abandonner cet ourson ?")) {
              data.Cart.delete(itemId);
              delete data.Page.content[itemId];
              data.Page.displayOrder();
            }
          } else {
            data.Page.content[itemId].howMany--;
            data.Page.displayOrder();
          }
        });
      document
        .getElementById(`trash${i}`)
        .addEventListener("click", function (e) {
          const itemId = document.getElementById(`trash${i}`).classList[0];
          if (confirm("Voulez vous vraiment abandonner cet ourson ?")) {
            data.Cart.delete(itemId);
            delete data.Page.content[itemId];
            data.Page.displayOrder();
          }
        });
    }
  }

  /**
   * Displays the total price if the user has something in his cart
   * @param {Number} total  Total price of the cart the user desires
   */
  displayTotal(total) {
    if (total)
      document.querySelector("div.orderPrice").innerHTML = `
        <div class="totalCart" >
          <h2>Total du panier</h2>
          <p><span id="total">${total}</span>,00€</p>
        </div>
    `;
    else document.querySelector("div.orderPrice").innerHTML = ``;
    this.displayForm(total);
  }

  /**
   * If the user has ordered something, displays the form for the completion of the order
   * @param {Number} total  the total price of the cart
   */
  displayForm(total) {
    if (total) {
      document.getElementById("orderFormContainer").innerHTML = /*html*/ `
      <h2 class="formTitle">Formulaire de finalisation</h2>
			<form method="POST" class="orderForm" id="orderForm">
				<div class="fields">
          <label for="firstName">Prénom *</label>
          <input type="text" name="firstName" id="firstName" placeholder="Prénom" pattern="^[A-Za-z][A-Za-zÀ-ÿ]*([ '-]?[A-Za-zÀ-ÿ]+)*$" required>
        </div>
        <div class="warning" id="firstNameWarning"></div>
        <div class="fields">
          <label for="lastName">Nom *</label>
          <input type="text" name="lastName" id="lastName" placeholder="Nom" pattern="^[A-Za-z][A-Za-zÀ-ÿ]*([ '-]?[A-Za-zÀ-ÿ]+)*$" required>
        </div>
        <div class="warning" id="lastNameWarning"></div>
        <div class="fields">
          <label for="address">Adresse *</label>
          <input type="text" name="address" id="address" placeholder="Adresse" pattern="[a-zA-Z0-9À-ÿ '-]{2,}" required>
        </div>
        <div class="warning" id="addressWarning"></div>
        <div class="fields">
          <label for="city">Ville *</label>
          <input type="text" name="city" id="city" placeholder="Ville" pattern="^[A-Za-z][A-Za-zÀ-ÿ]*([ '-]?[A-Za-zÀ-ÿ]+)*$" required>
        </div>
        <div class="warning" id="cityWarning"></div>
        <div class="fields">
          <label for="email">Email *</label>
          <input type="email" name="email" id="email"  placeholder="E-mail" pattern="[a-zA-Z0-9À-ÿ!#$%&'*+/=?^_\`{|}~-]+(\.[a-zA-Z0-9À-ÿ!#$%&'*+/=?^_\`{|}~-]+)*@([a-zA-ZÀ-ÿ0-9]+\.)+[a-zA-ZÀ-ÿ0-9]{2,}" required>
        </div>
        <div class="warning" id="emailWarning"></div>
        <p class="notice">Les champs marqués d'un * sont obligatoires afin de pouvoir valider votre commande</p>
        <button id="send" type="submit">Finaliser la commande</button>
      </form>
    `;
      document.getElementById("orderFinal").classList.add("enabled");
      document.getElementById("orderGlobal").classList.add("enabled");
      this.previousUser();
      this.listen(total);
    } else {
      document.getElementById("orderFinal").classList.remove("enabled");
      document.getElementById("orderGlobal").classList.remove("enabled");
      document.getElementById("orderFormContainer").innerHTML = ``;
    }
  }

  /**
   * Checks if a user is already registered and if it's the case adds the user informations in the form
   */
  previousUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("address").value = user.address;
      document.getElementById("city").value = user.city;
      document.getElementById("email").value = user.email;
    }
  }

  /**
   * Watches the clicks on the submit button, then send the total priuce to the localstorage and valids the order
   * @param {Number} price the total price of the cart
   */
  listen(price) {
    this.checkFormField();
    document.getElementById("send").addEventListener("click", function (e) {
      let i = data.Page;
      e.preventDefault();
      if (data.Page.checkFormField()){
        localStorage.setItem("price", price);
        i.validOrder();
      }
      else {
        alert("Le formulaire n'est pas rempli correctement : merci de le vérifier.");
        data.Page.listen(price);
      }
    });
  }

  /**
   * Checks the validity of the field given in parameter and if it's invalid sends a warning message
   */
  checkFormField() {
    let fName = document.getElementById("firstName");
    let lName = document.getElementById("lastName");
    let where = document.getElementById("address");
    let town = document.getElementById("city");
    let mail = document.getElementById("email");

    fName.oninput = function () {
      if (this.validity.valid)
        document.getElementById(this.id + "Warning").innerHTML = "";
      else
        document.getElementById(this.id + "Warning").innerHTML =
          "Ceci n'est pas un prénom valide";
    };
    lName.oninput = function () {
      if (this.validity.valid)
        document.getElementById(this.id + "Warning").innerHTML = "";
      else
        document.getElementById(this.id + "Warning").innerHTML =
          "Ceci n'est pas un nom valide";
    };
    where.oninput = function () {
      if (this.validity.valid)
        document.getElementById(this.id + "Warning").innerHTML = "";
      else
        document.getElementById(this.id + "Warning").innerHTML =
          "Ceci n'est pas une addresse valide";
    };
    town.oninput = function () {
      if (this.validity.valid)
        document.getElementById(this.id + "Warning").innerHTML = "";
      else
        document.getElementById(this.id + "Warning").innerHTML =
          "Ceci n'est pas un nom de ville valide";
    };
    mail.oninput = function () {
      if (this.validity.valid)
        document.getElementById(this.id + "Warning").innerHTML = "";
      else
        document.getElementById(this.id + "Warning").innerHTML =
          "L'email n'est pas au bon format";
    };
    if (
      fName.validity.valid &&
      lName.validity.valid &&
      where.validity.valid &&
      town.validity.valid &&
      mail.validity.valid
    )
      return true;
    else return false;
  }

  /**
   * Regroups all infos concerning the order and sends them under a string format to be used for a fetch request
   */
  validOrder() {
    let contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    let products = data.Cart.content;
    let datas = JSON.stringify({
      contact,
      products,
    });
    data.DataFetcher.postOrder(datas);
  }

  /**
   * Substract one given item from the cart and displays the new cart.
   * If it was the last iteration of the given item calls trashItem instead.
   * @param {String} itemId   Id of the selected item
   */
  subOne(itemId) {
    data.Cart.sub(itemId);
    if (this.content[itemId].howMany == 1) this.trashItem(itemId);
    else {
      this.content[itemId].howMany--;
      this.displayOrder();
    }
  }

  /**
   * Adds one given item to the cart and displays the new cart.
   * @param {String} itemId   Id of the selected item
   */
  addOne(itemId) {
    data.Cart.add(itemId);
    this.content[itemId].howMany++;
    this.displayOrder();
  }

  /**
   * Removes all iterations of the given item from the cart after asking the user if he wants to confirm the supression.
   * @param {String} itemId   Id of the selected item
   */
  trashItem(itemId) {
    if (confirm("Voulez vous vraiment abandonner cet ourson ?")) {
      data.Cart.delete(itemId);
      delete this.content[itemId];
      this.displayOrder();
    }
  }
}

export default Order;
