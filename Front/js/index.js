/**
 * defines what script to call depending on the page name
 *
 * @returns {Page} returns an object that differs depending on the page
 */
function scriptSelect() {
  let options = new URL(document.location).searchParams;
  var url = window.location.pathname;

  if (url == "/product.html")
    return new Product(
      document.getElementsByClassName("itemCard"),
      options.get("id")
    );
  else if (url == "/order.html")
    return new Order(document.getElementsByClassName("orderContent"));
  else if (url == "/validation.html")
    return new Validation(document.getElementsByClassName("validationContent"));
  else return new Home(document.getElementsByClassName("cardContainer"));
}

const data = {
  DataFetcher: new DataFetcher("http://localhost:3000/api/teddies/"),
};
data.cart = new Cart(document.querySelector("nav"));
data.page = scriptSelect();
