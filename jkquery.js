var $$ = (function($) {

  var throwError = function(msg) {
    throw new Error(msg);
  };

  /*
   * Copy jQuery properties
   */
  var exports = {};
  for (var property in $) {
    var value = $[property];
    if (typeof value === "function") {
      exports[property] = function() {
        var args = [].slice.apply(arguments);
        value.apply($, args);
      }
    } else {
      exports[property] = value;
    }
  }

  // Specifies how much delay to add
  var delay = 1000;

  /*
   * Takes another function and delays it, according to delay
   */
  var delayFn = function(f) {
    return function() {
      var delayAmount;
      if (typeof delay === "number") {
        delayAmount = delay;
      } else if (typeof delay === "function") {
        delayAmount = delay();
      } else {
        throwError("Unexpected configuration of delay")
      }

      var args = [].slice.apply(arguments);
      setTimeout(function() {
        f.apply(f, args);
      }, delayAmount);
    };
  };

  /*
   * Set delays on relevant functions
   */
  [
    "ajax",
    "get",
    "getJSON",
    "getScript",
    "post",
    "load"
  ].forEach(function(fnName) {
    exports[fnName] = delayFn($[fnName]);
  });

  /*
   * Configuration for jkQuery
   */
  exports.$$ = function(config) {
    if (typeof config !== "object") {
      throwError("$$ configuration should be an object");
    }
    if ((typeof config.delay === "number") || (typeof config.delay === "function")) {
      delay = config.delay;
    }
    return exports;
  };

  /*
   * Expose the original jQuery
   */
  exports.$ = $;

  return exports;
})(jQuery);
