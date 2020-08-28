/**
 * Created by chris on 06/05/16.
 */
angular.module('madportalen').controller("newPasswordCtrl",
    function ($scope, $http, userService, dialogService)
    {
        $scope.user = {};

        $scope.newPassword = function ()
        {
            if($scope.user.password === $scope.user.password2)
            {
                userService.newPassword({
                    password: $scope.user.password
                }, function(success) {
                    if (!success) {
                        dialogService.showServerError();
                    }
                });
            }
        }
    });
