import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import ClevelandArt from './api-service.js'

function showData(response) {
  console.log(response)
  const firstElement = response[0]
  console.log(firstElement)
  let html = `<div class="col-md-3 p-2 card">`
  html += `<h2 class="title">${firstElement.title}</h2>`
  html += `<h4 class="creation_date">Created c. ${firstElement.creation_date}</h4>`
  html += `<h6 class="culture">${firstElement.culture}</h6>`
  html += `<p class="fun_fact">${firstElement.fun_fact}</p>`
  html += `<div class="images"><img width="300px;" src="${firstElement.images.web.url}"></div>`
  html += `<p class="wall_description">${firstElement.wall_description}</p>`
  html += `</div>`

  $(".category-results").html(html)
}


$("button").click(function (event) {
  const department = event.currentTarget.id.trim()
  ClevelandArt.getArt(department)
    .then(function (response) {
      if (response instanceof Error || (response && response.message && response.stack)) {
        return alert(`you have encountered an error ${response.statusText}`)
      }
      // now we know we don't have an error...
      showData(response.data);
    })
})
