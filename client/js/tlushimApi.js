/**
 * Created by Chen on 26/02/2016.
 */

angular.module('tlushim-auto')
    .factory('tlushimApi', function($http) {
        var public = {};

        public.enter = function(userData) {
            console.log("enter tlusim with: ", userData);

        }

        public.exit = function(userData) {
            console.log("exit tlusim with: ", userData);
        }

        public.login = function(userData) {
            if (!userData.idNum || !userData.password)
                console.log('userData is not valid - missing idNum or password fields', userData);

            var formData = new FormData();
            formData.append('id_num', userData.idNum);
            formData.append('password', userData.password);
            formData.append('connect', "התחברות");

            $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/login.php',
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                //headers: {'Content-Type': 'multipart/form-data'}  // set the headers so angular passing info as form data (not request payload)
            }).then(function (result) {
                console.log(result);
            })
        }

        public.logout = function(userData) {
            //if (!userData.idNum || !userData.password)
            //    console.log('userData is not valid - missing idNum or password fields', userData);
            //
            //var formData = new FormData();
            //formData.append('id_num', userData.idNum);
            //formData.append('password', userData.password);
            //formData.append('connect', "התחברות");
            //
            //$http({
            //    method: 'POST',
            //    url: 'https://www.tlushim.co.il/login.php',
            //    data: formData,
            //    headers: { 'Content-Type': undefined },
            //    transformRequest: angular.identity,
            //    //headers: {'Content-Type': 'multipart/form-data'}  // set the headers so angular passing info as form data (not request payload)
            //}).then(function (result) {
            //    console.log(result);
            //})
        }

        return public;
    })