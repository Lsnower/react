import React from 'react'
import $ from 'jquery'
import Alert from '../common/confirm.js'
export default  class  Sline extends React.Component {
    constructor(props){
        super(props)
        var chart={
            util:function(){
                 var o = Object.prototype.toString;
                    return {
                        isString: function(s) {
                            return o.call(s) == "[object String]";
                        },
                        isObject: function(s) {
                            return o.call(s) == "[object Object]";
                        },
                        isArrary: function(s) {
                            return o.call(s) == "[object Arrary]";
                        },
                        each: function(a, b, c) {
                            var d, e = 0,
                                f = a.length,
                                g = s(a);
                            if (c) {
                                if (g) {
                                    for (; f > e; e++)
                                        if (d = b.apply(a[e], c), d === !1) break
                                } else
                                    for (e in a)
                                        if (d = b.apply(a[e], c), d === !1) break
                            } else if (g) {
                                for (; f > e; e++)
                                    if (d = b.call(a[e], e, a[e]), d === !1) break
                            } else
                                for (e in a)
                                    if (d = b.call(a[e], e, a[e]), d === !1) break;
                            return a
                        }
                    }
            },
            dates: function() {
                var e = function(e, r) {
                    return (!r && 10 > e ? "0" : "") + e
                };
                return {
                    format: function(r, a, t) {
                        a = a || "Y-M-D h:m:s";
                        for (var c = r.getTime ? r : new Date(r), s = a.length, g = a, n = 0; s > n; n++) switch (a.charAt(n)) {
                            case "Y":
                                g = g.replace(/Y/g, e(c.getFullYear(), t));
                                break;
                            case "y":
                                g = g.replace(/y/g, e(c.getFullYear(), t).substring(2));
                                break;
                            case "M":
                                g = g.replace(/M/g, e(c.getMonth() + 1, t));
                                break;
                            case "D":
                                g = g.replace(/D/g, e(c.getDate(), t));
                                break;
                            case "h":
                                g = g.replace(/h/g, e(c.getHours(), t));
                                break;
                            case "m":
                                g = g.replace(/m/g, e(c.getMinutes(), t));
                                break;
                            case "s":
                                g = g.replace(/s/g, e(c.getSeconds(), t))
                        }
                        return g
                    }
                }
            },
            create:function(argument) {
                var e = $,
                    t = this.util(),
                n = {
                    create: function (e) {
                        return document.createElementNS("http://www.w3.org/2000/svg", e)
                    },
                    createText: function (e) {
                        return document.createTextNode(e)
                    },
                    append: function (e, t) {
                        return e.appendChild(t),
                        t
                    },
                    insert: function (e, t, n) {
                        return e.insertBefore(t, n),
                        t
                    },
                    remove: function (e) {
                        e.parentNode.removeChild(e)
                    },
                    query: function (e) {
                        return document.querySelector(e)
                    },
                    childs: function (e) {
                        if (e.children) return e.children;
                        for (var t = e.childNodes,
                        n = [], r = 0; r < t.length; r++) 1 === t[r].nodeType && n.push(t[r]);
                        return n
                    },
                    attr: function (e, r, i) {
                        
                        if (t.isString(r) && null == i) return e.getAttribute(r);
                        if (t.isString(r)) {
                            if ("style" === r && t.isObject(i)) {
                                var u = "";
                                $.each(i,
                                function (e, t) {
                                    u += e + ":" + t + ";"
                                }),
                                i = u
                            }
                           i && e.setAttribute(r, i)
                        } else $.each(r,
                        function (t, r) {
                            n.attr(e, t, r)
                        })
                    },
                    textContent: function (e, t) {
                        if (null == t) return e.firstChild.nodeValue;
                        var r = n.create("tspan");
                        n.append(r, n.createText(t)),
                        n.append(e, r)
                    },
                    getSize: function (t) {
                        var n = e(t);
                        return {
                            width: n.width(),
                            height: n.height()
                        }
                    }
                };
                return n
            },
            numbers:function(){
                 var r = {
                    u: function (n, u) {
                        u || (u = 0),
                        r.isS(n) && (n = r.f(n));
                        var o;
                        return n > 0 ? 1e5 > n ? r.round(n) : (1e8 > n ? (n /= 1e4, o = "万") : (n /= 1e8, o = "亿"), 0 == u ? r.round(n, 2).toFixed(2) + o : 1 == u ? n >= 100 ? r.round(n) + o : r.round(n, 2).toFixed(2) + o : 2 == u ? n >= 100 ? r.round(n) + o : r.round(n, 1).toFixed(1) + o : r.round(n) + o) : 0 > n ? n > -1e5 ? r.round(n) : (n > -1e8 ? (n /= 1e4, o = "万") : (n /= 1e8, o = "亿"), 0 == u ? r.round(n, 2).toFixed(2) + o : 1 == u ? -100 >= n ? r.round(n) + o : r.round(n, 2).toFixed(2) + o : 2 == u ? -100 >= n ? r.round(n) + o : r.round(n, 1).toFixed(1) + o : r.round(n) + o) : "0"
                    },
                    round: function (r, n) {
                        if (n || (n = 0), 0 >= n) return Math.round(r);
                        for (var u = 1,
                        o = 0; n > o; o++) u *= 10;
                        return Math.round(r * u) / u
                    },
                    isS: function (r) {
                        return "string" == typeof r
                    }
                };
                return {
                    format: function (r) {
                        if ("number" != typeof r) return r + "";
                        for (var n = 0 > r ? "-" : "", u = Math.abs(r) + "", o = u.length, t = "", e = 0; o-- > 0;) e++,
                        t = u.charAt(o) + t,
                        e % 3 === 0 && 0 !== o && (e = 0, t = "," + t);
                        return n + t
                    },
                    money: function (r) {
                        var n = 0 | r,
                        r = r + "",
                        u = r.indexOf(".");
                        return this.format(n) + (-1 === u ? "" : r.substring(u))
                    },
                    shrink: function (n) {
                        return "number" == typeof n ? r.u(n) : n
                    },
                    fill: function (r) {
                        return (10 > r ? "0" : "") + r
                    }
                }
            },
            slineMian:function(){
                var i = chart.create(),
                e = chart.numbers(),
                h = "#cd4a47",
                s = "#3b3738",
                r = "#3b3738",
                n = "#869bcb",
                a = "#b3b3b3",
                o = "#d0402d",
                l = "#17b03e",
                c = 5e-4,
                u = .005,
                m = 2e-4,
                d = .002,
                g = c,
                x = u,
                p = 7,
                v = function (t) {
                    this.svg = t.svg,
                    this.data = t.data || {},
                    this.quoteTime = null,
                    this.period = null,
                    this.close = 0,
                    this.open = 0,
                    this.limitUp = 0,
                    this.limitDown = 0,
                    this.scale = 2,
                    this.code = "",
                    this.moments = null,
                    this.init()
                };
                return v.prototype = {
                    init: function () {

                        this.resize(),
                        this.crossover(),
                        this.cacheEl = [],
                        this.gPricesEl = i.childs(this.svg)[1],
                        this.gVolumesEl = i.childs(this.svg)[2],
                        this.gHeartbeat = i.childs(this.svg)[3],
                        this.pathEl = null,
                        this.pathBgEl = null,
                        this.maxPrice = 0,
                        this.minPrice = 0,
                        this.maxVolume = 0,
                        this.minVolume = 0,
                        this.beginPrice = 0,
                        this.endPrice = 0,
                        this.price = 0
                    },
                    resize: function () {
                        this.svgWidth = i.getSize(this.svg).width,
                        this.svgHeight = i.getSize(this.svg).height;
                        var t = 20;
                        this.priceChartBox = {
                            x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: 2,
                                end: this.svgHeight - 30,
                                height: this.svgHeight -30
                            }
                        }
                    },
                    crossover:function(){
                        var o = this,
                            j = function(str) {
                                var v = str.substring(str.length-2,str.length),
                                    v2 = str.substring(0,str.length-2);
                                return str.length<=2?"0:"+str:(v2+":"+v);
                            },
                            k = function(v) {
                                var u=[];
                                var a = o.gPricesEl,
                                c = o.priceChartBox.x.end,
                                b = o.priceChartBox.y.height,
                                s = o.price.toString().length * 6.5,
                                len = o.moments.length,
                                _clear = function() {
                                    $.each(u,
                                    function (n,t) {
                                        t && a.removeChild(t)
                                    }),u.length = 0;
                                },
                                _draw = function(el) {
                                    var t = el.changedTouches[0],
                                        x = t.pageX,
                                    _ = o.moments[parseInt(( x/ c * len))],
                                    _data = o.data[_];
                                    if (!_data) {
                                        _ = o.quoteTime.toString();
                                        _data =o.data[_];
                                        x = c*(o.moments.indexOf(_)/len);
                                    }
                                    if (!_data) {;
                                        return false;
                                    }
                                    _clear();
                                    var _y = (o.beginPrice - _data.current) / (o.beginPrice - o.endPrice) * b;
                                    u.push(o._line(a, 0, _y, c, _y, h));
                                    u.push(o._line(a, x, 0, x, b, h));
                                    u.push(o._rect(a, c - s, _y - 7, 0, s, 15, h));
                                    u.push(o._text(a, c, _y + 5, _data.current.toFixed(o.scale), '#fff', 'end'));
                                    u.push(o._rect(a, x - 14, b + 2, 0, 30, 15, h));
                                    u.push(o._text(a, x + 15, b + 13, j(_), '#fff', 'end'));
                                };
                                o.svg.addEventListener('touchstart',
                                function(el) {
                                    _draw(el);
                                },false);
                                 o.svg.addEventListener('touchmove',
                                function(el) {
                                    _draw(el);
                                },false);
                                 o.svg.addEventListener('touchend',
                                function(e) {
                                    _clear();
                                },false);
                            },

                            l = function () {
                                var t = o.gPricesEl;
                                t ? k(t) : setTimeout(l, 200)
                            };
                            l()

                    },
                    setHeartbeat: function (t, e, h) {
                        this.heartbeatEl_1 || (this.heartbeatEl_1 = i.childs(this.gHeartbeat)[0], this.heartbeatEl_2 = i.childs(this.gHeartbeat)[1]),
                        2 !== arguments.length ? t ? (i.attr(this.gHeartbeat, "class", ""), i.attr(this.heartbeatEl_1, "class", "heartbeat"), i.attr(this.heartbeatEl_2, "class", "heartbeat")) : (i.attr(this.gHeartbeat, "class", "hide"), i.attr(this.heartbeatEl_1, "class", ""), i.attr(this.heartbeatEl_2, "class", "")) : (h = e, e = t),
                        null != e && null != h && (i.attr(this.heartbeatEl_1, {
                            cx: e,
                            cy: h
                        }), i.attr(this.heartbeatEl_2, {
                            cx: e,
                            cy: h
                        }));
                        var u = this.cacheEl,
                            a = this.gPricesEl,
                            m = this.pathBgEl,
                            c = this.priceChartBox.x.end,
                            v = (this.price-0).toFixed(this.scale),
                            l = v.toString().length * 6.5;


                       u.push(this._line(a, e, h, c, h, n,"3,3", m));
                       h = h<7?7:h;
                       u.push(this._rect(a,c-l,h-7,0,l,15,n,m));
                       u.push(this._text(a,c,h+5,v,'#fff','end',m));

                    },
                    draw: function (t) {
                        var i = function () {
                            t && this._setConfig(t),
                            t && t.data && (this.data = t.data, this._setMaxMin())
                        };
                        this._draw(i)

                    },
                    perDraw: function (t, i) {
                        var e = function () {
                            i && this._setConfig(i),
                            this.data[t.time] = t,
                            this.maxPrice = Math.max(this.maxPrice, t.current),
                            this.minPrice = Math.min(this.minPrice > 0 ? this.minPrice : t.current, t.current)
                        };
                        this._limit(t,
                        function () {
                            this._draw(e)
                        })
                    },
                    _draw: function (t) {
                        t.call(this),
                        this._clear(),
                        this._drawFramework(),
                        Object.keys(this.data).length ? this._drawChart() : this._drawBasePriceLine()
                    },
                    _clear: function () {
                        if(this.cacheEl.length){
                            $.each(this.cacheEl,
                            function (v,t) {
                                t && i.remove(t)
                            }),
                            this.cacheEl.length = 0
                        }
                    },
                    _drawFramework: function () {
                        var t = this.cacheEl,
                        e = i.childs(this.gPricesEl)[0];
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.end, this.priceChartBox.x.end, this.priceChartBox.y.end, '#e7e7e8', "", e))
                        //t.push(this._line(this.gPricesEl, this.priceChartBox.x.end, this.priceChartBox.y.start, this.priceChartBox.x.end, this.priceChartBox.y.end, a, "", e))

                    },
                    _drawBasePriceLine: function () {
                        var t = this.cacheEl;
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin, this.priceChartBox.x.end, this.priceChartBox.y.begin))
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height)),
                        t.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height))
                    },
                    _drawChart: function () {
                        this._drawPeriodLine(),
                        this._drawPriceLine(),
                        this._drawPath()
                    },
                    _drawPeriodLine: function () {
                        var e = this,
                        h = this.priceChartBox.x,
                        s = this.priceChartBox.y,
                        r = this.gPricesEl,
                        n = this.cacheEl,
                        a = i.childs(r)[0],
                        o = this.period.length,
                        l = this.moments.length,
                        c = o - 1,
                        u = 0,
                        f = chart.dates(),
                        m = function (t) {
                            var i = t.split(":"),
                            e = i[0] - 0,
                            h = i[1] - 0;
                            return 60 * e + h
                        };
                        $.each(this.period,
                        function (i, t) {
                            var o = t[0],
                            d = t[1];
                            if (n.push(e._text(r, 0 === i ? u + 1 : u - 15, s.end + 14, o)), i === c) u = h.width - 31,
                            n.push(e._text(r, u, s.end + 14, d));
                            else {
                                var g = m(d) - m(o);
                                0 > g && (g += 1440),
                                u += g / l * h.width - .25
                                //n.push(e._line(r, h.begin + u, s.begin, h.begin + u, s.end, "", "", a))
                            }
                        })
                    },
                    _drawPriceLine: function () {
                        var t = this.maxPrice,
                        i = this.minPrice;
                        t += this.maxPrice* g,
                        i -= this.maxPrice* g,
                        this.beginPrice = t,
                        this.endPrice = i;
                        var _rangePrice = (t - i)/p;
                        for (var u = this.cacheEl,
                        m = this.pathBgEl,
                        d = this.gPricesEl,
                        v = this.priceChartBox.x,
                        _ = this.priceChartBox.y,
                        b = _.height / p,
                        f = 0; p > f; f++) {
                            var B = v.begin,
                            C = _.begin + f * b + (0 === f ? .5 : 0),
                            P = v.end,
                            D = P,
                            E = C;
                            if(f%2 != 0 ){
                                var l = (t-_rangePrice*f).toFixed(this.scale);
                                u.push(this._text(d, D, C - 2, l, "#b3b3b3", "end", m));
                                u.push(this._line(d, B, C, P, E, "#e7e7e8", "", m));
                            }
                           
                        }
                        var V = this.endPrice.toFixed(this.scale),w = _.end + 3;
                        u.push(this._text(d, v.end, w, V, "#b3b3b3", "start", m));

                    },
                    _drawPath: function () {
                        var i, e, h, s, r = this.priceChartBox.x,
                        n = this.priceChartBox.y,
                        a = this.beginPrice,
                        o = this.endPrice,
                        l = this.moments.length - 1,
                        c = r.width - .5 - .5,
                        u = n.height,
                        m = c / (this.moments.length - 2 + 1),
                        d = function (t) {
                            var i = 0 === t ? 0 : t === l ? r.end : 1 + m * t - .5,
                            i = i.toFixed(4) - 0;
                            return r.begin + i
                        },
                        g = function (t) {
                            var i = (a - t) / (a - o) * u,
                            i = 0 === i ? .5 : i;
                            return (n.begin + i).toFixed(4) - 0
                        },
                        x = function (t) {
                            return "M0," + g(t)
                        },
                        p = function (t) {
                            return "L" + d(t) + "," + (n.end - .5) + "L" + r.begin + "," + (n.end - .5) + "Z"
                        },
                        v = this,
                        _ = this.data,
                        b = "",
                        f = "";
                        $.each(this.moments,
                        function (r, t) {
                            if (!v._isTradeTime(t)) return !1;
                            var n = _[t];
                            null == n && (n = e, null == n && (n = {
                                current: v.close,
                                time: t
                            })),
                            i = r,
                            e = n,
                            0 === r && (b += x(n.current)),
                            h = d(r),
                            s = g(n.current),
                            b += "L" + h + "," + s
                        }),
                        b && (f = b + p(i), this._path(b, f), this.setHeartbeat(h, s))
                    },

                    _path: function (t, e) {
                        this.pathEl || (this.pathEl = i.create("path"), this.pathBgEl = i.create("path"), i.attr(this.pathEl, {
                            stroke: n,
                            fill: "none"
                        }), i.attr(this.pathBgEl, {
                            stroke: "none",
                            fill: n,
                            "fill-opacity": "0"
                        }), i.append(this.gPricesEl, this.pathBgEl), i.append(this.gPricesEl, this.pathEl)),
                        i.attr(this.pathEl, "d", t);
                        i.attr(this.pathBgEl, "d", e);

                    },
                    _line: function (t, e, h, s, n, a, o, l) {
                        var c = i.create("line");
                        return i.attr(c, {
                            x1: e,
                            y1: h,
                            x2: s,
                            y2: n,
                            stroke: a || r,
                            "stroke-width": 0.5
                        }),
                        o && i.attr(c, "stroke-dasharray", o),
                        l ? i.insert(t, c, l) : i.append(t, c),
                        c
                    },
                    _rect: function (t, e, h, s, a, n, r, o) {
                        var l = i.create("rect");
                        return i.attr(l, {
                            x: e,
                            y: h,
                            rx: s || 0,
                            ry: s || 0,
                            width: a,
                            height: n,
                            fill: r,
                            stroke: r,
                            style: {
                                "text-anchor": "end"
                            },
                            "stroke-width":  "0"
                        }),
                        o ? i.insert(t, l, o) : i.append(t, l),
                        l
                    },
                    _text: function (t, e, h, s, r, n, o) {
                        if(s==="+Infinity%")return;
                        var l = i.create("text");
                        return i.attr(l, {
                            x: e,
                            y: h,
                            fill: r || a,
                            style: {
                                "text-anchor": n || "start"
                            }
                        }),
                        i.textContent(l, s),
                        o ? i.insert(t, l, o) : i.append(t, l),
                        l
                    },
                    _limit: function (t, i) {
                        this._last_code === this.code && this._last_time === t.time ?  i.call(this) : i.call(this),//this._last_volume !== t.volume &&
                        this._last_code = this.code,
                        this._last_time = t.time,
                        this._last_volume = t.volume
                    },
                    _setConfig: function (t) {
                        t.quoteTime && (this.quoteTime = t.quoteTime),
                        null != t.close && (this.close = t.close),
                        null != t.open && (this.open = t.open),
                        null != t.price && (this.price = t.price),
                        t.period && (this.period = t.period, this.moments = this._period2moments()),
                        t.code && (this.code = t.code, this._setLimitPrice()),
                        t.limitUp && (this.limitUp = t.limitUp, this.limitDown = t.limitDown),
                        null != t.scale && (this.scale = t.scale, g = this.scale <= 2 ? c : m, x = this.scale <= 2 ? u : d)
                    },
                    _setMaxMin: function () {
                        var i = this,
                        e = this.data,
                        h = this.moments;
                        if (Object.keys(e).length) {
                            var s = -1;
                            this.maxPrice = 0,
                            this.minPrice = 0,
                            this.beginPrice = 0,
                            this.endPrice = 0,
                            $.each(h,
                            function (h, t) {
                                if (i._isTradeTime(t)) {
                                    var r = e[t];
                                    if (null == r) return void s++;
                                    h === s && (r.volume = 0),
                                    i.maxPrice = Math.max(i.maxPrice, r.current),
                                    i.minPrice = Math.min(i.minPrice > 0 ? i.minPrice : r.current, r.current)
                                }
                            })
                        }
                    },
                    _setLimitPrice: function () {
                        var t = .1;
                        this.limitUp = this.close * (1 + t),
                        this.limitDown = this.close * (1 - t)
                    },
                    _period2moments: function () {
                        var i = [];
                        $.each(this.period,
                        function (v,t) {
                            for (var h = t[0], s = t[1], r = h.split(":"), n = r[0] - 0, a = r[1] - 0, o = s.split(":"), l = (o[0] - 0)<n?(o[0] - 0)+24:(o[0] - 0), c = o[1] - 0; l >= n && (60 === a && (n += 1, a = 0), !(n === l && a > c - 1)) ; a++) i.push((n>=24?n-24:n) + e.fill(a) - 0 + "")
                        });
                        var h = this.period[this.period.length - 1][1],
                        h = h.replace(":", "");
                        return this.quoteTime === h - 0 && i.push(h),
                        i
                    },
                    _isTradeTime: function (t) {
                        var i = this.moments[0] - 0,
                        e = this.moments[this.moments.length - 1] - 0,
                        h = t - 0,
                        s = this.quoteTime;
                        if (i > e) {
                            if (s >= i && 2400 > s) return h >= i && s >= h;
                            if (h >= i && 2400 > h) return !0
                        }
                        return s >= h
                    }
                },
                v
            }
           
        };
       
        this.state={
            chart:chart,
            data:props.data,
            code:props.code,
            type:props.type,
            openMarketTime:props.peroid,
            scale:props.scale,
            alert:true
        }
        this.sline=this.sline.bind(this);
        this.updateSline =this.updateSline.bind(this);
        this.initPeriod=this.initPeriod.bind(this);
    }
     componentWillReceiveProps(nextProps){
         this.setState({
            data:nextProps.data,
            type:nextProps.type
        })
    }
    componentDidUpdate(nextProps){
        this.updateSline();
       
    }
    componentWillUnmount() {  
        this.serverRequest.abort();  
    }
   
    initPeriod(){
        var o = this.state.openMarketTime.split(';'),
            l = o.length-1,
            period = [],
            p1 = [],
            p2 = [],
            p3 = [],
            p4 = null;
        if(o.length<3){
            if(parseInt(o[l])-parseInt(o[0])>0){
                var s = parseInt((parseInt(o[l])-parseInt(o[0]))/3),
                    t1 = parseInt(o[0])+s>=10 ?(parseInt(o[0])+s)+':00':'0'+(parseInt(o[0])+s)+':00',
                    t2= parseInt(t1)+s>=10?(parseInt(t1)+s)+':00':'0'+(parseInt(t1)+s)+':00';

            }else{
                var s = parseInt((24+(parseInt(o[l])-parseInt(o[0])))/3);
                t1 = parseInt(o[0])+s>=10?(parseInt(o[0])+s>24?parseInt(o[0])+s-24:parseInt(o[0])+s)+':00':'0'+(parseInt(o[0])+s)+':00',
                t2= parseInt(t1)+s>=10?(parseInt(t1)+s>24?parseInt(t1)+s-24:parseInt(t1)+s)+':00':'0'+(parseInt(t1)+s)+':00';

            }
            p1.push(o[0]),
            p1.push(t1),
            p2.push(t1),
            p2.push(t2),
            p3.push(t2),
            p3.push(o[l]);
        }else{
            p1.push(o[0]),
            p1.push(o[1]),
            p2.push(o[2]),
            p2.push(o[3]),
            o[4]&&p3.push(o[4]),
            o[5]&&p3.push(o[5]);
            if(o[6]){
                p4=[];
                o[6]&&p4.push(o[6]),
                o[7]&&p4.push(o[7]);
            }
           
        }
       
        period.push(p1),
        period.push(p2),
        period.push(p3);
        p4&&period.push(p4);

        return period;

    }
    sline(t){
        var i = this,
        n = t ? t : [],
        c = {},
        s = [],
        f = i.state.chart.dates().format,
        w = {},
        u = i.state.chart.slineMian(),
        o = new u({
            svg: $("#tick-sline")[0]
        });
        this.setState({
            sline:o
        })
        n.forEach(function (t) {
            s = t;
            var j = f(t.time.replace(/-/g,'/'),'hm') ,l = j.substr(0,1);
            l==0?j=j.substr(1,j.length):j=j;
            c[j] = {
                current: t.closePrice - 0,
                volume: 0,
                time: t.time
            }
        });
        this.setState({
            gTime:f(s.time.replace(/-/g,'/'), 'hm') - 0
        })
        w[i.state.code] = c;
        var n = f(new Date().getTime(), "hm") - 0;
        var u =function(){
            var t = i.state.data;
            o.draw({
                data: c,
                quoteTime: n,
                open: t.openPrice,
                close: t.settlePrice,
                limitUp: t.upLimitPrice,
                limitDown: t.downLimitPrice,
                period: i.initPeriod(),
                scale: i.state.scale,
                code: i.state.code,
                price:t.lastPrice.toFixed(i.state.scale)
            })
        },
        l = function(){
            i.state.data?u():setTimeout(l,200);
        };
        l();
    }
    updateSline(){
       
        var _this = this,t = this.state.data,o=this.state.sline;
        if (null != t && o) {
            var i = {
                    current: t.lastPrice,
                    volume: 0,
                    time:_this.state.chart.dates().format(t.upTime, "hm") - 0 + ""
                };
            if (i.time - 0 !== this.state.gTime){
                if (null == t[i.time] && i.time - 1 !== this.state.gTime) {
                    var n = t[i.time - 1];
                }
                o.perDraw(i, {
                    quoteTime: i.time - 0,
                    open: t.openPrice-0,
                    close: t.preSetPrice-0,
                    limitUp: t.upLimitPrice,
                    limitDown: t.downLimitPrice,
                    scale: _this.state.scale,
                    code: _this.state.code,
                    period:_this.initPeriod(),
                    price:(t.lastPrice-0).toFixed(_this.state.scale)
                })
            }
        }
    }

    componentDidMount(){
        var _this = this,
            code = _this.state.code;
        
       this.serverRequest = $.ajax({
            type:'get',
            url:' /fut/k/timeSharing.do',
            data:{code:code,datasource:''},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    _this.sline(d.data);
                }else{
                     _this.setState({
                        alert:true
                    })
                }
                
            }
        });
            
    }

    render(){
        return (
                <article className={this.props.chart==1?"tick":"tick hide"}>
                    <svg id="tick-sline" className="mod-sline" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <desc>single line chart</desc>
                        <g></g>
                        <g></g>
                        <g>
                            <circle className="heartbeat" cx="-10" cy="-10" r="2" fill="#fff" fillOpacity="0.2" stroke="#f05a3c" strokeWidth="0.5"></circle>
                            <circle className="heartbeat" cx="-10" cy="-10" r="1" fill="#f05a3c" strokeWidth="0"></circle>
                        </g>
                    </svg>
                     <style>{`
                setion,article{
                    background:#fff;
                }
                .hide{ display:none;}
                 
                 .mod-sline,.mod-kline{
                    height:2rem;
                    width:100%;
                     -webkit-tap-highlight-color: transparent
                 }
                 .mod-kline text,.mod-lightning text,.mod-sline text {
                    font: 12px Arial;
                    text-anchor: start;
                    -webkit-tap-highlight-color: transparent
                }

            `}</style>
                </article>

               

        )
    }
}