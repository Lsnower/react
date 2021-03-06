export default () => ( < style jsx global > {
        `

html{background:#e7e7e8;}
.content_set li{
    width: 100%;
    background:#fff;
    height:0.45rem;
    line-height:0.45rem;
}
.content_set li a{
    width:90%;
    margin:0 auto;
    display: block;
    position:relative;
    height:100%;
    color:#222222;
    font-size:0.15rem;
}
.content_set li:after {
    content: "";
    display: block;
    position: absolute;
    left: 5%;
    width: 100%;
    height: 1px;
    background: #e7e7e8;
    transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -webkit-transform: scale(1);
}
.youjt2:after{content: " ";
    display: inline-block;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    height: 10px;
    width: 10px;
    border-width: 1px 1px 0 0;
    border-color: #82848a;
    border-style: solid;
    position: relative;
    top: -2px;
    position: absolute;
    right: 5px;
    top: 30%;
}

.screen_list li{
    width: 100%;
    background:#fff;
    padding:0.15rem 0;
    margin-bottom:1px;
}

.clear{zoom:1;}
.clear:after{ content:""; display:block; clear:both;}

.screen_list li img{
    display: inline-block;
    width:0.5rem;
    height:0.5rem;
    float: left;
    margin-left:15px;
    border-radius:50%;
}

.screen_list .listcon{
    float:left;
    margin-left:0.2rem;
    color:#0c0f16;
    font-size:0.16rem;
    padding-top:0.1rem;
}
.screen_list .listcon p{
    font-size:0.12rem;
    color:#82848a;
    margin-top:0.05rem;
}
.screen_list .listcon .isshow{
    display:none;
}
.screen_list li a{
    float:right;
    display: inline-block;
    height:0.5rem;
    width:1rem;
    background: url('../../../static/mine/shield_icon_relieve@3x.png') no-repeat center 0.05rem;
    background-size:0.2rem 0.2rem;
    text-align:center;
    border-left:1px solid #e7e7e8;
    padding-top:0.3rem;
    font-size:0.14rem;
    color:#82848a;
}
.follow_list li a{
    background: url('../../../static/mine/follow_icon_relieve@3x.png') no-repeat center 0.05rem;
}
	.list_li{
		display: flex;
	}
	.list_li a{
		flex: 1;
	}
	.list_li .list_li_l{
		flex: 3;
	}
/*新消息提醒开始*/

    
`
    } < /style>)