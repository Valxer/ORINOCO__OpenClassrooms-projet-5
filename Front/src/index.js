import DataFetcher from './js/dataFetcher';
import data from './data';
import Cart from './js/cart';
import Home from './js/pages/home';
import Item from './js/pages/item';
import Order from './js/pages/order';
import Validation from './js/pages/validation';
import { extractId } from './data';
import './styles/main.scss';

/**
 * defines what script to call depending on the page name
 *
 * @returns {Page} returns an object that differs depending on the page
 */
function scriptSelect() {
  const id = extractId(document.location.search);
  const url = parseUrl(window.location.pathname);

  if (url == "item.html")
    return new Item(
      document.getElementsByClassName("itemCard"),
      id
    );
  else if (url == "order.html")
    return new Order(document.getElementsByClassName("orderContent"));
  else if (url == "validation.html")
    return new Validation(document.getElementsByClassName("validationContent"));
  else 
    return new Home(document.getElementsByClassName("cardContainer"));
}

function parseUrl(url) {
  for (let i = 0; i < url.length; i++) {
    if ((url[i] == 'd') && (url[i + 1] == 'i') && (url[i + 2] == 's') && (url[i + 3] == 't') && (url[i + 4] == '/')) {
      i += 5;
      return (url.slice(i));
    }
  }
  return (-1);
}

data.Cart = new Cart(document.querySelector("nav"));
data.Page = scriptSelect();
