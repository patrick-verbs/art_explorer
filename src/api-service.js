export default class ClevelandArt {
  static getArt(department) {
    return fetch(`https://openaccess-api.clevelandart.org/api/artworks/?department=${department}&limit=30&has_image=1`)
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


