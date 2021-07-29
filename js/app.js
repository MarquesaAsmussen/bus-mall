'use strict'

console.log('hello, world!')

//------------------Global Variables-------------//
let clickCounter = 0;

const ulElem = document.getElementById('product-clicks');
const voteSectionElem = document.getElementById('all-products');

const leftProductImgElem = document.getElementById('left_product_img');
const centerProductImgElem = document.getElementById('center_product_img');
const rightProductImgElem = document.getElementById('right_product_img');
const leftProductH2Elem = document.getElementById('left_product_h2');
const centerProductH2Elem = document.getElementById('center_product_h2');
const rightProductH2Elem = document.getElementById('right_product_h2');


let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

//-------------------Constructor------------------//
function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.votes = 0;
  this.views = 0;
  // this function should not do external processes

  Product.allProducts.push(this);
}

Product.allProducts = [];

//-------------------Prototype Methods---------------//
// renders a single imaage and name
Product.prototype.renderProduct = function (img, h2) {
  img.src = this.imgPath;
  img.alt = this.name;
  h2.textContent = this.name;
  this.views++
}

//---------------Standard Global Functions----------//
// picks 3 unique images that don't match the previous set

// lecture version

function getThreeProducts() {
  const doNotUse = [leftProduct, centerProduct, rightProduct];
  while (doNotUse.includes(leftProduct)) {
    let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
    leftProduct = Product.allProducts[leftIndex];
  }
  doNotUse.push(leftProduct)

  while (doNotUse.includes(centerProduct)) {
    let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
    centerProduct = Product.allProducts[centerIndex];
  }
  doNotUse.push(centerProduct)

  while (doNotUse.includes(rightProduct)) {
    let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
    rightProduct = Product.allProducts[rightIndex];
  }
  doNotUse.push(rightProduct)
  console.log(doNotUse)
}

// render 3 products (images)
function renderTheProducts() {
  leftProduct.renderProduct(leftProductImgElem, leftProductH2Elem);
  centerProduct.renderProduct(centerProductImgElem, centerProductH2Elem); 
  rightProduct.renderProduct(rightProductImgElem, rightProductH2Elem); 
}
// renders results
function renderResults() {
  ulElem.textContent = '';

  for (let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.name}: ${product.votes}`;
    ulElem.appendChild(liElem)
  }
}

function makeChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  let productNames = [];
  let productVotes = [];
  let colorArray = [];
  for (let product of Product.allProducts) {
    productNames.push(product.name);
    productVotes.push(product.votes);
  }

  const productChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of votes',
        data: productVotes,
        backgroundColor: colorArray,
        borderColor: colorArray,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// click handler
function handleClick(e) {
  console.log(e.target.id);
  let imageClicked = e.target.id;
  if (imageClicked === 'right_product_img' || imageClicked === 'center_product_img' || imageClicked === 'left_product_img') {
    clickCounter++;
    // console.log('test');
    // update vote rounds
    // rounds--;
    if (imageClicked === 'right_product_img') {
      rightProduct.votes++;
      console.log(rightProduct);
    }
    if (imageClicked === 'center_product_img') {
      centerProduct.votes++;
      console.log(centerProduct);
    }
    if (imageClicked === 'left_product_img') {
      leftProduct.votes++;
      console.log(leftProduct);
    }
    getThreeProducts();
    renderTheProducts();
  }
  if (clickCounter === 10) {
    // alert('show the goat totals')
    voteSectionElem.removeEventListener('click', handleClick);  
    renderResults();
    makeChart();
  }

}

//--------------------Listener---------------------//
// listener on container for pictures
voteSectionElem.addEventListener('click', handleClick);

//--------------------Call Functions----------------//

new Product('Bag', './img/bag.jpg');
new Product('Banana', './img/banana.jpg');
new Product('Bathroom', './img/bathroom.jpg');
new Product('Boots', './img/boots.jpg');
new Product('Breakfast', './img/breakfast.jpg');
new Product('Bubblegum', './img/bubblegum.jpg');
new Product('Chair', './img/chair.jpg');
new Product('Cthulhu', './img/cthulhu.jpg');
new Product('Dog-Duck', './img/dog-duck.jpg');
new Product('Dragon', './img/dragon.jpg');
new Product('Pen', './img/pen.jpg');
new Product('Pet-Sweep', './img/pet-sweep.jpg');
new Product('Scissors', './img/scissors.jpg');
new Product('Shark', './img/shark.jpg');
new Product('Sweep', './img/sweep.png');
new Product('Tauntaun', './img/tauntaun.jpg');
new Product('Unicorn', './img/unicorn.jpg');
new Product('Water Can', './img/water-can.jpg');
new Product('Wine Glass', './img/wine-glass.jpg');

getThreeProducts();
renderTheProducts();

// --------------------Charts---------------------//


