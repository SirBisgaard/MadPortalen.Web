/* Created by Martin */
/*  Authentication Service  */
angular.module("madportalen").factory('authService', function ($http, $cookies) {
    var user;
    var token;

    return {
        login: function (credentials, callback) {
            $http(
                {
                    method: "GET",
                    url: "/api/auth?email=" + credentials.email + "&password=" + credentials.password
                }).then(
                function (response) {
                    var data = response.data;


                    // Setting data into Main data
                    $cookies.putObject('mainData', data);
                    token = data.token;

                    $http({
                        method: "GET",
                        url: "/api/user/" + data.id,
                        headers: {
                            "x-access-token": token
                        },
                    }).then(function (response) {
                        user = response.data;
                        callback(true);
                    }, function (response) {
                        callback(false, "Der skete en server fejl, prøv igen senere.");
                    });
                }, function (response) {
                    if (response.status == 401) {
                        callback(false, "Email eller password er forket.");
                        return;
                    }

                    callback(false, "Der skete en server fejl, prøv igen senere.");
                });
        },

        hasStoredLogin: function (callback) {
            // Setting data into Main data
            var data = $cookies.getObject('mainData');

            if (!data) {
                
                callback(false);
                return;
            }

            token = data.token;
            $http({
                method: "GET",
                url: "/api/user/" + data.id,
                headers: {
                    "x-access-token": token
                },
            }).then(function (response) {
                user = response.data;
                callback(true);
            }, function (response) {
                $cookies.remove('mainData');
                callback(false);
            });
        },


        getToken: function () {
            return token;
        },
        getUser: function () {
            return user;
        },

        isLoggedIn: function () {
            return (user != null && token != null)
        },

        logout: function () {
            user = null;
            token = null;
            $cookies.remove('mainData');
        }
    }
});