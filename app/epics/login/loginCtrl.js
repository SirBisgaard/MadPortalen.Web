/* Created by Anders modified by Martin */
angular.module("madportalen").controller("loginCtrl",
function ($scope, $state, authService, dialogService)
{
    authService.hasStoredLogin(function (success) {
        if (success) {
            $state.go("home.frontPage");
        }
    });

    $scope.userLogin = function ()
    {
        if ($scope.loginForm.$valid)
        {
            authService.login({
                email: $scope.username, password: $scope.password
            }, function (success, message)
            {
                if (success)
                {
                    $state.go("home.frontPage");
                }
                else
                {
                    dialogService.showOkay("Fejl!", message);
                }
            });
            
        }
    };

});
