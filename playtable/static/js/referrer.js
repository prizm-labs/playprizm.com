var cookies = require('browser-cookies');
var queryString = require('query-string');
var base64 = require('js-base64');

// collect as much tracking information as possible 
// tracking event will be sent by each page with customized tracking script

var qsparams = queryString.parse(location.search);
console.log(qsparams);

var trackingPeriod = 6 * 60 * 60 * 1000;
var trackingExpirationDate = new Date( trackingPeriod + new Date().getMilliseconds() );

var referrerOrigin = "http://localhost";
var referrerCookieKey = "rc";
var lastReferrerCookieKey = "rc-cache";
var channel = "unknown";

var referrerCookie = cookies.get(referrerCookieKey);

var trackingInfo = {
  "channel":"unknown",
  "lastChannel":"unknown",
  "isInFunnel":false,
  "refFromGAd":false,
  "refFromFBAd":false
};

// first,
// get referrer channel from query string params
if (qsparams[referrerCookieKey]) {

  console.log("found qs params");

  switch ( parseInt(qsparams["rc"]) ) {
    case 1:
      channel = "email_aweber";
      break;
    case 2:
      channel = "ad_facebook";
      break;
    case 3:
      channel = "ad_google";
      break;
    case 4:
      channel = "ad_bgg";
      break;
    default:
      channel = "unknown";
      break;
  }
// set cookie for visitor from this channel

cookies.set(referrerCookieKey, channel, {expires: trackingExpirationDate });
cookies.set(lastReferrerCookieKey, channel, {expires: 365});

trackingInfo["isInFunnel"] = true;


// then try,
// get referrer channel from cookie
} else if (referrerCookie != null) {

  console.log("found ref cookie");

channel = referrerCookie;
trackingInfo["isInFunnel"] = true;


// last,
// get referrer from document
} else if (document.referrer != "") {

  console.log("found document ref");

  if (document.referrer.indexOf("facebook")!=-1) {
    channel = "facebook"

  } else if (document.referrer.indexOf("google")!=-1) {
    channel = "google"
  } 


} else {
  console.log("no ref found");
  channel = "unknown";
}


var lastChannel = cookies.get(lastReferrerCookieKey);
if (lastChannel != null) {
  trackingInfo["lastChannel"] = lastChannel;
}


trackingInfo["channel"] = channel;

console.log(trackingInfo);
console.log(cookies.get(referrerCookieKey)); 
console.log(cookies.get(lastReferrerCookieKey)); 

function clearTracking() {
  cookies.erase(referrerCookieKey);
  cookies.erase(lastReferrerCookieKey);
  console.log("clearTracking");
}

 
window.trackingInfo = trackingInfo;
window.clearTracking = clearTracking;
window.Base64 = base64;