document.addEventListener("DOMContentLoaded", function() {

    let page = 1

    function getMonsters() {
        //may need to interpolate the 'page' value of the url in order to load other pages?
        //let page = 1
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
            .then(resp => resp.json())
            .then(monsterList => monsterList.forEach(monster => renderMonsters(monster)))
    }

    function renderMonsters(monster) {
        let targetDiv = document.querySelector("#monster-container");
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <h3>Name: ${monster.name}</h3>
            <p><strong>Age: ${monster.age}</strong></p>
            <p>Bio: ${monster.description}</p>`
        targetDiv.appendChild(newDiv);    
    }

    function incrementPage() {
        let targetDiv = document.querySelector("#monster-container");
        targetDiv.innerText = ""
        page++
        getMonsters();
    }

    function decrementPage() {
        let targetDiv = document.querySelector("#monster-container");
        targetDiv.innerText = ""
        page--
        getMonsters();
    }


getMonsters()

    function createMonsterForm() {
        let targetDiv = document.querySelector("#create-monster");
        let form = document.createElement('form')
        form.id = "create-monster-form"
        form.innerHTML = `
            <input type="text" name="name" placeholder="name..." value=""></input>
            <input type="number" name="age" placeholder="age..." value=""></input>
            <input type="text" name="description" placeholder="description..." value=""></input>
            <input type="submit" value="create"></input`
        targetDiv.appendChild(form);
    }

createMonsterForm();

document.addEventListener("click", function(e){
    let forwardButton = document.getElementById("forward")
    let backButton = document.getElementById('back')
    if (e.target === forwardButton) {
        incrementPage();
        getMonsters();
    } else if (e.target === backButton && page > 1) {
        decrementPage();
        getMonsters();
    } else if (e.target === backButton && page <= 1) {
        alert("You are already on the first page");
    }
})

let form = document.getElementById("create-monster").querySelector('form')

form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const description = e.target.description.value;
    const monster = {name, age, description}
    //renderMonsters(monster);
    form.reset();
    fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(monster)
        
    })
})

})