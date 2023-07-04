/**
 * bootstrap-switch - Turn checkboxes and radio buttons into toggle switches.
 *
 * @version v3.4.0
 * @homepage https://bttstrp.github.io/bootstrap-switch
 * @author Mattia Larentis <mattia@larentis.eu> (http://larentis.eu)
 * @license MIT
 */

(function (a, b) {
  if ("function" == typeof define && define.amd) define(["jquery"], b);
  else if ("undefined" != typeof exports) b(require("jquery"));
  else {
    b(a.jquery), (a.bootstrapSwitch = { exports: {} }.exports);
  }
})(this, function (a) {
  "use strict";
  function c(x, y) {
    if (!(x instanceof y))
      throw new TypeError("Cannot call a class as a function");
  }
  function d(x, y) {
    var z = x.state,
      A = x.size,
      B = x.disabled,
      C = x.readonly,
      D = x.indeterminate,
      E = x.inverse;
    return [
      z ? "on" : "off",
      A,
      B ? "disabled" : void 0,
      C ? "readonly" : void 0,
      D ? "indeterminate" : void 0,
      E ? "inverse" : void 0,
      y ? "id-" + y : void 0,
    ].filter(function (F) {
      return null == F;
    });
  }
  function e() {
    return {
      state: this.$element.is(":checked"),
      size: this.$element.data("size"),
      animate: this.$element.data("animate"),
      disabled: this.$element.is(":disabled"),
      readonly: this.$element.is("[readonly]"),
      indeterminate: this.$element.data("indeterminate"),
      inverse: this.$element.data("inverse"),
      radioAllOff: this.$element.data("radio-all-off"),
      onColor: this.$element.data("on-color"),
      offColor: this.$element.data("off-color"),
      onText: this.$element.data("on-text"),
      offText: this.$element.data("off-text"),
      labelText: this.$element.data("label-text"),
      handleWidth: this.$element.data("handle-width"),
      labelWidth: this.$element.data("label-width"),
      baseClass: this.$element.data("base-class"),
      wrapperClass: this.$element.data("wrapper-class"),
    };
  }
  function f() {
    var x = this,
      y = this.$on.add(this.$off).add(this.$label).css("width", ""),
      z =
        "auto" === this.options.handleWidth
          ? Math.round(Math.max(this.$on.width(), this.$off.width()))
          : this.options.handleWidth;
    return (
      y.width(z),
      this.$label.width(function (A, B) {
        return "auto" === x.options.labelWidth
          ? B < z
            ? z
            : B
          : x.options.labelWidth;
      }),
      (this.privateHandleWidth = this.$on.outerWidth()),
      (this.privateLabelWidth = this.$label.outerWidth()),
      this.$container.width(
        2 * this.privateHandleWidth + this.privateLabelWidth
      ),
      this.$wrapper.width(this.privateHandleWidth + this.privateLabelWidth)
    );
  }
  function g() {
    var x = this,
      y =
        0 < arguments.length && arguments[0] !== void 0
          ? arguments[0]
          : this.ope;
    this.$container.css("margin-left", function () {
      var z = [0, "-" + x.privateHandleWidth + "px"];
      return x.options.indeterminate
        ? "-" + x.privateHandleWidth / 2 + "px"
        : y
        ? x.options.inverse
          ? z[1]
          : z[0]
        : x.options.inverse
        ? z[0]
        : z[1];
    });
  }
  function h(x) {
    return this.options.baseClass + "-" + x;
  }
  function j() {
    var x = this,
      y = function () {
        x.setPrevOptions(),
          f.call(x),
          g.call(x),
          setTimeout(function () {
            return (
              x.options.animate && x.$wrapper.addClass(h.call(x, "animate"))
            );
          }, 50);
      };
    if (this.$wrapper.is(":visible")) return void y();
    var z = window.setInterval(function () {
      return (
        x.$wrapper.is(":visible") && (y() || !0) && window.clearInterval(z)
      );
    }, 50);
  }
  function k() {
    var x = this;
    return this.$element.on({
      "setPreviousOptions.bootstrapSwitch": function () {
        return x.setPrevOptions();
      },
      "previousState.bootstrapSwitch": function () {
        (x.options = x.prevOptions),
          x.options.indeterminate &&
            x.$wrapper.addClass(h.call(x, "indeterminate")),
          x.$element
            .prop("checked", x.options.state)
            .trigger("change.bootstrapSwitch", !0);
      },
      "change.bootstrapSwitch": function (z, A) {
        z.preventDefault(), z.stopImmediatePropagation();
        var B = x.$element.is(":checked");
        g.call(x, B);
        B === x.options.state ||
          ((x.options.state = B),
          x.$wrapper.toggleClass(h.call(x, "off")).toggleClass(h.call(x, "on")),
          !A &&
            (x.$element.is(":radio") &&
              u('[name="' + x.$element.attr("name") + '"]')
                .not(x.$element)
                .prop("checked", !1)
                .trigger("change.bootstrapSwitch", !0),
            x.$element.trigger("switchChange.bootstrapSwitch", [B])));
      },
      "focus.bootstrapSwitch": function (z) {
        z.preventDefault(), x.$wrapper.addClass(h.call(x, "focused"));
      },
      "blur.bootstrapSwitch": function (z) {
        z.preventDefault(), x.$wrapper.removeClass(h.call(x, "focused"));
      },
      "keydown.bootstrapSwitch": function (z) {
        !z.which ||
          x.options.disabled ||
          x.options.readonly ||
          ((37 === z.which || 39 === z.which) &&
            (z.preventDefault(),
            z.stopImmediatePropagation(),
            x.state(39 === z.which)));
      },
    });
  }
  function l() {
    var x = this;
    return (
      this.$on.on("click.bootstrapSwitch", function (y) {
        return (
          y.preventDefault(),
          y.stopPropagation(),
          x.state(!1),
          x.$element.trigger("focus.bootstrapSwitch")
        );
      }),
      this.$off.on("click.bootstrapSwitch", function (y) {
        return (
          y.preventDefault(),
          y.stopPropagation(),
          x.state(!0),
          x.$element.trigger("focus.bootstrapSwitch")
        );
      })
    );
  }
  function m() {
    var x = this,
      y = void 0,
      z = void 0;
    this.$label.on({
      click: function (C) {
        C.stopPropagation();
      },
      "mousedown.bootstrapSwitch touchstart.bootstrapSwitch": function (C) {
        y ||
          x.options.disabled ||
          x.options.readonly ||
          (C.preventDefault(),
          C.stopPropagation(),
          (y =
            (C.pageX || C.originalEvent.touches[0].pageX) -
            parseInt(x.$container.css("margin-left"), 10)),
          x.options.animate && x.$wrapper.removeClass(h.call(x, "animate")),
          x.$element.trigger("focus.bootstrapSwitch"));
      },
      "mousemove.bootstrapSwitch touchmove.bootstrapSwitch": function (C) {
        if (null != y) {
          var D = (C.pageX || C.originalEvent.touches[0].pageX) - y;
          C.preventDefault(),
            D < -x.privateHandleWidth ||
              0 < D ||
              ((z = D), x.$container.css("margin-left", z + "px"));
        }
      },
      "mouseup.bootstrapSwitch touchend.bootstrapSwitch": function (C) {
        if (y) {
          if (
            (C.preventDefault(),
            x.options.animate && x.$wrapper.addClass(h.call(x, "animate")),
            z)
          ) {
            var D = z > -(x.privateHandleWidth / 2);
            (z = !1), x.state(x.options.inverse ? !D : D);
          } else x.state(!x.options.state);
          y = !1;
        }
      },
      "mouseleave.bootstrapSwitch": function () {
        x.$label.trigger("mouseup.bootstrapSwitch");
      },
    });
  }
  function n() {
    var x = this,
      y = this.$element.closest("label");
    y.on("click", function (z) {
      z.preventDefault(),
        z.stopImmediatePropagation(),
        z.target === y[0] && x.toggleState();
    });
  }
  function o() {
    function x() {
      return u(this).data("bootstrap-switch");
    }
    function y() {
      return u(this).bootstrapSwitch("state", this.checked);
    }
    var z = this.$element.closest("form");
    z.data("bootstrap-switch") ||
      z
        .on("reset.bootstrapSwitch", function () {
          window.setTimeout(function () {
            z.find("input").filter(x).each(y);
          }, 1);
        })
        .data("bootstrap-switch", !0);
  }
  function p(x) {
    var y = this;
    return u.isArray(x)
      ? x.map(function (z) {
          return h.call(y, z);
        })
      : [h.call(this, x)];
  }
  var r = (function (x) {
      return x && x.__esModule ? x : { default: x };
    })(a),
    s =
      Object.assign ||
      function (x) {
        for (var z, y = 1; y < arguments.length; y++)
          for (var A in ((z = arguments[y]), z))
            Object.prototype.hasOwnProperty.call(z, A) && (x[A] = z[A]);
        return x;
      },
    t = (function () {
      function x(y, z) {
        for (var B, A = 0; A < z.length; A++)
          (B = z[A]),
            (B.enumerable = B.enumerable || !1),
            (B.configurable = !0),
            "value" in B && (B.writable = !0),
            Object.defineProperty(y, B.key, B);
      }
      return function (y, z, A) {
        return z && x(y.prototype, z), A && x(y, A), y;
      };
    })(),
    u = r.default || window.jQuery || window.$,
    w = (function () {
      function x(y) {
        var z = this,
          A =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        c(this, x),
          (this.$element = u(y)),
          (this.options = u.extend(
            {},
            u.fn.bootstrapSwitch.defaults,
            e.call(this),
            A
          )),
          (this.prevOptions = {}),
          (this.$wrapper = u("<div>", {
            class: function () {
              return d(z.options, z.$element.attr("id"))
                .map(function (C) {
                  return h.call(z, C);
                })
                .concat(
                  [z.options.baseClass],
                  p.call(z, z.options.wrapperClass)
                )
                .join(" ");
            },
          })),
          (this.$container = u("<div>", { class: h.call(this, "container") })),
          (this.$on = u("<span>", {
            html: this.options.onText,
            class:
              h.call(this, "handle-on") +
              " " +
              h.call(this, this.options.onColor),
          })),
          (this.$off = u("<span>", {
            html: this.options.offText,
            class:
              h.call(this, "handle-off") +
              " " +
              h.call(this, this.options.offColor),
          })),
          (this.$label = u("<span>", {
            html: this.options.labelText,
            class: h.call(this, "label"),
          })),
          this.$element.on("init.bootstrapSwitch", function () {
            return z.options.onInit(y);
          }),
          this.$element.on("switchChange.bootstrapSwitch", function () {
            for (var B = arguments.length, C = Array(B), D = 0; D < B; D++)
              C[D] = arguments[D];
            var E = z.options.onSwitchChange.apply(y, C);
            !1 === E &&
              (z.$element.is(":radio")
                ? u('[name="' + z.$element.attr("name") + '"]').trigger(
                    "previousState.bootstrapSwitch",
                    !0
                  )
                : z.$element.trigger("previousState.bootstrapSwitch", !0));
          }),
          (this.$container = this.$element.wrap(this.$container).parent()),
          (this.$wrapper = this.$container.wrap(this.$wrapper).parent()),
          this.$element
            .before(this.options.inverse ? this.$off : this.$on)
            .before(this.$label)
            .before(this.options.inverse ? this.$on : this.$off),
          this.options.indeterminate && this.$element.prop("indeterminate", !0),
          j.call(this),
          k.call(this),
          l.call(this),
          m.call(this),
          o.call(this),
          n.call(this),
          this.$element.trigger("init.bootstrapSwitch", this.options.state);
      }
      return (
        t(x, [
          {
            key: "setPrevOptions",
            value: function () {
              this.prevOptions = s({}, this.options);
            },
          },
          {
            key: "state",
            value: function (z, A) {
              return "undefined" == typeof z
                ? this.options.state
                : this.options.disabled ||
                  this.options.readonly ||
                  (this.options.state &&
                    !this.options.radioAllOff &&
                    this.$element.is(":radio"))
                ? this.$element
                : (this.$element.is(":radio")
                    ? u('[name="' + this.$element.attr("name") + '"]').trigger(
                        "setPreviousOptions.bootstrapSwitch"
                      )
                    : this.$element.trigger(
                        "setPreviousOptions.bootstrapSwitch"
                      ),
                  this.options.indeterminate && this.indeterminate(!1),
                  this.$element
                    .prop("checked", !!z)
                    .trigger("change.bootstrapSwitch", A),
                  this.$element);
            },
          },
          {
            key: "toggleState",
            value: function (z) {
              return this.options.disabled || this.options.readonly
                ? this.$element
                : this.options.indeterminate
                ? (this.indeterminate(!1), this.state(!0))
                : this.$element
                    .prop("checked", !this.options.state)
                    .trigger("change.bootstrapSwitch", z);
            },
          },
          {
            key: "size",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.size
                : (null != this.options.size &&
                    this.$wrapper.removeClass(h.call(this, this.options.size)),
                  z && this.$wrapper.addClass(h.call(this, z)),
                  f.call(this),
                  g.call(this),
                  (this.options.size = z),
                  this.$element);
            },
          },
          {
            key: "animate",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.animate
                : this.options.animate === !!z
                ? this.$element
                : this.toggleAnimate();
            },
          },
          {
            key: "toggleAnimate",
            value: function () {
              return (
                (this.options.animate = !this.options.animate),
                this.$wrapper.toggleClass(h.call(this, "animate")),
                this.$element
              );
            },
          },
          {
            key: "disabled",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.disabled
                : this.options.disabled === !!z
                ? this.$element
                : this.toggleDisabled();
            },
          },
          {
            key: "toggleDisabled",
            value: function () {
              return (
                (this.options.disabled = !this.options.disabled),
                this.$element.prop("disabled", this.options.disabled),
                this.$wrapper.toggleClass(h.call(this, "disabled")),
                this.$element
              );
            },
          },
          {
            key: "readonly",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.readonly
                : this.options.readonly === !!z
                ? this.$element
                : this.toggleReadonly();
            },
          },
          {
            key: "toggleReadonly",
            value: function () {
              return (
                (this.options.readonly = !this.options.readonly),
                this.$element.prop("readonly", this.options.readonly),
                this.$wrapper.toggleClass(h.call(this, "readonly")),
                this.$element
              );
            },
          },
          {
            key: "indeterminate",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.indeterminate
                : this.options.indeterminate === !!z
                ? this.$element
                : this.toggleIndeterminate();
            },
          },
          {
            key: "toggleIndeterminate",
            value: function () {
              return (
                (this.options.indeterminate = !this.options.indeterminate),
                this.$element.prop("indeterminate", this.options.indeterminate),
                this.$wrapper.toggleClass(h.call(this, "indeterminate")),
                g.call(this),
                this.$element
              );
            },
          },
          {
            key: "inverse",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.inverse
                : this.options.inverse === !!z
                ? this.$element
                : this.toggleInverse();
            },
          },
          {
            key: "toggleInverse",
            value: function () {
              this.$wrapper.toggleClass(h.call(this, "inverse"));
              var z = this.$on.clone(!0),
                A = this.$off.clone(!0);
              return (
                this.$on.replaceWith(A),
                this.$off.replaceWith(z),
                (this.$on = A),
                (this.$off = z),
                (this.options.inverse = !this.options.inverse),
                this.$element
              );
            },
          },
          {
            key: "onColor",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.onColor
                : (this.options.onColor &&
                    this.$on.removeClass(h.call(this, this.options.onColor)),
                  this.$on.addClass(h.call(this, z)),
                  (this.options.onColor = z),
                  this.$element);
            },
          },
          {
            key: "offColor",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.offColor
                : (this.options.offColor &&
                    this.$off.removeClass(h.call(this, this.options.offColor)),
                  this.$off.addClass(h.call(this, z)),
                  (this.options.offColor = z),
                  this.$element);
            },
          },
          {
            key: "onText",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.onText
                : (this.$on.html(z),
                  f.call(this),
                  g.call(this),
                  (this.options.onText = z),
                  this.$element);
            },
          },
          {
            key: "offText",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.offText
                : (this.$off.html(z),
                  f.call(this),
                  g.call(this),
                  (this.options.offText = z),
                  this.$element);
            },
          },
          {
            key: "labelText",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.labelText
                : (this.$label.html(z),
                  f.call(this),
                  (this.options.labelText = z),
                  this.$element);
            },
          },
          {
            key: "handleWidth",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.handleWidth
                : ((this.options.handleWidth = z),
                  f.call(this),
                  g.call(this),
                  this.$element);
            },
          },
          {
            key: "labelWidth",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.labelWidth
                : ((this.options.labelWidth = z),
                  f.call(this),
                  g.call(this),
                  this.$element);
            },
          },
          {
            key: "baseClass",
            value: function () {
              return this.options.baseClass;
            },
          },
          {
            key: "wrapperClass",
            value: function (z) {
              if ("undefined" == typeof z) return this.options.wrapperClass;
              var y = z || u.fn.bootstrapSwitch.defaults.wrapperClass;
              return (
                this.$wrapper.removeClass(
                  p.call(this, this.options.wrapperClass).join(" ")
                ),
                this.$wrapper.addClass(p.call(this, y).join(" ")),
                (this.options.wrapperClass = y),
                this.$element
              );
            },
          },
          {
            key: "radioAllOff",
            value: function (z) {
              if ("undefined" == typeof z) return this.options.radioAllOff;
              var A = !!z;
              return this.options.radioAllOff === A
                ? this.$element
                : ((this.options.radioAllOff = A), this.$element);
            },
          },
          {
            key: "onInit",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.onInit
                : ((this.options.onInit =
                    z || u.fn.bootstrapSwitch.defaults.onInit),
                  this.$element);
            },
          },
          {
            key: "onSwitchChange",
            value: function (z) {
              return "undefined" == typeof z
                ? this.options.onSwitchChange
                : ((this.options.onSwitchChange =
                    z || u.fn.bootstrapSwitch.defaults.onSwitchChange),
                  this.$element);
            },
          },
          {
            key: "destroy",
            value: function () {
              var z = this.$element.closest("form");
              return (
                z.length &&
                  z.off("reset.bootstrapSwitch").removeData("bootstrap-switch"),
                this.$container.children().not(this.$element).remove(),
                this.$element
                  .unwrap()
                  .unwrap()
                  .off(".bootstrapSwitch")
                  .removeData("bootstrap-switch"),
                this.$element
              );
            },
          },
        ]),
        x
      );
    })();
  (u.fn.bootstrapSwitch = function (x) {
    for (
      var z = arguments.length, A = Array(1 < z ? z - 1 : 0), B = 1;
      B < z;
      B++
    )
      A[B - 1] = arguments[B];
    return Array.prototype.reduce.call(
      this,
      function (C, D) {
        var E = u(D),
          F = E.data("bootstrap-switch"),
          G = F || new w(D, x);
        return (
          F || E.data("bootstrap-switch", G),
          "string" == typeof x ? G[x].apply(G, A) : C
        );
      },
      this
    );
  }),
    (u.fn.bootstrapSwitch.Constructor = w),
    (u.fn.bootstrapSwitch.defaults = {
      state: !0,
      size: null,
      animate: !0,
      disabled: !1,
      readonly: !1,
      indeterminate: !1,
      inverse: !1,
      radioAllOff: !1,
      onColor: "primary",
      offColor: "default",
      onText: "ON",
      offText: "OFF",
      labelText: "&nbsp",
      handleWidth: "auto",
      labelWidth: "auto",
      baseClass: "bootstrap-switch",
      wrapperClass: "wrapper",
      onInit: function () {},
      onSwitchChange: function () {},
    });
});
