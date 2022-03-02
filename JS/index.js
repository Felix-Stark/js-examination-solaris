/**  
 * endpoints: 
 * get key - '/keys' - returnerar API nyckel.-----
 * get bodies - '/bodies' - returnerar alla stora himlakroppar i vårt solsystem.
 * dela upp bodies till singel object
 * display vald body i UI
 * klicka på body för att få fram information
 * klicka för att komma tillbaka till mainpage
*/

const bodyElem = document.querySelectorAll('.body');
const infoPage = document.querySelector('.info');
const closeElem = document.querySelector('.close')
const nameElem = document.querySelector('#name');
const latinNameElem = document.querySelector('#latin-name');
const descriptionElem = document.querySelector('#desc');
const circumElem = document.querySelector('#circumference');
const tempDayElem = document.querySelector('#temp-day');
const tempNightElem = document.querySelector('#temp-night');
const distanceElem = document.querySelector('#distance');
const moonsList = document.querySelector('#moonsList');

let bodiesArr;


for (let i = 0; i < bodyElem.length; i++) {
    bodyElem[i].addEventListener('click', function () {

        const bodyId = this.id;
        displayInfo(bodyId)
    })
}
closeElem.addEventListener('click', () => {
    infoPage.classList.toggle('show');
})

function displayInfo(bodyId) {
    infoPage.classList.toggle('show');
    let body = bodiesArr[bodyId];
    let moonsArr = body.moons
    // moonsArr.map((moon) => {
    //     console.log(moon)
    // })
    
    console.log(moonsArr)
    console.log(body);
    nameElem.innerHTML = body.name;
    latinNameElem.innerHTML = body.latinName;
    descriptionElem.innerHTML = body.desc;
    circumElem.innerHTML = body.circumference;
    tempDayElem.innerHTML = body.temp.day;
    tempNightElem.innerHTML = body.temp.night;
    distanceElem.innerHTML = body.distance;
    for (let i = 0; i < moonsArr.length; i++) {
        let moonItem = document.createElement('li');
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