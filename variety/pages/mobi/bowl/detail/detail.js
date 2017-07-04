import React, {
    Component
} from 'react';
import Router from 'next/router';
import Text_none from '../../common/text_none.js';
import Alert from '../../common/confirm.js';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';

import Style from './detailcss.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery';


class DetailContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blackLine: true, //tab下面的黑线
            currencyType: this.props.currencyType,
            inOrOut: 1,
            YBInData: [],
            YBOutData: [],
            JFInData: [],
            JFOutData: [],
            YBInPage: 0,
            YBOutPage: 0,
            JFInPage: 0,
            JFOutPage: 0,
            YBInMore: true,
            YBOutMore: true,
            JFInMore: true,
            JFOutMore: true,
            bigHeight: 500,
            login: false,
            clickTab1: true,
            clickTab2: true
        }
        this.showlistmsg = this.showlistmsg.bind(this);
        this.millionYB = this.millionYB.bind(this);
        this.millionJF = this.millionJF.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        this.setState({
            currencyType: nextProps.currencyType
        })
    }

    componentDidMount() {
        this.showlistmsg()
    }

    //判断是收入还是支出,加载对应的数据
    exchangeYBJF(str) {
        let that = this;
        const {
            blackLine,
            clickTab1,
            clickTab2
        } = this.state;
        if (str === '收入') {
            this.setState({
                blackLine: true,
                inOrOut: 1
            })
            clickTab1 ? that.showlistmsg(1) : ''
        }
        if (str === '支出') {
            this.setState({
                blackLine: false,
                inOrOut: 2
            })
            clickTab2 ? that.showlistmsg(2) : ''
        }
    }

    showlistmsg(inOrOut = 1) {

        // if(inOrOut == 1) {
        //     this.setState({
        //         clickTab1: false
        //     })
        // }
        // if(inOrOut == 2) {
        //     this.setState({
        //         clickTab2: false
        //     })
        // }

        inOrOut == 1 ? this.setState({
            clickTab1: false
        }) : ''
        inOrOut == 2 ? this.setState({
            clickTab2: false
        }) : ''

        const {
            currencyType,
            YBInPage,
            YBOutPage,
            JFInPage,
            JFOutPage
        } = this.state;
        let t = this;
        let H = $('.detail_list').height() ? $('.detail_list').height() : ($(window).height() - 95);
        let viewPage = 0;

        //判断页数
        if (currencyType == 1 && inOrOut == 1) {
            viewPage = YBInPage;
        }
        if (currencyType == 1 && inOrOut == 2) {
            viewPage = YBOutPage;
        }
        if (currencyType == 2 && inOrOut == 1) {
            viewPage = JFInPage;
        }
        if (currencyType == 2 && inOrOut == 2) {
            viewPage = JFOutPage;
        }


        $.ajax({
            type: 'get',
            url: '/user/userAccount/userCurrencyFlow.do',
            data: {
                currencyType: currencyType,
                inOrOut: inOrOut,
                page: viewPage,
                pageSize: 20
            },
            success: function(e) {
                if (e.code == 200) {

                    if (currencyType == 1 && inOrOut == 1) {
                        t.setState({
                            YBInData: t.state.YBInData.concat(e.data),
                            YBInPage: t.state.YBInPage + 1,
                            YBInMore: e.resultCount > (t.state.YBInPage + 1) * 20 ? true : false,
                            bigHeight: H
                        })
                    }
                    if (currencyType == 1 && inOrOut == 2) {
                        t.setState({
                            YBOutData: t.state.YBOutData.concat(e.data),
                            YBOutPage: t.state.YBOutPage + 1,
                            YBOutMore: e.resultCount > (t.state.YBOutPage + 1) * 20 ? true : false,
                            bigHeight: H
                        })
                    }
                    if (currencyType == 2 && inOrOut == 1) {
                        t.setState({
                            JFInData: t.state.JFInData.concat(e.data),
                            JFInPage: t.state.JFInPage + 1,
                            JFInMore: e.resultCount > (t.state.JFInPage + 1) * 20 ? true : false,
                            bigHeight: H
                        })
                    }
                    if (currencyType == 2 && inOrOut == 2) {
                        t.setState({
                            JFOutData: t.state.JFOutData.concat(e.data),
                            JFOutPage: t.state.JFOutPage + 1,
                            JFOutMore: e.resultCount > (t.state.JFOutPage + 1) * 20 ? true : false,
                            bigHeight: H
                        })
                    }



                }

            }
        })
    }


    isnoLogin() {
        Router.push({
            pathname: '/login'
        });
    }

    //时间戳
    formattimes(n) {
        var time = new Date(n).getTime();
        var year = new Date(n).getFullYear();
        var mon = new Date(n).getMonth() + 1;
        var day = new Date(n).getDate();
        day = day >= 10 ? day : '0' + day;
        var hour = new Date(n).getHours() < 10 ? "0" + new Date(n).getHours() : new Date(n).getHours();
        var min = new Date(n).getMinutes() < 10 ? "0" + new Date(n).getMinutes() : new Date(n).getMinutes();
        var now = new Date().getTime(),
            nowYear = new Date().getFullYear(),
            nowMon = new Date().getMonth() + 1,
            nowDay = new Date().getDate(),
            nowHour = new Date().getHours(),
            nowMin = new Date().getMinutes();
        var t = [];
        if (year == nowYear) {
            if (mon == nowMon) {
                t[0] = '本月';
                if (day == nowDay) {
                    t[1] = '今天'
                } else {
                    var f = nowDay - day;
                    t[1] = f == 1 ? '昨天' : day + '日';
                }
            } else {
                t[0] = mon + '月';
                t[1] = day + '日';
            }
        } else {
            t[0] = year + '年' + mon + '月';
            t[1] = day + '日';
        }
        t[2] = hour + ':' + min;
        return t
    }

    //方法：数字过万的显示几点几万
    millionYB(num) {
        if (num > 10000) {
            return `${(parseInt(num/1000)/10).toFixed(1)}万`;
        } else {
            return num;
        }
    }

    millionJF(num) {
        if (num > 10000) {
            return `${(parseInt(num/1000)/10).toFixed(1)}万`;
        } else {
            return (parseInt(num * 100) / 100).toFixed(2);
        }
    }


    render() {
        const {
            blackLine,
            currencyType,
            inOrOut,
            YBInData,
            YBOutData,
            JFInData,
            JFOutData,
            YBInMore,
            YBOutMore,
            JFInMore,
            JFOutMore,
            bigHeight,
        } = this.state;


        let that = this,
            a, b, c, d, e, f, g, h;



        let _datalist, viewMore;
        if (currencyType == 1 && inOrOut == 1) {
            _datalist = YBInData;
            viewMore = YBInMore;
        }
        if (currencyType == 1 && inOrOut == 2) {
            _datalist = YBOutData;
            viewMore = YBOutMore;
        }
        if (currencyType == 2 && inOrOut == 1) {
            _datalist = JFInData;
            viewMore = JFInMore;
        }
        if (currencyType == 2 && inOrOut == 2) {
            _datalist = JFOutData;
            viewMore = JFOutMore;
        }


        let _array = [];
        var newList = [];
        let doc = '';

        for (var i = 0; i < _datalist.length; i++) {
            var o = {}
            o['time'] = that.formattimes(_datalist[i].createTime)[1];
            o['createTime'] = that.formattimes(_datalist[i].createTime)[0];
            o['houre'] = that.formattimes(_datalist[i].createTime)[2];
            o['data'] = _datalist[i];
            _array.push(o);
        }
        _array.forEach(function(data) {
            for (var i = 0; i < newList.length; i++) {
                if (newList[i].title === data.createTime) {
                    newList[i].nodeList.push(data);
                    return;
                }
            }
            newList.push({
                title: data.createTime,
                nodeList: [data]
            });
        });

        if (_datalist.length > 0) {
            return (
                <div className="container">
                    <div className="changeListBox">
                        <div className="changeListHeader">
                            <div><a className={blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"收入")}>收入</a></div>
                            <div><a className={!blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"支出")}>支出</a></div>
                        </div>
                        <div className="detailListContain">
                            <ul className="detail_list">
                            <InfiniteScroll  next={()=>this.showlistmsg(inOrOut)} height={bigHeight} hasMore={viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                                    {
                                        newList.map(function(v,r){
                                            doc = v.nodeList.map(function(m,n){
                                                a = m.data.platformName;
                                                b = m.time;
                                                e = m.houre;
                                                f = m.data.flowType>0 ? '+':'-';
                                                h = m.data.platformName ? '('+m.data.platformName+')' : ''
                                                return(
                                                    <li  key={n} className="listContain">
                                                        <div>
                                                            <dl>
                                                                <dt>{b}</dt>
                                                                <dd>{e}</dd>
                                                            </dl>
                                                            <p>{m.data.remark}</p>
                                                            <h2>{`${currencyType==2?m.data.flowType>0?'+'+that.millionJF(m.data.money):'-'+that.millionJF(m.data.money) : m.data.flowType>0?'+'+that.millionYB(m.data.money):'-'+that.millionYB(m.data.money)}${currencyType==1?"元宝":"积分"}`}</h2>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            return (
                                                <div key={r}>
                                                    <div className="title">{v.title}</div>
                                                    {doc}
                                                </div>
                                            )
                                        })
                                    }

                            </InfiniteScroll>
                            </ul>

                        </div>
                    </div>
                    <style jsx>{`
                        html{background:#e7e7e8;}
                        .title{
                            line-height:0.3rem;
                            color:#b3b3b3;
                            text-indent: 10px;
                        }
                        .listContain {
                            width: 100%;
                            height: .6rem;
                            background: #fff;
                            box-sizing: border-box;
                            padding: .12rem 0 0 .14rem;
                        }
                        .listContain>div {
                            width: 100%;
                            height: 100%;
                            color: #999999;
                            box-sizing: border-box;
                            padding: 0 .14rem 0 0;
                            overflow: hidden;
                            border-bottom: .01rem solid #e7e7e8;
                        }
                        .listContain>div>dl {
                            width: .8rem;
                            height: 100%;
                            float:left;
                        }
                        .listContain>div>dl>dt {
                            width: .4rem;
                            font-size: .14rem;
                            text-align: center;
                        }
                        .listContain>div>dl>dd {
                            width: .4rem;
                            height: .18rem;
                            font-size: .13rem;
                        }

                        .listContain>div>p {
                            height: 100%;
                            line-height: .37rem;
                            font-size: .13rem;
                            text-align: center;
                            float:left;
                        }

                        .listContain>div>h2 {
                            height: 100%;
                            line-height: .37rem;
                            font-size: .15rem;
                            color:#222222;
                            font-weight: 100;
                            text-align: right;
                            float:right;
                        }
                    `}</style>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="changeListBox">
                        <div className="changeListHeader">
                            <div><a className={blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"收入")}>收入</a></div>
                            <div><a className={!blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"支出")}>支出</a></div>
                        </div>
                        <div className="detailListContain">
                            <Text_none text="你还没有交易过哦"/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}



export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            currencyType: 0
        }
    }

    componentWillMount() {
        //元宝1，积分2，收入1，支出2
        const dataTypes = this.props.url.query.type;
        let that = this;
        this.setState({
            currencyType: parseInt(dataTypes)
        })
        if (dataTypes == 1) {
            this.setState({
                type: '元宝'
            })
        }
        if (dataTypes == 2) {
            this.setState({
                type: '积分'
            })
        }


    }
    componentDidMount() {

    }

    render() {
        const {
            type,
            currencyType
        } = this.state;
        return <div>
            <Header_title text={`${type}明细`}/>
            <div><Header text={`${type}明细`} /></div>
            <DetailContent currencyType={currencyType}/>
            <Style/>

        </div>
    }
}