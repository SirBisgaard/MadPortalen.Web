/**
 * Created by christine on 17/05/16.
 */
angular.module('madportalen').controller('selectDayPopUpCtrl', function ($scope, $rootScope, $uibModalInstance, id) {
    $scope.pickedDayObject;
    $scope.days = $rootScope.days;

    $scope.setPickedDay = function(day){
        $scope.pickedDayObject = day;
    };

//  knapper i popup
    $scope.close = function () {
        $uibModalInstance.dismiss('Annuller');
    };

    $scope.save = function(){
        $rootScope.addRecipeIdToMP(id, $scope.pickedDayObject.nameOfDay);
        $rootScope.addRecipeObjToMP(id, $scope.pickedDayObject.nameOfDay);

        $uibModalInstance.dismiss('Gem');

    };








});