angular.module("cart", [])
    .factory("cart", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    });
                }
            },//添加指定产品，如果产品已经在购物车，则产品数量加1
            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },//删除产品
            getProducts: function () {
                return cartData;
            }//返回购物车对象

        }
    })
    .directive("cartSummary", function (cart) {
        return {
            restrict: "E",
            templateUrl: "components/cart/cartSummary.html",
            controller: function ($scope) {
                var cartData = cart.getProducts();
                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                }
                $scope.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                }
            }
        }
    })