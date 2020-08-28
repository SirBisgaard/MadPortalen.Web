/* Created by Christoffer and Christine */
angular.module('madportalen').controller("userSignUpCtrl",
    function ($scope, $http, $state, dialogService)
    {
        $scope.user = {};

        $scope.saveUser = function ()
        {
            $http({
                method: 'POST',
                url: '/api/user',
                data: {
                    authorName: $scope.user.authorname,
                    password: $scope.user.password,
                    firstName: $scope.user.firstname,
                    lastName: $scope.user.lastname,
                    email: $scope.user.emailadresse,
                    description: $scope.user.description
                }
            }).then(function (response)
            {
                dialogService.showOkay("Success", "Din profil er blevet oprettet, tjek din mailboks for aktivering Email.");
                $state.go("login");
            }, dialogService.showServerError);
        }
    });