let container=document.getElementById("product-container")
let product_catagories=document.getElementById("product-catagories")
let sort_price=document.getElementById("sort-price");
let search_box=document.getElementById("search-box")

async function fetchData(category,searchQuery){
    container.innerHTML=""
    let URL=`https://fakestoreapi.com/products`
    if(category=="electronics" || category=="jewelery" || category=="men's clothing" || category=="women's clothing"){
        URL=URL+`/category/${category}` //filter on  the basis of catagory
    }
  if(category=="asc" || category=="desc"){
    URL=URL+`?sortBy=price&order=${category}` //filter on the basis of price
  }
  if (searchQuery) {
    URL = URL + `?title=${searchQuery}`; // Search by title
}
    try {
        let response=await fetch(URL)
        let answer=await response.json();
        answer=applySorting(answer,category)
        displayData(answer);//invoke the displayData function with the data coming from the API
    } catch (error) {
        console.log(error);
    }
}

fetchData() //initally, invoke the function for show the products on UI
function displayData(products){
      products.map((ele)=>{
        let div=document.createElement("div")
         
        let image=document.createElement("img")
        let title=document.createElement("p")
        let price=document.createElement("p")

        image.src=ele.image;
        title.innerHTML=`<strong>Title:</strong> ${ele.title}`;
        price.innerHTML=`<strong>Price:</strong> $${ele.price}`

        div.append(image,title,price)//append the image,title and price in div
        container.appendChild(div)//and append div in container
      })
}
product_catagories.addEventListener("change",function(){
          fetchData(product_catagories.value)//take catagory from UI
})
sort_price.addEventListener("change",function(){
    fetchData(sort_price.value)//take the value of price dorting form UI
})
search_box.addEventListener("input",function(){
    let searchQuery = search_box.value;
    fetchData(product_catagories.value, searchQuery);//input with the help of Input and take the search value
})

function applySorting(products, sortingOption) {
    if (sortingOption === "asc") {
        return products.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "desc") {
        return products.sort((a, b) => b.price - a.price);
    }
    return products;
}