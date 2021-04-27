import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import ClevelandArt from './api-service.js'

// function getData(response) {
//   if (response.) {

//   }
// }


$("button").click(function (event) {
  console.log(event.currentTarget)
  const department = event.currentTarget.id.trim()
  console.log(department)
  ClevelandArt.getArt(department)
    .then(function (response) {
      console.log(response)
      // getData(response);
    })
})


