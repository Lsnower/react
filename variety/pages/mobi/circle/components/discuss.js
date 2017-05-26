/*
* @Author: Maolin
* @Date:   2017-04-26 10:02:54
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-18 10:06:17
*/
import Router from 'next/router';
import Header_title from '../../common/header/header_title.js'
import Head from '../../common/header/header_left.js'
import Confirm from '../../common/confirm.js';
class Discuss extends React.Component{
    constructor(props){
        super(props)
        this.hanleChange=this.hanleChange.bind(this);
         this.hanleSub=this.hanleSub.bind(this);
        this.state={
            red:false,
            show:false
        }
    }
    hanleChange(){
        this.refs.area.value.replace(/^\s*|\s*$/g,"").length>0?this.setState({red:true,show:false}):this.setState({red:false});
    }
    hanleSub(e){
        if(e.target.className.indexOf('active')>-1){
            var t = this,
            c = this.refs.area.value,
            v = this.props.url.query.viewpointId;
            $.ajax({
                type:'post',
                url:'/coterie/viewpoint/viewpointReply.do',
                data:{content:c,viewpointId:v},
                dataType:'JSON',
                success:function(d){
                    if(d.code == 200){
                        Router.push({
                          pathname: '/mobi/circle/components/service_detail',
                          query: { viewpointId: v }
                        })
                    }else{
                        t.setState({
                            show:true,
                            code: d.code,
                            content: d.msg,
                        })
                    }
                }
            })
        }
        

    }
    render(){
        return(
            <div>
                <Header_title text='回复观点'/>
                <Head text="回复观点" />
                <div className="comment-main">
                     <textarea ref='area' onChange={this.hanleChange} placeholder='请输入文字' maxLength="300"></textarea>
                    <div className="bottom">
                        <span className={this.state.red?'active':''} onClick={this.hanleSub}>提交</span>
                    </div>
                </div>
                <Confirm type={1} confirm={this.state} />
                <style>{`
                    .comment-main{
                        position:relative;
                    }
                    textarea{
                        width:100%;
                        background:#fff;
                        height:1.5rem;
                        display: block;
                        resize:none;
                        padding:.1rem;
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
            </div>
        )
    }
}
export default Discuss;
