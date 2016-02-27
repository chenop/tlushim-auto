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

        public.setUserData = function(userData) {
            chromeApi.set(userData);
        }

        public.getUserData = function(callBack) {
            chromeApi.get(function (data) {
                if (callBack)
                    callBack(data);
            });
        }

        public.displayEnterNotification = function() {
            notificationService.notify("Login Reminder", "", function () {
                tlushimApi.enter(userData);
            });
        }

        function displayExitNotification() {
            notificationService.notify("Logout Reminder", "", function () {
                tlushimApi.exit(userData);
            });
        }

        public.registerAlarms = function() {
            chromeApi.registerAlarm(ENTER_ALARM_NAME, ENTER_DATE_IN_MILISEC, 1);
            chromeApi.registerAlarm(EXIT_ALARM_NAME, EXIT_DATE_IN_MILISEC, 1);

            chromeApi.onAlarm(function(alarm) {
                switch (alarm.name) {
                    case ENTER_ALARM_NAME: {
                        public.displayEnterNotification();
                        break;
                    }
                    case EXIT_ALARM_NAME: {
                        displayExitNotification();
                        break;
                    }
                }
                console.log('alarm! ' + new Date());
                console.log(alarm);
            })
        };

        return public;
    })
