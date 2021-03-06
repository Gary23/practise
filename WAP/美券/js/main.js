( function() {
    'use strict';
    var win = {width: window.innerWidth, height: window.innerHeight};
    window.addEventListener('resize', throttle(function(ev) {
        win = {width: window.innerWidth, height: window.innerHeight};
    }, 60));
    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
    function throttle(fn, delay) {
        var allowSample = true;

        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    }
    function DialogEl(el, options) {
        this.el = el;
        this.dragEl = el.querySelector('.mover-wrap');

        this.options = extend( {}, this.options );
        extend( this.options, options );
        if( this.options.mainElement.rX !== undefined || this.options.mainElement.rY !== undefined ) {
            this.el.style.WebkitPerspective = '1000px';
            this.el.style.perspective = '1000px';
            this.dragEl.style.WebkitTransformStyle = 'preserve-3d';
            this.dragEl.style.transformStyle = 'preserve-3d';
        }

        this._init();
    }

    DialogEl.prototype.options = {};

    DialogEl.prototype._init = function() {
        this.moverEl = this.el.querySelector('.mover');
        this.innerEl = [].slice.call(this.el.querySelectorAll('.mover__element'));
        var self = this;
        this.el.querySelector('button.action--close').addEventListener('click', function() { self.close(); });
        this._initDraggabilly();
    };

    DialogEl.prototype._onDragStart = function(event, pointer, moveVector) {
        dynamics.stop(this.draggie.element);
        dynamics.stop(this.moverEl);
        dynamics.stop(this.innerEl);
    };

    DialogEl.prototype._onDragMove = function(event, pointer, moveVector) {
        var moverEl_settings = {};
        if( this.options.mainElement.rX !== undefined ) {
            moverEl_settings.rotateX = 2 * this.options.mainElement.rX / win.height * moveVector.y;
        }
        if( this.options.mainElement.rY !== undefined ) {
            moverEl_settings.rotateY = -2 * this.options.mainElement.rY / win.width * moveVector.x;
        }

        if( this.options.mainElement.minscale !== undefined ) {
            moverEl_settings.scale = moveVector.x < 0 ? 2 * (1 - this.options.mainElement.minscale) / win.width * moveVector.x + 1 : -1 * (2 * (1 - this.options.mainElement.minscale) / win.width) * moveVector.x + 1;
        }

        if( this.options.mainElement.minopacity !== undefined ) {
            moverEl_settings.opacity = moveVector.x < 0 ? 2 * (1 - this.options.mainElement.minopacity) / win.width * moveVector.x + 1 : -1 * (2 * (1 - this.options.mainElement.minopacity) / win.width) * moveVector.x + 1;
        }
        dynamics.css(this.moverEl, moverEl_settings);
        var innerElements_settings = {};
        if( this.options.innerElements.tx !== undefined ) {
            innerElements_settings.translateX = 2 * (this.options.innerElements.tx) * moveVector.x / win.width;
        }
        if( this.options.innerElements.ty !== undefined ) {
            innerElements_settings.translateY = 2 * (this.options.innerElements.ty) * moveVector.y /win.height;
        }
        dynamics.css(this.innerEl, innerElements_settings);
        if( this._outOfBounds() ) {
            dynamics.css(this.moverEl, { rotate: 0, scale: 1, opacity: 1 });
            dynamics.css(this.innerEl, { translate: 0 });
            dynamics.animate(this.draggie.element, {
                translate: 0,
                left: 0,
                top: 0
            });
            this.close();
        }
    };

    DialogEl.prototype._onDragEnd = function(event, pointer, moveVector) {
        dynamics.animate(this.draggie.element, { translate: 0, left: 0, top: 0 }, { type: dynamics.spring, friction: 400  });
        dynamics.animate(this.moverEl, { rotate: 0, scale: 1, opacity: 1 }, { type: dynamics.spring, friction: 400  });
        this.innerEl.forEach(function(el, i) {
            dynamics.setTimeout(function() {
                dynamics.animate(el, { translate: 0 }, { type: dynamics.spring, friction: 200  });
            }, i*100);
        });
    };

    DialogEl.prototype._initDraggabilly = function() {
        var self = this;
        this.draggie = new Draggabilly(this.dragEl, {handle: '.handle'});
        this.draggie.on('dragStart', function(event, pointer, moveVector) { self._onDragStart(event, pointer, moveVector); });
        this.draggie.on('dragMove', function(event, pointer, moveVector) { self._onDragMove(event, pointer, moveVector); });
        this.draggie.on('dragEnd', function(event, pointer, moveVector) { self._onDragEnd(event, pointer, moveVector); });
    };

    DialogEl.prototype.open = function() {
        classie.add(this.el, 'dialog--open');
        this.draggie.enable();
    };

    DialogEl.prototype.close = function() {
        classie.remove(this.el, 'dialog--open');
        this.draggie.disable();
    };

    DialogEl.prototype._outOfBounds = function() {
        var el = this.draggie.element, offset = el.getBoundingClientRect(),
            center = {x : offset.left + +el.offsetWidth/2, y : offset.top + +el.offsetHeight/2};

        return center.x < this.options.outofbounds.x || center.x > win.width - this.options.outofbounds.x || center.y < this.options.outofbounds.y || center.y > win.height - this.options.outofbounds.y;
    };
    window.DialogEl = DialogEl;

})();