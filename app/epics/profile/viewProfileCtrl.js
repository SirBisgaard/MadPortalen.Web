angular.module("madportalen").controller("viewProfileCtrl",
    function ($scope, $state, userService, recipeService, authService, dialogService, mealPlanService) {
        var now = "rand=" + Date.now();

        var load = function () {
            $scope.loggedInUser = authService.getUser();

            $scope.user = userService.get({
                id: $state.params.id
            }, function () {
                $scope.profilePictureURL = $scope.user.pictureLocation + "?" + now;

                $scope.recipes = recipeService.query({
                    data: {
                        createdBy: $scope.user.id
                    }
                }, function () {
                }, dialogService.showServerError);

                $scope.mealPlans = mealPlanService.query({
                    data: {
                        createdBy: $scope.user.id
                    }
                }, function () {
                }, dialogService.showServerError);
                
            }, dialogService.showServerError);
        };

        $scope.isFollowing = function () {
            var followers = $scope.user.followers;
            
            if (!followers)
            {
                return false;
            }

            return followers.indexOf(authService.getUser().id) > -1;
        };

        $scope.startFollow = function () {
            userService.follow({
                id: $state.params.id
            }, function () {
                load();
            }, dialogService.showServerError);
        };

        $scope.unFollow = function () {
            userService.unfollow({
                id: $state.params.id
            }, function () {
                load();
            }, dialogService.showServerError);
        };

        $scope.toggleRecipes = function ()
        {
            $('#profileRecipes').toggle();
        };

        $scope.toggleMealPlans = function ()
        {
            $('#profileMealPlans').toggle();
        };

        load();
    });