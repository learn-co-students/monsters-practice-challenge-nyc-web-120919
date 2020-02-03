let monsters = []
let offset = 0

document.addEventListener("DOMContentLoaded", () => {
    getMonsters()
    submitEvent()
    forwardEvent()
});

function getMonsters() {
    fetch("http://localhost:3000/monsters")
        .then(resp => resp.json())
        .then(json => {
            monsters = json;
            renderMonster()
        })
}

function renderMonster() {
    const shownMonsters = monsters.slice(offset, offset + 50)
    const monsterContainer = document.getElementById('monster-container');
    monsterContainer.innerHTML = ""
    shownMonsters.forEach(monster => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
        `
        monsterContainer.appendChild(div);
    });
}

function submitEvent() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        createMonster(event.target)
    })
}

function createMonster(form) {
    // const { name, age, description } = form;
    const monster = {
        name: form.name.value,
        age: form.age.value,
        description: form.description.value
    }
    fetch('http://localhost:3000/monsters', {
        method: 'post',
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monster)
    })
}

function forwardEvent() {
    const forward = document.getElementById('forward')
    forward.addEventListener('click', (event) => {
        offset += 50
        renderMonster()
    })
}