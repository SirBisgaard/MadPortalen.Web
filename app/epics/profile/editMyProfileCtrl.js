/* Created by Christoffer */
angular.module('madportalen').controller("editMyProfileCtrl",
    function ($scope, $state, userService, authService, fileService, dialogService) {
        var now = "rand=" + Date.now();

        var loadUser = function () {
            var user = userService.get({
                id: authService.getUser().id
            }, function () {
                $scope.user = user;
                $scope.profilePictureURL = user.pictureLocation + "?" + now;
            }, function () {
                dialogService.showServerError();
            });
        }

        $scope.uploadPicture = function () {
            var file = $scope.profilePicture;
            if (file) {
                fileService.uploadFileToUrl(file, "/api/user/" + authService.getUser().id + "/profilePicture", function (error) {
                    if (error) {
                        dialogService.showServerError();
                    }
                    else {
                        dialogService.showOkay('Billede gemt', 'Fortag rettelser og tryk på godkend for at gemme ændringerne');
                        loadUser();
                    }
                });
            }
            else {
                dialogService.showOkay("Fejl!", "Du skal vælge et billede!");
            }
        };

        $scope.editUser = function () {
            $scope.user.$update({
                id: authService.getUser().id
            }, function () {
                $state.go("home.viewProfile", { "id": authService.getUser().id });
            }, dialogService.showServerError);
        }

        loadUser();
    });
