/* worldstarchicken.js - version 'boksbike reduced' */
'use strict';

var wsc = {  // worldstarchicken global
  index: 0,
  inter: 0,
  burger: document.getElementById('burger'),
  closer: document.getElementById('closer'),
  navboard: document.getElementById('navboard'),
/*mapper: document.getElementById('mapper'),
  teaser: document.getElementById('teaser'),*/
  newsl: document.getElementById('newsletter'),
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  feedb: document.getElementById('feedback'),
/*xhr: new XMLHttpRequest(),*/
  xhp: new XMLHttpRequest(),
/*getapi: 'https://script.google.com/macros/s/AKfycbxV7ykAUdQs1hmbA4LnzIzAmXvys9o4CZoSpMAeQrlgOT4-rqE/exec',*/
  postapi: 'https://script.google.com/macros/s/AKfycbztxTP03byFBF4BEQzI-jZs4W1I2YPh0Z4-icI3XX8Vu9GyVaSy/exec',
/*gmapkey: 'AIzaSyDpkWhGUaeVllPoBYwPjMt62ZdF1vCo6xU'*/
};

/* gmap renderer
function initMap() {
  const LATLNG = {lat: wsc.latitude, lng: wsc.longitude};
  const map = new google.maps.Map(document.getElementById('mapper'), {
    zoom: 15,
    center: {lat: LATLNG.lat + 0.001, lng: LATLNG.lng},  // making pointer visible
    scrollwheel: false
  });
  const marker = new google.maps.Marker({
    position: LATLNG,
    map: map,
    title: 'Get them chickens!',
    icon: './img/worldstarpointer.svg'
  });
}
*/

/* fading banners */
function clearDiv() {
  const banners = Array.from(document.getElementsByClassName('banner'));
  banners.splice(wsc.index, 1);  // remaining elements
  banners.forEach((v, i, a) => v.style.display = 'none');
}

function showDiv() {
  const banners = Array.from(document.getElementsByClassName('banner'));
  banners[wsc.index].className = 'banner fadeout';  // fadeout old
  wsc.index++;
  if (wsc.index === banners.length) wsc.index = 0;  // reset if index out of bounds
  banners[wsc.index].style.display = 'block';  // make current visible
  banners[wsc.index].className = 'banner fadein';  // fadeinn new
  window.setTimeout(window.clearDiv, 2000);  // erase once animation has finished
}

/* starting endless fading */
window.showDiv();
wsc.inter = window.setInterval(window.showDiv, 5000);

/* navigation actions */
wsc.burger.addEventListener('click', e => {
  const banners = Array.from(document.getElementsByClassName('banner'));
  banners.forEach((v, i, a) => v.className = 'banner');  // killing animation avoiding flickery
  window.clearInterval(wsc.inter);  // stopping interval cause it breaks navboard
  wsc.navboard.style.display = 'block';  // show the div
});
wsc.closer.addEventListener('click', e => {
  wsc.navboard.style.display = 'none';
  wsc.inter = window.setInterval(window.showDiv, 5000);  // restart interval
});

/* fetching chicken chop event data
wsc.xhr.open('GET', wsc.getapi, true);
wsc.xhr.addEventListener('load', e => {
  if (wsc.xhr.status === 200) {
    const s = document.createElement('script');
    const re = JSON.parse(wsc.xhr.responseText);  // parsing JSON
    wsc.date = re[0][0];
    wsc.latitude = Number(re[0][1]);
    wsc.longitude = Number(re[0][2]);
    wsc.location = re[0][3];
    s.src = `https://maps.googleapis.com/maps/api/js?key=${wsc.gmapkey}&callback=initMap`;
    document.head.appendChild(s);
    wsc.teaser.innerHTML = `Come chop some chicken!<br>When: ${wsc.date}<br>Where: ${wsc.location}`;
  } else {
    console.log(wsc.xhr.status);
  }
});
wsc.xhr.send();
 */

/* posting */
wsc.newsl.addEventListener('submit', e => {
  const name = wsc.name.value;
  const email = wsc.email.value;
  wsc.xhp.open('POST', `${wsc.postapi}?name=${name}&email=${email}`, true);
  wsc.xhp.addEventListener('load', e => {
    if (wsc.xhp.status === 200) {
      wsc.feedb.innerHTML = '<svg width="24" height="24">' +
        '<rect x="2" y="9" width="22" height="6" fill="#000"' +  // #25d300
        'style="transform-origin: center center; transform: rotate(-55deg);"/>' +
        '<rect x="2" y="13" width="5" height="6" fill="#000"' +
        'style="transform-origin: center center; transform: rotate(35deg);"/>' +
        '</svg> Thanks 4 subscribing!';
      wsc.name.value = wsc.email.value = '';
    } else {
      console.log(wsc.xhp.status);
    }
  });
  wsc.xhp.send();
  e.preventDefault();
});
