const listOfProduts = document.querySelector('.items');
const selectedtoCart = document.querySelector('.cart__items');
const selectedToCartSingle = document.querySelectorAll('.cart__items');
const totalCalc = document.querySelector('.total-price');
const clearAllCart = document.querySelector('.empty-cart');
const loader = document.querySelector('.loader');

// somando precos (REQ 5)
let totalPrice = 0;
const savePrices = (price) => localStorage.setItem('priceItems', price);
const getsavedPrices = () => localStorage.getItem('priceItems');

const updatePrice = () => {
  totalPrice = Number(getsavedPrices());
  totalCalc.innerText = Number(getsavedPrices());
  console.log(getsavedPrices());
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const subItems = (event) => {
  const priceGrab = Number(event.target.innerText.split('$')[1]);
  console.log(priceGrab);
  totalPrice -= priceGrab;
  totalCalc.innerText = totalPrice;
  savePrices(totalPrice);
};

selectedToCartSingle.forEach((li) => {
  li.addEventListener('click', subItems);
});

// remover (REQ 3)
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(selectedtoCart.innerHTML);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `Produto: ${name} | 
  R$ ${Math.round(salePrice)}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const sumPrice = () => {
  totalCalc.innerText = totalPrice;
  savePrices(totalCalc.innerText);
};

// // carrinho de compras (REQ 2)
  const addItemCart = async (add) => {
    const sku = getSkuFromProductItem(add.target.parentNode);
    const results = await fetchItem(sku);
    const cartItems = createCartItemElement(results);
    selectedtoCart.appendChild(cartItems);
    const eventTarget = cartItems.innerText;
    const priceGrab = Number(eventTarget.split('$')[1]);
    totalPrice += priceGrab;
    sumPrice();
    saveCartItems(selectedtoCart.innerHTML);
    // soma os itens (REQ 5)
  };

// limpar carrinho de compras (REQ 6)
const clearCart = () => {
  selectedtoCart.innerHTML = null;
  saveCartItems(selectedtoCart.innerHTML);
  totalPrice = 0;
  totalCalc.innerHTML = '0';
  savePrices(0);
};

clearAllCart.addEventListener('click', clearCart);

const storageLoad = () => {
  selectedtoCart.innerHTML = getSavedCartItems();
  selectedToCartSingle.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

function createProductItemElement({ id: sku, title: name, thumbnail: image, price: salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', Math.round(salePrice)));
  section.appendChild(createProductImageElement(image));
  const btnAddCart = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAddCart.addEventListener('click', addItemCart);
  section.appendChild(btnAddCart);

  return section;
}

// carregamento (REQ 7)
const loading = () => {
  const loadingAPI = document.createElement('p');
  loadingAPI.className = 'loading';
  loadingAPI.innerText = 'carregando...';
  loader.appendChild(loadingAPI);
};

const killer = () => loader.remove();

// // lista de produtos (REQ 1) e carregamento (REQ 7)
const productList = async () => {
  loading();
 const { results } = await fetchProducts('computador');
 results.forEach((product) => {
   const createItem = createProductItemElement(product);
   listOfProduts.appendChild(createItem);
 });
 killer();
};

window.onload = () => {
  productList();
  storageLoad();
  updatePrice();
};
