async function getAPIKey() {
    const response = await fetch(`https://fathomless-shelf-54969.herokuapp.com/keys`, {
        method: 'POST'})
        const data = await response.json()
        console.log(data)
        getBodies(data.key)
    }
    getAPIKey()
    
async function getBodies(dataKey) {
    const response = await fetch(`https://fathomless-shelf-54969.herokuapp.com/bodies`, {
        method: 'GET',
        headers: {'x-zocom': dataKey}
    })
    const bodies = await response.json();
    console.log(bodies)
}

export 