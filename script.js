const submitBtn = document.getElementById('btn');
const addNote = document.getElementById('addNote1');
const list = document.querySelector('.adjacentDiv ul')


var form = document.getElementsByClassName('form1');

//  Initialization the display value of form to null by default so that it would work only after addNote button is clicked
form[0].style.display = 'none';

var listItems = document.getElementsByClassName('list-items')

const title = document.getElementsByClassName('smallEntry1');
const content = document.getElementsByClassName('bigEntry1');

for(let i =0; i<localStorage.length; i++){
  // console.log(localStorage.getItem(localStorage.key(i)));
  const date = new Date();
  const html =
      `<li class="list li"
      style="height:10%; width:100%; margin-left:0; border-radius: 10px; margin-bottom:10px; padding:10px; font-family: 'Pacifico', cursive;">
      <p style="float:right; padding-right:10px">
      ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}</p>
      <h1>${localStorage.key(i)}</h1>
      <button type="button" class="delBtn buttonStyle" style="float:right; margin-right:10px">delete</button>
      <p>${localStorage.getItem(localStorage.key(i))}</p>
      </li>`
      form[0].style.display = 'none'
      listItems[0].insertAdjacentHTML("afterbegin", html)
      listItems[0].hidden = false;
}



//  Submit Button function
submitBtn.addEventListener('click', (event) => {

      //  Adding time for at which the to-do is created
      const date = new Date();
      const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
      const mins = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

      const html =
      `<li class="list li"
      style="height:10%; width:100%; margin-left:0; border-radius: 10px; margin-bottom:10px; padding:10px; font-family: 'Pacifico', cursive;">
        <p style="float:right; padding-right:10px">${hours}:${mins}</p>
        <h1>${title[0].value}</h1>
        <button type="button" class="delBtn buttonStyle" style="float:right; margin-right:10px">delete</button>
        <p>${content[0].value}</p>
      </li>`

// Form display value to none when submit is clicked and adjacentDiv that contains content of title etc to be displayed.
      form[0].style.display = 'none'
      listItems[0].insertAdjacentHTML("afterbegin", html)
      listItems[0].hidden = false;

// Adding values to localStorage title:body
      window.localStorage.setItem(title[0].value, content[0].value);

// Emptying entry fileds after previous entry
      document.getElementsByClassName('smallEntry1')[0].value = ''
      document.getElementsByClassName('bigEntry1')[0].value = ''
      document.getElementsByClassName('smallEntry2')[0].value = ''

  })


//  Add note function
addNote.addEventListener('click', () => {

//  adjacentDiv to be hidden when addNote is clicked so the form is visible
      listItems[0].hidden = true

      if(form[0].style.display == 'none'){
        form[0].style.display = 'contents'
      }
    }

)
// delete button function
list.addEventListener('click', function(e){
  if(e.target.className.split(' ')[0] == 'delBtn'){
    // console.log(e.target.previousElementSibling.innerText);

    let li = e.target.parentElement
    list.removeChild(li);

    // Removing from localStorage
    localStorage.removeItem(e.target.previousElementSibling.innerText);
    // localStorage.clear();
  }
})

// search bar
const searchBar = document.querySelector('#searchBar')

searchBar.addEventListener('keyup', function(e){

  const term = e.target.value.toLowerCase();

  const blogsList = list.getElementsByTagName('li');
  Array.from(blogsList).forEach(function(blog){

    const title = blog.firstElementChild.nextElementSibling.innerText;

    if(title.toLowerCase().indexOf(term) != -1){
      blog.style.display = "block";
    }
    else {
      blog.style.display = "none";
    }
  })
})

// empty entire localStorage
const wipeAll = document.querySelector('#wipeAll')
wipeAll.addEventListener('click', () => {
  localStorage.clear();
})
