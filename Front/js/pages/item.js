class Item {
  constructor(domTarget, itemId) {
    this.displayItem(domTarget, itemId);
  }

  /**
   * Takes the given item from API and create describing card inside the HTML target
   * and calls the method watching the number of items desired
   * @param   {HTMLCollection}  domTarget  target of HTML implementation
   * @param   {string}  itemId  Id of selected item
   */
  async displayItem(domTarget, itemId) {
    this.itemId = itemId;
    const item = await data.DataFetcher.getItem(this.itemId);
    domTarget[0].innerHTML = this.getHtml(item);
    this.setCartOrder(this.itemId);
  }

  /**
   * Generates HTML for the item given
   * @param {Object} item	Item properties
   *
   * @returns {String}	Html text to implement
   */
  getHtml(item) {
    return `
    <article class="singleTeddyCard">
      <figure>
        <img src="${item.imageUrl}" alt="Ours ${item.name}">
      </figure>
      <section>
        <div class="itemName">
          <h2>${item.name}</h2>
          <span class="price">${item.price / 100},00€</span>
        </div>
        <p class="itemDescription">${item.description}</p>
        <label for="colors">Choisir sa couleur : </label>
        <select name="colors" id="colors">
            ${this.displayChoice(item.colors)}
        </select>
        <div class="itemNumber">
        <p>Choisir le Nombre : </p>
          <div class="subBtn"id="subBtn">
            <i class="fas fa-minus"></i>
          </div>
          <input type="number" disabled class="field" id="field" value="1" aria-label="Nombre d'oursons désirés">
          <div class="addBtn" id="addBtn">
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div class="displayColor">
          ${this.displayColors(item.colors)}
        </div>  
        <input class="orderBtn" id="orderBtn" type="button" value="Ajouter au panier">
      </section>
    </article>
    `;
  }

  /**
   * Generate HTML for the choice of colors according to the color array given
   * @param   {Array} colors	Array of colors
   *
   * @return  {String}			HTML string
   */
  displayColors(colors) {
    let html = "";
    for (let i = 0; i < colors.length; i++) {
      html += `<i class="fas fa-circle ${this.colorToClass(colors[i])}" ></i>`;
    }
    return html;
  }

  /**
   * Transforms the color name into a class name for HTML implementation
   * @param   {string}  color  color name
   *
   * @return  {string}         class name composed by the colorname + Color
   */
  colorToClass(color) {
    let colors = color.toLowerCase().split(" ");
    let maj;

    for (let i = 1; i < colors.length; i++) {
      maj = colors[i].slice(0, 1).toUpperCase();
      colors[i] = maj + colors[i].slice(1);
    }
    return colors.join("") + "Color";
  }

  /**
   * Generates the dropdown list of color options
   * @param	{Array} colors	Array of colors
   *
   * @returns	{String}	HTML text to implement
   */
  displayChoice(colors) {
    let html = "";
    for (let i = 0; i < colors.length; i++) {
      html += ` <option>${this.getColorName(colors[i])}</option>`;
    }
    return html;
  }

  /**
   * Formats color name to fit dropdown list name display
   * @param	{String} color	Color name
   *
   * @returns	{String}	Formated color name
   */
  getColorName(color) {
    let name = color.toLowerCase().split(" ");
    let letter;
    for (let i = 0; i < name.length; i++) {
      letter = name[i].slice(0, 1).toUpperCase();
      name[i] = letter + name[i].slice(1);
    }
    return name.join(" ");
  }

  /**
   * Watches the changes in the number of desired items using EventListener
   * @param {String} itemId	Id of the item
   */
  setCartOrder(itemId) {
    let sub = document.getElementById("subBtn");
    let add = document.getElementById("addBtn");
    let order = document.getElementById("orderBtn");

    sub.addEventListener("click", this.subOne);
    add.addEventListener("click", this.addOne);
    order.addEventListener("click", this.orderItems);
  }

  /**
   * Takes the number in the "field" section and substracts one if the number is greater than one
   */
  subOne() {
    let baseNumber = document.getElementById("field").value;
    let intNumber = parseInt(baseNumber, 10);
    if (baseNumber > 1) {
      let result = (intNumber -= 1);
      document.getElementById("field").value = result;
    }
  }

  /**
   * Takes the number in the "field" section and adds one
   */
  addOne() {
    let baseNumber = document.getElementById("field").value;
    let intNumber = parseInt(baseNumber, 10);
    let result = (intNumber += 1);
    document.getElementById("field").value = result;
  }

  /**
   * Gets the Id of the item, the number of them and adds them to the cart, then displays an alert summarizing the addition
   */
  orderItems() {
    const itemId = extractId(document.location.search);
    let baseNumber = document.getElementById("field").value;
    let intNumber = parseInt(baseNumber, 10);
    data.Cart.add(itemId, intNumber);
    alert("Vous avez bien ajouté " + baseNumber + " ours à votre panier.");
  }
}
