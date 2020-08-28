/*  Dialog Service  */
angular.module("madportalen").factory('dialogService', function ($resource, $uibModal, authService) {
    var _static = {
        YESNO: 0,
        OKAY: 1
    };

    function openModal(data, callback) {
        if (!callback) {
            callback = function () { };
        }
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/app/epics/dialog/dialogModalView.html',
            controller: 'dialogModalCtrl',
            resolve: {
                items: function () {
                    return {
                        static: _static,
                        type: data.type,
                        title: data.title,
                        body: data.body,
                        callback: callback
                    };
                }
            }
        });
    }

    return {
        showComfirm: function (title, message, callback) {
            openModal({
                type: 0,
                title: title,
                body: message
            }, callback);
        },

        showOkay: function (title, message, callback) {
            openModal({
                type: 1,
                title: title,
                body: message
            }, callback);
        },

        showServerError: function () {
            openModal({
                type: 1,
                title: "Der skete en server fejl.",
                body: "Bare rolig, vi er allerede igang med at rette fejlen!\nDog prøv igen senere, tak!"
            });
        }
    };
});