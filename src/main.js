import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import ClevelandArt from './api-service.js'

function showData(artDataArray) {
  let html = `<div class="row">`
  artDataArray.forEach(function (artData) {
    html += `<div class="col-md-3 p-2 card">`
    html += `<h2 class="title">${artData.title}</h2>`
    html += `<h4 class="creation_date">Created c. ${artData.creation_date}</h4>`
    html += `<h6 class="culture">${artData.culture}</h6>`
    html += `<p class="fun_fact">${artData.fun_fact}</p>`
    html += `<div class="images"><img width="300px;" src="${artData.images.web.url}"></div>`
    html += `<p class="wall_description">${artData.wall_description}</p>`
    html += `</div>`
  })
  html += `</div>`
  $(".category-results").html(html)
}

function cacheData(dataUrl, data) {
  localStorage.setItem(dataUrl, JSON.stringify(data))
}

function retrieveCache(dataUrl) {
  return JSON.parse(localStorage.getItem(dataUrl))
}

function showFlashcardsPage() {
  const cache = retrieveCache()
  console.log(cache)
  // TODO
}

$("button").click(function (event) {
  const department = event.currentTarget.id.trim()
  if (department === "flashcards-button") {
    return showFlashcardsPage()
  }
  ClevelandArt.getArt(department)
    .then(function (response) {
      if (response instanceof Error || (response && response.message && response.stack)) {
        return alert(`you have encountered an error ${response.statusText}`)
      }
      console.log(response)
      // now we know we don't have an error...
      // save the data to local storage
      cacheData(department, response.data)
      // show the data on screen
      showData(response.data);
    })
})
