export default function getLinksFromLocal() {
  let localLinks = JSON.parse(localStorage.getItem('links'));

    if(!localLinks) {
      localLinks = [];
    }

    console.log('GetLinksFromLocal:', localLinks.length);
    return localLinks;
}