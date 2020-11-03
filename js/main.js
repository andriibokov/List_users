let usersList
let massage = ''
let userSearchList = []
let checkBox = true

async function Users(indexRemove, inputValue){
    try{
        if(checkBox){

            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            usersList = await response.json()
            usersList = usersList.map(user => {
                return user = {
                   name: user.name,
                   email: user.email,
                   companyName: user.company.name,
                   addressCity: user.address.city
                }
            })
            checkBox = false
            renderUserList (usersList)
        } else {     /* Удаление User */ 

            usersList = usersList.filter((user, index) => index != indexRemove)
            renderUserList (usersList)
        }

        if(inputValue){    /* Поиск по Users */ 
            userSearchList = usersList.filter(user =>{
                if(Object.values(user).join('').toUpperCase().indexOf(inputValue) > -1) return true
            })
            renderUserList (userSearchList)
        }
    } catch (e) {

        console.error(e);

    } finally {
        if(usersList.length === 0 || userSearchList.length === 0 && inputValue){
            massage = 'User list is empty.'
            plugUserList(massage)
        }
    }
} 

Users()

/*Заглушка */
function plugUserList(massage){
    document.querySelector('#users').innerHTML = `<div class="list__empty">${massage}</div>`
}

/* удаление User */ 
function userRemove(elementValue){
    Users(elementValue)
}

/* Поиск по Users */
function search(value){
    value = value.toUpperCase()
    Users(-1, value)
}

/* Воспроизведение Users */
function renderUserList (usersList){
    const users = usersList.map((user,index) => 
    `<li class="user__item">
        <span class="user__info">${user.name}</span>
        <span class="user__info">${user.email}</span>
        <span class="user__info">${user.companyName}</span>
        <span class="user__info">${user.addressCity}</span>
        <button class="user__remove" value="${index}" onclick="userRemove(this.value)">
            <img src="./image/user_remove.svg" alt="image user remove">
        </button>
    </li>
`)
document.querySelector('#users').innerHTML = users.join("");
}


/* Стилизация при наведении на User */ 

let currentElem = null;

users.onmouseover = function(event) {

    if (currentElem) return;
    let target = event.target.closest('.user__item');
    
    if (!target) return;    

    currentElem = target;
    target.classList.add('active');
    target.lastElementChild.style.visibility = 'visible'
};
  
users.onmouseout = function(event) {
    if (!currentElem) return;
    let relatedTarget = event.relatedTarget;
    
    if (relatedTarget === currentElem) return;

    currentElem.classList.remove('active');
    currentElem.lastElementChild.style.visibility = 'hidden'
    currentElem = null;
};


