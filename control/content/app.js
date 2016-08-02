'use strict';

(function (angular, buildfire) {
  angular.module('googleAppsFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['$scope', 'Buildfire', 'STATUS_CODE', 'TAG_NAMES', 'DataStore', 'Utils', '$timeout',
      function ($scope, Buildfire, STATUS_CODE, TAG_NAMES, DataStore, Utils, $timeout) {
        var ContentHome = this;
        ContentHome.validUrl = false;
        ContentHome.inValidUrl = false;

        ContentHome.data = {
          content: {
            "formUrl": ""
          }
        };

        ContentHome.saveData = function (newObj, tag) {
          if (typeof newObj === 'undefined') {
            return;
          }
          ContentHome.success = function (result) {
            console.info('Saved data result: ', result);
          };
          ContentHome.error = function (err) {
            console.error('Error while saving data : ', err);
          };
          DataStore.save(newObj, tag).then(ContentHome.success, ContentHome.error);
        };

        ContentHome.validateUrl = function () {
          ContentHome.data.content.formUrl = ContentHome.formUrl;
          if (Utils.validateUrl(ContentHome.formUrl)) {
            ContentHome.validUrl = true;
            $timeout(function () {
              ContentHome.validUrl = false;
            }, 3000);
            ContentHome.inValidUrl = false;
            ContentHome.saveData(ContentHome.data, TAG_NAMES.GOOGLE_FORM_INFO);
          } else {
            ContentHome.inValidUrl = true;
            $timeout(function () {
              ContentHome.inValidUrl = false;
            }, 3000);
            ContentHome.validUrl = false;
          }
        };

        ContentHome.clearUrl = function () {
          if (!ContentHome.formUrl) {
            ContentHome.data.content.formUrl = null;
            ContentHome.saveData(ContentHome.data, TAG_NAMES.GOOGLE_FORM_INFO);
          }
        };

        ContentHome.gotToSite = function(){
          window.open('https://accounts.google.com', '_blank');
        };

        ContentHome.gotToSupport = function(){
          window.open('https://support.google.com/drive/answer/2494822?hl=en', '_blank');
        };

        /*
         * Go pull any previously saved data
         * */
        ContentHome.init = function () {
          ContentHome.success = function (result) {
            console.info('init success result:', result);
            if(result.data && result.id) {
              if (Object.keys(result.data).length > 0) {
                ContentHome.data = result.data;
              }
              if (ContentHome.data) {
                if (!ContentHome.data.content)
                  ContentHome.data.content = {};
                if (ContentHome.data.content.formUrl)
                  ContentHome.formUrl = ContentHome.data.content.formUrl;
              }
            }
            else {
              var dummyData = {url: "https://docs.google.com/forms/u/0/d/1zkL3z-v30eYYfK8v27dCssj0PJ5UybFEZnGoWv_Vj3w/edit?ntd=1&ths=true&usp=forms_home"};
              ContentHome.formUrl = dummyData.url;
             }

          };

          ContentHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
            else if (err && err.code === STATUS_CODE.NOT_FOUND) {
              ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.GOOGLE_FORM_INFO);
            }
          };
          DataStore.get(TAG_NAMES.GOOGLE_FORM_INFO).then(ContentHome.success, ContentHome.error);
        };
        ContentHome.init();
      }
    ])
})(window.angular, window.buildfire);