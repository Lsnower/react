import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'
class Content extends React.Component {
    constructor(props){
        super(props)
       
    }
    render(){
        if(this.props.company){
            var c = this.props.company;
             return(<div className='companyCon'>
                <p><span className='title'>公司名称</span><span className="con">{c.companyName}</span></p>
                <p><span className='title'>注册资本</span><span className="con">{c.zhuceziben}</span></p>
                <p><span className='title'>上市日期</span><span className="con">{c.shangshiriqi}</span></p>
                <p><span className='title'>发行价格</span><span className="con" >{c.faxingjiage}</span></p>
                <p><span className='title'>公司地址</span><span className="con">{c.zhucedizhi}</span></p>
                <p><span className='title'>经营范围</span><span className="con">{c.jingyingfanwei}</span></p>
                <style>{`
                    .companyCon{
                        padding:.1rem;
                    }
                    .companyCon p{
                        padding:.1rem 0;
                        zoom:1;
                    }
                    .companyCon p:after{
                        content:".";
                        display:block;
                        height:0;
                        clear:both;
                        visibility:hidden;
                    }
                    .companyCon p span{
                        display:block;
                    }
                    .companyCon p span.title{
                        width:.9rem;
                        float:left;
                        color:#82848a;
                        width:25%;
                    }

                    .companyCon p span.con{
                        color:#0c0f16;
                        font-size:.13rem;
                        width:75%;
                        float:right;
                    }
                `}</style>
            </div>)
        }else{
            return <Text_none text='暂无公司简介'/>
        }
       
    }
}
export default  class Company extends React.Component {
    constructor(props){
        super(props)
        this.state={
            company:null
        }
    }
    
    componentDidMount(){
        var _this = this;
        console.log(this.props)
        $.ajax({
            type:'get',
            url:'/crawler/crawler/selectCompanyProfile.do',
            data:{code:_this.props.url.query.code},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                    _this.setState({
                        company:e.data
                    })
                }
            }
        })
    }
    render(){
        return (<div>
            <Header_title text='乐米股票'/>    
            <Head text="公司简介" />
            <Content company={this.state.company}/>
        </div>)
    }
}