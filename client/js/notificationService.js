/**
 * Created by Chen on 26/02/2016.
 */

angular.module('tlushim-auto')
    .factory('notificationService', function (tlushimApi) {

        var public = {};
        var ICON_BELL_URL = 'http://icons.iconseeker.com/png/128/winter-wonderland/bell-6.png';

        init();

        function init() {

            // request permission on page load
            document.addEventListener('DOMContentLoaded', function () {
                if (Notification.permission !== "granted")
                    Notification.requestPermission();
            });
        }

        public.notify = function(title, body, callBack, icon) {
            if (!Notification) {
                alert('Desktop notifications not available in your browser. Try Chromium.');
                return;
            }

            if (Notification.permission !== "granted") {
                console.log("No permission to open notification - please grant a permission in the alert window...");
                Notification.requestPermission();
            }
            else {
                var notification = new Notification(title, {
                    icon: (!icon) ? ICON_BELL_URL : icon,
                    body: body,
                });

                notification.onclick = function () {
                    if (callBack)
                        callBack();
                };
            }
        }

        public.displayEnterNotification = function (callBack) {
            notify(
                "Login Reminder"
                , ""
                , callBack
            );
        }

        public.displayExitNotification = function (callBack) {
            notify(
                "Logout Reminder"
                , ""
                , callBack
            );
        }

        return public;
    });