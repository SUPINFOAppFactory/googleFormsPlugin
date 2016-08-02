describe('Unit: googleAppsFormPluginContent content app', function () {
  describe('Unit: app', function () {
    beforeEach(module('googleAppsFormPluginContent'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
    var ContentHome, scope, $rootScope, $controller, Buildfire, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, CONTENT_TYPE, q, Utils;

    beforeEach(inject(function (_Utils_, _$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
      $rootScope = _$rootScope_;
      q = _$q_;
      scope = $rootScope.$new();
      $controller = _$controller_;
      TAG_NAMES = _TAG_NAMES_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
      Utils = _Utils_;
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
    }));

    beforeEach(function () {
      ContentHome = $controller('ContentHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE,
        LAYOUTS: LAYOUTS,
        Utils: Utils
      });
    });
    describe('It will test the defined methods', function () {

      it('it should pass if ContentHome is defined', function () {
        expect(ContentHome).not.toBeUndefined();
      });

      it('it should pass if ContentHome.validateUrl is called with success', function () {
        ContentHome.formUrl = 'https://docs.google.com/a/tothenew.com/forms/d/1DIjTXFO5z4C1AGfxtUnAljunnkl4P7yZsmDPIxDXhKE/edit';
        Utils.validateUrl(ContentHome.formUrl);
        ContentHome.validateUrl();
        var result = true;
      });

      it('it should pass if ContentHome.validateUrl is called with error', function () {
        ContentHome.validateUrl();
      });

      it('it should pass if  ContentHome.success is called', function () {
        var result = {};
        ContentHome.saveData(result, TAG_NAMES.GOOGLE_FORM_INFO);
        ContentHome.success(result);
      });

      it('it should pass if  ContentHome.error is called', function () {
        var result = {};
        ContentHome.saveData(result, TAG_NAMES.GOOGLE_FORM_INFO);
        ContentHome.error(result);
      });

      it('it should pass if  ContentHome.clearUrl is called and it has ContentHome.formUrl is null', function () {
        ContentHome.formUrl = null;
        ContentHome.clearUrl();
      });

      it('it should pass if ContentHome.init is called for error', function () {
        ContentHome.init();
        ContentHome.error()
      });

      it('it should pass if ContentHome.init is called for success', function () {
        var result = {data: {content: {}}};
        ContentHome.init();
        ContentHome.success(result);
      });

    });
  });
});