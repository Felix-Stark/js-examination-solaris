
const bodyElem = document.querySelectorAll('.body');
const infoPage = document.querySelector('.info');
const closeElem = document.querySelector('#close')
const nameElem = document.querySelector('#name');
const latinNameElem = document.querySelector('#latin-name');
const descriptionElem = document.querySelector('#desc');
const circumElem = document.querySelector('#circumference');
const tempDayElem = document.querySelector('#temp-day');
const tempNightElem = document.querySelector('#temp-night');
const distanceElem = document.querySelector('#distance');
const moonsList = document.querySelector('#moonsList');

let bodiesArr;
let bodyId;
let moonItem;

for (let i = 0; i < bodyElem.length; i++) {
    bodyElem[i].addEventListener('click', function () {

        bodyId = this.id;
        displayInfo(bodyId)
    })
}
closeElem.addEventListener('click', () => {
    infoPage.classList.toggle('show');
    moonsList.innerHTML = '';
})

function displayInfo(bodyId) {
    infoPage.classList.toggle('show');
    let body = bodiesArr[bodyId];
    let moonsArr = body.moons;
    
    console.log(moonsArr)
    console.log(body);
    nameElem.innerHTML = body.name;
    latinNameElem.innerHTML = body.latinName;
    descriptionElem.innerHTML = body.desc;
    circumElem.innerHTML = body.circumference;
    tempDayElem.innerHTML = body.temp.day;
    tempNightElem.innerHTML = body.temp.night;
    distanceElem.innerHTML = body.distance;
    if(moonsArr == 0) {
        moonsList.innerHTML = body.name + ' ' + 'har ingen måne.'
    }
    
    for (let i = 0; i < moonsArr.length; i++) {
        moonItem = document.createElement('li');
        moonItem.innerHTML = moonsArr[i];
        moonsList.append(moonItem)
    }
    
}

async function getAPIKey() {
    const response = await fetch(`https://fathomless-shelf-54969.herokuapp.com/keys`, {
        method: 'POST'})
        const data = await response.json()
        console.log(data)
        getBodies(data.key)
}

async function getBodies(dataKey) {
    const response = await fetch(`https://fathomless-shelf-54969.herokuapp.com/bodies`, {
        method: 'GET',
        headers: {
            'x-zocom': dataKey
        }
    })
    const bodies = await response.json();
    bodiesArr = bodies.bodies
}

getAPIKey()