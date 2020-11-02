(async function Users(){
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const users = await response.json()
        const user = users.map(user => 
        `<li class="user__item">
            <span class="user__info">${user.name}</span>
            <span class="user__info">${user.email}</span>
            <span class="user__info">${user.company.name}</span>
            <span class="user__info">${user.address.city}</span>
            <button class="user__remove" onclick="userRemove()">
                <img src="./image/user_remove.svg" alt="image user remove">
            </button>
        </li>
        `)
        document.querySelector('#users').innerHTML = user.join("");
    } catch (e) {
        console.error(e);
    }
}())




