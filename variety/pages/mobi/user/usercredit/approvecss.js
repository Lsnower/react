export default () => ( < style >{ `
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
		color: #bfbfbf;
		background : #f5f5f5;
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
	input{
		padding: 0;
		color: #222222;
		font-size: 14px;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		outline: none;
		-webkit-tap-highlight-color:rgba(0,0,0,0);
		tap-highlight-color:rgba(0,0,0,0);
	}
	input-placeholder{
		color:#bfbfbf;
	}
	::-webkit-input-placeholder { 
　　	color:#bfbfbf;
　　}
　　:-moz-placeholder {
　　	color:#bfbfbf;
　　}
　　::-moz-placeholder { 
　　	color:#bfbfbf;
　　}
　　:-ms-input-placeholder {
　　	color:#bfbfbf;
　　}
	input[disabled=disabled]{
		background: #fff;
	}
	input[type="text"], input[type="password"], input[type="number"],input[type="tel"], .inputText {
		-moz-border-radius: 0;
		-webkit-border-radius: 0;
		border-radius: 0;
		height: 45px;
		padding: 0 0.5rem;
		margin-bottom: 1px;
		border: 0;
	}
	
	
	.approve_main{
		position: relative;
	}
	.all_mask{
		width: 100%;
		height: 100%;
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.userName{
		width: 100%;
		background: #FFF;
		position: relative;
		margin-top:.15rem;
	}
	.userName img{
		width: 0.15rem;
		height: 0.15rem;
		display: none;
		position: absolute;
		right: 0.2rem;
	}
	.userName .input_none1{
		top: 0.175rem;
	}
	.userName .input_none2{
		top: 0.675rem;
	}
	.userName input{
		width: 100%;
		height: 0.5rem;
		border-bottom: 1px solid #efefef;
		text-indent: 0.12rem;
		padding: 0;
		margin: 0 0.1rem;
	}
	.userImg{
		width: 92%;
		margin: 0 auto;
		margin-top: 0.1rem;
	}
	.userImg .up_img{
		width: 48%;
		height: 1rem;
		display: inline-block;
		border: 1px dashed #CCC;
		border-radius: 5px;
		position: relative;
	}
	.userImg .up_img_content{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.userImg .up_img_content img{
		width: 0.37rem;
		height: 0.37rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.17rem;
	}
	.userImg .up_img_content img.show_Img{
		width: 100%;
		height: 100%;
		margin: 0;
	}
	.userImg .up_img_content p{
		width: 100%;
		text-align: center;
		line-height: 0.3rem;
		color: #B6B6B6;
	}
	.userImg .up_img input{
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		opacity: 0;
	}
	
	.userImg .up_imgL{
		margin-left: 4%;
	}
	
	.btn_submit{
		width: 90%;
		height: 0.44rem;
		line-height: 0.44rem;
		font-size: 0.14rem;
		background: #999999;
		color: #FFF;
		text-align: center;
		margin: 0.5rem auto;
		border-radius: .04rem;
	}
	.sure_submit{
		background: #cd4a47;
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
	
` }</style>)
