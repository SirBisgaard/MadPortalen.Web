/*  User Service  */
angular.module("madportalen").factory('userService', function ($http, $stateParams, $resource, authService, $state, dialogService) {

    var userService = $resource('/api/user/:id', { id: "" }, {
        'get': {
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'update': {
            method: 'PATCH',
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'getCookbook': {
            method: 'GET',
            cache: false,
            url: "/api/user/:id/cookbook",
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'saveInCookbook': {
            method: 'PUT',
            url: "/api/user/:id/cookbook/:type/:tid",
            params: {
                id: '@id',
                type: '@type',
                tid: '@tid'
            },
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'deleteInCookbook': {
            method: 'DELETE',
            url: "/api/user/:id/cookbook/:type/:tid",
            params: {
                id: '@id',
                type: '@type',
                tid: '@tid'
            },
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'follow': {
            method: 'POST',
            url: "/api/user/:id/follow",
            params: {
                id: '@id'
            },
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'unfollow': {
            method: 'DELETE',
            url: "/api/user/:id/follow",
            params: {
                id: '@id'
            },
            headers: {
                "x-access-token": authService.getToken()
            }
        },
        'queryTopFollowed': {
            url: "/api/user/topFollowed",
            method: 'GET',
            cache: false,
            headers: {
                "x-access-token": authService.getToken()
            },
            isArray: true
        }
    });

    userService.newPassword = function (credentials, callback) {
        $http({
            method: 'PATCH',
            url: '/api/user/resetPassword/',
            headers: { 'x-access-token': $stateParams.token },
            data: {
                'password': credentials.password
            }
        }).then(
            function (response) {
                dialogService.showOkay("Madportalen", "Dit kodeord er blevet ændret");
                $state.go("login");
            }, function (reponse) {
                dialogService.showServerError();
            }
        )
    };

    userService.addSharedRecipeToCookbook = function (recipe_id) {
        userService.saveInCookbook({
            id: authService.getUser().id,
            type: "recipes",
            tid: recipe_id

        }, function () {
            authService.getUser().cookbook.recipes.push(recipe_id);
        },
            function () {
                dialogService.showServerError();
            });
    };


    userService.removeSharedRecipeFromCookbook = function (recipe_id) {
        userService.deleteInCookbook({
            id: authService.getUser().id,
            type: "recipes",
            tid: recipe_id

        }, function () {
            var recipeToRemove = authService.getUser().cookbook.recipes;
            var index = recipeToRemove.indexOf(recipe_id);
            recipeToRemove.splice(index, 1);
            if ($state.$current.name === "home.personalCookbook") {
                $state.reload();
            }
        },
            function () {
                dialogService.showServerError();
            });
    };

    userService.isRecipeInCookbook = function (recipe_id) {
        var isThere = false;
        var user = authService.getUser();
        if (user.cookbook.recipes) {
            for (var i = 0; i < user.cookbook.recipes.length; i++) {

                if (user.cookbook.recipes[i] === recipe_id) {
                    isThere = true;
                    break;
                }
            }
        }
        return isThere;
    };

    userService.isNotOwnerOfRecipe = function (recipe_createdBy_id) {
        var isNotOwner = true;
        var user = authService.getUser();
        if (user.id === recipe_createdBy_id) {
            isNotOwner = false;
        }
        return isNotOwner;
    };

    userService.isNotOwnerOfMealPlan = function (mealPlan_createdBy_id) {
        var isNotOwner = true;
        var user = authService.getUser();
        if (user.id === mealPlan_createdBy_id) {
            isNotOwner = false;
        }
        return isNotOwner;
    };
    
    return userService;
});