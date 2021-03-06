'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tappable;
function tappable(sprite) {
  function mouseDown(e) {
    start(e, e.data.originalEvent);
  }

  function touchStart(e) {
    start(e, e.data.originalEvent.targetTouches[0]);
  }

  // possibly be called twice or more
  function start(e, t) {
    if (sprite._tap) {
      return;
    }
    sprite._tap = {
      p: {
        x: t.clientX,
        y: t.clientY
      }
    };
    sprite.on('mousemove', mouseMove).on('touchmove', touchMove);
  }

  function mouseMove(e) {
    move(e, e.data.originalEvent);
  }

  function touchMove(e) {
    var t = e.data.originalEvent.targetTouches;
    if (!t || t.length > 1) {
      sprite._tap.canceled = true;
      end(e);
      return;
    }
    move(e, t[0]);
  }

  function move(e, t) {
    var dx = t.clientX - sprite._tap.p.x;
    var dy = t.clientY - sprite._tap.p.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var threshold = t instanceof window.MouseEvent ? 2 : 7;
    if (distance > threshold) {
      sprite._tap.canceled = true;
    }
  }

  // possibly be called twice or more
  function end(e) {
    if (sprite._tap && !sprite._tap.canceled) {
      var event = {
        data: e.data
      };
      sprite.emit('simpletap', event);
    }
    sprite._tap = null;
    sprite.removeListener('mousemove', mouseMove).removeListener('touchmove', touchMove);
  }

  sprite.interactive = true;
  sprite.on('mousedown', mouseDown).on('touchstart', touchStart).on('mouseup', end).on('mouseupoutside', end).on('touchend', end).on('touchendoutside', end);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZXN0dXJlcy90YXAuanMiXSwibmFtZXMiOlsidGFwcGFibGUiLCJzcHJpdGUiLCJtb3VzZURvd24iLCJlIiwic3RhcnQiLCJkYXRhIiwib3JpZ2luYWxFdmVudCIsInRvdWNoU3RhcnQiLCJ0YXJnZXRUb3VjaGVzIiwidCIsIl90YXAiLCJwIiwieCIsImNsaWVudFgiLCJ5IiwiY2xpZW50WSIsIm9uIiwibW91c2VNb3ZlIiwidG91Y2hNb3ZlIiwibW92ZSIsImxlbmd0aCIsImNhbmNlbGVkIiwiZW5kIiwiZHgiLCJkeSIsImRpc3RhbmNlIiwiTWF0aCIsInNxcnQiLCJ0aHJlc2hvbGQiLCJ3aW5kb3ciLCJNb3VzZUV2ZW50IiwiZXZlbnQiLCJlbWl0IiwicmVtb3ZlTGlzdGVuZXIiLCJpbnRlcmFjdGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQXdCQSxRO0FBQVQsU0FBU0EsUUFBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDeEMsV0FBU0MsU0FBVCxDQUFvQkMsQ0FBcEIsRUFBdUI7QUFDckJDLFVBQU1ELENBQU4sRUFBU0EsRUFBRUUsSUFBRixDQUFPQyxhQUFoQjtBQUNEOztBQUVELFdBQVNDLFVBQVQsQ0FBcUJKLENBQXJCLEVBQXdCO0FBQ3RCQyxVQUFNRCxDQUFOLEVBQVNBLEVBQUVFLElBQUYsQ0FBT0MsYUFBUCxDQUFxQkUsYUFBckIsQ0FBbUMsQ0FBbkMsQ0FBVDtBQUNEOztBQUVEO0FBQ0EsV0FBU0osS0FBVCxDQUFnQkQsQ0FBaEIsRUFBbUJNLENBQW5CLEVBQXNCO0FBQ3BCLFFBQUlSLE9BQU9TLElBQVgsRUFBaUI7QUFDZjtBQUNEO0FBQ0RULFdBQU9TLElBQVAsR0FBYztBQUNaQyxTQUFHO0FBQ0RDLFdBQUdILEVBQUVJLE9BREo7QUFFREMsV0FBR0wsRUFBRU07QUFGSjtBQURTLEtBQWQ7QUFNQWQsV0FDR2UsRUFESCxDQUNNLFdBRE4sRUFDbUJDLFNBRG5CLEVBRUdELEVBRkgsQ0FFTSxXQUZOLEVBRW1CRSxTQUZuQjtBQUdEOztBQUVELFdBQVNELFNBQVQsQ0FBb0JkLENBQXBCLEVBQXVCO0FBQ3JCZ0IsU0FBS2hCLENBQUwsRUFBUUEsRUFBRUUsSUFBRixDQUFPQyxhQUFmO0FBQ0Q7O0FBRUQsV0FBU1ksU0FBVCxDQUFvQmYsQ0FBcEIsRUFBdUI7QUFDckIsUUFBSU0sSUFBSU4sRUFBRUUsSUFBRixDQUFPQyxhQUFQLENBQXFCRSxhQUE3QjtBQUNBLFFBQUksQ0FBQ0MsQ0FBRCxJQUFNQSxFQUFFVyxNQUFGLEdBQVcsQ0FBckIsRUFBd0I7QUFDdEJuQixhQUFPUyxJQUFQLENBQVlXLFFBQVosR0FBdUIsSUFBdkI7QUFDQUMsVUFBSW5CLENBQUo7QUFDQTtBQUNEO0FBQ0RnQixTQUFLaEIsQ0FBTCxFQUFRTSxFQUFFLENBQUYsQ0FBUjtBQUNEOztBQUVELFdBQVNVLElBQVQsQ0FBZWhCLENBQWYsRUFBa0JNLENBQWxCLEVBQXFCO0FBQ25CLFFBQUljLEtBQUtkLEVBQUVJLE9BQUYsR0FBWVosT0FBT1MsSUFBUCxDQUFZQyxDQUFaLENBQWNDLENBQW5DO0FBQ0EsUUFBSVksS0FBS2YsRUFBRU0sT0FBRixHQUFZZCxPQUFPUyxJQUFQLENBQVlDLENBQVosQ0FBY0csQ0FBbkM7QUFDQSxRQUFJVyxXQUFXQyxLQUFLQyxJQUFMLENBQVVKLEtBQUtBLEVBQUwsR0FBVUMsS0FBS0EsRUFBekIsQ0FBZjtBQUNBLFFBQUlJLFlBQWFuQixhQUFhb0IsT0FBT0MsVUFBckIsR0FBbUMsQ0FBbkMsR0FBdUMsQ0FBdkQ7QUFDQSxRQUFJTCxXQUFXRyxTQUFmLEVBQTBCO0FBQ3hCM0IsYUFBT1MsSUFBUCxDQUFZVyxRQUFaLEdBQXVCLElBQXZCO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFdBQVNDLEdBQVQsQ0FBY25CLENBQWQsRUFBaUI7QUFDZixRQUFJRixPQUFPUyxJQUFQLElBQWUsQ0FBQ1QsT0FBT1MsSUFBUCxDQUFZVyxRQUFoQyxFQUEwQztBQUN4QyxVQUFJVSxRQUFRO0FBQ1YxQixjQUFNRixFQUFFRTtBQURFLE9BQVo7QUFHQUosYUFBTytCLElBQVAsQ0FBWSxXQUFaLEVBQXlCRCxLQUF6QjtBQUNEO0FBQ0Q5QixXQUFPUyxJQUFQLEdBQWMsSUFBZDtBQUNBVCxXQUNHZ0MsY0FESCxDQUNrQixXQURsQixFQUMrQmhCLFNBRC9CLEVBRUdnQixjQUZILENBRWtCLFdBRmxCLEVBRStCZixTQUYvQjtBQUdEOztBQUVEakIsU0FBT2lDLFdBQVAsR0FBcUIsSUFBckI7QUFDQWpDLFNBQ0dlLEVBREgsQ0FDTSxXQUROLEVBQ21CZCxTQURuQixFQUVHYyxFQUZILENBRU0sWUFGTixFQUVvQlQsVUFGcEIsRUFHR1MsRUFISCxDQUdNLFNBSE4sRUFHaUJNLEdBSGpCLEVBSUdOLEVBSkgsQ0FJTSxnQkFKTixFQUl3Qk0sR0FKeEIsRUFLR04sRUFMSCxDQUtNLFVBTE4sRUFLa0JNLEdBTGxCLEVBTUdOLEVBTkgsQ0FNTSxpQkFOTixFQU15Qk0sR0FOekI7QUFPRCIsImZpbGUiOiJ0YXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0YXBwYWJsZSAoc3ByaXRlKSB7XHJcbiAgZnVuY3Rpb24gbW91c2VEb3duIChlKSB7XHJcbiAgICBzdGFydChlLCBlLmRhdGEub3JpZ2luYWxFdmVudClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvdWNoU3RhcnQgKGUpIHtcclxuICAgIHN0YXJ0KGUsIGUuZGF0YS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0pXHJcbiAgfVxyXG5cclxuICAvLyBwb3NzaWJseSBiZSBjYWxsZWQgdHdpY2Ugb3IgbW9yZVxyXG4gIGZ1bmN0aW9uIHN0YXJ0IChlLCB0KSB7XHJcbiAgICBpZiAoc3ByaXRlLl90YXApIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBzcHJpdGUuX3RhcCA9IHtcclxuICAgICAgcDoge1xyXG4gICAgICAgIHg6IHQuY2xpZW50WCxcclxuICAgICAgICB5OiB0LmNsaWVudFlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3ByaXRlXHJcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKVxyXG4gICAgICAub24oJ3RvdWNobW92ZScsIHRvdWNoTW92ZSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIG1vdXNlTW92ZSAoZSkge1xyXG4gICAgbW92ZShlLCBlLmRhdGEub3JpZ2luYWxFdmVudClcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHRvdWNoTW92ZSAoZSkge1xyXG4gICAgbGV0IHQgPSBlLmRhdGEub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzXHJcbiAgICBpZiAoIXQgfHwgdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHNwcml0ZS5fdGFwLmNhbmNlbGVkID0gdHJ1ZVxyXG4gICAgICBlbmQoZSlcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBtb3ZlKGUsIHRbMF0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtb3ZlIChlLCB0KSB7XHJcbiAgICBsZXQgZHggPSB0LmNsaWVudFggLSBzcHJpdGUuX3RhcC5wLnhcclxuICAgIGxldCBkeSA9IHQuY2xpZW50WSAtIHNwcml0ZS5fdGFwLnAueVxyXG4gICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KVxyXG4gICAgbGV0IHRocmVzaG9sZCA9ICh0IGluc3RhbmNlb2Ygd2luZG93Lk1vdXNlRXZlbnQpID8gMiA6IDdcclxuICAgIGlmIChkaXN0YW5jZSA+IHRocmVzaG9sZCkge1xyXG4gICAgICBzcHJpdGUuX3RhcC5jYW5jZWxlZCA9IHRydWVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIHBvc3NpYmx5IGJlIGNhbGxlZCB0d2ljZSBvciBtb3JlXHJcbiAgZnVuY3Rpb24gZW5kIChlKSB7XHJcbiAgICBpZiAoc3ByaXRlLl90YXAgJiYgIXNwcml0ZS5fdGFwLmNhbmNlbGVkKSB7XHJcbiAgICAgIGxldCBldmVudCA9IHtcclxuICAgICAgICBkYXRhOiBlLmRhdGFcclxuICAgICAgfVxyXG4gICAgICBzcHJpdGUuZW1pdCgnc2ltcGxldGFwJywgZXZlbnQpXHJcbiAgICB9XHJcbiAgICBzcHJpdGUuX3RhcCA9IG51bGxcclxuICAgIHNwcml0ZVxyXG4gICAgICAucmVtb3ZlTGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSlcclxuICAgICAgLnJlbW92ZUxpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpXHJcbiAgfVxyXG5cclxuICBzcHJpdGUuaW50ZXJhY3RpdmUgPSB0cnVlXHJcbiAgc3ByaXRlXHJcbiAgICAub24oJ21vdXNlZG93bicsIG1vdXNlRG93bilcclxuICAgIC5vbigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpXHJcbiAgICAub24oJ21vdXNldXAnLCBlbmQpXHJcbiAgICAub24oJ21vdXNldXBvdXRzaWRlJywgZW5kKVxyXG4gICAgLm9uKCd0b3VjaGVuZCcsIGVuZClcclxuICAgIC5vbigndG91Y2hlbmRvdXRzaWRlJywgZW5kKVxyXG59XHJcbiJdfQ==