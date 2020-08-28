/* Created by Christoffer */
angular.module('madportalen').controller("resetPasswordCtrl",
    function ($scope, $http, $state, dialogService)
    {
        $scope.user = {};

        $scope.resetUser = function ()
        {
            $http({
                method: 'POST',
                url: '/api/user/resetPassword',
                data: {
                    email: $scope.user.emailadresse
                }
            }).then(function (response)
            {
                dialogService.showOkay("Husk!","Dit kodeord er blevet nulstillet, tjek din mail for at oprette et nyt kodeord");
                $state.go("login");
            }, dialogService.showServerError);
        }
    });