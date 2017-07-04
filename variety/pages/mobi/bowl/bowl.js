import React, {
    Component
} from 'react';
import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Style from './bowlcss.js';
import InputPass from './inputPass/inputPass.js';
import Alert from '../common/confirm.js';
import Toast from '../common/toast.js';
import $ from 'jquery';


class BowlContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arr: [],
            blackLine: true,
            datas: {
                credit: 0,
                money: 0,
                userId: 0,
                yuanbao: 0
            },
            exchangeYB: [],
            exchangeJF: []
        }
        this.lookRules = this.lookRules.bind(this);
        this.refresh = this.refresh.bind(this);
        this.millionYB = this.millionYB.bind(this);
        this.millionJF = this.millionJF.bind(this);

    }

    componentDidMount() {
        let that = this;
        //获取用户信息
        $.ajax({
                url: '/user/userAccount/userAccountInfo.do',
                type: 'post',
                success: function(d) {
                    if (d.code == 200) {
                        that.setState({
                            datas: {
                                credit: d.data.credit,
                                money: d.data.money,
                                userId: d.data.userId,
                                yuanbao: d.data.yuanbao
                            }
                        })

                    }
                }
            })
            //获取兑换列表
        $.ajax({
            url: '/user/userAccount/getExchangeConfig.do',
            type: 'get',
            success: function(d) {
                if (d.code == 200) {
                    let exchangeYB = [];
                    let exchangeJF = [];
                    let data = d.data;
                    const {
                        datas
                    } = that.state;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].fromType == 0 && data[i].toType == 1) {
                            exchangeYB.push(data[i]);
                        }
                        if (data[i].fromType == 1 && data[i].toType == 3) {
                            exchangeJF.push(data[i]);
                        }
                    }

                    that.setState({
                        exchangeYB: exchangeYB,
                        exchangeJF: exchangeJF,
                        arr: [<YuanBao data={exchangeYB} accountMsg={datas}  refresh={that.refresh}/>]
                    })
                }
            }
        })
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



    //点击查看明细
    lookDetail(str) {
        //记录点击的是元宝还是积分
        let type;
        if (str == '元宝') {
            type = 1;
        }
        if (str == '积分') {
            type = 2;
        }
        Router.push({
            pathname: '/mobi/bowl/detail/detail',
            query: {
                type: type
            }
        })
    }



    //兑换规则
    lookRules() {
        Router.push({
            pathname: '/mobi/common/article',
            query: {
                myUrl: 4,
                id: 4
            }
        })
    }


    //每次发生交易以后，重新获取一下用户数据
    refresh(msg) {
        let that = this;
        if (msg) {
            $.ajax({
                url: '/user/userAccount/userAccountInfo.do',
                type: 'post',
                success: function(d) {
                    if (d.code == 200) {
                        that.setState({
                            datas: {
                                credit: d.data.credit,
                                money: d.data.money,
                                userId: d.data.userId,
                                yuanbao: d.data.yuanbao
                            }
                        })

                    }
                }
            })
        }
    }

    //判断兑换的是元宝还是积分
    exchangeYBJF(str) {
        let that = this;
        const {
            arr,
            blackLine,
            exchangeYB,
            exchangeJF,
            datas
        } = this.state;
        if (str == '元宝') {
            this.setState({
                arr: [<YuanBao data={exchangeYB}  accountMsg={datas} refresh={that.refresh}/>],
                blackLine: true
            })

        }
        if (str == '积分') {
            this.setState({
                arr: [<JiFen data={exchangeJF}  accountMsg={datas} refresh={that.refresh}/>],
                blackLine: false
            })
        }
    }



    render() {
        const {
            datas,
            blackLine
        } = this.state;
        return (
            <div className="container">
                <div className="headerBox">
                    <div className="header">
                        <dl className="headerDL">
                            <dt className="headerDT headerLeft"></dt>
                            <dd className="headerDD">
                                <p className="numbers">{`${datas.yuanbao}元宝`}</p>
                                <a className="goDetail" onClick={this.lookDetail.bind(this,"元宝")}>查看明细></a>
                            </dd>
                        </dl>
                    </div>
                    <div className="blank"></div>
                    <div className="header">
                        <dl className="headerDL">
                            <dt className="headerDT headerRight"></dt>
                            <dd className="headerDD">
                                <p className="numbers">{`${(parseInt(datas.credit * 100) / 100).toFixed(2)}积分`}</p>
                                <a className="goDetail" onClick={this.lookDetail.bind(this,"积分")}>查看明细></a>
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className="changeRule">
                    <a className="goRules" onClick={this.lookRules}>
                        <span>兑换规则</span>
                        <span className="changeIcon"></span>

                    </a>
                </div>
                <div className="changeListBox">
                    <div className="changeListHeader">
                        <div><a className={blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"元宝")}>购买元宝</a></div>
                        <div><a className={!blackLine?"blackLine":""} onClick={this.exchangeYBJF.bind(this,"积分")}>兑换积分</a></div>
                    </div>
                    <div className="changeListContain">
                       {this.state.arr}
                    </div>
                </div>
            </div>
        )
    }
}


