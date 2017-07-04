import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../mine_style.js';
import $ from 'jquery';
import Alert from '../../common/confirm.js';
class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirm:{
                show:false,
                content:'',
                fun:null
            },
            usernum:'',
            usermsg:'请添加安全密码'
        }
    }
    componentDidMount(){
        var that = this;
        var pawDiv=$(this.refs.box).find('.pawDiv');
        var paw=$(this.refs.box).find('.paw');
        var pawDivCount=pawDiv.length;
        var n='';
        paw[0].readOnly=false;
        paw[0].focus();
        function func(){
            for(var i=0;i<pawDivCount;i++){
                pawDiv[i].addEventListener("click",function(){
                    pawDivClick(this);
                });
                paw[i].onkeyup=function(event){
                if(event.keyCode>=48&&event.keyCode<=57){
                /*输入0-9*/
                changeDiv();
            }else if(event.keyCode=="8") {
                /*退格回删事件*/
                firstDiv();

            }else if(event.keyCode=="13"){
                /*回车事件*/
                getPassword();

            }else{
                /*输入非0-9*/

                this.value="";
               }
            };
        }

    }
    func();
    /*定义pawDiv点击事件*/
    var pawDivClick=function(e){
        for(var i=0;i<pawDivCount;i++){
           
        }
    };
    /*定义自动选中下一个输入框事件*/
    var bbb='';
    var changeDiv=function(){
        
         for(var i=0;i<pawDivCount;i++){
            if(paw[i].value.length=="1"){
           /*处理当前输入框*/
                paw[i].blur();

           /*处理上一个输入框*/
                if(i < 5){
                    paw[i+1].focus();
                    paw[i+1].readOnly=false;
                    pawDivClick(pawDiv[i+1]);
                }
                
            }
            
        }
        if(paw[5].value!=''){
           for(var i=0;i<pawDivCount;i++){
                bbb+=paw[i].value;
            }
            that.setState({
                usernum:bbb,
                usermsg:'请再次输入安全密码'
            })
            paw.val('');
            paw[0].readOnly=false;
            paw[0].focus();
        }

    }
    
    /*回删时选中上一个输入框事件*/
    var firstDiv=function(){
        for(var i=0;i<pawDivCount;i++){
            if(paw[i].value.length=="0"){
                /*处理当前输入框*/
                paw[i].blur();
                bbb="";
                /*处理上一个输入框*/
                paw[i-1].focus();
                paw[i-1].readOnly=false;
                paw[i-1].value="";
                pawDivClick(pawDiv[i-1]);
                break;
            }
        }
    };
}
    render() {
        return (
            <section className="page-main">
                <div className="content">
                <div className="title">{this.state.usermsg}</div>
                 <div className="box" ref="box">
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                    <div className="pawDiv"><input type="password" className="paw" maxLength="1" readOnly=""/></div>
                 </div>
                </div>
            <style jsx global>{`
                .content{
                     width: 100%;
                     height: 0.5rem;
                     margin: 0 auto;
                     margin-top: 1rem;
                     text-align:center;
                    }
                    .title{
                     font-family: '微软雅黑';
                     font-size: 0.16rem;
                    }
                    .box{
                     height: 0.31rem;
                     border:1px solid #ccc;
                     margin-top: 0.1rem;
                     line-height: 0.3rem;
                     border-right:0;
                     box-sizing: border-box;
                     -webkit-box-sizing: border-box;
                    }
                    .content .box,.forget{
                     display: inline-block;
                    }
                    .content .forget{
                     width: 1rem;
                     color:lightskyblue;
                     vertical-align: super;
                     font-size: 0.14rem;
                    }
                    .box input.paw{
                     width: 0.3rem;
                     height: 0.2rem;
                     line-height: 0.2rem;
                     margin-left: -9px;
                     border:none;
                     text-align: center;
                    }
                    .box input.paw:nth-child(1){
                     margin-left: 0;
                    }
                    .content .box .pawDiv:nth-child(6) input.paw{
                     border: none;
                    }
                    .content .box input.paw:focus{outline:0;}
                    .content .box .pawDiv{
                     display: inline-block;
                     line-height: 0.3rem;
                     width: 0.3rem;
                     height: 0.3rem;
                     float: left;
                     border-right:1px solid #ccc;
                    }
                    .point{
                     font-size: 0.14rem;
                     color: #ccc;
                     margin: 5px 0;
                    }
            `}</style>
            </section>
        )
    }
}

export default  class Username extends React.Component {
    
    render() {
        return <div>
        <Header_title text="修改用户名"/>
        <div><Header text="修改用户名" /></div>
        <Style/>
        <Edite/>
    </div>
    }
}
