
export default () => ( < style > {
		`
	*{
		margin:0; padding:0;
	}
	li{
		list-style:none;
	}
	img{
		border:none;
		vertical-align:top;
	}
	a{
		text-decoration:none;
		color:inherit;
	}
	.clear{
		zoom:1;
	}
	.clear .clear_span{
		display:block;
		clear:both;
	}

	body{
		font-size:14px;
		font-family: Microsoft YaHei,Arial,Verdana,Sans-serif;
		background:#f5f5f5;
		color: #050100;
		overflow-x: hidden;
	}
	.bottom_line {
		display: block;
		position: absolute;
		left: -50%;
		bottom: 0;
		width: 200%;
		height: 1px;
		background: #efefef;
		-webkit-transform: scale(0.5);
	}

	/*轮播图 start*/
	.hide{
		display:none
	}
	.mod-carousel,.mod-carousel ul {
		position: relative
	}

	.mod-carousel .dot,.mod-list .detail span {
		display: inline-block
	}

	.mod-carousel {
		width: 100%;
		height: 1.2rem;
	}

	.mod-carousel ul,.mod-carousel img,.mod-carousel li{
		width: 100%;
		height: 100%;
	}
	.mod-carousel li a{
		width: 100%;
		height: 100%;
		display: block;
	}
	.mod-carousel img {
		border: 0;
		vertical-align: middle
	}

	.mod-list,.mod-list-float {
		border-bottom: 1px solid #edeff4;
	}

	.mod-carousel li {
		position: absolute;
		top: 0;
		left: 0
	}

	.mod-carousel li:nth-child(n+2) {
		left: 100%
	}

	.mod-carousel .carousel-div {
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
	}

	.mod-carousel .dot {
		width: .06rem;
		height: .06rem;
		margin: .04rem;
		overflow: hidden;
		vertical-align: middle;
		background-color: #e0e0e0;
		border-radius: 100%;
		-webkit-box-shadow: 0 0 .08rem rgba(0,0,0,.4);
		box-shadow: 0 0 .08rem rgba(0,0,0,.4)
	}

	.mod-carousel .curr,.mod-list {
		background-color: #fff
	}

	/*轮播图 end*/


	/*导航条 start*/

	.indexnav{
		width: 100%;
		height: 0.88rem;
		background:#FFF;
		display: flex;
		display: -webkit-flex;
		overflow: hidden;
		position: relative;
	}

	.indexnav .indexnav_tab{
		height: 100%;
    	text-align: center;
    	flex: 1;
    	-webkit-flex: 1;
		color: #081317;
	}
	.indexnav_tab .icon_div{
		width: 0.45rem;
		height: 0.45rem;
		margin: 0 auto;
		margin-top: 0.1rem;
	}
	.indexnav_tab div{
		
	}
	.indexnav_tab a{
		width: 100%;
		height: 100%;
		display: block;
	}

	/*导航条 end*/


	/*大事件 start*/

	.indexbig{
		width: 100%;
		height: 0.45rem;
		background: #FFF;
		margin-top: 0.15rem;
		position: relative;
	}
	.big_href{
		width: 100%;
		height: 100%;
		display: block;
	}
	.indexbig .big_left{
		float: left;
		width: 22%;
		height: 100%;
		line-height: 0.35rem;
		overflow: hidden;
	}
	
	.indexbig .big_right{
		float: left;
		width: 75%;
		height: 100%;
		line-height: 0.35rem;
		overflow: hidden;
	}
	.indexbig .big_right li{
		width: 85%;
		height: 100%;
		line-height: 0.45rem;
		display: block;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
		color: #999999;
		font-size: 0.11rem;
	}

	/*大事件 end*/


	/*箭头*/
	.arrow{
		position: relative;
	}
	.arrow_top{
		z-index: 2;
	}
	.arrow_top, .arrow_bottom {
		border: 10px solid transparent;
		border-left: 10px solid #fff;
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		right: -19px;
	}

	.arrow_bottom {
		border-left-color: #cdcccc;
		right: -21px;
	}
	/*箭头*/


	/*借款有道 start*/

	.indexloan,.indexloan ul,.indexloan li{
		width: 100%;
		background: #FFF;
		overflow: hidden;
	}
	.indexloan li{
		height: 0.7rem;
		position: relative;
	}
	.indexloan li a{
		width: 100%;
		height: 100%;
		display: block;
	}
	.loan_left{
		float: left;
		width: 19%;
		overflow: hidden;
	}
	.loan_left .loan_div{
		width: 0.4rem;
		height: 0.4rem;
		margin-top: 0.12rem;
		margin-left: 0.13rem;
	}
	.loan_con{
		float: left;
		width: 64%;
	}
	.loan_con h2{
		font-weight: 100;
		font-size: 0.16rem;
		margin: 0;
		margin-top: 0.08rem;
    	line-height: 0.3rem;
	}
	.loan_con p{
		margin: 0;
		padding: 0;
		color: #999;
		font-size: 0.11rem;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	}
	.loan_right{
		float: right;
		width: 0px;
		margin: 0.23rem 0.24rem 0 0;
	}

	/*借款有道 end*/


	/*运营用底 start*/
	.indexbottom{
		width: 100%;
		background: #fff;
		margin-top: 0.15rem;
		overflow: hidden;
	}
	.indexbottom_text{
		width: 90%;
		margin: 0 auto;
		font-size: 0.14rem;
		line-height: 0.3rem;
		margin-top: 0.1rem;
	}
	.bottom_content{
		width: 94%;
		margin: 0 auto;
		
	}
	.bottom_content .bottom_allc{
		width: 50%;
		height: 1.5rem;
		margin-top: 0.05rem;
		position: relative;
		text-align: center;
		float: left;
		overflow: hidden;
	}
	.bottom_content .bottom_allc .bottom_allc_a{
		width: 100%;
		height: 100%;
		display: block;
	}
	.bottom_content .index_mask_all{
		width: 94%;
		height: 1rem;
		margin-left: 3%;
		overflow: hidden;
	}
	.bottom_content img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.bottom_content .index_mask_all1{
		width: 94%;
		margin-left: 3%;
		text-align: left;
		text-indent: 2px;
		padding-bottom: 0.15rem;
		overflow: hidden;
	}
	.bottom_content .index_mask_all1 h3{
		width: 100%;
		font-weight: 100;
		font-size: 0.14rem;
		line-height: 0.2rem;
		margin-top: 0.05rem;
		color: #222;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	}

	.bottom_content .index_mask_all1 p{
		width: 100%;
		color: #999;
		font-size: 0.11rem;
		overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
	}
	.bottom_content h3,.bottom_content p{
		margin: 0;
		padding: 0;
	}

	.indexcontent{
		margin-bottom: 0.8rem;
	}
	
	
	
	.icon_qh{
		background: url(/static/index_img/fanli_content_icon_futures@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.icon_gp{
		background: url(/static/index_img/fanli_content_icon_shares@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.icon_hz{
		background: url(/static/index_img/fanli_content_icon_help@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.icon_zx{
		background: url(/static/index_img/fanli_content_icon_optional@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	
	.indexbig .big_left .big_img{
		width: 0.48rem;
		height: 0.17rem;
		display: block;
		background-size: 100% 100%;
		margin-top: 0.13rem;
		margin-left: 0.14rem;
		color:#ef6d6a;
		border: 1px solid #ef6d6a;
		text-align: center;
		line-height: 0.17rem;
		border-radius: 0.1rem;
		font-size: 0.11rem;
	}
	
	.loan_jkyd{
		background: url(/static/index_img/fanli_list_icon_borrow@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.loan_gdds{
		background: url(/static/index_img/fanli_list_icon_opinion@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	.loan_qhpk{
		background: url(/static/index_img/fanli_list_icon_futuresvs@3x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	/*文档宽度小于 375 像素*/
	@media all and (max-width:375px) {
		
		.loan_jkyd{
			background: url(/static/index_img/fanli_list_icon_borrow@2x.png) no-repeat;
			background-size: 100% 100%;
		}
		.loan_gdds{
			background: url(/static/index_img/fanli_list_icon_opinion@2x.png) no-repeat;
			background-size: 100% 100%;
		}
		.loan_qhpk{
			background: url(/static/index_img/fanli_list_icon_futuresvs@2x.png) no-repeat;
			background-size: 100% 100%;
		}
		
	}
	
	.index_mask{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.4);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		display: none;
	}
	
	.index_mask_content{
		width: 74%;
		background: #FFF;
		position: absolute;
		top: 25%;
		left: 50%;
		margin-left: -37%;
		border-radius: 5px;
		color: #0c0f16;
	}
	.index_mask_content .index_mask_top{
		padding: .15rem .18rem 0 .18rem;
		text-align: center;
		line-height: 0.22rem;
		
	}
	.index_mask_top .mask_last_p{
		text-align: left;
		margin: 0 auto;
	}
	.index_mask_content .index_mask_top h3{
		margin-bottom: 0.1rem;
	}
	
	.index_mask_bottom{
		width: 100%;
		height: 0.38rem;
		display: flex;
		margin-top: 0.15rem;
		border-radius: 0 0 5px 5px;
		overflow: hidden;
	}
	.index_mask_bottom div{
		width:50%;
		float: left;
		flex: 1;
		color: #FFF;
		text-align: center;
		line-height: 0.38rem;
	}
	.index_mask_bottom .mask_btn_l{
		background: #d3d2d3;
	}
	.index_mask_bottom .mask_btn_r{
		background: #cd4a47;
	}
	
`
	} < /style>)