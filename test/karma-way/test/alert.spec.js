describe("alert", function () {
  var scope, $compile;
  var element;
  angular.module('mytest', [])
    .directive('alert', require('../../../index.js'));

  beforeEach(angular.mock.module('mytest'));

  beforeEach(inject(function ($rootScope, _$compile_, $controller) {

      scope = $rootScope;
      $compile = _$compile_;

      element = angular.element(
          "<div>" + 
            "<alert ng-repeat='alert in alerts' type='alert.type'" +
              "close='removeAlert($index)'>{{alert.msg}}" +
            "</alert>" +
          "</div>");

      scope.alerts = [
        { msg:'foo', type:'success'},
        { msg:'bar', type:'error'},
        { msg:'baz'}
      ];
    }));

    beforeEach(function() {
      this.addMatchers({
        toHaveClass: function(cls) {
          this.message = function() {
            return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'.";
          };

          return this.actual.hasClass(cls);
        }
      });
    });

    function createAlerts() {
      $compile(element)(scope);
      scope.$digest();
      return element.find('.alert');
    }

    function findCloseButton(index) {
      return element.find('.close').eq(index);
    }

    it("should generate alerts using ng-repeat", function () {
      var alerts = createAlerts();
      expect(alerts.length).toEqual(3);
    });

    it("should use correct classes for different alert types", function () {
      var alerts = createAlerts();
      expect(alerts.eq(0)).toHaveClass('alert-success');
      expect(alerts.eq(1)).toHaveClass('alert-error');

      //defaults
      expect(alerts.eq(2)).toHaveClass('alert');
      expect(alerts.eq(2)).not.toHaveClass('alert-info');
      expect(alerts.eq(2)).not.toHaveClass('alert-block');
    });

    it("should fire callback when closed", function () {

      var alerts = createAlerts();

      scope.$apply(function () {
        scope.removeAlert = jasmine.createSpy();
      });

      findCloseButton(1).click();
      expect(scope.removeAlert).toHaveBeenCalledWith(1);
    });

    it('should not show close buttons if no close callback specified', function () {
      element = $compile('<alert>No close</alert>')(scope);
      scope.$digest();
      expect(findCloseButton(0)).toHaveClass('ng-hide');
    });

    it('it should be possible to add additional classes for alert', function () {
      var element = $compile('<alert class="alert-block" type="\'info\'">Default alert!</alert>')(scope);
      scope.$digest();
      expect(element).toHaveClass('alert-block');
      expect(element).toHaveClass('alert-info');
    });
});