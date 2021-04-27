export default class ClevelandArt {
  static getArt(department) {
    return fetch(`https://openaccess-api.clevelandart.org/api/artworks/?department=${department}&has_image=1&limit=30`)
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


