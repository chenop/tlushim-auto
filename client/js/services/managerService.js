/**
 * Created by Chen on 27/02/2016.
 */

angular.module('tlushim-auto')
    .factory('managerService', function (tlushimApi, notificationService, chromeApi) {
        var public = {};
        var ENTER_ALARM_NAME = "enterAlarm";
        var EXIT_ALARM_NAME = "exitAlarm";
        var ENTER_DATE_IN_MILISEC = new Date().setHours(8);
        var EXIT_DATE_IN_MILISEC = new Date().setHours(15);
        var userData;

        function setUserData (userData, callBack) {
            chromeApi.set(userData, callBack);
        }

        public.setUserData = setUserData;

        function hasHappenedToday(time) {
            if (!time)
                return false;

            //Get today's date
            var today = new Date();

            //call setHours to take the time out of the comparison
            return (new Date(time).setHours(0,0,0,0) == today.setHours(0,0,0,0));
        }

        public.getUserData = function(callBack) {
            chromeApi.get(function (data) {
                data['wasAlreadyEnterToday'] = hasHappenedToday(data['enterTime']);
                data['wasAlreadyExitToday'] = hasHappenedToday(data['exitTime']);

                if (callBack)
                    callBack(data);
            });
        }

        public.tlushimLogin = function(userData, callBack) {
            userData['enterTime'] = Date.now();

            setUserData(userData, function(userData) {
                return tlushimApi.login(userData, callBack);
            })
        }

        public.tlushimLogout = function(userData, callBack) {
            userData['exitTime'] = Date.now();

            setUserData(userData, function(userData) {
                return tlushimApi.logout(userData, callBack);
            })
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

        var isWorkDay = function () {
            var date = new Date();
            var day = date.getDay();

            return ((day === 0) || (day === 1) || (day === 2) || (day === 3) || (day === 4)); // work day is Sunday - Thursday
        };

        public.registerAlarms = function() {
            chromeApi.registerAlarm(ENTER_ALARM_NAME, ENTER_DATE_IN_MILISEC, 24*60);
            chromeApi.registerAlarm(EXIT_ALARM_NAME, EXIT_DATE_IN_MILISEC, 24*60);

            chromeApi.onAlarm(function(alarm) {
                switch (alarm.name) {
                    case ENTER_ALARM_NAME: {
                        if (isWorkDay())
                            public.displayEnterNotification(userData);
                        break;
                    }
                    case EXIT_ALARM_NAME: {
                        if (isWorkDay())
                            displayExitNotification(userData);
                        break;
                    }
                }
                console.log('enter alarm! ' + new Date());
            })
        };

        /**
         * Assuming its the first item
         */
        function removeGeneralMission(missions) {
            missions.splice(0, 1);
            return missions;
        }

        public.fetchMissions = function(userData) {
            setUserData(userData); // Save userData

            return tlushimApi.fetchMissions(userData)
                .then(function(missions) {
                    return removeGeneralMission(missions)
                });
        }

        public.testNotification = function() {
            notificationService.notify("Test Test Test", "");
        }

        public.isNotificationAllowed = function() {
            return notificationService.isNotificationAllowed();
        }
        return public;
    })
