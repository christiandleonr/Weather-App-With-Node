console.log('Client side Javascript file is loaded')

// Query selector match with the firts element that found
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// Goal: Render content to paragraphs
// 1. Select the second message p from JavaScript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work! Search errors and for valid locations

weatherForm.addEventListener('submit', (e) => {
    // preventDefault evita que la pagina sea refrescada con el evento submit
    e.preventDefault()

    messageOne.textContent = 'Loading weather...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.forecast)
            console.log(data.location)
        })
    })
})