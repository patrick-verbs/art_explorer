import $ from 'jquery'

$("body").on("keyup", event => {
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