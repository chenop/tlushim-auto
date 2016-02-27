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

        function tlushimLogin() {
            if (!userData.idNum || !userData.password)
                console.log('userData is not valid - missing idNum or password fields', userData);

            var formData = new FormData();
            formData.append('id_num', userData.idNum);
            formData.append('password', userData.password);
            formData.append('connect', "התחברות");

            return $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/login.php',
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
                //headers: {'Content-Type': 'multipart/form-data'}  // set the headers so angular passing info as form data (not request payload)
            })
        }

        function clockIn() {
            var formData = new FormData();

            return $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/main.php?op=post_clock',
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
        }

        function clockOut() {
            var formData = new FormData();

            return $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/main.php?op=post_clock', // TODO chen set the right Url
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
        }

        public.login = function(userData) {
            tlushimLogin(userData)
                .then(function (result) {
                    return clockIn();
                })
        }

        public.logout = function(userData) {
            tlushimLogin(userData)
                .then(function (result) {
                    return clockOut();
                })
        }

        return public;
    })