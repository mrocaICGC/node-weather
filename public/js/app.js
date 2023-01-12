

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = 'Temperature: ' + JSON.stringify(data.forecastData.temperature) + 'ºC. Feels like: ' + JSON.stringify(data.forecastData.feelslike) + 'ºC. Weather: ' + data.forecastData.weather
                //console.log(data.location)
                //console.log(data.forecastData)
            }
        })
    })

    //console.log('location: ', location)
})