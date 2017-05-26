import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import $ from 'jquery'
import Alert from '../common/confirm.js'
export default class Component extends React.Component {
    constructor(props){
        super(props)
        this.hanleChange=this.hanleChange.bind(this);
         this.hanleSub=this.hanleSub.bind(this);
        this.state={
            red:false,
            confirm:{
                show:false,
                type:1,
                content:''
            }
            
        }
    }
    componentDidMount(){
        var t = this.refs.area,v=this.refs.viewSpan;
       t.addEventListener('scroll',function(e){
            t.scrollTop>10?v.style.display='none':v.style.display='block';

        })
    }
    hanleChange(e){
        this.refs.area.value.length>0?this.setState({red:true}):this.setState({red:false});
        this.setState({confirm:{show:false}});
        if(this.refs.area.value.length>300){
            this.refs.area.value= this.refs.area.value.substring(0,300);
        }
    }
    hanleSub(e){
        if(!e.target.className){
            return false;
        }
        var _this = this,
            c = _this.refs.area.value,
            g = _this.props.url.query.type,
            v = _this.props.url.query.varietyId,
            b = _this.props.url.query.bigVarietyTypeCode,
            t =  _this.props.url.query.varietyType,
            cid = _this.props.url.query.calcuId || null;
            var d={
                content:c,
                direction:g,
                varietyId:v,
                varietyType:t,
                bigVarietyTypeCode:b,
                varietyType:t,
                calcuId:cid
            }
            if(!$.trim(c)){
                return false;
            }
           if(!cid){
            var o = JSON.parse(localStorage.getItem('viewQuota'));
            d = $.extend({},d,o);
           }
         $.ajax({
            type:'post',
            url:'/coterie/viewpoint/saveViewpoint.do',
            data:d,
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    window.history.back();
                }else{
                     _this.setState({
                        confirm:{
                            show:true,
                            content:e.msg
                        }
                    })
                }
               
                
            },
            error:function(e){
                console.log(e);
            }

        })

    }
    
    render() {

        return <div>
       
            <Header_title text='观点大神'/>
            <Head text="发表观点" />
            <div className="comment-main">
                 <textarea ref='area' onChange={(e)=>{this.hanleChange(e)}} maxLength="300" placeholder='请输入文字'></textarea>
                <div className="bottom">
                    <span className={this.state.red?'active':''} onClick={this.hanleSub}>提交</span>
                </div>
                <span ref="viewSpan" className={this.props.url.query.type==1?'view thigh':'view tlow'}>{this.props.url.query.type==1?'看涨':'看跌'}</span>
            </div>
            <Alert confirm={this.state.confirm}  />

            <style>{`
                body{
                    background: #e7e7e8;
                }
                .comment-main{
                    position:relative;
                }

                textarea{
                    width:100%;
                    background:#fff;
                    min-height:1.5rem;
                    height: auto;
                    display: block;
                    resize:none;
                    padding:.1rem;
                    text-indent:.4rem;
                }
                textarea::-moz-placeholder {
                    text-indent:.4rem;
                }
                textarea:-ms-input-placeholder {
                    text-indent:.4rem;
                }
                textarea::-webkit-input-placeholder {
                    text-indent:.4rem;
                }
                .bottom{
                    width:100%;
                    padding:.2rem .1rem;
                }
                .bottom span{
                    display:block;
                    width:100%;
                    height:.4rem;
                    line-height:.4rem;
                    text-align:center;
                    color:#fff;
                    font-size:.16rem;
                    border-radius:.03rem;
                    background:#82848a;
                    letter-spacing:.05rem;
                }
                .bottom span.active{
                    background:#cd4a47;
                }
                .view{
                    display:block;
                    width:.4rem;
                    height:.16rem;
                    font-size:.1rem;
                    line-height:.16rem;
                    text-align:center;
                    position:absolute;
                    top:.1rem;
                    left:.05rem;
                }
                .thigh{
                    border:.01rem solid #cd4a47;
                    color:#cd4a47;
                }
                .tlow{
                    border:.01rem solid #33d37e;
                    color:#33d37e;
                }
                
            `}
            
            </style>
        </div>;
    }
}
