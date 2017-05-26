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
           
            klineMian:function(){
                var i = $,
                t = chart.create(),
                h = chart.numbers(),
                e = (new Date).getFullYear(),
                b = chart.dates(),
                s = function (i) {
                    var str = j==1440?'M-D':'h:m';
                    return b.format(i,str);
                },
                a = "#e7e7e8",
                r = "#e7e7e8",
                n = "#b3b3b3",
                c = "#cd4a47",
                o = "#33d37e",
                l = "#cd4a47",
                g = "#869bcb",
                u = "#a63beb",
                d = "#d7ce51",
                x = "#0f4a96",
                m = 10,
                _ = .8,
                p = 5,
                v = .2,
                y = 70,
                j = '',
                f = function (i) {
                    this.svg = i.svg,
                    this.data = i.data || [],
                    this.days = i.days || y,
                    this.scale = i.scale || 2,
                    this.type = i.type,
                    this.init()
                };
                return f.prototype = {
                    init: function () {
                        var i = this.data;
                        this.crossoverf(),
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
                                len = 40,
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
                                    numNow = parseInt((t.pageX / o.svgWidth * len)),
                                    _ = o.moments[numNow],
                                    arr_all = [].concat(o.moments),
                                    _data = _;
                                    if (!_data) {
                                        return false;
                                    }
                                    _clear();
                                    
                                    var _y = (o.beginPrice - _data.close) / (o.beginPrice - o.endPrice) * b;
                                    var sTime = s(_data.time);
                                    var smallN = o.scale;
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
                                    
                                    u.push(o._line(a, 0, _y, c, _y, '#cd4a47'));
                                    u.push(o._line(a, t.pageX, 0, t.pageX, b, '#cd4a47'));
                                    
                                    
                                    if( t.pageX < (c/2) ){
                                        var maxc = $(window).width();
                                        paint((maxc-c/3.5),maxc-5,'end');
                                    }
                                    else{
                                        paint(0,5,'start');
                                    }
                                    
                                    
                                    function paint(hx,x,w){
                                        var fs = w + '; font-size:0.12rem;';
                                        var fs1 = w + '; font-size:0.14rem;';
                                        f.push(o._rect(a,hx,15,120,170,'#0e2947','none'));
                                        f.push(o._text(a,x,26,sTime,grayC,w,'none'));
                                        f.push(o._text(a,x,42,'开盘',whiteC,fs,'none'));
                                        f.push(o._text(a,x,60,_data.open.toFixed(smallN),kcolor,fs1,'none'));
                                        f.push(o._text(a,x,80,'最高',whiteC,fs,'none'));
                                        f.push(o._text(a,x,100,_data.high.toFixed(smallN),Hcolor,fs1,'none'));
                                        f.push(o._text(a,x,120,'最低',whiteC,fs,'none'));
                                        f.push(o._text(a,x,140,_data.low.toFixed(smallN),Lcolor,fs1,'none'));
                                        f.push(o._text(a,x,160,'收盘',whiteC,fs,'none'));
                                        f.push(o._text(a,x,180,_data.close.toFixed(smallN),Ccolor,fs1,'none'));
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
                        if (x = r.end-2, m = n.begin + 14, e = this.maxPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "end")), x = r.end - 2, m = n.end - 4, e = this.minPrice.toFixed(this.scale), s.push(this._text(a, x, m, e, "", "end")), p >= 3) {
                            var o = (p - p % 2) / 2 + 1;
                            m = n.begin + c * o,
                            e = (this.maxPrice + this.minPrice) / 2,
                            e = e.toFixed(this.scale),
                            m = m - c / 2 + 4,
                            x = r.end - 2,
                            s.push(this._text(a, x, m, e, "", "end"))
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
                            if (o = e.begin + c * n * i + i / 2, l = a.begin, g = o, u = a.end, _ = t[c * n], d = o, x = a.end + 14, m = s(_.time),  h.push(this._text(this.gPricesEl, d, x, m)), 5 > n) break
                        }
                    },
                    _drawMA: function (i, t) {
                        
                        var tx = this.priceChartBox.x.begin+10;
                        
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
                        //m && a.push(this._path(this.gPricesEl, m, x)),
                        a.push(this._text(this.gPricesEl, tx, 12, 'MA5:'+(h.ma5 == 0 ? '-':h.ma5.toFixed(this.scale)), g, 'start')) ,
                        a.push(this._text(this.gPricesEl, tx+80, 12, 'MA10:'+(h.ma10 == 0 ? '-':h.ma10.toFixed(this.scale)), u, 'start')), 
                        a.push(this._text(this.gPricesEl, tx+160, 12, 'MA20:'+(h.ma20 == 0 ? '-':h.ma20.toFixed(this.scale)), d, 'start')); 
                        
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
            code:props.code,
            type:props.type,
            scale:props.scale,
            alert:true,
            initK:false
        }
        this.processklineData = this.processklineData.bind(this);
    }
     componentWillReceiveProps(nextProps){
        if(this.state.type!=nextProps.type){
            this.setState({
                type:nextProps.type
            })
        }
         
    }
    componentDidUpdate(prevProps){
        
        if(prevProps.type!=this.state.type&&this.state.type!=100){
            this.kline()
        }
    }
    
    kline(){
        var _this=this;
        
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
            var _this = this;
            _this.state.initK.draw({
                data: realData,
                scale: _this.state.scale,
                type:_this.state.type
            });
    }
   
  
    componentDidMount(){
         var r = this.state.chart.klineMian(),
            w = new r({
                svg: $("#stock-kline")[0]
            });
            w.draw();
        this.setState({
            initK:w
        })
    }

    render(){
        return (
            
                <article className={this.props.chart==2?"daily":"daily hide"}>
                    <svg id="stock-kline" className="mod-kline" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <desc>kline chart</desc>
                        <g></g>
                        <g></g>
                        <g></g>
                    </svg>
                     <style>{`
                    article{
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