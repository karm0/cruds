// get total ✅
// create product 
// save localstorage
// clear input
// read 
// count
// delete
// update
// search
// clean data

let mood = 'create';
let x;

function getTotal(){
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#03b303';
  }else{
    total.innerHTML = '';
    total.style.background = '#ffff00';
  }
}

let allData;
if(localStorage.prodacts != null){
  allData = JSON.parse(localStorage.prodacts);
}else{
  allData = [];
}

create.onclick = function(){
  let newData = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if(title.value != ''&& price.value != ''&& category.value != ''&&newData.count <= 500){
    if(mood === 'create'){
      if(newData.count > 1){
        for(let i = 0; i < newData.count; i++){
          allData.push(newData);
        }
      }else{
        allData.push(newData);
      }
      clearData();
    }else{
      allData[x] = newData;
      mood = 'create';
      create.innerHTML = 'create';
      count.style.display = 'block';
    }
  }
  
  localStorage.setItem('prodacts', JSON.stringify(allData));
  showData();
}

let input = document.querySelectorAll('.crud input');

function clearData(){
  input.forEach((e)=>{
    e.value = '';
    total.textContent = '';
  })
}


function showData(){
  getTotal()
  let table = '';
  for(let i = 0; i < allData.length; i++){
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <th>${allData[i].total}</th>
    <td>${allData[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
  }
  tbody.innerHTML = table;
  if(allData.length > 0){
    btnDelete.innerHTML = `
    <button onclick = "deleteAll()">delete all (${allData.length})</button>
    `
  }else{
    btnDelete.innerHTML = '';
  }
}
showData();


function deleteData(i){
  allData.splice(i,1);
  localStorage.prodacts = JSON.stringify(allData);
  showData()
}

function deleteAll(){
  localStorage.clear();
  allData.splice(0);
  showData();
}

function updateData(i){
  title.value = allData[i].title;
  price.value = allData[i].price;
  taxes.value = allData[i].taxes;
  ads.value = allData[i].ads;
  discount.value = allData[i].discount;
  category.value = allData[i].category;
  count.style.display = 'none';
  getTotal();
  create.innerHTML = 'Update';
  mood = 'update';
  x = i;
  scroll({
    top:0,
    behavior:"smooth",
  })
}

mood2 = 'title';

function changeMood(id){
  if(id == 'searchTitle'){
    mood2 = 'title';
  }else{
    mood2 = 'category';
  }
  search.placeholder = 'Search By '+ mood2;
  search.focus();
  search.value = '';
  showData();
}



function searchData(value){
  let table = '';
  for(let i = 0; i < allData.length; i++){
  if(mood2 == 'title')
  {
    
      if(allData[i].title.includes(value.toLowerCase())){
        table += `
    <tr>
    <td>${i}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <th>${allData[i].total}</th>
    <td>${allData[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
    }
  }
  else{
      if(allData[i].category.includes(value.toLowerCase())){
        table += `
    <tr>
    <td>${i}</td>
    <td>${allData[i].title}</td>
    <td>${allData[i].price}</td>
    <td>${allData[i].taxes}</td>
    <td>${allData[i].ads}</td>
    <td>${allData[i].discount}</td>
    <th>${allData[i].total}</th>
    <td>${allData[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `
    }
  }
  }
  tbody.innerHTML = table;
}