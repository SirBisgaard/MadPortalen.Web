/* Created by Martin */
angular.module("madportalen").controller("homeCtrl",
    function ($scope, $state, authService)
{
        $scope.user = authService.getUser();

    $scope.logoff = function ()
    {
        authService.logout();
        $state.go("login");
    };
    
    $scope.goToSearch = function () {
        $state.go("home.refrigerator");
    }
});