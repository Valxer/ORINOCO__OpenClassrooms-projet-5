/**
 * defines what script to call depending on the page name
 *
 * @returns {Page} returns an object that differs depending on the page
 */
function scriptSelect() {
  const id = extractId(document.location.search);
  const url = window.location.pathname;

  if (url == "/Front/html/item.html")
    return new Item(
      document.getElementsByClassName("itemCard"),
      id
    );
  else if (url == "/Front/html/order.html")
    return new Order(document.getElementsByClassName("orderContent"));
  else if (url == "/Front/html/validation.html")
    return new Validation(document.getElementsByClassName("validationContent"));
  else 
    return new Home(document.getElementsByClassName("cardContainer"));
}

/**
 * extract the value id from the string given
 * @param {String} strToParse the string to parse
 * 
 * @return  {String}          the parsed string   
 */
function extractId(strToParse) {
  let result;
  let isItId = false;
  for (let i = 0; i < strToParse.length; i++) {
    if (isItId){
      result = strToParse.slice(i);
      i = strToParse.length;
    }
    else if (strToParse[i] == "=")
      isItId = true;
      
  }
  return result;
}

const data = {
  DataFetcher: new DataFetcher("http://localhost:3000/api/teddies/")
};
data.Cart = new Cart(document.querySelector("nav"));
data.Page = scriptSelect();
