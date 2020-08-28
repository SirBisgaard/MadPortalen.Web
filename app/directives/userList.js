app.directive('userList', function (userService, authService, $state, dialogService) {

    return {
        restrict: 'E',
        replace:true,
        scope: {
            users: '=',
            loggedInUser: '=',
            reloadUsers: '&',
        },
        templateUrl: '/app/directives/userList.html',
        link: function (scope) {
            var now = "rand=" + Date.now();
            scope.createUserUrl = function(user){
                return user.pictureLocation + "?" + now;
                
            };

            scope.isFollowingList = function (user) {
                var followers = user.followers;

                if (!followers)
                {
                    return false;
                }

                return followers.indexOf(authService.getUser().id) > -1;
            };

            scope.startFollowList = function (user) {
                userService.follow({
                    id: user.id
                }, function () {
                    scope.reloadUsers();
                }, dialogService.showServerError);
            };

            scope.unFollowList = function (user) {
                userService.unfollow({
                    id: user.id
                }, function () {
                    scope.reloadUsers();
                }, dialogService.showServerError);
            };

        }
    };
});