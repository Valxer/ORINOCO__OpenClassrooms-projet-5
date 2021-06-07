class Home {
  constructor(domTarget) {
    this.displayAllProducts(domTarget);
  }

  /**
   * Takes all items from API and create cards inside the HTML target
   * @param {HTMLCollection}	domTarget	target of HTML implementation
   */
  async displayAllProducts(domTarget) {
    let content = "";
    try {
      const items = await data.DataFetcher.fetchItems();
      for (let i = 0; i < items.length; i++) {
        content += this.getHtml(items[i], (i + 1));
      }
    } catch (err) {
      console.error(err);
    }
    domTarget[0].innerHTML = content;
  }

  /**
   *Generates HTML for the object given
   * @param	{Object}	item	item properties
   * @param {Number}  nbr   the number of the card
   *
   * @return {String}		Html text to implement
   */
  getHtml(item, nbr) {
    return `
		<article class="teddyCard card${nbr}">
			<a href="./item.html?_id=${item._id}">
			  <figure>
				  <img src="${item.imageUrl}" alt="${item.name}">
				  <figcaption>
            <span class= "cardNumber">0${nbr}</span>
				    <h3 id="h3">${item.name}</h3>
            <span class="colors">${this.displayColor(item.colors)}</span>
            <span class="price">${item.price / 100},00€</span>
				    <p>${item.description}</p>
				  </figcaption>
			  </figure>
        <div class="hoverCard">
          <p>Adopte le</p>
        </div>
			</a>
		</article>
	  `;
  }

  /**
   * Generate HTML for the choice of colors according to the color array given
   * @param   {Array}	colors	array of colors
   *
   * @return  {String}			HTML string
   */
  displayColor(colors) {
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
}
