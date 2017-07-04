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
                content:'',
                len:0
            }
            
        }
    }
    componentDidMount(){
        
    }
    hanleChange(e){
        var l = this.refs.area.value.length
        this.setState({
            red:l>0?true:false,
            len:l
        })
        this.setState({confirm:{show:false}});
        
    }
    hanleSub(e){
        if(!e.target.className){
            return false;
        }
        var _this = this,
            c = $.trim(_this.refs.area.value.replace(/(^\n*)|(\n*$)/g, "")),
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
                 <div className="item">
                    <span ref="viewSpan" className={this.props.url.query.type==1?'view thigh':'view tlow'}>{this.props.url.query.type==1?'看涨':'看跌'}</span>
                    <em>{this.state.len>300?300:(this.state.len||'0')}/300</em>
                 </div>
                <div className="bottom">
                    <span className={this.state.red?'active':''} onClick={this.hanleSub}>提交</span>
                </div>
            </div>
            <Alert confirm={this.state.confirm}  />

            <style>{`
                body{
                    background: #e7e7e8;
                }
                .comment-main{
                    position:relative;
                    border-top:.01rem solid #ddd;
                }

                textarea{
                    width:100%;
                    background:#fff;
                    min-height:1.5rem;
                    height: auto;
                    display: block;
                    resize:none;
                    padding:.1rem;
                    color:#222;
                    font-size:.15rem;
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
                    display:inline-block;
                    width:.4rem;
                    height:.16rem;
                    font-size:.1rem;
                    line-height:.16rem;
                    text-align:center;
                    border-radius:.08rem;
                    float:left;
                }
                .item{
                    width:100%;
                    background:#fff;
                    padding:.1rem;
                    text-align: right;
                }
                .item em{
                    font-size:.1rem;
                    color:#999;
                    line-height:.16rem;
                }
                .thigh{
                    border:.01rem solid #ef6d6a;
                    color:#ef6d6a;
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
