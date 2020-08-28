/* Created by Anders modified by Martin */
angular.module("madportalen").controller("frontPageCtrl",
    function ($scope, $state, recipeService, dialogService, userService, authService)
    {
        $scope.loggedInUser = authService.getUser();

        $scope.recipes = recipeService.queryTopRated({}, function ()
        {
        }, dialogService.showServerError);

        $scope.reloadUsers = function () {
            var users = userService.queryTopFollowed({}, function () {
                $scope.users = users;
            }, dialogService.showServerError);
        }
        
        $scope.toggleTopRatedRecipes = function ()
        {
            $('#topRatedRecipes').toggle();
        };

        $scope.toggleTopFollowedUsers = function ()
        {
            $('#topFollowedUsers').toggle();
        };

        $scope.reloadUsers();
    });