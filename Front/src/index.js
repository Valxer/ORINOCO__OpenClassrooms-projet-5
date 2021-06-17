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
  const url = window.location.pathname;

  if (url == "/Front/dist/item.html")
    return new Item(
      document.getElementsByClassName("itemCard"),
      id
    );
  else if (url == "/Front/dist/order.html")
    return new Order(document.getElementsByClassName("orderContent"));
  else if (url == "/Front/dist/validation.html")
    return new Validation(document.getElementsByClassName("validationContent"));
  else 
    return new Home(document.getElementsByClassName("cardContainer"));
}

data.Cart = new Cart(document.querySelector("nav"));
data.Page = scriptSelect();
