/**
 * Created by mac on 16/11/7.
 */
let angular = require("angular");
let serviceModule = angular.module("serviceModule", []);
serviceModule.factory('httpInterceptor',
  ['$q', '$injector', '$rootScope', '$localStorage',
     ($q, $injector, $rootScope, $localStorage) => {
      $localStorage.token = '555';//ngStorage库
      var httpInterceptor = {
        'responseError': function (response) {
          return $q.reject("response", response);
        },
        'response': function (response) {
          response.headers["Access-Control-Allow-Origin"]= "*";
          //response.headers["Access-Control-Allow-Methods"]="POST";
          response.headers["Access-Control-Allow-Headers"]="x-requested-with,content-type";
          return response;
        },
        'request': function (config) {
          // config.headers['X-Requested-With']="XMLHttpRequest";
          // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
          config.headers['Authorization'] = $localStorage.token;
          // config.headers['Content-Type'] = 'application/json; charset=UTF-8;';
          return config;
        },
        'requestError': function (config) {
          return $q.reject(config);
        }
      };
      return httpInterceptor;
    }])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  })
  .factory('httpService', ['$q', '$http', 'serviceLoading',
     ($q, $http, serviceLoading) => {
    function handleResponse(promise, t) {
      return promise.then(function (res) {
          if (t) {
            serviceLoading.hideLoading();
          }
          if (res.status == 200 || res.status == 304) {
            return $q.resolve(res.data);
          } else {
            res.data = {};
            res.data.message = "服务器请求异常";
            return $q.reject(res.data.message);
          }
        },
        function (res) {
          if (t) {
            serviceLoading.hideLoading();
          }
          return $q.reject("服务器请求异常");
        });
    }
    var timeout = 1000;
    return {
      serviceGet: function (url) {
        var promise = $http.get(url, {timeout: timeout});
        return handleResponse(promise);
      },
      serviceGetLoading: function (url) {
        serviceLoading.showLoading();
        var promise = $http.get(url, {timeout: timeout});
        return handleResponse(promise, true);
      },
      servicePost: function (url, data) {
        var promise = $http.post(url, data, {timeout: timeout});
        return handleResponse(promise);
      },
      servicePostLoading: function (url, data) {
        serviceLoading.showLoading();
        var promise = $http.post(url, data, {timeout: timeout});
        return handleResponse(promise, true);
      },
      serviceDelete: function (url) {
        var promise = $http.delete(url, {timeout: timeout});
        return handleResponse(promise);
      },
      serviceDeleteLoading: function (url) {
        serviceLoading.showLoading();
        var promise = $http.delete(url, {timeout: timeout});
        return handleResponse(promise, true);
      },
      servicePut: function (url) {
        var promise = $http.put(url, {timeout: timeout});
        return handleResponse(promise);
      },
      servicePutLoading: function (url) {
        serviceLoading.showLoading();
        var promise = $http.put(url, {timeout: timeout});
        return handleResponse(promise, true);
      }
    };
  }])
  .factory("serviceLoading", ['$timeout', function ($timeout) {
    return {
      timeoutCount: 0,
      showLoading() {
        this.timeoutCount++;
        str = "<div class='serviceLoadingBg' style='position: fixed; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); left: 0; top: 0; z-index: 9998;'></div>" +
          "<div class='serviceLoading' style='width:250px; height:90px; position: fixed; left: 50%; top: 50%; margin:-50px 0px 0px -100px; z-index: 9999; padding:20px;'>" +
          '<div class="spinner"><div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div>' +
          "<p style=' padding:5px; font-family:" + '"' + 'MicroSoft YaHei' + '"' + "; line-height: 26px; text-align: center; font-weight: bold; color: #fff; font-family: Arial;'>Loading...</p>" +
          "</div>";
        if ($("body").find(".serviceLoadingBg").length < 1 && $("body").find(".serviceLoading").length < 1) {
          $("body").append(str);
        }
      },
      hideLoading() {
        this.timeoutCount--;
        if (this.timeoutCount < 1) {
          $("body").find(".serviceLoadingBg").remove();
          $("body").find(".serviceLoading").remove();
        }
      }
    }
  }]);
export default serviceModule;