class YuanBao extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yes: '确定',
            password: '',
            exchangeID: 0,
            fromRealMoney: 0,
            toMoney: 0,
            passOK: false,
            payshow: false,
            exchangeSuccess: '',
            yuanbao: 0,
            data: this.props.data,
            accountMsg: this.props.accountMsg,
            confirm: {
                show: false,
                title: "确认购买",
                content: "确认使用0元购买0元宝？"
            },
            type: 2,
            isOk: null,
            isNot: null,
            datas: {
                credit: 0,
                money: 0,
                userId: 0,
                yuanbao: 0
            }
        }
        this.getUserInfo = this.getUserInfo.bind(this);
        this.millionYB = this.millionYB.bind(this);
        this.millionJF = this.millionJF.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            accountMsg: nextProps.accountMsg
        })
    }

    componentDidMount() {
        this.getUserInfo()
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

    getUserInfo() {
        let that = this;
        $.ajax({
            url: '/user/userAccount/userAccountInfo.do',
            type: 'post',
            success: function(d) {
                if (d.code == 200) {
                    that.setState({
                        datas: {
                            credit: d.data.credit,
                            money: d.data.money,
                            userId: d.data.userId,
                            yuanbao: d.data.yuanbao
                        }
                    })

                }
            }
        })

    }


    //用人民币兑换元宝
    payYB(num1, num2, id) {
        const {
            money
        } = this.state.datas;
        let that = this;

        //点击按钮，判断余额是否充足，兑换元宝，就判断金币是否充足；
        //1判断金币是否充足
        if (money >= num1) {
            //2点击兑换时，先判断是否有安全密码
            $.ajax({
                url: '/user/userAccount/hasPassword.do',
                type: 'get',
                success: function(d) {
                    if (d.data) {
                        that.setState({
                            yuanbao: num2,
                            exchangeID: id,
                            payshow: false,
                            fromRealMoney: num1,
                            toMoney: num2,
                            exchangeSuccess: '',
                            confirm: {
                                show: true,
                                title: "确认购买",
                                content: `确认使用${that.millionJF(num1)}元购买${that.millionYB(num2)}元宝？`
                            },
                            isOk: function() {

                                that.setState({
                                    confirm: {
                                        show: false
                                    },
                                    payshow: true
                                })

                            },
                            isNot: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    },
                                    payshow: false
                                })
                            }
                        })
                    } else {
                        //跳转到这只安全密码页面
                        that.setState({
                            yes: '去设置',
                            confirm: {
                                show: true,
                                title: "未设置安全密码"
                            },
                            isOk: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    }
                                })
                                Router.push({
                                    pathname: '/mobi/user/setter/safepass/password',
                                    query: {
                                        type: 2
                                    }
                                })
                            },
                            isNot: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    }
                                })

                            }
                        })


                    }
                }
            })



        } else {
            this.setState({
                yes: '去充值',
                confirm: {
                    show: true,
                    title: '购买失败',
                    content: '现金余额不足，请充值或降低购买数量'
                },
                isOk: function() {
                    that.setState({
                        confirm: {
                            show: false
                        }
                    })
                    Router.push({
                        pathname: '/mobi/wallet/recharge/rechargehtml'
                    })

                },
                isNot: function() {
                    that.setState({
                        confirm: {
                            show: false
                        }
                    })
                }
            })



        }



    }

    callback(msg) {
        let that = this;
        this.setState({
            password: msg
        })

        $.ajax({
            url: '/user/userAccount/exchange.do',
            type: 'post',
            data: {
                exchangeId: that.state.exchangeID,
                password: msg,
                fromRealMoney: that.state.fromRealMoney,
                toMoney: that.state.toMoney
            },
            success: function(d) {
                if (d.code == 200) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '购买成功'
                    }, that.props.refresh(true))
                } else if (d.code == 2203) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '安全密码错误'
                    })
                } else if (d.code == 2204 || d.code == 2205) {
                    that.setState({
                            payshow: false,
                            confirm: {
                                show: false
                            },
                            exchangeSuccess: '项目已修改'
                        }, location.reload())
                        // Router.push({
                        //     pathname: '/mobi/bowl/bowl'
                        // })
                } else if (d.code == 500) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '服务器异常'
                    })
                } else if (d.code == 2207) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: d.msg
                    })
                } else {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '服务器异常'
                    })
                }
            }
        })

    }

    render() {
        let that = this;
        const {
            payshow,
            yuanbao,
            data,
            exchangeSuccess
        } = this.state;

        return (
            <ul className="listContain">
                {
                    data.map( (e,i)=>{
                        return (
                            <li key={i}>
                                <dl>
                                    <dt></dt>
                                    <dd>{that.millionYB(e.toMoney)}</dd>
                                </dl>
                                <p>{e.fromMoney==e.fromRealMoney?'':`原价：￥${that.millionJF(e.fromMoney)}`}</p>
                                <a onClick={that.payYB.bind(this,e.fromRealMoney,e.toMoney,e.id)}>{`￥${that.millionJF(e.fromRealMoney)}`}</a>
                            </li>
                        )
                    } )
                }
                <InputPass payshow={payshow} yuanbao={yuanbao} jifen={"元宝"} password={that.callback.bind(this)}/>
                <Alert confirm={this.state.confirm} type={this.state.type} isOk={this.state.isOk} isNot={this.state.isNot} yes={this.state.yes}/>
                <Toast text={exchangeSuccess} />
            </ul>
        )
    }
}

