// upon page load, show 50 monsters
// fetch api 'http://localhost:3000/monsters'
//Each monster's name, age, and description should be shown.
let page = 1;

window.addEventListener('DOMContentLoaded', function(){
    getFiftyMonsters();
    addListenersForPageButtons();
    renderCreateMonsterForm();
});

function getFiftyMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(json => {
            let fiftyMonsters = json;
            const divForMonsters = document.getElementById('monster-container')
            divForMonsters.innerHTML = "";
            fiftyMonsters.forEach(monster => {
                const monsterDiv = document.createElement('div');
                
                const nameHeader = document.createElement('h2');
                nameHeader.innerText = monster.name;

                const ageHeader = document.createElement('h4');
                ageHeader.innerHTML = "Age: " + monster.age;

                const descParagraph = document.createElement('p');
                descParagraph.innerText = monster.description;

                monsterDiv.appendChild(nameHeader);
                monsterDiv.appendChild(ageHeader);
                monsterDiv.appendChild(descParagraph);
                monsterDiv.dataset.id = monster.id;
                divForMonsters.appendChild(monsterDiv)
            })
            
        });
}

function addListenersForPageButtons() {
    const leftBtn = document.getElementById('back');
    const rightBtn = document.getElementById('forward');

    rightBtn.addEventListener('click', function(event){
        if (page < 21) {
            page = page + 1;
            getFiftyMonsters();
        }
        else {
            alert('Aint no monsters here!')
        }
    })

    leftBtn.addEventListener('click', function(event){
        if (page > 1) {
            page = page - 1;
            getFiftyMonsters();
        }
        else {
            alert('Aint no monsters here!')
        }
    })
}

function renderCreateMonsterForm() {
    let formDiv = document.getElementById('create-monster');
    let form = document.createElement('form');
    form.innerHTML = `
        <input id="age" placeholder="age...">
        <input id="name" placeholder="name...">
        <input id="description" placeholder="description...">
        <button>Create</button>
        `

    formDiv.appendChild(form);
    let createButton = form.getElementsByTagName('button')[0]
    createButton.addEventListener('click', function(event) {
        console.log(event)
        createMonster(event.target.parentNode)
        event.preventDefault();
    })

}

function createMonster(form) {
    let age = form.age.value
    let name = form.name.value
    let description = form.description.value
    let monster = { age, name, description }

    fetch('http://localhost:3000/monsters/', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(monster)
      })
      .then(response => response.json())
      .then(monster => {
        // PESSIMISTIC RENDERING <= rendering only after getting confirmation from 
        // the DB that the record was created
        if (page === 21) {
            console.log('something')
            getFiftyMonsters();
        }
        
      })
}

