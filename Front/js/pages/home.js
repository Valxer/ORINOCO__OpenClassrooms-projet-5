class Home {
  constructor(domTarget) {
    this.showAllProducts(domTarget);
  }

  /**
   * takes all items from API and create cards inside the HTML target
   * @param {HTMLElement}	domTarget	target of HTML implementation
   */
  async showAllProducts(domTarget) {
    let content = "";
    try {
      const items = await data.DataFetcher.fetchItems();
      for (let i = 0, size = items.length; i < size; i++) {
        content += this.productHtml(items[i]);
      }
    } catch (err) {
      console.error(err);
    }
	console.log(content);
	console.log(domTarget);
    domTarget.innerHTML = content;
  }

  /**
   *generates HTML for the object given
   * @param	{Object}	item	les propriétés de l'objet
   *
   * @return {HTMLElement}		le html du produit
   */
  productHtml(item) {
    return /*html*/ `
		<article class="teddyCard">
			<a href="./produit.html?_id=${item._id}">
			  <figure>
				<img src="${item.imageUrl}" alt="${item.name}">
				<figcaption>
				  <h3 id="h3">${item.name}</h3>
				  <span class="displayColor">${this.showColor(item.colors)}</span>
				  <span class="price">${item.price / 100},00€</span>
				  <p>${item.description}</p>
				</figcaption>
			  </figure>
			</a>
		</article>
	  `;
  }

  /**
   * generate HTML for the choice of colors according to the color array given
   * @param   {Array}	colors	array of colors
   *
   * @return  {String}			HTML string
   */
  showColor(colors) {
    let html = "";
    for (let i = 0, size = colors.length; i < size; i++) {
      html += `<i class="fas fa-circle ${this.colorToClass(
        colors[i]
      )}" ></i>`;
    }
    return html;
  }

  /**
   * Récupère le nom de la couleur dans l'api et le transforme en nom de classe.
   * @param   {string}  color  correspond aux couleurs pour chaque nounours
   *
   * @return  {string}         nom de classe en camelCase qui finit par Color utilisé dans le CSS.
   */
  colorToClass(color) {
    let colors = color.toLowerCase().split(" ");
    let maj;

    for (let i = 1, size = colors.length; i < size; i++) {
      maj = colors[i].slice(0, 1).toUpperCase();
      colors[i] = maj + colors[i].slice(1);
    }
    return colors.join("") + "Color";
  }
}
