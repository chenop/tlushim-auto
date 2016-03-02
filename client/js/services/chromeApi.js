/**
 * Created by Chen on 26/02/2016.
 */

angular.module('tlushim-auto')
    .factory('chromeApi', function(notificationService) {
        var public = {};

        public.get = function(callBack) {
            chrome.storage.sync.get(['idNum', 'password', 'selectedMission', 'enterTime', 'exitTime'], function (items) {
                // Notify that we saved.
                var data = {
                    idNum: items['idNum']
                    , password: items['password']
                    , selectedMission: items['selectedMission']
                    , enterTime: items['enterTime']
                    , exitTime: items['exitTime']
                }
                if (callBack)
                    callBack(data);
            });
        }

        public.set = function(data, callBack) {
            chrome.storage.sync.set(data, function() {
                // Notify that we saved.
                if (callBack)
                    callBack(data);
            });
        }

        public.registerAlarm = function(alaramName, when, periodInMinutes) {
            chrome.alarms.create(alaramName, {
                'when': when
                , 'delayInMinutes': null
                , 'periodInMinutes' : periodInMinutes
            })
        }

        public.onAlarm = function(callBack) {
            chrome.alarms.onAlarm.addListener(callBack);
        }

        return public;
    })