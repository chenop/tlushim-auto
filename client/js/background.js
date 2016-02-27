/**
 * Created by Chen on 23/02/2016.
 */

console.log('background is here...');
var userData;

// you can add more and more dependencies as long as it is declared in the manifest.json
var tlushimAuto = angular.module('tlushim-auto');

// since we don't have any html doc to use ngApp, we have to bootstrap our angular app from here
angular.element(document).ready(function () {
    angular.bootstrap(document, ['tlushim-auto']);
});

tlushimAuto.run(function (managerService) {
    managerService.registerAlarms();
});