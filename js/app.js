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
  let productName = [];
  let productVotes = [];
  let productViews = [];
    for( let votes of Product.allProducts) {
      productName.push(votes.name);
      productVotes.push(votes.votes);
      productViews.push(votes.views);
    }
    let pwdVotes = {
      label: 'Votes',
      data: productVotes,
      backgroundColor: ['rgba(255, 136, 122, 100)'],
      borderColor: ['rgba(222, 99, 84, 87)'],
      borderWidth: 1,
      yAxisID: "y-axis-votes"
    };
    let pwdViews = {
      label: 'Views',
      data: productViews,
      backgroundColor: ['rgba(26, 145, 84, 57)'],
      borderColor: ['rgba(96, 224, 158, 88)'],
      borderWidth: 1,
      yAxisID: "y-axis-views"
    };
    let chartData = {
      labels: productName,
      datasets: [pwdVotes, pwdViews]
    };
  let chartOptions = {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.6
        }],
        yAxes: [{
          id: "y-axis-votes"
        }, {
          id: "y-axis-views"
        }]
      }
    }
  let barChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions
  });
}





function putVotesInStorage() {
  let votesInStorage = localStorage.getItem('storedVotes');
  if (votesInStorage) {
    let parsedVotes = JSON.parse(votesInStorage);
    console.log(parsedVotes);
    for (let i = 0; i < parsedVotes.length; i++) {
      Product.allProducts[i].votes = parsedVotes[i].votes + Product.allProducts[i].votes;
      Product.allProducts[i].views = parsedVotes[i].views + Product.allProducts[i].views;
    }
    let stringifiedArray = JSON.stringify(Product.allProducts);
    localStorage.setItem('storedVotes', stringifiedArray);
  } else {
    let stringifiedArray = JSON.stringify(Product.allProducts);
    localStorage.setItem('storedVotes', stringifiedArray);
  }
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
    // alert('show the totals')
    voteSectionElem.removeEventListener('click', handleClick); 
    putVotesInStorage();
    renderResults();
    makeChart();
  }
}

//--------------------Listener---------------------//
// listener on container for pictures
voteSectionElem.addEventListener('click', handleClick);

//--------------------Call Functions----------------//

function makeProducts() {
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
}

// getVotesFromStorage()
makeProducts();
getThreeProducts();
renderTheProducts();

// --------------------Charts---------------------//

