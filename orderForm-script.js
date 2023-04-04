
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', (event)=>{
  validate_Submit(event);
});

//variables for error-divs
let nameError = document.getElementById('name-error');
let phoneError = document.getElementById('phone-error');
let emailError = document.getElementById('email-error');
let addressError = document.getElementById('address-error');
let postalCodeError = document.getElementById('postalcode-error');
let cityError = document.getElementById('city-error');
let submitError = document.getElementById('submit-error');

//Valid input as Regex
const validRegexMail = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/; 
const validRegexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g; 
const validRegexStreet = /^[A-Za-z0-9-åäöÅÄÖ _]*[A-Za-z0-9[A-Za-z0-9 _]*$/;
const validRegexCity = /^[a-zA-Z\s-åäöÅÄÖ]*$/;
const validRegexPostal =/^[0-9]{3}\s{1}[0-9]{2}$/;
const validRegexName = /^[a-zA-Z-åäöÅÄÖ. ]+\s{1}[a-zA-Z-åäöÅÄÖ. ]+$/; 

let name, phoneNumber, email, address, postalCode, city;

function validateName(){
name = document.getElementById('name').value;
if(name.length < 2 || name.length > 50){
  nameError.innerHTML = 'Name is not valid';
  return false;
}
if(!name.match(validRegexName)){
  nameError.innerHTML = 'Full name is required';
  return false;
}
nameError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}

function validatePhone(){
phoneNumber = document.getElementById('phoneNumber').value;
if(phoneNumber.length < 6 || phoneNumber.length > 50){
  phoneError.innerHTML = 'Phonenumber is not valid';
  return false;
}
if(!phoneNumber.match(validRegexPhone)){
  phoneError.innerHTML = 'Phonenumber is not valid';
  return false;
}
phoneError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}

function validateEmail(){
email = document.getElementById('email').value;
if(email.length < 6 || email.length > 50){
  emailError.innerHTML = 'Email is not valid';
  return false;
}
if(!email.match(validRegexMail)){
  emailError.innerHTML = 'Email is not valid';
  return false;
}
emailError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}

function validateAddress(){
address = document.getElementById('address').value;
if(address.length < 4 || address.length > 50){
  addressError.innerHTML = 'Address is not valid';
  return false;
}
if(!address.match(validRegexStreet)){
  addressError.innerHTML = 'Address is not valid';
  return false;
}
addressError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}


function validatePostalcode(){
postalCode = document.getElementById('postalCode').value;
if(!postalCode.match(validRegexPostal)){
  postalCodeError.innerHTML = 'Postal Code is not valid';
  return false;
}
postalCodeError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}

function validateCity(){
city = document.getElementById('city').value;
if(city.length < 2 || city.length > 50){
  cityError.innerHTML = 'city is not valid';
  return false;
}
if(!city.match(validRegexCity)){
  cityError.innerHTML = 'city is not valid';
  return false;
}
cityError.innerHTML = '<p class="validMessage">Valid</p>';
return true;
}

function validate_Submit(e){
e.preventDefault();
if(!validateName() || !validatePhone() || !validateEmail || !validateAddress() || !validatePostalcode() || !validateCity()){
submitError.style.display = 'block';
submitError.innerHTML = 'There are errors in one or more fields. Resolve before submit';
setTimeout(function(){submitError.style.display = 'none';}, 3000);
}
else{
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('phoneNumber', phoneNumber);
      sessionStorage.setItem('address', address);
      sessionStorage.setItem('postalCode', postalCode);
      sessionStorage.setItem('city', city);
     orderConfirm()  ;
}
}


function orderConfirm(){
window.location.href = "orderConfirmation.html";
};

function getShoppingCart(){
return JSON.parse(localStorage.getItem("shoppingCart")) || [];
}


//funktion för att visa shoppingcart 
function retrieveCart(){

const cartDiv = document.getElementById('cart');


let shoppingCart = getShoppingCart();
if(shoppingCart.length){
  //skapa unika items
  const uniqueItems = [...new Map(shoppingCart.map((item)=>[(item).title,(item)])).values()];
  console.log(uniqueItems);

  //sortera baserat på id för att cartItems ej ska ändra ordning vid +/-tryck
  uniqueItems.sort((a,b) => (a.id > b.id) ? 1: ((b.id>a.id) ? -1 : 0));

  //För varje unik item, skapa upp en cartitem =>

  uniqueItems.forEach((item)=>{


  let cartItem = document.createElement('div');
  cartItem.className = 'cartItem';
  cartItem.id = `cartItemId_${item.id}`;
  cartDiv.appendChild(cartItem);

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

  let removeItemBox = document.createElement('div');
  removeItemBox.className = 'removeItemBox flex-fill';
  box_title.appendChild(removeItemBox);

  let removeItemBtn = document.createElement('button');
  removeItemBtn.className = 'removeItemBtn btn'
  removeItemBtn.id = `removeItemId_${item.id}`;
  removeItemBtn.innerHTML = 'x';
  removeItemBtn.addEventListener('click', (event)=>{
    removeItemFromCart((item));
  });
  removeItemBox.appendChild(removeItemBtn);

  let box_price = document.createElement('div');
  box_price.className = 'box_price d-flex flex-row';
  cartItem.appendChild(box_price);

  let iQty = document.createElement('p');
  iQty.className = 'iQty';
  iQty.innerHTML = 'Qty:'
  box_price.appendChild(iQty);

  let btnBox = document.createElement('div');
  btnBox.className = "btnBox border-2 border-secondary border rounded-pill";
  box_price.appendChild(btnBox);
 
  let addBtn = document.createElement('button');
  addBtn.className = 'addBtn btn';
  addBtn.id = `addId_${item.id}`;
  addBtn.innerHTML = '+';
  addBtn.addEventListener('click', (event)=>{
       addToCartAtCheckout((item));
  });
  btnBox.appendChild(addBtn);

  let iCount = document.createElement('div');
  iCount.className = 'icount';
  iCount.setAttribute('id',`iCountId_${(item).id}`)
  //innerHTML uppdateras med separat funktion nedan
  btnBox.appendChild(iCount);

  let removeBtn = document.createElement('button');
  removeBtn.className = 'removeBtn btn'
  removeBtn.id = `removeId_${item.id}`;
  removeBtn.innerHTML = '-';
  removeBtn.addEventListener('click', (event)=>{
    removeFromCartAtCheckout((item));
  });
  btnBox.appendChild(removeBtn);

  let iPrice = document.createElement('div');
  iPrice.className = 'iPrice';
  iPrice.innerHTML = `€${(item).price.toFixed(2)}`;
  box_price.appendChild(iPrice);

  let iPriceTot = document.createElement('div');
  iPriceTot.className = 'iPriceTot flex-fill';
  iPriceTot.setAttribute('id',`iPriceTot_${(item).id}`);
  //innerHTML uppdateras med separat funktion nedan
  box_price.appendChild(iPriceTot);

  update_iCount_iPriceTot(item);

  });
}
updateTotalPrice();
}

function update_iCount_iPriceTot(item){
let shoppingCart = getShoppingCart();

//antalet av en item
let itemCount = shoppingCart.filter(e=>e.title==(item).title).length;
document.getElementById(`iCountId_${(item).id}`).innerHTML = `${itemCount}`;

//update price
document.getElementById(`iPriceTot_${(item).id}`).innerHTML =`€${((item).price * itemCount).toFixed(2)}`;

}


// Öka antalet av en item i Cart:
function addToCartAtCheckout(item){
let shoppingCart = getShoppingCart();

  let newItem = {
    title: item.title,
    price: item.price,
    id: item.id,
    image: item.image,
  };
  shoppingCart.push(newItem);
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

  update_iCount_iPriceTot(item);
  updateTotalPrice();
}


// Minska antalet av en item i Cart:
function removeFromCartAtCheckout(item){
let shoppingCart = getShoppingCart();

let itemIndex = -1;
shoppingCart.forEach((e,index)=>{
if(e.id===item.id){
  itemIndex = index;
}
})

if(itemIndex > -1){
shoppingCart.splice(itemIndex,1);
}else{
document.getElementById('cart').textContent = "";
retrieveCart();
}
localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

update_iCount_iPriceTot(item);
updateTotalPrice();

}

function removeItemFromCart(item){
let shoppingCart = getShoppingCart();

shoppingCart = shoppingCart.filter(e=>e.id !== item.id);
localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

document.getElementById('cart').textContent = "";
retrieveCart();

}



//funktion för att uppdatera totalPrice
function updateTotalPrice(){
let shoppingCart = getShoppingCart();
let totalPrice = 0;

shoppingCart.forEach(e => {
  totalPrice += e.price;
});

totalPrice = totalPrice.toFixed(2);
document.getElementById('totalPrice').innerHTML = `Total Price: €${totalPrice}`;
}



//eventhanterare för clearCart button
document.getElementById("btn_clearCart").addEventListener("click", () => {
localStorage.removeItem('shoppingCart');
document.getElementById('totalPrice').innerHTML = `Total Price: €00,00`;
document.getElementById('cart').innerHTML = "";
});

retrieveCart();
