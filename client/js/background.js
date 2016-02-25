/**
 * Created by Chen on 23/02/2016.
 */

console.log('background is here...');

var date = new Date();
var enterDateInMilisec = date.setHours(9);


chrome.alarms.create("enterAlarm", {
    'when': enterDateInMilisec
    , 'delayInMinutes': null
    , 'periodInMinutes' : 1 //24 * 60 // daily
})

chrome.alarms.onAlarm.addListener(function() {
    console.log('alarm!');
})

