export default class ClevelandArt {
  static getArt(department) {
    let skip = determineSkip(department)
    return fetch(`https://openaccess-api.clevelandart.org/api/artworks/?department=${department}&has_image=1&limit=30&skip=${skip}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      })
  }
}

function determineSkip(department) {
  // department random skip lengths
  // European = 715 European%20Painting%20and%20Sculpture 715 / 30 results per page ~= 23 pages of results
  // Art of the Americas = 946 Art%20of%20the%20Americas 946 / 30 ~= 31
  // African Art = 345 African%20Art
  // Japanese Art = 2498 Japanese%20Art
  if (department === "European%20Painting%20and%20Sculpture") return Math.floor(Math.random() * 23)
  if (department === "Art%20of%20the%20Americas") return Math.floor(Math.random() * 31)
  if (department === "African%20Art") return Math.floor(Math.random() * 11)
  if (department === "Japanese%20Art") return Math.floor(Math.random() * 82)
  return 0
}

