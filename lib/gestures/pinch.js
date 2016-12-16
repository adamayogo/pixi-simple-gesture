'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = pinchable;
function pinchable(sprite, inertia) {

  function start(e) {
    sprite.on('touchmove', move);
  }

  function move(e) {
    var t = e.data.originalEvent.targetTouches;
    if (!t || t.length < 2) {
      return;
    }
    var dx = t[0].clientX - t[1].clientX;
    var dy = t[0].clientY - t[1].clientY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (!sprite._pinch) {
      sprite._pinch = {
        p: {
          distance: distance,
          date: new Date()
        }
      };
      sprite.emit('pinchstart');
      return;
    }
    var now = new Date();
    var interval = now - sprite._pinch.p.date;
    if (interval < 12) {
      return;
    }
    var center = {
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2
    };
    var event = {
      scale: distance / sprite._pinch.p.distance,
      velocity: distance / interval,
      center: center,
      data: e.data
    };
    sprite.emit('pinchmove', event);
    sprite._pinch.pp = {
      distance: sprite._pinch.p.distance,
      date: sprite._pinch.p.date
    };
    sprite._pinch.p = {
      distance: distance,
      date: now
    };
  }

  function end(e) {
    sprite.removeListener('touchmove', move);
    if (!sprite._pinch) {
      return;
    }
    if (inertia && sprite._pinch.pp) {
      var _ret = function () {
        if (sprite._pinch.intervalId) {
          return {
            v: void 0
          };
        }
        var interval = new Date() - sprite._pinch.p.date;
        var velocity = (sprite._pinch.p.distance - sprite._pinch.pp.distance) / interval;
        var center = sprite._pinch.p.center;
        var distance = sprite._pinch.p.distance;
        sprite._pinch.intervalId = setInterval(function () {
          if (Math.abs(velocity) < 0.04) {
            clearInterval(sprite._pinch.intervalId);
            sprite.emit('pinchend');
            sprite._pinch = null;
            return;
          }
          var updatedDistance = distance + velocity * 12;
          var event = {
            scale: updatedDistance / distance,
            velocity: velocity,
            center: center,
            data: e.data
          };
          sprite.emit('pinchmove', event);
          distance = updatedDistance;
          velocity *= 0.8;
        }, 12);
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    } else {
      sprite.emit('pinchend');
      sprite._pinch = null;
    }
  }

  sprite.interactive = true;
  sprite.on('touchstart', start).on('touchend', end).on('touchendoutside', end);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZXN0dXJlcy9waW5jaC5qcyJdLCJuYW1lcyI6WyJwaW5jaGFibGUiLCJzcHJpdGUiLCJpbmVydGlhIiwic3RhcnQiLCJlIiwib24iLCJtb3ZlIiwidCIsImRhdGEiLCJvcmlnaW5hbEV2ZW50IiwidGFyZ2V0VG91Y2hlcyIsImxlbmd0aCIsImR4IiwiY2xpZW50WCIsImR5IiwiY2xpZW50WSIsImRpc3RhbmNlIiwiTWF0aCIsInNxcnQiLCJfcGluY2giLCJwIiwiZGF0ZSIsIkRhdGUiLCJlbWl0Iiwibm93IiwiaW50ZXJ2YWwiLCJjZW50ZXIiLCJ4IiwieSIsImV2ZW50Iiwic2NhbGUiLCJ2ZWxvY2l0eSIsInBwIiwiZW5kIiwicmVtb3ZlTGlzdGVuZXIiLCJpbnRlcnZhbElkIiwic2V0SW50ZXJ2YWwiLCJhYnMiLCJjbGVhckludGVydmFsIiwidXBkYXRlZERpc3RhbmNlIiwiaW50ZXJhY3RpdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUF3QkEsUztBQUFULFNBQVNBLFNBQVQsQ0FBb0JDLE1BQXBCLEVBQTRCQyxPQUE1QixFQUFxQzs7QUFFbEQsV0FBU0MsS0FBVCxDQUFnQkMsQ0FBaEIsRUFBbUI7QUFDakJILFdBQU9JLEVBQVAsQ0FBVSxXQUFWLEVBQXVCQyxJQUF2QjtBQUNEOztBQUVELFdBQVNBLElBQVQsQ0FBZUYsQ0FBZixFQUFrQjtBQUNoQixRQUFJRyxJQUFJSCxFQUFFSSxJQUFGLENBQU9DLGFBQVAsQ0FBcUJDLGFBQTdCO0FBQ0EsUUFBSSxDQUFDSCxDQUFELElBQU1BLEVBQUVJLE1BQUYsR0FBVyxDQUFyQixFQUF3QjtBQUN0QjtBQUNEO0FBQ0QsUUFBSUMsS0FBS0wsRUFBRSxDQUFGLEVBQUtNLE9BQUwsR0FBZU4sRUFBRSxDQUFGLEVBQUtNLE9BQTdCO0FBQ0EsUUFBSUMsS0FBS1AsRUFBRSxDQUFGLEVBQUtRLE9BQUwsR0FBZVIsRUFBRSxDQUFGLEVBQUtRLE9BQTdCO0FBQ0EsUUFBSUMsV0FBV0MsS0FBS0Ms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QkFBTUosRUFBRUk7QUFKRSxXQUFaO0FBTUFQLGlCQUFPc0IsSUFBUCxDQUFZLFdBQVosRUFBeUJNLEtBQXpCO0FBQ0FiLHFCQUFXdUIsZUFBWDtBQUNBUixzQkFBWSxHQUFaO0FBQ0QsU0FqQjBCLEVBaUJ4QixFQWpCd0IsQ0FBM0I7QUFSK0I7O0FBQUE7QUEwQmhDLEtBMUJELE1BMEJPO0FBQ0w5QixhQUFPc0IsSUFBUCxDQUFZLFVBQVo7QUFDQXRCLGFBQU9rQixNQUFQLEdBQWdCLElBQWhCO0FBQ0Q7QUFDRjs7QUFFRGxCLFNBQU91QyxXQUFQLEdBQXFCLElBQXJCO0FBQ0F2QyxTQUNHSSxFQURILENBQ00sWUFETixFQUNvQkYsS0FEcEIsRUFFR0UsRUFGSCxDQUVNLFVBRk4sRUFFa0I0QixHQUZsQixFQUdHNUIsRUFISCxDQUdNLGlCQUhOLEVBR3lCNEIsR0FIekI7QUFJRCIsImZpbGUiOiJwaW5jaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBpbmNoYWJsZSAoc3ByaXRlLCBpbmVydGlhKSB7XHJcblxyXG4gIGZ1bmN0aW9uIHN0YXJ0IChlKSB7XHJcbiAgICBzcHJpdGUub24oJ3RvdWNobW92ZScsIG1vdmUpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtb3ZlIChlKSB7XHJcbiAgICBsZXQgdCA9IGUuZGF0YS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNcclxuICAgIGlmICghdCB8fCB0Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBsZXQgZHggPSB0WzBdLmNsaWVudFggLSB0WzFdLmNsaWVudFhcclxuICAgIGxldCBkeSA9IHRbMF0uY2xpZW50WSAtIHRbMV0uY2xpZW50WVxyXG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KVxyXG4gICAgaWYgKCFzcHJpdGUuX3BpbmNoKSB7XHJcbiAgICAgIHNwcml0ZS5fcGluY2ggPSB7XHJcbiAgICAgICAgcDoge1xyXG4gICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxyXG4gICAgICAgICAgZGF0ZTogbmV3IERhdGUoKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBzcHJpdGUuZW1pdCgncGluY2hzdGFydCcpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKClcclxuICAgIGxldCBpbnRlcnZhbCA9IG5vdyAtIHNwcml0ZS5fcGluY2gucC5kYXRlXHJcbiAgICBpZiAoaW50ZXJ2YWwgPCAxMikge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGxldCBjZW50ZXIgPSB7XHJcbiAgICAgIHg6ICh0WzBdLmNsaWVudFggKyB0WzFdLmNsaWVudFgpIC8gMixcclxuICAgICAgeTogKHRbMF0uY2xpZW50WSArIHRbMV0uY2xpZW50WSkgLyAyXHJcbiAgICB9XHJcbiAgICBsZXQgZXZlbnQgPSB7XHJcbiAgICAgIHNjYWxlOiBkaXN0YW5jZSAvIHNwcml0ZS5fcGluY2gucC5kaXN0YW5jZSxcclxuICAgICAgdmVsb2NpdHk6IGRpc3RhbmNlIC8gaW50ZXJ2YWwsXHJcbiAgICAgIGNlbnRlcjogY2VudGVyLFxyXG4gICAgICBkYXRhOiBlLmRhdGFcclxuICAgIH1cclxuICAgIHNwcml0ZS5lbWl0KCdwaW5jaG1vdmUnLCBldmVudClcclxuICAgIHNwcml0ZS5fcGluY2gucHAgPSB7XHJcbiAgICAgIGRpc3RhbmNlOiBzcHJpdGUuX3BpbmNoLnAuZGlzdGFuY2UsXHJcbiAgICAgIGRhdGU6IHNwcml0ZS5fcGluY2gucC5kYXRlXHJcbiAgICB9XHJcbiAgICBzcHJpdGUuX3BpbmNoLnAgPSB7XHJcbiAgICAgIGRpc3RhbmNlOiBkaXN0YW5jZSxcclxuICAgICAgZGF0ZTogbm93XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlbmQgKGUpIHtcclxuICAgIHNwcml0ZS5yZW1vdmVMaXN0ZW5lcigndG91Y2htb3ZlJywgbW92ZSlcclxuICAgIGlmICghc3ByaXRlLl9waW5jaCkge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIGlmIChpbmVydGlhICYmIHNwcml0ZS5fcGluY2gucHApIHtcclxuICAgICAgaWYgKHNwcml0ZS5fcGluY2guaW50ZXJ2YWxJZCkge1xyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcbiAgICAgIGxldCBpbnRlcnZhbCA9IG5ldyBEYXRlKCkgLSBzcHJpdGUuX3BpbmNoLnAuZGF0ZVxyXG4gICAgICBsZXQgdmVsb2NpdHkgPSAoc3ByaXRlLl9waW5jaC5wLmRpc3RhbmNlIC0gc3ByaXRlLl9waW5jaC5wcC5kaXN0YW5jZSkgLyBpbnRlcnZhbFxyXG4gICAgICBsZXQgY2VudGVyID0gc3ByaXRlLl9waW5jaC5wLmNlbnRlclxyXG4gICAgICBsZXQgZGlzdGFuY2UgPSBzcHJpdGUuX3BpbmNoLnAuZGlzdGFuY2VcclxuICAgICAgc3ByaXRlLl9waW5jaC5pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmIChNYXRoLmFicyh2ZWxvY2l0eSkgPCAwLjA0KSB7XHJcbiAgICAgICAgICBjbGVhckludGVydmFsKHNwcml0ZS5fcGluY2guaW50ZXJ2YWxJZClcclxuICAgICAgICAgIHNwcml0ZS5lbWl0KCdwaW5jaGVuZCcpXHJcbiAgICAgICAgICBzcHJpdGUuX3BpbmNoID0gbnVsbFxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB1cGRhdGVkRGlzdGFuY2UgPSBkaXN0YW5jZSArIHZlbG9jaXR5ICogMTJcclxuICAgICAgICBsZXQgZXZlbnQgPSB7XHJcbiAgICAgICAgICBzY2FsZTogdXBkYXRlZERpc3RhbmNlIC8gZGlzdGFuY2UsXHJcbiAgICAgICAgICB2ZWxvY2l0eTogdmVsb2NpdHksXHJcbiAgICAgICAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgICAgICAgIGRhdGE6IGUuZGF0YVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcHJpdGUuZW1pdCgncGluY2htb3ZlJywgZXZlbnQpXHJcbiAgICAgICAgZGlzdGFuY2UgPSB1cGRhdGVkRGlzdGFuY2VcclxuICAgICAgICB2ZWxvY2l0eSAqPSAwLjhcclxuICAgICAgfSwgMTIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzcHJpdGUuZW1pdCgncGluY2hlbmQnKVxyXG4gICAgICBzcHJpdGUuX3BpbmNoID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3ByaXRlLmludGVyYWN0aXZlID0gdHJ1ZVxyXG4gIHNwcml0ZVxyXG4gICAgLm9uKCd0b3VjaHN0YXJ0Jywgc3RhcnQpXHJcbiAgICAub24oJ3RvdWNoZW5kJywgZW5kKVxyXG4gICAgLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBlbmQpXHJcbn1cclxuIl19