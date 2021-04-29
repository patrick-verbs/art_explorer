import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import ClevelandArt from './api-service.js'

let CURRENT_DEPARTMENT = ""
let CURRENT_CARD = 0

function showData(artDataArray) {
  let html = `<div class="row g-3">`
  artDataArray.forEach(function (artData) {
    html += `<div class="col-xs-12 col-sm-6 col-md-4">`
    html += `<div class="p-2 card">`
    html += `<h2 class="title">${artData.title}</h2>`
    if (artData.creators.length > 0) {
      html += `<h3 class="creator">`
      artData.creators.forEach(function (creator, index) {
        if (index > 1) html += `, `
        html += creator.description
      })
      html += `</h3>`
    }
    html += `<h4 class="creation_date">Created ${artData.creation_date}</h4>`
    html += `<h6 class="culture">${artData.culture}</h6>`
    if (artData.fun_fact) html += `<p class="fun_fact">${artData.fun_fact}</p>`
    html += `<div class="images"><img class="image" src="${artData.images.web.url}"></div>`
    if (artData.wall_description) {
      html += `<p class="wall_description">${artData.wall_description}</p>`
    } else if (artData.tombstone) {
      html += `<p class="tombstone">${artData.tombstone}</p>`
    }
    html += `</div></div>`
  })
  html += `</div>`
  $(".category-results").html(html)
}

function saveToCache(dataUrl, data) {
  localStorage.setItem(dataUrl, JSON.stringify(data))
}

function retrieveFromCache(department) {
  return JSON.parse(localStorage.getItem(department))
}

function showCurrentCard() {
  // get the cached art image data for the currently selected department
  // if there is a currently selected department
  if (!CURRENT_DEPARTMENT) {
    return
  }
  // if we get here, we have current department, it exists
  const data = retrieveFromCache(CURRENT_DEPARTMENT)
  console.log(data)
  let html = `<button class="btn btn-lg btn-outline-info card-front">`
  // more html -- the image
  html += `<div class="images"><img class="image" src="${data[CURRENT_CARD].images.web.url}"></div>`
  html += `</button> <button class="btn btn-lg btn-outline-success card-back" style="display: none;">`
  // more html -- the info on back
  html += `<h6 class="tombstone">${data[CURRENT_CARD].tombstone}</h6>`
  html += `</button>`
  $(".card-holder").html(html)
  addEventHandlers()
}

function showFront() {
  $(".card-back").blur().hide()
  $(".card-front").blur().show()
}

function showBack() {
  $(".card-front").blur().hide()
  $(".card-back").blur().show()
}

function previousCard() {
  // if there is a previous card, decrement
  if (CURRENT_CARD > 0) CURRENT_CARD -= 1
  showCurrentCard()
}

function nextCard() {
  // if there is a next card, increment
  if (CURRENT_CARD < 29) CURRENT_CARD += 1
  showCurrentCard()
}

// EVENT HANDLERS
$(".art-button").click(function (event) {
  let artExplorerActive = $("#home-button").hasClass("active") // is 'true' if it has the class, 'false' if not
  $(".art-button").removeClass("active")
  const department = event.currentTarget.id
  // store the currently selected category in localstorage
  localStorage.setItem("currentDepartment", department)
  $(".selected-category").html(`<h2 class="text-center">Viewing: ${department.replaceAll("%20", " ")}</h2>`)
  ClevelandArt.getArt(department)
  .then(function (response) {
    if (response instanceof Error || (response && response.message && response.stack)) {
        return alert(`you have encountered an error ${response.statusText}`)
      }
      saveToCache(department, response.data)
      showData(response.data)
      CURRENT_CARD = 0
      CURRENT_DEPARTMENT = department
      showCurrentCard()
      // which section is active, show that section
      if (artExplorerActive === true) {
        $(".art_explorer").show()
        $(".flashcards").hide()
        $("#home-button").addClass("active")
        $("#flashcards-button").removeClass("active")
      } else {
        $(".flashcards").show()
        $(".art_explorer").hide()
        $("#flashcards-button").addClass("active")
        $("#home-button").removeClass("active")
      }
    })
  $(this).addClass("active")
})

$("#home-button").on("click", function () {
  $(".art_explorer").show()
  $(".flashcards").hide()
  $("#home-button").addClass("active")
  $("#flashcards-button").removeClass("active")
})

$("#flashcards-button").on("click", function () {
  $(".art_explorer").hide()
  $("#flashcards-button").addClass("active")
  $("#home-button").removeClass("active")
  if (!CURRENT_DEPARTMENT) return
  // pass the cached data to the flashcards app section
  showCurrentCard()
  // show the flashcard set
  $(".flashcards").show()
})

// dynamic elements do not exist until created by earlier functions
function addEventHandlers() {
  $(".card-front").on("click", function () {
    showBack()
  })

  $(".card-back").on("click", function () {
    showFront()
  })

}

$("body").on("keyup", function (event) {
  if (event.originalEvent.code === "Enter") {
    console.log("Enter key pressed")
    const backShowing = $(".card-front")[0].style.display === "none"
    if (backShowing) {
      showFront()
    } else {
      showBack()
    }
  }
  if (event.originalEvent.code === "Comma") {
    previousCard()
  }
  if (event.originalEvent.code === "Period") {
    nextCard()
  }
})

$("#next").on("click", () => {
  nextCard()
})

$("#previous").on("click", () => {
  previousCard()
})
