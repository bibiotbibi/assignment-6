const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

const manageSpinner =(status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cart-container").classList.add("hidden");
  } else{
    document.getElementById("cart-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}

const removeActive=()=>{
  const categorieButton= document.querySelectorAll(".categories-btn");
  // console.log(categorieButton);
  categorieButton.forEach(btn=> btn.classList.remove("active"));
};

const loadPlants =(id)=>{
  manageSpinner(true);
    const url =`https://openapi.programming-hero.com/api/plants?category=${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data=>{
      removeActive()
      const clickBtn = document.getElementById(`categories-btn-${id}`);
      clickBtn.classList.add("active");
      displayPlants(data.plants)
    });
}

// const loadCardDetail= async(id)=>{
//   const url=`https://openapi.programming-hero.com/api/category/${id}`;
//   const res = await fetch(url);
//   const details =await res.json();
//   console.log(details.plants);
//   modal.showModal() 
//   const modal = document.getElementById("word_modal");
//   if(modal){
//     modal.showModal();
//   }
//   else {
//     console.error("close modal not found");
//   }
// }




  let cartItems = [];
function addToCart(event){
  function updateCartDisplay(){
    const cartList = document.getElementById('cart-item-list');
    const cartTotalElement = document.getElementById('cart-total');

    cartList.innerHTML ='';
    let total = 0;

    cartItems.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('flex', 'justify-between', 'items-center', 'my-2');
      itemElement.innerHTML=`
      <div>
      <p class = "font-semibold">${item.name}</p>
      <p class="text-[#1F2937]><i class="fa-solid fa-bangladeshi-taka-sign">${item.price} × ${item.quantity}</p>
      </div>
      <div>
      <button class="remove-btn onclick="removeFromCart('${item.name}')>❌</button>
      </div>
      `;
      
      cartList.appendChild(itemElement);
      total += item.price * item.quantity;

    });
    cartTotalElement.innerText =`${total}`;
  }

  const card = event.target.closest('.card');
  const plantName = card.querySelector('h2').innerText.trim();
  const plantPrice =parseInt(card.querySelector('.plantPrice').textContent.trim());
  const exsistingItem = cartItems.find(item => item.name === plantName);

  if(exsistingItem){
    exsistingItem.quantity++;
  } else{
    cartItems.push({
      name:plantName,
      price:plantPrice,
      quantity:1
    });
  }

  updateCartDisplay();
  alert("Added to the cart!");
}

const displayPlants = (plants) => {
  const cartConatiner = document.getElementById("cart-container");
  cartConatiner.innerHTML = "";

  plants.forEach(plants =>{
    // console.log(plants);
    const card = document.createElement("div");
    card.innerHTML=`
    <div class="card bg-white shadow-sm">
  <figure>
    <img class="p-2 rounded-2xl w-full h-[290px]"
      src="${plants.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 onclick="loadCardDetail(${plants.id})" class="card-title font-semibold text-xl">${plants.name}</h2>
    <p class="text-[#8C8C8C]">${plants.description}</p>
   <div class="flex items-center justify-between">
   <button class="font-semibold bg-[#DCFCE7] text-[#15803D] p-2 rounded-2xl">${plants.category}</button>
   <div><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-semibold plantPrice">${plants.price}</span></div>
   </div>  
    <div class="card-actions ">
      <button onclick="addToCart(event)" class="btn w-full bg-[#15803D] text-left text-white rounded-4xl p-2 ">Add to Cart </button>
    </div>
  </div>
</div>
    `;
    cartConatiner.append(card);
  });
  manageSpinner(false);
}

const displayCategories = (categories) => {
   const lavelCategories = document.getElementById("categories");
   lavelCategories.innerHTML = "";
   for (let categorie of categories) {
    // console.log(categories) 
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="categories-btn-${categorie.id}" onclick="loadPlants('${categorie.id}')" class=" w-full hover:bg-[#15803D20]  hover:shadow-xl text-left hover:text-[#15803D] rounded-lg p-2  categories-btn">${categorie.category_name}</button>
    `;
    lavelCategories.append(btnDiv);
   }
};

function removeFromCart(plantName){
        cartItems = cartItems.filter(item => item.name != plantName);
        updateCartDisplay();
      }

loadCategories();