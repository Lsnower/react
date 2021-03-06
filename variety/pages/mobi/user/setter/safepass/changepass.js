import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router';
import Header_title from '../../../common/header/header_title.js';
import Header from '../../../common/header/header_left.js';
import Confirm from '../../../common/confirm.js';
class Acclist extends React.Component{
    constructor(props) {
        super(props) 
        this.state={
            fir:null,
            sec:null,
            text:null,
            fun:null,
            hasno:null,
            confirm:{
                show:false,
                content:'',
                title:'',
            },
            showdiv:false,
            mynum:'2',
            showdata:null,
            num:'2',
            mytitle:'修改安全密码'
        }
        this.showtotal = this.showtotal.bind(this);
    }
    showtotal(){
       var that = this;
        $(that.refs.success_mask).show();
        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
			$(that.refs.success_mask).animate({'opacity':0},500,function(){
				$(that.refs.success_mask).hide();
                                
			})					
		}) 
    }
    componentDidMount() {
        var nul = this.props.url.query.code;
        if(nul){
            this.setState({
                text:'请输入新安全密码',
                mytitle:'设置安全密码'
            })
        }else{
            this.setState({
                text:'请输入旧安全密码',
            })
        }
        var container = this.refs.inputBoxContainer,t=this;
        var oDiv = t.refs.realInput;
        var bogusInput = t.refs.bogusInput;
        var c = 0;
        var b = 0;
        $(t.refs.wrap).click(function(e){
            $(t.refs.layercontent).show();
            e.stopPropagation();
        })
        
        $(t.refs.formedit).find('.num').click(function(){
            t.setState({
                showdiv:false
            })
            c++;
            oDiv.innerHTML += this.innerHTML;
            $(t.refs['input'+c]).val(this.innerHTML);
            if(oDiv.innerHTML.length=='6'){
                if(nul){
                    b++;
                    if(b == 1){
                        t.setState({
                            fir:$(oDiv).html()
                        })
                        $(bogusInput).find('input').val('');
                        $(oDiv).html('');
                        t.setState({
                            text:'请再次确认安全密码'
                        })
                        c=0;
                    }else if(b == 2){
                        if($(oDiv).html() == t.state.fir){
                            $.ajax({
                                url:'/user/userAccount/updatePassword.do',
                                data:{password:$(oDiv).html(),code:nul},
                                type:'post',
                                success:function(d){
                                    if(d.code == 200){
                                        t.showtotal()
                                        setTimeout(function(){
                                            Router.push({
                                                pathname: '/mobi/user/setter/safepass/setpass'
                                            }) 
                                        },800)
                                    }else if(d.code == 213){
                                        t.setState({
                                            confirm:{
                                                show:true,
                                                content:d.msg,
                                                title:''
                                            },
                                            num:'1',
                                            fun:function(){
                                                Router.push({pathname: '/mobi/user/setter/safepass/forgetpass'})
                                            }
                                        })
                                    }else{
                                        b = 1;
                                        c = 0;
                                        $(bogusInput).find('input').val('');
                                        $(oDiv).html('');
                                        t.setState({
                                            confirm:{
                                                show:true,
                                                content:d.msg,
                                                title:'',
                                            },
                                            num:'2',
                                            fun:function(){

                                                t.setState({
                                                    confirm:{
                                                        show:false,
                                                        content:'',
                                                        title:''
                                                    }
                                                })
                                            },
                                            hasno:function(){
                                                t.setState({
                                                    confirm:{
                                                        show:false,
                                                        content:'',
                                                        title:''
                                                    }
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                        }else{
                            t.setState({
                                showdiv:true,
                                showdata:'两次输入不一致',
                                text:'请输入新安全密码'
                            })
                            
                            $(bogusInput).find('input').val('');
                            $(oDiv).html('');
                            b = 0;
                            c=0;
                        }
                    }
                }else{
                    b++;
                    if(b == 1){
                        t.setState({
                            fir:$(oDiv).html()
                        })
                        $.ajax({
                            url:'/user/userAccount/checkPassword.do',
                            data:{password:$(oDiv).html()},
                            type:'post',
                            success:function(d){
                                if(d.code == 200){
                                    $(bogusInput).find('input').val('');
                                    $(oDiv).html('');
                                    t.setState({
                                        text:'请输入新安全密码'
                                    })
                                    c=0;
                                }else{
                                    b = 0;
                                    c = 0;
                                    $(bogusInput).find('input').val('');
                                    $(oDiv).html('');
                                    t.setState({
                                        text:'请输入旧安全密码',
                                        confirm:{
                                            show:true,
                                            content:d.msg,
                                            title:'',
                                        },

                                        num:'1',
                                        fun:function(){
                                            t.setState({
                                                confirm:{
                                                    show:false,
                                                    content:'',
                                                    title:''
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })               
                    }else if(b == 2){
                        t.setState({
                                showdiv:false,
                                showdata:''
                            })
                        if($(oDiv).html() == t.state.fir){
                            t.setState({
                                showdiv:true,
                                showdata:'新密码与旧密码相同'
                            })
                            $(bogusInput).find('input').val('');
                            $(oDiv).html('');
                            b = 1;
                            c=0;
                        }else{
                            t.setState({
                                sec:$(oDiv).html(),
                                showdiv:false,
                                showdata:''
                            })
                            $(bogusInput).find('input').val('');
                            $(oDiv).html('');
                            t.setState({
                                text:'请确认新安全密码'
                            })
                            c=0;
                        }
                        
                    }
                    else if(b == 3){
                        if($(oDiv).html() == t.state.sec){
                            $.ajax({
                            url:'/user/userAccount/updatePassword.do',
                            data:{password:$(oDiv).html(),oldPassword:t.state.fir},
                            type:'post',
                            success:function(d){
                                if(d.code == 200){
                                    t.showtotal()
                                    setTimeout(function(){
                                        Router.push({
                                            pathname: '/mobi/user/setter/safepass/setpass'
                                        }) 
                                    },800)
                                    
                                }else{
                                    b = 0;
                                    c = 0;
                                    $(bogusInput).find('input').val('');
                                    $(oDiv).html('');
                                    t.setState({
                                        text:'请输入旧安全密码',
                                        confirm:{
                                            show:true,
                                            content:d.msg,
                                            title:'',
                                        },
                                        fun:function(){
                                            t.setState({
                                                confirm:{
                                                    show:false,
                                                    content:'',
                                                    title:''
                                                }
                                            })
                                        },
                                        hasno:function(){
                                            t.setState({
                                                confirm:{
                                                    show:false,
                                                    content:'',
                                                    title:''
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })
                        }else{
                            t.setState({
                                showdiv:true,
                                showdata:'两次输入不一致',
                                text:'请输入新安全密码'
                            })
                            $(bogusInput).find('input').val('');
                            $(oDiv).html('');
                            b = 1;
                            c=0;
                        }
                    }
                } 
            }
        })
        $(t.refs.remove).click(function(){
            if(c>0){
                var oDivHtml = oDiv.innerHTML;
                oDiv.innerHTML = oDivHtml.substring(0,oDivHtml.length-1);
                $(t.refs['input'+c]).val('');
                c--
            }
        })
        
    }
    render() {
        var a = this.state.showdiv ? 'erraytip' : 'erraytip erraytipno';
        return (
            <div>
                <Header_title text="修改安全密码"/>
                <div><Header text="修改安全密码" /></div>
                <div className="wrap" ref='wrap'>
                    <p>{this.state.text}</p>
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
                        <div className={a}>
                            <img src="../../../../../static/wallet/mine_bankcard_prompt@2x.png"/>
                            <span>{this.state.showdata}</span>
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
                            <div className="nonum"></div>
                            <div className="num">0</div>
                            <div id="remove" ref="remove">删除</div>
                        </div>
                    </div>
                </div>
            
                <Confirm type={this.state.num} isNot={this.state.hasno} confirm={this.state.confirm} isOk={this.state.fun}/>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>修改成功</p>
                </div>
            <style jsx>{`
                    .wrap{
                        margin-top:1rem;
                        width: 100%;
                    }
                    .wrap p{
                        text-align: center;
                        color:#222222;
                        font-size:0.16rem;
                        margin-bottom:0.2rem;
                    }
                    .inputBoxContainer{
                        width: 100%;
                        height: 0.45rem;
                        margin: 0 auto;
                        position: relative;
                    }
                    .inputBoxContainer .bogusInput{
                        width: 2.72rem;
                        height: 100%;
                        border: #c3c3c3 1px solid;
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
                        width: 45px;
                        height: 100%;
                        float: left;
                        background: #ffffff;
                        text-align: center;
                        font-size: 20px;
                        border: none;
                        border-right: #C3C3C3 1px solid;
                    }
                    .inputBoxContainer .bogusInput input:last-child{
                        border: none;
                    }
                    
                    .layer-content {
                        position: absolute;
                        left: 50%;
                        bottom: 0px;
                        width: 100%;
                        max-width: 640px;
                        height: auto;
                        z-index: 12;
                        -webkit-transform: translateX(-50%);
                        transform: translateX(-50%);
                        display:block;
                    }
                    .erraytip{
                        width:100%;
                        height:0.4rem;
                        line-height:0.4rem;
                        font-size:0.14rem;
                        color:#999999;
                    }
                    .erraytipno{
                        display: none;
                    }
                    .erraytip img{
                        display: block;
                        float: left;
                        width:0.17rem;
                        margin-left: 30%;
                        margin-top:0.12rem;
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
                    .nonum{
                        background-color: #DEE1E9 !important;
                    }
                    .form_edit> div:nth-child(3n) {
                        margin-right: 0;
                    }

                    .form_edit> div:last-child {
                        background-color: #DEE1E9;
                    }
                    .success_mask{
                        position: fixed;
                        width: 2rem;
                        height: 1.55rem;
                        top: 30%;
                        left: 50%;
                        margin-left: -1rem;
                        z-index: 99;
                        background: rgba(0,0,0,.8);
                        font-size: 16px;
                        text-align: center;
                        color: #FFF;
                        border-radius: 5px;
                        overflow: hidden;
                        display: none;
                    }
                    .success_mask img{
                        width: 30%;
                        display: block;
                        margin: 0 auto;
                        margin-top: 15%;
                    }
                    .success_mask p{
                        font-size: 0.17rem;
                        line-height: 0.5rem;
                    }
            `}</style>
            </div>
        )
    }
}

export default Acclist