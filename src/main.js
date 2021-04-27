import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import ClevelandArt from './api-service.js'

function showData(artDataArray) {
  let html = `<div class="row">`
  artDataArray.forEach(function (artData) {
    html += `<div class="col-xs-12 col-sm-6 col-md-4 p-2 card">`
    html += `<h2 class="title">${artData.title}</h2>`
    if (artData.creators.length > 0) {
      html += `<h3 class="creator">`
      artData.creators.forEach(function(creator, index) {
        if (index > 1) html += `, `
        html += creator.description
      })
      html += `</h3>`
    }
    html += `<h4 class="creation_date">Created ${artData.creation_date}</h4>`
    html += `<h6 class="culture">${artData.culture}</h6>`
    if (artData.fun_fact) html += `<p class="fun_fact">${artData.fun_fact}</p>`
    html += `<div class="images"><img width="300px;" src="${artData.images.web.url}"></div>`
    if (artData.wall_description) {
      html += `<p class="wall_description">${artData.wall_description}</p>`
    } else if (artData.tombstone) {
      html += `<p class="tombstone">${artData.tombstone}</p>`
    }
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

$(".art-button").click(function (event) {
  $(".art-button").removeClass("active")
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
  $(this).addClass("active")
})

$("#home-button").on("click", function () {
  // show the home page
  $(".art_explorer").show()
  // hide the flashcards page
  $(".flashcards").hide()
  // make the home button active
  $("#home-button").addClass("active-button")
  // make the flashcard button inactive
  $("#flashcards-button").removeClass("active-button")
})

$("#flashcards-button").on("click", function () {
  // hide the home page
  $(".art_explorer").hide()
  // show the flashcards page
  $(".flashcards").show()
  // make the flashcards button active
  $("#flashcards-button").addClass("active-button")
  // make the homepage button inactive
  $("#home-button").removeClass("active-button")
})

$("body").on("keyup", function (event) {
  if (event.originalEvent.code === "Enter") {
    console.log("Enter key pressed")
  }
  if (event.originalEvent.code === "Comma") {
    console.log("Comma key pressed")
  }
  if (event.originalEvent.code === "Period") {
    console.log("Period key pressed")
  }
})

$("#next").on("click", () => {
  console.log("next button clicked")
})

$("#previous").on("click", () => {
  console.log("previous button clicked")
})