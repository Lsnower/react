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
                h = "red",
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
                                    _ = o.moments[parseInt((t.pageX / (o.svgWidth-45) * len))],
                                    _data = o.data[_];
                                    if (!_data) {;
                                        return false;
                                    }
                                    _clear();
                                    var _y = (o.beginPrice - _data.current) / (o.beginPrice - o.endPrice) * b;
                                    u.push(o._line(a, 0, _y, c, _y, n));
                                    u.push(o._line(a, t.pageX, 0, t.pageX, b, n));
                                    u.push(o._rect(a, c - s, _y - 7, 0, s, 15, n));
                                    u.push(o._text(a, c, _y + 5, _data.current.toFixed(o.scale), '#333', 'end'));
                                    u.push(o._rect(a, t.pageX - 14, b + 2, 0, 30, 15, n));
                                    u.push(o._text(a, t.pageX + 15, b + 13, j(_), '#333', 'end'));
                                };
                                v.addEventListener('touchstart',
                                function(el) {
                                    _draw(el);
                                },false);
                                v.addEventListener('touchmove',
                                function(el) {
                                    _draw(el);
                                },false);
                                v.addEventListener('touchend',
                                function(e) {
                                    _clear();
                                },false);
                            },

                            l = function () {
                                var t = o.pathBgEl;
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
                            "fill-opacity": "0.1"
                        }), i.append(this.gPricesEl, this.pathBgEl), i.append(this.gPricesEl, this.pathEl)),
                        i.attr(this.pathEl, "d", t);
                        //i.attr(this.pathBgEl, "d", e);

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
                            for (var h = t[0], s = t[1], r = h.split(":"), n = r[0] - 0, a = r[1] - 0, o = s.split(":"), l = (o[0] - 0)<n?(o[0] - 0)+24:(o[0] - 0), c = o[1] - 0; l >= n && (60 === a && (n += 1, a = 0), !(n === l && a > c - 1)) ; a++) i.push(n + e.fill(a) - 0 + "")
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
            },
            klineMian:function(){
                var i = $,
                t = chart.create(),
                h = chart.numbers(),
                e = (new Date).getFullYear(),
                b = chart.dates(),
                s = function (i) {
                    var str = j?'h:m':'M-D';
                    return b.format(i,str);
                },
                a = "#e7e7e8",
                r = "#e7e7e8",
                n = "#869bcb",
                c = "#fc603c",
                o = "#25d79e",
                l = "#fc603c",
                g = "#fefefe",
                u = "#a63beb",
                d = "#d7ce51",
                x = "#0f4a96",
                m = 10,
                _ = .8,
                p = 7,
                v = .1,
                y = 70,
                j = '',
                f = function (i) {
                    this.svg = i.svg,
                    this.data = i.data || [],
                    this.days = i.days || y,
                    this.scale = i.scale || 2,
                    this.init()
                };
                return f.prototype = {
                    init: function () {
                        var i = this.data;
                        //this.crossoverf(),
                        this.price = 0,
                        this.moments = [],
                            
                        this.svgWidth = document.body.clientWidth//t.getSize(this.svg).width,
                        this.svgHeight = t.getSize(this.svg).height,
                        this.gPricesEl = t.childs(this.svg)[1],
                        this.gVolumesEl = t.childs(this.svg)[2],
                            
                        this.gBlockEl = t.childs(this.svg)[3],
                            
                        this.days = this._getDays(i.length, this.days),
                        this.lowPrice = 0,
                        this.highPrice = 0,
                        this.minPrice = 0,
                        this.maxPrice = 0,
                        this.minVolume = 0,
                        this.maxVolume = 0,
                        this._calcMaxMin(i.slice(i.length - this.days)),
                        this.beginPrice = 0,
                        this.endPrice = 0,
                        this._cacheEl = [];
                        var h = 20;
                        this.priceChartBox = {
                           x: {
                                begin: 0,
                                end: this.svgWidth,
                                width: this.svgWidth
                            },
                            y: {
                                begin: 0,
                                end: this.svgHeight - 30,
                                height: this.svgHeight -30
                            }
                        }

                    },
                    draw: function (i) {
                        if (i) {
                            j = i.type;
                            var t = this.data;
                            i.data && (t = this.data = i.data, this.days = this._getDays(t.length, y), this._calcMA()),
                            i.days && (this.days = this._getDays(t.length, i.days)),
                            (i.data || i.days) && this._calcMaxMin(t.slice(t.length - this.days)),
                            null != i.scale && (this.scale = i.scale)
                        }
                        this._draw()
                    },
                    crossoverf:function(){
                        var o = this,
                            j = function(str) {
                                var v = str.substring(str.length-2,str.length),
                                    v2 = str.substring(0,str.length-2);
                                return str.length<=2?"0:"+str:(v2+":"+v);
                            },
                            k = function(v) {
                                var u=[];
                                var f = [];
                                var Acolor = { 0:'#fc603c',1:'#25d79e'};
                                var grayC = '#a8a8a8';
                                var whiteC = '#FFF';
                                var kcolor,Hcolor,Lcolor,Ccolor;
                                var strMa5 = '';
                                var strMa10 = '';
                                var strMa20 = '';
                                var a = o.gPricesEl,
                                h = o.gBlockEl,
                                c = o.priceChartBox.x.end,
                                b = o.priceChartBox.y.height,
                                s = o.price.toString().length * 6.5,
                                len = o.moments.length,
                                _clear = function() {
                                    $.each(u,
                                    function (n,t) {
                                        t && a.removeChild(t)
                                    }),u.length = 0;
                                    $.each(f,
                                    function (n,t) {
                                        t && h.removeChild(t)
                                    }),f.length = 0;
                                },
                                _draw = function(el,end) {
                                    var t = el.changedTouches[0],
                                    numNow = parseInt((t.pageX / (o.svgWidth-45) * len)),
                                    _ = o.moments[numNow],
                                    arr_all = [].concat(o.moments),
                                    _data = _;
                                    
                                    if (!_data) {
                                        return false;
                                    }
                                    _clear();
                                    
                                    var _y = (o.beginPrice - _data.close) / (o.beginPrice - o.endPrice) * b;
                                    var timeS = _data.time.toString().split(" ");
                                    var tTime = timeS[1].toString().split(":");
                                    var sTime = tTime[0]+':'+tTime[1];
                                    var smallN = forex.base().marketPoint;
                                    var _f = o.moments[(parseInt((t.pageX / (o.svgWidth-45) * len))-1)] ? o.moments[(parseInt((t.pageX / (o.svgWidth-45) * len))-1)] : 0;
                                    
                                    _f == 0 ?  kcolor = Acolor[0] : ( (_f - _data.open) > 0 ? kcolor = Acolor[1] : kcolor = Acolor[0] );
                                    (_data.open - _data.high) > 0 ? Hcolor = Acolor[1] : Hcolor = Acolor[0];
                                    (_data.open - _data.low) > 0 ? Lcolor = Acolor[1] : Lcolor = Acolor[0];
                                    (_data.open - _data.close) > 0 ? Ccolor = Acolor[1] : Ccolor = Acolor[0];
                                    
                                    /*日线价格变化图*/
                                    if(end){
                                        var lenMa = arr_all.length-1;
                                        
                                        var ma5 = arr_all.slice((lenMa-4),lenMa+1);
                                        var ma10 = arr_all.slice((lenMa-9),lenMa+1);    
                                        var ma20 = arr_all.slice((lenMa-19),lenMa+1);
                                    }
                                    else{
                                        var ma5 = (numNow-4) >0 ? arr_all.slice((numNow-4),numNow+1) : [];
                                        var ma10 = (numNow-9) >0 ? arr_all.slice((numNow-9),numNow+1) : []; 
                                        var ma20 = (numNow-19) >0 ? arr_all.slice((numNow-19),numNow+1) : [];
                                    }
                                    
                                    
                                    var ma5_num = toma(ma5,5);
                                    var ma10_num = toma(ma10,10);
                                    var ma20_num = toma(ma20,20);
                                    
                                    function toma(arrMa,len){
                                        var all_close = 0;
                                        if(arrMa[0]){
                                            for(var i=0;i<arrMa.length;i++){
                                                all_close += arrMa[i].close;
                                            }
                                            return (all_close/len).toFixed(smallN)
                                        }
                                        else{
                                            return '-'
                                        }
                                    }
                                    
                                    o.gPricesEl.children[(o.gPricesEl.children.length-3)].innerHTML = '<tspan>MA5:'+ma5_num+'</tspan>';
                                    o.gPricesEl.children[(o.gPricesEl.children.length-2)].innerHTML  = '<tspan>MA10:'+ma10_num+'</tspan>';
                                    o.gPricesEl.children[(o.gPricesEl.children.length-1)].innerHTML = '<tspan>MA20:'+ma20_num+'</tspan>';
                                    /*end*/
                                    
                                    u.push(o._line(a, 0, _y, c, _y, '#358cf3'));
                                    u.push(o._line(a, t.pageX, 0, t.pageX, b, '#358cf3'));
                                    
                                    
                                    if( t.pageX < (c/2) ){
                                        var maxc = $(window).width();
                                        paint((maxc-c/3.5),maxc-5,'end');
                                    }
                                    else{
                                        paint(0,5,'start');
                                    }
                                    
                                    
                                    function paint(hx,x,w){
                                        var fs = w + '; font-size:0.12rem;';
                                        var fs1 = w + '; font-size:0.16rem;';
                                        f.push(o._rect(a,hx,40,c/3.5,b*0.89,'#0e2947','none'));
                                        f.push(o._text(a,x,60,timeS[0],grayC,w,'none'));
                                        f.push(o._text(a,x,77,sTime,grayC,w,'none'));
                                        f.push(o._text(a,x,100,'开盘',whiteC,fs,'none'));
                                        f.push(o._text(a,x,120,_data.open.toFixed(smallN),kcolor,fs1,'none'));
                                        f.push(o._text(a,x,140,'最高',whiteC,fs,'none'));
                                        f.push(o._text(a,x,160,_data.high.toFixed(smallN),Hcolor,fs1,'none'));
                                        f.push(o._text(a,x,180,'最低',whiteC,fs,'none'));
                                        f.push(o._text(a,x,200,_data.low.toFixed(smallN),Lcolor,fs1,'none'));
                                        f.push(o._text(a,x,220,'收盘',whiteC,fs,'none'));
                                        f.push(o._text(a,x,240,_data.close.toFixed(smallN),Ccolor,fs1,'none'));
                                    }
                                    
                                    $.each(f,
                                    function (n,t) {
                                        t && h.appendChild(t)
                                    });
                                    
                                };
                                v.addEventListener('touchstart',
                                function(el) {
                                    _draw(el);
                                },false);
                                v.addEventListener('touchmove',
                                function(el) {
                                    _draw(el);
                                    
                                },false);
                                v.addEventListener('touchend',
                                function(e) {
                                    _draw(e,'end');
                                    _clear();
                                },false);
                            },

                            l = function () {
                                var t = o.svg;
                                o.gPricesEl ? k(t) : setTimeout(l, 200)
                            };
                            l()
                    },
                    _draw: function () {
                        this._init || (this._init = !0, this._drawFramework()),
                        this._clear(),
                        this.data.length ? this._drawChart() : this._drawBasePriceLine()
                    },
                    _drawFramework: function () {
                        this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.end, this.priceChartBox.x.end, this.priceChartBox.y.end, a)
                        //this._line(this.gPricesEl, this.priceChartBox.x.end, this.priceChartBox.y.start, this.priceChartBox.x.end, this.priceChartBox.y.end, a)

                    },
                    _drawBasePriceLine: function () {
                        var i = this._cacheEl;
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin, this.priceChartBox.x.end, this.priceChartBox.y.begin)),
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .2 * this.priceChartBox.y.height)),
                        i.push(this._line(this.gPricesEl, this.priceChartBox.x.begin, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height, this.priceChartBox.x.end, this.priceChartBox.y.begin + .8 * this.priceChartBox.y.height))
                    },
                    _drawChart: function () {
                        var i = this.priceChartBox.x.end / this.days,
                        t = this.priceChartBox.x.end / m;
                        this.days < t && (i = m),
                        this._drawPriceRange(),
                        this._drawTimeline(i);
                        for (var h, e = this.data.slice(this.data.length - this.days), s = 0; s < this.days; s++) {
                            var a = e[s];
                            h = a.close > a.open ? c : a.close < a.open ? o : l,
                            this._drawKline(a, i, s, h);
                            this.moments[s] = a
                        }
                        this._drawMA(e, i)
                    },
                    _clear: function () {
                        i.each(this._cacheEl,
                        function (f,i) {
                            i && t.remove(i)
                        }),
                        this._cacheEl.length = 0
                    },
                    _drawPriceRange: function () {
                        var i = this.maxPrice,
                        t = this.minPrice,
                        e = (i - t) * v;
                        this.beginPrice = i + e,
                        this.endPrice = t - e;
                        for (var s = this._cacheEl,
                        a = this.gPricesEl,
                        r = this.priceChartBox.x,
                        n = this.priceChartBox.y,
                        c = n.height / p,
                        o = 0; p > o; o++) {
                            var l = r.begin,
                            g = n.begin + c * o + (0 === o ? .5 : 0),
                            u = r.end,
                            d = g;
                            s.push(this._line(a, l, g, u, d))
                        }
                        var x, m, e;
                        if (x = r.end + 3, m = n.begin + 14, e = this.maxPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "start")), x = r.end + 3, m = n.end - 4, e = this.minPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "start")), p >= 3) {
                            var o = (p - p % 2) / 2 + 1;
                            m = n.begin + c * o,
                            e = (this.maxPrice + this.minPrice) / 2,
                            e = e.toFixed(this.scale),
                            m = m - c / 2 + 4,
                            x = r.end + 3,
                            s.push(this._text(a, x, m, e, "", "start"))
                        }

                    },
                    _drawTimeline: function (i) {
                        var t = this.data.slice(this.data.length - this.days),
                        h = this._cacheEl,
                        e = this.priceChartBox.x,
                        a = this.priceChartBox.y,
                        r = 5;
                        this.days < 20 && (r = 2);
                        for (var n = this.days / r | 0,
                        c = 0; r > c; c++) {
                            var o, l, g, u, d, x, m, _;
                            if (o = e.begin + c * n * i + i / 2, l = a.begin, g = o, u = a.end, _ = t[c * n], d = o, x = a.end + 14, m = s(_.time), h.push(this._line(this.gPricesEl, o, l, g, u)), h.push(this._text(this.gPricesEl, d, x, m)), 5 > n) break
                        }
                    },
                    _drawMA: function (i, t) {
                        
                        var tx = this.priceChartBox.x.end,
                            sx = tx/6;
                        
                        for (var h, e, s, a = this._cacheEl,
                        r = function (i, t) {
                            return "L" + i + "," + t
                        },
                        n = function (i, t) {
                            return "M" + i + "," + t
                        },
                        c = "", o = "", l = "", m = "", _ = 0; _ < this.days; _++) h = i[_],
                        e = this._c2x_ma(_, t),
                        h.ma5 && (s = this._c2y_ma(h.ma5), c += c ? r(e, s) : n(e, s)),
                        h.ma10 && (s = this._c2y_ma(h.ma10), o += o ? r(e, s) : n(e, s)),
                        h.ma20 && (s = this._c2y_ma(h.ma20), l += l ? r(e, s) : n(e, s)),
                        h.ma30 && (s = this._c2y_ma(h.ma30), m += m ? r(e, s) : n(e, s));
                        c && a.push(this._path(this.gPricesEl, c, g)),
                        o && a.push(this._path(this.gPricesEl, o, u)),
                        l && a.push(this._path(this.gPricesEl, l, d)),
                        m && a.push(this._path(this.gPricesEl, m, x)),
                        
                        h.ma5 == 0 ? a.push(this._text(this.gPricesEl, sx, 20, 'MA5:-', g, 'start')) : a.push(this._text(this.gPricesEl, sx, 20, 'MA5:'+h.ma5.toFixed(this.scale), g, 'start')),
                        h.ma10 == 0 ? a.push(this._text(this.gPricesEl, 2.7*sx, 20, 'MA10:-', u, 'start')) : a.push(this._text(this.gPricesEl, 2.7*sx, 20, 'MA10:'+h.ma10.toFixed(this.scale), u, 'start')),
                        h.ma20 == 0 ? a.push(this._text(this.gPricesEl, 4.5*sx, 20, 'MA20:-', d, 'start')) : a.push(this._text(this.gPricesEl, 4.5*sx, 20, 'MA20:'+h.ma20.toFixed(this.scale), d, 'start'))
                        
                    },
                    _drawKline: function (i, t, h, e) {
                        var s, a, r, n, c, o, l, g, u = this._cacheEl,
                        d = Math.max(i.close, i.open),
                        x = Math.min(i.close, i.open);
                        s = this._c2x_k(h, t),
                        a = this._c2y_k(d),
                        r = t * _,
                        n = this._c2y_k(x) - a,
                        r = r > 1 ? r : 1,
                        n = n > 1 ? n : 1,
                        c = h * t + t / 2,
                        o = this._c2y_k(i.high),
                        l = c,
                        g = this._c2y_k(i.low),
                        u.push(this._rect(this.gPricesEl, s, a, r, n, e)),
                        u.push(this._line(this.gPricesEl, c, o, l, g, e))
                    },

                    _path: function (i, h, e) {
                        var s = t.create("path");
                        return t.attr(s, {
                            d: h,
                            stroke: e,
                            fill: "none"
                        }),
                        t.append(i, s),
                        s
                    },
                    _rect: function (i, h, e, s, a, r,f) {
                        var n = t.create("rect");
                        return t.attr(n, {
                            x: h,
                            y: e,
                            width: s,
                            height: a,
                            fill: r,
                            "stroke-width": "0"
                        }),
                        f ? '' : t.append(i, n),
                        n
                    },
                    _line: function (i, h, e, s, a, n, c, o) {
                        var l = t.create("line");
                        return t.attr(l, {
                            x1: h,
                            y1: e,
                            x2: s,
                            y2: a,
                            stroke: n || r,
                            "stroke-width": 0.5
                        }),
                        c && t.attr(l, "stroke-dasharray", c),
                        o ? t.insert(i, l, o) : t.append(i, l),
                        l
                    },
                    _text: function (i, h, e, s, a, r,f) {
                        var c = t.create("text");
                        return t.attr(c, {
                            x: h,
                            y: e,
                            fill: a || n,
                            style: {
                                "text-anchor": r || "start"
                            }
                        }),
                        t.textContent(c, s),
                        f ? '' : t.append(i, c),
                        c
                    },
                    _c2x_ma: function (i, t) {
                        var h = this.priceChartBox.x;
                        return h.begin + i * t + t / 2
                    },
                    _c2y_ma: function (i) {
                        return this._c2y_k(i)
                    },
                    _c2x_k: function (i, t) {
                        var h = this.priceChartBox.x;
                        return h.begin + i * t + t * (1 - _) / 2
                    },
                    _c2y_k: function (i) {
                        var t = this.priceChartBox.y,
                        h = this.beginPrice - this.endPrice,
                        e = this.beginPrice - i;
                        return t.begin + t.height * (e / h)
                    },

                    _calcMA: function () {
                        for (var i, t, h, e = this.data,
                        s = e.length,
                        a = function (h, s) {
                            if (i = 0, h - s >= -1) for (t = h - s; h > t;) i += e[h--].close;
                            return i / s
                        },
                        r = s; --r >= 0;) h = e[r],
                        h.ma5 = a(r, 5),
                        h.ma10 = a(r, 10),
                        h.ma20 = a(r, 20),
                        h.ma30 = a(r, 30)
                    },
                    _calcMaxMin: function (t) {
                        var h = this;
                        h.lowPrice = 0,
                        h.highPrice = 0,
                        h.minPrice = 0,
                        h.maxPrice = 0,
                        h.minVolume = 0,
                        h.maxVolume = 0,
                        i.each(t,
                        function (f,i) {
                            var t = [];
                            i.ma5 && t.push(i.ma5),
                            i.ma10 && t.push(i.ma10),
                            i.ma20 && t.push(i.ma20),
                            i.ma30 && t.push(i.ma30),
                            i.high && t.push(i.high),
                            i.low && t.push(i.low),
                            h.maxPrice && t.push(h.maxPrice),
                            h.minPrice && t.push(h.minPrice),
                            h.maxPrice = Math.max.apply(Math, t),
                            h.minPrice = Math.min.apply(Math, t),
                            h.highPrice = Math.max(h.highPrice, i.high),
                            h.lowPrice = Math.min(h.lowPrice > 0 ? h.lowPrice : i.low, i.low),
                            h.maxVolume = Math.max(h.maxVolume, i.volume),
                            h.minVolume = Math.min(h.minVolume > 0 ? h.minVolume : i.volume, i.volume)
                        })
                    },
                    _getDays: function (i, t) {
                        return 0 === i && (i = t),
                        0 === t && (t = i),
                        Math.min(i, t)
                    }
                },
                f
            }
        };
       
        this.state={
            chart:chart,
            data:props.data,
            code:props.code,
            type:props.type,
            alert:true,
            initK:false
        }
        this.sline=this.sline.bind(this);
        this.updateSline =this.updateSline.bind(this);
        this.processklineData = this.processklineData.bind(this);
    }
     componentWillReceiveProps(nextProps){
         this.setState({
            data:nextProps.data,
            type:nextProps.type
        })
    }
    componentDidUpdate(nextProps){
        this.updateSline();
        if(nextProps.type!=100){
            this.kline()
        }
    }
    componentWillUnmount() {  
        this.serverRequest.abort();  
    }
    kline(){
        var r = this.state.chart.klineMian(),_this=this;
        if(!_this.state.initK){
            var w = new r({
                    svg: $("#stock-kline")[0]
                });
                w.draw();
            this.setState({
                initK:w
            })
        }
        $.ajax({
            type:'get',
            url:'/fut/k/data.do',
            data:{contractsCode:_this.state.code,type:_this.state.type==1440?'':this.state.type},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    _this.processklineData(e.data);
                }
            }
         })   

    }
    processklineData(data){
        var temp = data ? data.reverse().splice(-40) : [],
                    realData = [];
            temp.forEach(function (value, index) {
                realData[index] = {
                    open: value.openPrice - 0,
                    close: value.closePrice - 0,
                    high: value.maxPrice - 0,
                    low: value.minPrice - 0,
                    volume: value.nowVolume - 0,
                    time: value.time.replace(/-/g,'/')
                }
            });

            this.state.initK.draw({
                data: realData,
                scale: 2,
                type:''
            });
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
                period: [['6:00','13:00'],['13:00','19:00'],['19:00','23:00']],
                scale: 2,
                code: i.state.code,
                price:t.lastPrice.toFixed(2)
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
                    scale: 2,
                    code: _this.state.code,
                    period:[['6:00','13:00'],['13:00','19:00'],['19:00','23:00']],
                    price:(t.lastPrice-0).toFixed(2)
                })
            }
        }
    }

    componentDidMount(){
        var _this = this,
            chat = _this.state.chart,
            format = chat.dates().format,
            code = _this.state.code,
            g;
        
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
            <setion>
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
                </article>

                <article className={this.props.chart==2?"daily":"daily hide"}>
                    <svg id="stock-kline" className="mod-kline" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <desc>kline chart</desc>
                        <g></g>
                        <g></g>
                    </svg>
                </article>
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
            </setion>

        )
    }
}