class JiFen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            yes: '确定',
            password: '',
            exchangeID: 0,
            fromRealMoney: 0,
            toMoney: 0,
            passOK: false,
            isBuy: '',
            payshow: false,
            exchangeSuccess: '',
            type: 2,
            yuanbao: 0,
            data: this.props.data,
            accountMsg: this.props.accountMsg,
            confirm: {
                show: false,
                title: "确认兑换",
                content: "确认使用0元宝兑换0积分？"
            },
            isOk: null,
            isNot: null,
            datas: {
                credit: 0,
                money: 0,
                userId: 0,
                yuanbao: 0
            }

        }
        this.getUserInfo = this.getUserInfo.bind(this);
        this.millionYB = this.millionYB.bind(this);
        this.millionJF = this.millionJF.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            accountMsg: nextProps.accountMsg,
        })
    }

    componentDidMount() {
        this.getUserInfo()
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

    //获取用户信息
    getUserInfo() {
        let that = this;
        $.ajax({
            url: '/user/userAccount/userAccountInfo.do',
            type: 'post',
            success: function(d) {
                if (d.code == 200) {
                    that.setState({
                        datas: {
                            credit: d.data.credit,
                            money: d.data.money,
                            userId: d.data.userId,
                            yuanbao: d.data.yuanbao
                        }
                    })

                }
            }
        })

    }



    //用元宝兑换积分
    payJF(num1, num2, id) {
        const {
            yuanbao
        } = this.state.datas;
        let that = this;



        //点击按钮，判断余额是否充足，兑换元宝，就判断金币是否充足；
        //1判断元宝是否充足
        if (yuanbao >= num1) {
            //2点击兑换时，先判断是否有安全密码
            $.ajax({
                url: '/user/userAccount/hasPassword.do',
                type: 'get',
                success: function(d) {
                    if (d.data) {
                        that.setState({
                            yuanbao: num2,
                            exchangeID: id,
                            fromRealMoney: num1,
                            toMoney: num2,
                            payshow: false,
                            exchangeSuccess: '',
                            confirm: {
                                show: true,
                                title: "确认兑换",
                                content: `确认使用${that.millionYB(num1)}元宝兑换${that.millionJF(num2)}积分？`
                            },
                            isOk: function() {

                                that.setState({
                                    confirm: {
                                        show: false
                                    },
                                    payshow: true
                                })
                            },
                            isNot: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    },
                                    payshow: false
                                })
                            }
                        })
                    } else {
                        //跳转到这只安全密码页面
                        that.setState({
                            yes: '去设置',
                            confirm: {
                                show: true,
                                title: "未设置安全密码"
                            },
                            isOk: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    }
                                })
                                Router.push({
                                    pathname: '/mobi/user/setter/safepass/password',
                                    query: {
                                        type: 2
                                    }
                                })

                            },
                            isNot: function() {
                                that.setState({
                                    confirm: {
                                        show: false
                                    }
                                })

                            }
                        })

                    }
                }
            })


        } else {

            this.setState({
                yes: '确定',
                confirm: {
                    show: true,
                    title: '兑换失败',
                    content: '元宝余额不足，请充值或降低兑换数量'
                },
                type: 1,
                isOk: function() {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        type: 2
                    })
                }
            })



        }

    }



    callback(msg) {
        let that = this;
        this.setState({
            password: msg
        })

        $.ajax({
            url: '/user/userAccount/exchange.do',
            type: 'post',
            data: {
                exchangeId: that.state.exchangeID,
                password: msg,
                fromRealMoney: that.state.fromRealMoney,
                toMoney: that.state.toMoney
            },
            success: function(d) {
                if (d.code == 200) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '兑换成功'
                    }, that.props.refresh(true))
                } else if (d.code == 2203) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '安全密码错误'
                    })
                } else if (d.code == 2204 || d.code == 2205) {
                    that.setState({
                            payshow: false,
                            confirm: {
                                show: false
                            },
                            exchangeSuccess: '项目已修改'
                        }, location.reload())
                        // Router.push({
                        //     pathname: '/mobi/bowl/bowl'
                        // })
                } else if (d.code == 500) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '服务器异常'
                    })
                } else if (d.code == 2207) {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: d.msg
                    })
                } else {
                    that.setState({
                        confirm: {
                            show: false
                        },
                        payshow: false,
                        exchangeSuccess: '服务器异常'
                    })
                }
            }
        })
    }

    render() {
        let that = this;
        const {
            data,
            payshow,
            yuanbao,
            exchangeSuccess
        } = this.state;


        return (

            <ul className="listContain">
                {
                    data.map( (e,i)=>{
                        return (
                            <li key={i}>
                                <dl>
                                    <dt className="imgJF"></dt>
                                    <dd>{that.millionJF(e.toMoney)}</dd>
                                </dl>
                                <p>{e.fromMoney == e.fromRealMoney?'':`原价：${that.millionYB(e.fromMoney)}元宝`}</p>
                                <a onClick={that.payJF.bind(this,e.fromRealMoney,e.toMoney,e.id)}>{`${that.millionYB(e.fromRealMoney)}元宝`}</a>
                            </li>
                        )
                    } )
                }
                <InputPass payshow={payshow} yuanbao={yuanbao} jifen={"积分"}  password={that.callback.bind(this)}/>
                <Alert confirm={this.state.confirm} type={this.state.type} isOk={this.state.isOk} isNot={this.state.isNot} yes={this.state.yes} />
                <Toast text={exchangeSuccess}/>
            </ul>
        )
    }
}

export default class Bowl extends Component {

    render() {
        return (
            <div>
                <Header_title text="聚宝盆"/>
                <Header text="聚宝盆" />
                <BowlContent/>
                <Style/>
            </div>
        )
    }
}