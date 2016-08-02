describe('Unit: googleAppsFormPluginWidget app', function () {
  describe('Unit: app', function () {
    beforeEach(module('googleAppsFormPluginWidget'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
    var WidgetHome, scope, $rootScope, $controller, Buildfire, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, CONTENT_TYPE, q, $filter;

    beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
      $rootScope = _$rootScope_;
      q = _$q_;
      scope = $rootScope.$new();
      $controller = _$controller_;
      TAG_NAMES = _TAG_NAMES_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
      Buildfire = {
        components: {}, spinner: {
          hide: function () {
            return {}
          },
          show: function () {
            return {}
          }

        }
      };
      inject(function (_$filter_) {
        $filter = _$filter_;
      });

    }));

    beforeEach(function () {
      WidgetHome = $controller('WidgetHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE,
        LAYOUTS: LAYOUTS
      });
    });
    describe('It will test the defined methods', function () {

      it('it should pass if WidgetHome.init is called for success', function () {
        var result = {data: {content: {}}};
        WidgetHome.init();
        WidgetHome.success(result);
      });
      it('it should pass if WidgetHome.init is called for error', function () {
        WidgetHome.init();
        WidgetHome.error()
      });

      it('it should pass if  WidgetHome.onUpdateCallback is called for error', function () {
        var event = {
          tag: TAG_NAMES.GOOGLE_FORM_INFO
        };
        WidgetHome.data = {
          content: ""
        };
        WidgetHome.onUpdateCallback(event);
        WidgetHome.success({data: {content: {}}});
      });

    });
    describe('Test the filter', function () {
      it('should return the updated Url with filter returnUrl', function () {
        var url = 'https://docs.google.com/a/tothenew.com/forms/d/1DIjTXFO5z4C1AGfxtUnAljunnkl4P7yZsmDPIxDXhKE/edit', result;
        var updatedUrl = 'https://docs.google.com/a/tothenew.com/forms/d/1DIjTXFO5z4C1AGfxtUnAljunnkl4P7yZsmDPIxDXhKE/edit';
        result = $filter('returnUrl')(url);
        expect(result.$$unwrapTrustedValue()).toEqual(updatedUrl);
      });

    });
  });
});