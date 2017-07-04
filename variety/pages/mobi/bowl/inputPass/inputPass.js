import React from 'react'

export default class Toast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            payshow: this.props.payshow,
            yuanbao: this.props.yuanbao,
            jifen: this.props.jifen
        }
    }

    //当该组件要接收新属性值的时候，重新设置一下state的值；
    componentWillReceiveProps(nextProps) {
        this.setState({
            payshow: nextProps.payshow,
            yuanbao: nextProps.yuanbao,
            jifen: nextProps.jifen
        })
    }
    componentDidMount() {
        var t = this;
        var oDiv = t.refs.realInput;
        var bogusInput = t.refs.bogusInput;
        var c = 0;
        $(t.refs.formedit).find('.num').click(function() {
            c++;
            oDiv.innerHTML += this.innerHTML;
            $(t.refs['input' + c]).val(this.innerHTML);
            if (oDiv.innerHTML.length >= 6) {
                //通过回掉函数把密码从子组件传递到父组件
                t.props.password(oDiv.innerHTML);
                $(bogusInput).find('input').val('');
                $(oDiv).html('');
                c = 0;
            }
        })
        $(t.refs.remove).click(function() {
            if (c > 0) {
                var oDivHtml = oDiv.innerHTML;
                oDiv.innerHTML = oDivHtml.substring(0, oDivHtml.length - 1);
                $(t.refs['input' + c]).val('');
                c--
            }
        })
        $(t.refs.closetip).click(function() {
            t.setState({
                payshow: false
            })
            $(bogusInput).find('input').val('');
            $(oDiv).html('');
            c = 0;
        })
    }
    render() {
        var e = this.state.payshow ? 'showpay' : 'showpay nopayshow';
        const {
            yuanbao,
            jifen
        } = this.state;
        return (
            <div>
                    <div className={e}>
                    <div>
                        <div className="showpaymain">
                            <div className="showpaytitle">
                                <img ref="closetip" src="../../../../static/login/common_shut_down@2x.png"/>
                                请输入安全密码
                            </div>
                            <div className="showpaycontent">
                                <p>{jifen == "元宝"?"购买":"兑换"}</p>
                                <p>{`${yuanbao}${jifen}`}</p>
                                <div ref="inputBoxContainer" className="inputBoxContainer" id="inputBoxContainer">
                                    <div className="realInput" ref="realInput"></div>
                                    <div className="bogusInput" ref="bogusInput">
                                        <input type="password" maxLength="6" disabled ref='input1'/>
                                        <input type="password" maxLength="6" disabled ref='input2'/>
                                        <input type="password" maxLength="6" disabled ref='input3'/>
                                        <input type="password" maxLength="6" disabled ref='input4'/>
                                        <input type="password" maxLength="6" disabled ref='input5'/>
                                        <input type="password" maxLength="6" disabled ref='input6'/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="layer-content" ref='layercontent'>
                        <div className="form_edit clearfix" ref='formedit'>
                            <div className="num">1</div>
                            <div className="num">2</div>
                            <div className="num">3</div>
                            <div className="num">4</div>
                            <div className="num">5</div>
                            <div className="num">6</div>
                            <div className="num">7</div>
                            <div className="num">8</div>
                            <div className="num">9</div>
                            <div className="num"></div>
                            <div className="num">0</div>
                            <div id="remove" ref="remove">删除</div>
                        </div>
                    </div>
                    </div>
                    <style>{`
                        .layer-content {
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            width: 100%;
                            max-width: 640px;
                            height: auto;
                            z-index: 12;
                            -webkit-transform: translateX(-50%);
                            transform: translateX(-50%);
                        }
                        .colors:{
                            background: #DEE1E9!important;
                        }
                        .layershow{
                            display: block !important;
                        }
                        /* 输入表单 */

                        .edit_cash {
                            display: block;
                            margin-top: 15px;
                            padding: 15px;
                            margin: 0 auto;
                            width: 90%;
                            border: 1px solid #CFCFCF;
                            border-radius: 10px;
                            background-color: #fff;
                        }
                        .shuru span {
                            position: absolute;
                            top: 5px;
                            font-size: 25px;
                        }
                        .form_edit {
                            width: 100%;
                            background: #D1D4DD;
                        }

                        .form_edit> div {
                            margin-bottom: 2px;
                            margin-right: 0.5%;
                            float: left;
                            width: 33%;
                            height: 45px;
                            text-align: center;
                            color: #333;
                            line-height: 45px;
                            font-size: 18px;
                            font-weight: 600;
                            background-color: #fff;
                        }
                        .form_edit> div:nth-child(10) {
                            background:none;
                        }

                        .form_edit> div:nth-child(3n) {
                            margin-right: 0;
                        }

                        .form_edit> div:last-child {
                            background-color: #DEE1E9;
                        }
                        .showpay{
                            height: 100%;
                            width: 100%;
                            background: rgba(0,0,0,0.40);
                            position: fixed;
                            top: 0;
                            z-index: 1;
                        }
                        .showpaymain{
                            position: fixed;
                            top:-30%;
                            left: 0;
                            bottom: 0;
                            right: 0;
                            margin: auto;
                            width:2.7rem;
                            height:1.65rem;
                            background: #f3f3f3;
                            border-radius:0.12rem;
                        }
                        .showpaytitle{
                            height:0.45rem;
                            line-height:0.45rem;
                            text-align: center;
                            width:100%;
                            color:#030303;
                            font-size:0.17rem;
                            border-bottom:1px solid #ccc;
                            position: relative;
                        }
                        .showpaycontent p{
                            text-align: center;
                            color:#222222;
                        }
                        .showpaycontent p:nth-child(1){
                            line-height:0.3rem;
                            font-size:0.14rem;
                        }
                        .showpaycontent p:nth-child(2){
                            font-size:0.24rem;
                            padding-bottom:0.05rem;
                        }
                        .inputBoxContainer{
                            width: 90%;
                            height: 0.45rem;
                            margin: 0 auto;
                            position: relative;
                        }
                        .inputBoxContainer .bogusInput{
                            width: 2.2rem;
                            height: 100%;
                            z-index: 0;
                            margin:0 auto;
                        }
                        .inputBoxContainer .realInput{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top:0;
                            left: 0;
                            z-index: 1;
                            filter:alpha(opacity=0);
                            -moz-opacity:0;
                            opacity:0;
                            background:#ffffff;
                        }
                        .inputBoxContainer .bogusInput input{
                            padding: 0;
                            width: 0.36rem;
                            height: 0.36rem;
                            float: left;
                            background: #ffffff;
                            text-align: center;
                            font-size: 20px;
                            border:1px solid #ccc;
                            border-right:0;
                            outline: none;
                            -webkit-appearance: none;
                            border-radius: 0;
                        }
                        .inputBoxContainer .bogusInput input:first-child{
                            border-left: 1px solid #ccc;
                        }
                        .inputBoxContainer .bogusInput input:last-child{
                            border-right: 1px solid #ccc;
                        }
                        .nopayshow{
                            display: none;
                        }
                        .showpaytitle img{
                            position: absolute;
                            left: 0.25rem;
                            top: 0.15rem;
                            width: 0.15rem;
                        }
                    `}</style>
                </div>
        )

    }
}