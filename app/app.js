var app = angular.module('madportalen', ['ngResource', 'ui.router', 'ui.bootstrap', 'ngCookies']);

app.config(
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('login');

        // States before login
        $stateProvider.state(
            "login",
            {
                url: "/login",
                controller: "loginCtrl",
                templateUrl: "/app/epics/login/login.html",
                onEnter: function ($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go("home.frontPage");
                    }
                }
            }).state(
            "signUpForm",
            {
                url: "/ny-bruger",
                controller: "userSignUpCtrl",
                templateUrl: "/app/epics/login/userSignUp.html",
                onEnter: function ($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go("home.frontPage");
                    }
                }
            }).state(
            "resetPasswordForm",
            {
                url: "/reset-password",
                controller: "resetPasswordCtrl",
                templateUrl: "/app/epics/login/resetPassword.html",
                onEnter: function ($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go("home.frontPage");
                    }
                }
            }).state(
            "activateEmail",
            {
                url: "/activateEmail/:token",
                controller: "activateEmailCtrl",
                templateUrl: "/app/epics/login/activateEmail.html",
                onEnter: function ($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go("home.frontPage");
                    }
                }
            }).state(
                "newPasswordForm",
            {
                url: "/newPassword/:token",
                controller: "newPasswordCtrl",
                templateUrl: "/app/epics/login/newPassword.html",
                onEnter: function ($state, authService) {
                    if (authService.isLoggedIn()) {
                        $state.go("home.frontPage");
                    }
                }
            });

        // States after login
        $stateProvider.state(
            "home",
            {
                url: "/hjem",
                controller: 'homeCtrl',
                templateUrl: "app/epics/home/home.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.frontPage",
            {
                url: "/forside",
                controller: "frontPageCtrl",
                templateUrl: "app/epics/frontPage/frontPageView.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.createRecipe",
            {
                url: "/opskrift/ny",
                controller: "createRecipeCtrl",
                templateUrl: "app/epics/recipe/createRecipe.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.personalCookbook",
            {
                url: "/personlig-kogebog",
                controller: "viewMyCookbookCtrl",
                templateUrl: "app/epics/cookbook/viewMyCookbook.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.viewRecipe",
            {
                url: "/opskrift/:id",
                controller: "viewRecipeCtrl",
                params: { "id": null },
                templateUrl: "app/epics/recipe/viewRecipe.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.editRecipe",
            {
                url: "/opskrift/:id/ret",
                controller: "editRecipeCtrl",
                params: { "id": null },
                templateUrl: "app/epics/recipe/editRecipe.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.refrigerator",
            {
                url: "/koleskab",
                controller: "refrigeratorCtrl",
                templateUrl: "app/epics/refridgerator/refrigerator.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.viewProfile",
            {
                url: "/profil/:id",
                controller: "viewProfileCtrl",
                templateUrl: "app/epics/profile/viewProfile.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.editMyProfile",
            {
                url: "/profil/:id/ret",
                controller: "editMyProfileCtrl",
                templateUrl: "app/epics/profile/editMyProfile.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.viewTipsAndTricks",
            {
                url: "/tips-og-tricks",
                templateUrl: "app/epics/tipsAndTricks/viewTipsAndTricks.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.createMealPlan",
            {
                url: "/madplan/ny",
                templateUrl: "/app/epics/mealPlan/createMealPlan.html",
                controller: "createMealPlanCtrl",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.viewMealPlan",
            {
                url: "/viewMealPlan/:id",
                controller: "viewMealPlanCtrl",
                params: { "id": null },
                templateUrl: "app/epics/mealPlan/viewMealPlan.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.viewMealPlanList",
            {
                url: "/viewMealPlanList",
                controller: "viewMealPlanListCtrl",
                templateUrl: "app/epics/mealPlan/viewMealPlanList.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }).state(
            "home.editMealPlan",
            {
                url: "/editMealPlan/:id",
                controller: "editMealPlanCtrl",
                templateUrl: "app/epics/mealPlan/editMealPlan.html",
                onEnter: function ($state, authService) {
                    if (!authService.isLoggedIn()) {
                        $state.go("login");
                    }
                }
            }
        )
    });