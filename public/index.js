import {
    SHOW_CARDS_CLICK
} from '../script/constants'
const cards = document.querySelector('.product-list__inner');
const modal = document.querySelector('.modal-inner');
let showCards = SHOW_CARDS_CLICK;
let productData = [];

getProducts();

async function getProducts() {
    try {
        if (!productData.length) {
            const response = await fetch('https://66411982a7500fcf1a9f928c.mockapi.io/products/articles');
            if (!response.ok) {
              throw new Error(response.statusText);  
            }
            const result = await response.json();
            productData = result;
        }
        renderStartPage(productData);
        
    } catch (err) {
        console.log('error:', err);
        alert('Не удалось загрузить товары. Пожалуйста, попробуйте снова позже.');
    }
}


function renderStartPage(data) {
    const arrCards = data.slice(0, SHOW_CARDS_CLICK);
    createCards(arrCards);
}

function getRandomInt(discount) {
    return Math.floor(Math.random() * discount);
}

function createCards(data) {
    data.forEach(card =>{
    const {id, sku, productName, originPrice, productImage} = card;
    let discount = getRandomInt(100);
    const salePrice = (originPrice - ((originPrice * discount) / 100)).toFixed(2);
    const cardElement = 
    `
    <div class="product-item" data-product-id="${id}">
                <div class="item_image"><a href="#" class="item_image"><img src="${productImage}"  alt="${productName}"></a></div>
                <div class="item-meta">
                    <div class="item_discount">-${discount}%</div>
                    <div class="item_price">
                        <span class="item_sale-pice">€${salePrice}</span>
                        <span class="item_origin-pice">€${originPrice}</span>
                    </div>
                    <h3 class="item_title">${productName}</h3>
                    <div class="item-reference">
                        <label class="label">Ref:</label>
                        <span class="sku">${sku}</span>
                      </div>
                </div>
            </div>
`
cards.insertAdjacentHTML('beforeend', cardElement);
const createdCard = cards.lastElementChild;
createdCard.addEventListener("click", () => openModal(id, productImage, productName, originPrice, discount, salePrice));
    });

}

//modal

function openModal(id, productImage, productName, originPrice, discount, salePrice) {
    modal.classList.add('modal-inner--show');
modal.innerHTML =`
<div class="modal-item" data-product-id="${id}">
    <div class="modal-image"><img src="${productImage}" alt="${productImage}"></div>
    <div class="modal-meta">
        <h3 class="modal_title">${productName}</h3>
        <div class="modal_price">
        <span class="modal_origin-pice">€${originPrice}</span>
        <span class="modal-discount">-${discount}%</span>
    </div>
    <span class="modal_sale-price">€${salePrice}</span>
    <div class="modal-buttons">
        <button class="modal-addcart-button">ADD TO CART</button>
        <button class="modal-close-button">CLOSE</button>
    </div>
</div>
`;

const btnClose = document.querySelector('.modal-close-button');
btnClose.addEventListener('click', () => closeModal());

}

function closeModal() {
    modal.classList.remove('modal-inner--show');
}

window.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target === modal) {
        closeModal();
    }
});

// const body = document.body;
// function stopScroll() {
//     body.classList.add('body-stopscroll');
// }


//Search

const searchInput = document.querySelector('.header__search--input');

searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        const text = product.querySelector('.item_title').textContent.toLowerCase();
        if (text.includes(filter)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});

