/**
 * Created by Chen on 26/02/2016.
 */

angular.module('tlushim-auto')
    .factory('notificationService', function (tlushimApi) {

        var public = {};
        init();

        function init() {

            // request permission on page load
            document.addEventListener('DOMContentLoaded', function () {
                if (Notification.permission !== "granted")
                    Notification.requestPermission();
            });
        }

        public.notify = function(title, body, callBack, icon) {
            console.log("inside notifyMe");
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
                    icon: (!icon) ? 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png' : icon,
                    body: body,
                });

                notification.onclick = function () {
                    window.open("http://stackoverflow.com/a/13328397/1269037");
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