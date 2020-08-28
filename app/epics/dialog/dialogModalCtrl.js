angular.module('madportalen').controller('dialogModalCtrl', function ($scope, $uibModalInstance, items) {
    $scope.content = items;
    $scope.static = items.static;
    $scope.type = items.type;

    var positive = function () {
        $uibModalInstance.close();
        items.callback(true);
    }

    var negative = function () {
        $uibModalInstance.dismiss();
        items.callback(false);
    }

    $scope.ok = positive;
    $scope.yes = positive;
    $scope.no = negative;
});