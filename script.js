let container=document.getElementById("product-container")
let product_catagories=document.getElementById("product-catagories")
let sort_price=document.getElementById("sort-price");
let search_box=document.getElementById("search-box")

async function fetchData(category){
    container.innerHTML=""
    let URL=`https://fakestoreapi.com/products`
    if(category=="electronics" || category=="jewelery" || category=="men's clothing" || category=="women's clothing"){
        URL=URL+`/category/${category}`
    }
  if(category=="asc" || category=="desc"){
    URL=URL+`?sort=${category}`
  }

    try {
        let response=await fetch(URL)
        let answer=await response.json();
        displayData(answer);
    } catch (error) {
        console.log(error);
    }
}

fetchData()
function displayData(products){
      products.map((ele)=>{
        let div=document.createElement("div")
         
        let image=document.createElement("img")
        let title=document.createElement("p")
        let price=document.createElement("p")

        image.src=ele.image;
        title.innerHTML=`<strong>Title:</strong> ${ele.title}`;
        price.innerHTML=`<strong>Price:</strong> $${ele.price}`

        div.append(image,title,price)
        container.appendChild(div)
      })
}
product_catagories.addEventListener("change",function(){
          fetchData(product_catagories.value)//catagories
})
sort_price.addEventListener("change",function(){
    fetchData(sort_price.value)//price
})
search_box.addEventListener("input",function(){
     fetchData(search_box.value)//search
})
// let timer;
// async function handleSearch(title){
//     let resp=await fetch("https://fakestoreapi.com/products")
//     let ans=await resp.json();
     
//     return ans.filter(items=>items.title.toLowerCase().includes(title.toLowerCase()))
   
// }
//  function handleInput(title){
//         clearTimeout(timer)
//         timer=setTimeout(()=>{
//             let result=handleSearch(title)
//             console.log(result);
//             // result.map(element => {
//             //     container.innerHTML=""
//             //     container.textContent=element.title;
//             //     console.log(container);
//             // });
//         },3000)
// }
