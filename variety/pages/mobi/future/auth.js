import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
export default  class Auth extends React.Component{
    constructor(props){
        super(props);
        this.toLink = this.toLink.bind(this);
    }
    toLink(){
        var n = new Date().getTime(),
            v = localStorage.setItem('auth-'+this.props.url.query.vtype,n);
        location.href='http://gf1.dajiexin.com/';

    }
    render(){
        return(<div>
            <Header_title text='股票期货快速交易授权登陆'/> 
            <Head text="快速交易" />
            <div className='main'>
                <img src='/static/auth_logo.png' />
                <p className='name'>期货投资宝</p>
                <p className='company'>快速交易由“深圳达捷鑫科技有限公司”提供</p>
                <p className='toLogin' onClick={this.toLink}><a>确认</a></p>
                <p className='rule'>确认即同意<Link href={'/mobi/login/user_protocol'}><a>《乐米第三方授权协议》</a></Link></p>
            </div>
            <style>{`
                .main{
                    padding:1rem .3rem;
                }
                .main p{
                    text-align:center;
                }
                .main p.name{
                    font-size:.15rem;
                    color:#222;
                    line-height:.3rem;
                }
                .main img{
                    display:block;
                    width:.8rem;
                    margin:0 auto;
                }
                .main p.company{
                    font-size:.12rem;
                    color:#999;
                    line-height:.2rem;
                }
                .main p.toLogin a{
                    display:block;
                    margin:.3rem auto;
                    width:90%;
                    height:.44rem;
                    line-height:.44rem;
                    text-align:center;
                    color:#fff;
                    border-radius:.22rem;
                    background:#cd4a47;
                }
                .main p.rule{
                    color:#999;
                    font-size:.12rem;
                    position:fixed;
                    bottom:.4rem;
                    width:100%;
                    left:0;
                }
                .main p.rule a{
                    color:#0076ff;
                }
            `}</style>
        </div>)
     }
}