angular.module("sportsStoreAdmin")
    .constant("productUrl", "http://localhost:5500/products/")
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("productCtrl", function ($scope, $resource, productUrl) {
        $scope.productsResource = $resource(productUrl +":id", {id: "@id"});

        $scope.listProducts = function () {
            $scope.products = $scope.productsResource.query();//query向指定URL发送一个GET请求，并期望返回一个JSON格式的资源对象集合。
        }

        $scope.deleteProduct = function (product) {
            product.$delete().then(function () {
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
        }

        $scope.createProduct = function (product) {
            new $scope.productsResource(product).$save().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.editedProduct = null;
            })
        }

        $scope.updateProduct = function (product) {
            product.$save();
            $scope.editedProduct = null;
        }

        $scope.startEdit = function (product) {
            $scope.editedProduct = product;
        }

        $scope.cancelEdit = function (product) {
            $scope.editedProduct = null;
        }

        $scope.listProducts();

    })