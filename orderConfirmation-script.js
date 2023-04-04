
renderOrderItems();
renderRecipient();


function renderRecipient(){
document.getElementById('name').innerHTML = sessionStorage.getItem('name');
document.getElementById('address').innerHTML = sessionStorage.getItem('address');
document.getElementById('postalCode').innerHTML = sessionStorage.getItem('postalCode');
document.getElementById('city').innerHTML = sessionStorage.getItem('city');
document.getElementById('phoneNumber').innerHTML = sessionStorage.getItem('phoneNumber');
document.getElementById('email').innerHTML = sessionStorage.getItem('email');

}


 //funktion för att visa shoppingcart 
function renderOrderItems(){
let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
let orderTotal = 0;

shoppingCart.forEach(e => {
orderTotal += e.price;
});

orderTotal = orderTotal.toFixed(2);
document.getElementById('orderTotal').innerHTML = `€${orderTotal}`;


const orderItems = document.querySelector('.conf_orderItems');


if(shoppingCart.length){
const uniqueItems = [...new Map(shoppingCart.map((item)=>[(item).title,(item)])).values()];

uniqueItems.forEach((item)=>{
let itemCount = shoppingCart.filter(e=>e.title==(item).title).length;

let cartItem = document.createElement('div');
cartItem.className = 'cartItem';
cartItem.id = `cartItemId_${item.id}`;
orderItems.appendChild(cartItem);

let box_left = document.createElement('div');
box_left.className = 'box_left';
cartItem.appendChild(box_left);

let cartImage = document.createElement('img');
cartImage.className = 'cartImage';
cartImage.src = `${(item).image}`;
box_left.append(cartImage);

let box_title = document.createElement('div');
box_title.className = 'box_title';
cartItem.appendChild(box_title);

let iTitle = document.createElement('div');
iTitle.className = 'iTitle';
iTitle.innerHTML = `${(item).title}`;
box_title.appendChild(iTitle);

let box_price = document.createElement('div');
box_price.className = 'box_price d-flex flex-row';
cartItem.appendChild(box_price);

let iQty = document.createElement('p');
iQty.className = 'iQty';
iQty.innerHTML = 'Qty:'
box_price.appendChild(iQty);

let iCount = document.createElement('div');
iCount.className = 'icount';
iCount.setAttribute('id',`iCountId_${(item).id}`)
iCount.innerHTML = `${itemCount}`;
box_price.appendChild(iCount);

let iPrice = document.createElement('div');
iPrice.className = 'iPrice';
iPrice.innerHTML = `€${(item).price.toFixed(2)}`;
box_price.appendChild(iPrice);

let iPriceTot = document.createElement('div');
iPriceTot.className = 'iPriceTot flex-fill';
iPriceTot.innerHTML = `€${((item).price * itemCount).toFixed(2)}`;
box_price.appendChild(iPriceTot);

});
}
}
