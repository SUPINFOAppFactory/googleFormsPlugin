'use strict';

(function (angular) {
  angular.module('googleAppsFormPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;
        /*
         * Fetch user's data from datastore
         */
        WidgetHome.init = function () {
          WidgetHome.success = function (result) {
            if(result.data && result.id) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
              console.log(">>>>>", WidgetHome.data);
            }else
            {
              WidgetHome.data = {
                content: {}
              };
              var dummyData = {url: "https://docs.google.com/forms/u/0/d/1zkL3z-v30eYYfK8v27dCssj0PJ5UybFEZnGoWv_Vj3w/edit?ntd=1&ths=true&usp=forms_home"};
              WidgetHome.data.content.formUrl = dummyData.url;
            }
          };
          WidgetHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.GOOGLE_FORM_INFO).then(WidgetHome.success, WidgetHome.error);
        };

        WidgetHome.onUpdateCallback = function (event) {
          if (event && event.tag === TAG_NAMES.GOOGLE_FORM_INFO) {
            WidgetHome.data = event.data;
            if (WidgetHome.data && !WidgetHome.data.content)
              WidgetHome.data.content = {};
          }
        };

        //Refresh web page on pulling the tile bar

        buildfire.datastore.onRefresh(function () {
          var iFrame = document.getElementById("formFrame"),
            url = iFrame.src,
            hashIndex = url.indexOf("#");

          if(hashIndex !== -1) {
            url = url.substr(0, hashIndex) + "?v=test" + url.substr(hashIndex);
          }
          iFrame.src = url + "";
        });

        DataStore.onUpdate().then(null, null, WidgetHome.onUpdateCallback);
        WidgetHome.init();


      }])
    .filter('returnUrl', ['$sce', function ($sce) {
      return function (url) {
        return $sce.trustAsResourceUrl(url);
      }
    }]);
})(window.angular);
