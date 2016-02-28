/**
 * Created by Chen on 27/02/2016.
 */

angular.module('tlushim-auto')
    .factory('managerService', function (tlushimApi, notificationService, chromeApi) {
        var public = {};
        var ENTER_ALARM_NAME = "enterAlarm";
        var EXIT_ALARM_NAME = "exitAlarm";
        var ENTER_DATE_IN_MILISEC = new Date().setHours(9);
        var EXIT_DATE_IN_MILISEC = new Date().setHours(16);
        var userData;

        public.setUserData = function(userData, callBack) {
            chromeApi.set(userData, callBack);
        }

        public.getUserData = function(callBack) {
            chromeApi.get(function (data) {
                if (callBack)
                    callBack(data);
            });
        }

        public.tlushimLogin = function(userData, callBack) {
            return tlushimApi.login(userData, callBack);
        }

        public.tlushimLogout = function(userData, callBack) {
            return tlushimApi.logout(userData, callBack);
        }

        public.displayEnterNotification = function(userData) {
            public.getUserData(function (userData) {
                notificationService.notify("Login Reminder", "", function () {
                });
            });
        }

        function displayExitNotification(userData) {
            public.getUserData(function(userData) {
                notificationService.notify("Logout Reminder", "", function () {
                });
            });
        }

        public.registerAlarms = function() {
            chromeApi.registerAlarm(ENTER_ALARM_NAME, ENTER_DATE_IN_MILISEC, 24*60);
            chromeApi.registerAlarm(EXIT_ALARM_NAME, EXIT_DATE_IN_MILISEC, 24*60);

            chromeApi.onAlarm(function(alarm) {
                switch (alarm.name) {
                    case ENTER_ALARM_NAME: {
                        console.log('enter alarm! ' + new Date());
                        public.displayEnterNotification(userData);
                        break;
                    }
                    case EXIT_ALARM_NAME: {
                        console.log('exit alarm! ' + new Date());
                        displayExitNotification(userData);
                        break;
                    }
                }
                console.log('enter alarm! ' + new Date());
            })
        };

        public.fetchMissions = function(userData) {
            return tlushimApi.fetchMissions(userData);
        }

        return public;
    })
