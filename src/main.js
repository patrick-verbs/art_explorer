import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'

console.log($)
// function getData(response) {
//   if (response.) {
    
//   }
// }

$('#Art%20of%20the%20Americas').click(function() {
  let department = 'Art%20of%20the%20Americas'
  ClevelandArt.getArt(department)
    .then(function(response) {
      getData(response);
    })
})