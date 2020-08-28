angular.module("madportalen").controller("activateEmailCtrl",
    function ($scope, $http, $state, $stateParams, dialogService)
    {
        activateEmail();
        
        function activateEmail()
        {
            $http({
                method: 'PATCH',
                url: '/api/user/activateEmail',
                headers: {'x-access-token': $stateParams.token}
            }).then(function (response)
            {

            }, dialogService.showServerError);
        }
    });

