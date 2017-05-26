
export default () => ( < style jsx global > {
    `
.page-main{
    background:#fff;
}
.mes_list{
    width:100%;
    height:0.5rem;
    border-bottom:1px solid #e7e7e8;
}
.mes_list li{
    float: left;
    width: 33.33%;
    height:100%;
    text-align:center;
    line-height:0.5rem;
    position:relative;
}
.mes_list li a{
    display:inline-block;
    height:100%;
    font-size:0.14rem;
    width:0.56rem;
    color:#262626;
    position:relative;
}
.mes_list li a.active{
    border-bottom:3px solid #869bcb;
    color:#869bcb;
}
.showred{
    position: absolute;
    top: 12px;
    height: 7px;
    width: 7px;
    border-radius: 50%;
    background: #cd4a47;
    right: -5px;
}
.clear{zoom:1;}
.clear:after{ content:"";
    display:block;
    clear:both;
    }
.cir_all{
    width:90%;
    height:100%;
    overflow: hidden;
    margin:0 auto;
    padding:0.15rem 0;
    overflow: hidden;
}

.circle_list{
    width:100%;
}
.circle_list li{
    width:100%;
    border-bottom:1px solid #e7e7e8;
}
img{
    width:0.5rem;
    height:0.5rem;
    float:left;
    border-radius:50%;
 }
.circle_main{
    float: left;
    width: 55%;
    overflow: hidden;
    margin-left: 0.15rem;
}
.circle_main p{
    width:100%;
    font-size:0.14rem;
}
 .circle_main p:nth-child(1){
    margin-bottom:0.05rem;
}
.circle_main p:nth-child(2){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color:#82848a;
    line-height:0.2rem;
}
.circle_main .cir_time{
    font-size:0.13rem;
    color:#b3b3b3;
    margin-top:0.05rem;
    display: block;
}
.cir_right{
    float: right;
    width:20%;
    height:100%;
    color:#b3b3b3;
}    
.isread {color:#82848a !important;}
.circle_main .noisread {color:#0c0f16 !important;}
/*系统消息开始*/
    .sys_top p{
        float: left;
        color: #141822;
        font-size:0.15rem;
        font-weight:600;
    }
    .sys_top span{
        float: right;
        display: block;
        font-size:0.12rem;
        color:#b3b3b3;
    }
    .sys_bottom{
        margin-top:0.1rem;
    }
    .sys_bottom p{
        font-size:0.14rem;
        color:#a7a8ac;
        line-height:0.23rem;
    }
    .sys_top .success{
        background:url(../../../static/mine/success.png) no-repeat;
        background-size:0.2rem 0.2rem;
        text-indent:25px;
    }
    
    .sys_top .feil{
        background:url(../../../static/mine/file.png) no-repeat;
        background-size:0.2rem 0.2rem;
        text-indent:25px;
    }
    
`
    } < /style>)