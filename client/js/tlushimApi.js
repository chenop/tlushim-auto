/**
 * Created by Chen on 26/02/2016.
 */

angular.module('tlushim-auto')
    .factory('tlushimApi', function($http) {
        var public = {};
        var DIRECTION = {
            IN: "IN",
            OUT: "OT"
        }

        public.enter = function(userData) {
            console.log("enter tlusim with: ", userData);

        }

        public.exit = function(userData) {
            console.log("exit tlusim with: ", userData);
        }

        function tlushimLogin(userData) {
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

        function clockIn(jobId) {
            var formData = new FormData();
            formData.append('job', jobId);
            formData.append('direc', DIRECTION.IN);

            return $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/main.php?op=post_clock',
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
        }

        function clockOut(jobId) {
            var formData = new FormData();
            formData.append('job', jobId);
            formData.append('direc', DIRECTION.OUT);

            return $http({
                method: 'POST',
                url: 'https://www.tlushim.co.il/main.php?op=post_clock', // TODO chen set the right Url
                data: formData,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity,
            })
        }

        public.login = function(userData, callBack) {
            return tlushimLogin(userData)
                .then(function (result) {
                    return clockIn(0)
                        .then(function() {
                            return clockIn(501)
                                .then(function() {
                                    if (callBack)
                                        return callBack();
                                });
                        });
                })
        }

        public.logout = function(userData, callBack) {
            return tlushimLogin(userData)
                .then(function (result) {
                    return clockOut(0)
                        .then(function() {
                            if (callBack)
                                return callBack();
                        });
                })
        }

        return public;
    })