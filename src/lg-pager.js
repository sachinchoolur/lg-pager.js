var pagerDefaults = {
    pager: false
};

var Pager = function(element) {

    this.el = element;

    this.core = window.lgData[this.el.getAttribute('lg-uid')];
    this.core.s = Object.assign({}, pagerDefaults, this.core.s);

    if (this.core.s.pager && this.core.items.length > 1) {
        this.init();
    }

    return this;
};

Pager.prototype.init = function() {
    var _this = this;
    var pagerList = '';
    var $pagerCont;
    var $pagerOuter;
    var timeout;

    _this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div class="lg-pager-outer"></div>');

    if (_this.core.s.dynamic) {
        for (var j = 0; j < _this.core.s.dynamicEl.length; j++) {
            pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.s.dynamicEl[j].thumb + '" /></div></span>';
        }
    } else {
        for (var i = 0; i < _this.core.items.length; i++) {
            if (!_this.core.s.exThumbImage) {
                pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.items[i].querySelector('img').getAttribute('src') + '" /></div></span>';
            } else {
                pagerList += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + _this.core.items[i].getAttribute(_this.core.s.exThumbImage) + '" /></div></span>';
            }
        }
    }

    $pagerOuter = _this.core.outer.querySelector('.lg-pager-outer');

    $pagerOuter.innerHTML = pagerList;

    $pagerCont = _this.core.outer.querySelectorAll('.lg-pager-cont');
    for (var k = 0; k < $pagerCont.length; k++) {
        
        /*jshint loopfunc: true */
        (function(index) {
            utils.on($pagerCont[index], 'click.lg touchend.lg', function() {
                _this.core.index = index;
                _this.core.slide(_this.core.index, false, false);
            });

        })(k);
    }

    utils.on($pagerOuter, 'mouseover.lg', function() {
        clearTimeout(timeout);
        utils.addClass($pagerOuter, 'lg-pager-hover');
    });

    utils.on($pagerOuter, 'mouseout.lg', function() {
        timeout = setTimeout(function() {
            utils.removeClass($pagerOuter, 'lg-pager-hover');
        });
    });

    utils.on(_this.core.el, 'onBeforeSlide.lgtm', function(e) {
        for (var n = 0; n < $pagerCont.length; n++) {
            utils.removeClass($pagerCont[n], 'lg-pager-active');
            if (e.detail.index === n) {
                utils.addClass($pagerCont[n], 'lg-pager-active');
            }
        }
    });

};

Pager.prototype.destroy = function() {

};

window.lgModules.pager = Pager;
