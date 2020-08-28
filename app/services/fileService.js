angular.module("madportalen").service("fileService", function ($http, authService) {
    this.uploadFileToUrl = function (file, uploadUrl, callback) {
        var fd = new FormData();
        fd.append("file", file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                "Content-Type": undefined,
                "x-access-token": authService.getToken()
            } 
        })
        .success(function () {
            callback(false);
        })
        .error(function () {
            callback(true);
        });
    }
});