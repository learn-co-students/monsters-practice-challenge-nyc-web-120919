document.addEventListener("DOMContentLoaded", () => {
    getMonsters()
    createMonster()
    nextPage()
    previousPage()

    function getMonsters() {
        fetch("http://localhost:3000/monsters/?_limit=50&_page=1")
        // fetch("http://localhost:3000/monsters/")
            .then(function (response) {
                return response.json();
            })
            .then(function (monsters) {
                monsters.forEach(function (monster) {
                    displayMonster(monster);
                });
            });
    }

    function displayMonster(monster) {
        const monsterContainer = document.getElementById("monster-container")
        const div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.dataset.id = monster.id;
        monsterContainer.appendChild(div);
        monsterInfo(div, monster);
    }

    function monsterInfo(div, monster) {
        div.innerHTML = `<h2>Name: ${monster.name}</h2>
            <h3> Age: ${monster.age} </h3>
            <p> Bio: ${monster.description} </p>`
    }

    function createMonster() {
        const divCreate = document.getElementById("create-monster")
        // const form = document.createElement('form');
        // const input1 = document.createElement('input');
        // const input2 = document.createElement('input');
        // const input3 = document.createElement('input');
        divCreate.innerHTML = `
        <form id="monster-form">
            <input id="name" placeholder="name...">
            <input id="age" placeholder="age...">
            <input id="description" placeholder="description...">
            <button>Create Monster</button>
        </form> `

        const form = document.getElementById("monster-form")
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            fetch('http://localhost:3000/monsters', {
                method: 'POST',
                headers:
                {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify({
                  "name": event.target.name.value,
                  "age": event.target.age.value,
                  "description": event.target.description.value 
                })
              }).then(function (response) {
                return response.json();
            }).then(function (monster) {
                displayMonster(monster)
                });
            });
    }

    let num = 1
    function nextPage() {
        const forwardButton = document.getElementById("forward")
        forwardButton.addEventListener("click", function(event) {
            num ++
            num = num + 1
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (monsters) {
                const monsterContainer = document.getElementById("monster-container")
                monsterContainer.innerHTML = ""
                monsters.forEach(function (monster) {
                    displayMonster(monster);
                });
            });
        })
    }

    function previousPage() {
        const backButton = document.getElementById("back")
        backButton.addEventListener("click", function(event) {
            if (num > 1) {
            num --
            fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (monsters) {
                const monsterContainer = document.getElementById("monster-container")
                monsterContainer.innerHTML = ""
                monsters.forEach(function (monster) {
                    displayMonster(monster);
                });
            });}
        })
    }

})




