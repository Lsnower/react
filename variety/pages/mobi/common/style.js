export default () => ( < style jsx global > {
        `
    /*重置浏览器默认样式 start*/
        *{
            margin:0;
            padding:0;
        }
        body, html {
            width: 100%;
            overflow-x: hidden;
			height: 100%;
        }
        body {
          margin: 0;
          padding: 0;
          font: 14px Microsoft YaHei,Arial,Verdana,Sans-serif;
		  background: #f5f5f5;
		  -webkit-overflow-scrolling: touch;
        }
        .realInput:focus{
            color:#fff
        }
        html {
            font-size: 625%;
        }
        img,legend {
            border: 0
        }
        *,:after,:before {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
            background-color: transparent;
            font-family:PingFangSC-Regular;
        }
        :focus,a:active,a:hover {
            outline: 0
        }
        dd,dl,legend,ol,td,th,ul {
            list-style: none;
        }
        ul>li{
            list-style: none;
        }
        a {
            background-color: transparent;
            text-decoration: none;
            cursor: pointer;
            color: inherit;
        }

        abbr[title] {
            border-bottom: 1px dotted
        }

        b,optgroup,strong {
            font-weight: 500
        }

        dfn {
            font-style: italic
        }

        h1 {
            font-size: 2em
        }

        mark {
            background: #ff0;
            color: #000
        }

        small {
            font-size: 80%
        }

        sub,sup {
            font-size: 75%;
            line-height: 0;
            vertical-align: baseline
        }

        sup {
            top: -.5em
        }

        sub {
            bottom: -.25em
        }

        svg:not(:root) {
            overflow: hidden
        }

        figure {
            margin: 1em 40px
        }

        hr {
            -moz-box-sizing: content-box;
            box-sizing: content-box
        }

        pre,textarea {
            overflow: auto
        }

        code,kbd,pre,samp {
            font-family: monospace,monospace;
            font-size: 1em
        }

        button,input,optgroup,select,textarea {
            color: inherit;
            font: inherit;
            margin: 0
        }

        button {
            overflow: visible
        }

        button,select {
            text-transform: none
        }

        button,html input[type=button],input[type=reset],input[type=submit] {
            -webkit-appearance: button;
            cursor: pointer
        }

        button[disabled],html input[disabled] {
            cursor: default
        }

        button::-moz-focus-inner,input::-moz-focus-inner {
            border: 0;
            padding: 0
        }

        input {
            line-height: normal
        }

        input[type=checkbox],input[type=radio] {
            box-sizing: border-box;
            padding: 0;
            vertical-align: middle
        }

        input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button {
            height: auto
        }

        input[type=search] {
            -webkit-appearance: textfield;
            -moz-box-sizing: content-box;
            -webkit-box-sizing: content-box;
            box-sizing: content-box
        }

        input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration {
            -webkit-appearance: none
        }

        fieldset {
            border: 1px solid silver;
            margin: 0 2px;
            padding: .35em .625em .75em
        }

        table {
            border-collapse: collapse;
            border-spacing: 0
        }
        .clearfix, .jiathis_style_m {
            zoom: 1;
        }
        .clearfix:after {
            content: "";
            display: block;
            clear: both;
            height: 0;
            visibility: hidden
        }
        button, input, optgroup, select, textarea{
            outline: none;
            border: none;
        }
        em,i{ font-style: normal;}
/*重置浏览器默认样式 end*/
/*公用头部样式*/
        #head{
            width: 100%;
            text-align: center;
            background: #fff;
            color: #222;
            position: relative;
            z-index: 1;
            border-bottom:1px solid #ddd;
        }
        #head h3{
            height:.5rem;
            line-height: .5rem;
            margin: 0;
            font-size:.16rem;
            font-weight: 400;
            overflow: hidden;
        }
        #head h3 span:nth-of-type(1){
            display: block;
            font-size: .17rem;
        }
        #head h3 span:nth-of-type(2){
            display: block;
            color: #878182;
        }
        #head .head_content .left{
            position: absolute;
            top: 0;
            left: 0.2rem;
        }
        #head .head_content .right{
            position: absolute;
            top: 0;
            right: 0.2rem;
        }
        #head .head_content .left a,#head .head_content .right a{
            color: #fff;
        }
		#head .head_content .right a{
            color: #000;
            line-height: 0.5rem;
        }
		#head .head_content .right img{
			width: 0.25rem;
			margin-top: 0.22rem;
		}
        #head .head_content .left a{
            font-size: 0.2rem;
        }

        #head h4.productName{
            font-size:.15rem;
            padding-top:.08rem;
        }
        #head h4.varietyType{
            line-height: .24rem;
            margin-top: -.04rem;
            color:#878182;
            font-size: .12rem;

        }

        .demozuo:after{
            content: " ";
            display: inline-block;
            -webkit-transform: rotate(225deg);
            transform: rotate(225deg);
            height: 12px;
            width: 13px;
            border-width: 1px 1px 0 0;
            border-color: #222;
            border-style: solid;
            position: relative;
            top: -2px;
            position: absolute;
            left: 0px;
            top: 18px;
        }
        .whrite:after{
            content: " ";
            display: inline-block;
            -webkit-transform: rotate(225deg);
            transform: rotate(225deg);
            height: 12px;
            width: 13px;
            border-width: 1px 1px 0 0;
            border-color: #ffffff;
            border-style: solid;
            position: relative;
            top: -2px;
            position: absolute;
            left: 0px;
            top: 18px;
        }
        #head .backIcon:after{
            content: " ";
            display: inline-block;
            -webkit-transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
            -ms-transform: rotate(225deg);
            transform: rotate(225deg);
            height: 12px;
            width: 13px;
            border-width: 1px 1px 0 0;
            border-color: #fff;
            border-style: solid;
            position: relative;
            top: -2px;
            position: absolute;
            left: 0px;
            top: 18px;
        }
/*共用头部样式end*/
/*共用footer start*/
        #foot{
            width:100%;
            height:0.45rem;
            background:#fff;
            position: fixed;
            bottom: 0;
            border-top: .01rem solid #e9e9e9;
            z-index: 10;
        }
        #foot .content{
            height: 100%;
        }
        #foot .content ul{
            width:100%;
            height:100%;
            display: flex;
            display: -webkit-flex;
        }
        #foot .content li{
            height:100%;
            text-align:center;
            flex:1;
            -webkit-flex:1;
			position: relative;
        }
        #foot .content li a{
            width:100%;
            height:100%;
            display:block;
        }
        #foot .content li .img{
            margin-top: 0.035rem;
            display: inline-block;
            font-size:0.22rem;
        }
        #foot .content li .foot_text{
            display:block;
            font-size:0.106rem;
            line-height:0.15rem;
        }
        #foot .content li .show{
            color:#252021;
        }
		#foot .content li .foot_red{
			min-width: 0.14rem;
			height: 0.14rem;
			background: #e7423e;
			position: absolute;
			top: 0;
			left: 59%;
			color: #FFF;
			font-size: 0.1rem;
			line-height: 0.15rem;
			text-align: center;
			border-radius: 0.08rem;
			padding: 0 0.05rem;
		}
		.foot_red_show{
			display: block;
		}
		.foot_red_hide{
			display: none;
		}
        .text-orange{
            color:#fc603c;
        }
/*公用footer end*/

/*字体图标start*/
        @font-face {
          font-family: 'icomoon';
          src:  url('./fontface/icomoon.eot?txggdp');
          src:  url('./fontface/icomoon.eot?txggdp#iefix') format('embedded-opentype'),
            url('./fontface/icomoon.ttf?txggdp') format('truetype'),
            url('./fontface/icomoon.woff?txggdp') format('woff'),
            url('./fontface/icomoon.svg?txggdp#icomoon') format('svg');
          font-weight: normal;
          font-style: normal;
        }
        [class^="iconWH-"], [class*=" iconWH-"] {
            font-family: 'icomoon' !important;
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .iconWH-backT:before {
            content: "\e901";
        }
/*字体图标end*/

/*公用弹窗start*/
        .msgbox {
            position: fixed;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            font-size: .16rem
        }

        .msgbox>.content {
            -webkit-box-flex: 0;
            -webkit-flex: 0 0 auto;
            flex: 0 0 auto;
            width: 75%;
            background-color: #fff;
            border-radius: .04rem;
            box-shadow: 0 0 .04rem rgba(0,0,0,.4)
        }

        .msgbox .main {
            padding: .22rem .18rem;
            color: #000;
        }

        .msgbox .action {
            border-radius: 0 .04rem .04rem/.04rem;
            border-top: 1px solid #e5e5e5;
            background:#d3d2d3;
        }
        .action{
            width:100%;
            height: .38rem;
            line-height: .38rem;
            display: flex;
            display: -webkit-flex;
            color: #fff;
        }
        .action .btn{
            flex: 1;
            -webkit-flex: 1;
            text-align:center;
        }
        .action .btn-right{
            border-radius:.04rem;
        }
        .action .ok{
            background: #cd4a47;
        }
        .msgbox .action .button {
            color: #FFF;
        }
        .msgbox-info .action .button {
            border: 0;
            width: 100%;
            border-radius:0 0 .05rem .05rem;
            line-height: .36rem;
            display: block;
        }
        .msgbox-info .action .button-disabled {
            color: #aaa;
            border-top-left-radius: 0;
            border-top-right-radius: 0
        }

        .msgbox-confirm .action>div {
            width: 50%
        }

        .msgbox-confirm .action .button {
            width: 100%;
            border: 0;
            border-radius: 0
        }

        .msgbox-confirm .action .right .button{border-left: 1px solid #e5e5e5;}
        .msgbox-confirm .action .button-disabled {
            color: #aaa;
            border-top-left-radius: 0;
            border-top-right-radius: 0
        }

        .msgbox-confirm .action .ok {
            border-bottom-right-radius: .05rem
        }

        .msgbox-confirm .action .no {
            border-bottom-left-radius: .05rem
        }

        .msgbox-toast {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1rem;
            height: .3rem;
            line-height: .3rem;
            -webkit-transform: translateZ(0);
            -moz-transform: translateZ(0);
            -ms-transform: translateZ(0);
            -o-transform: translateZ(0);
            transform: translateZ(0)
        }

        .msgbox-toast>.content {
            display: inline-block;
            height: 100%;
            padding: 0 .1rem;
            white-space: nowrap;
            color: #fff;
            border-radius: .02rem;
            background-color: rgba(0,0,0,.8);
            -webkit-box-shadow: 0 0 .02rem rgba(0,0,0,.9);
            -moz-box-shadow: 0 0 .02rem rgba(0,0,0,.9);
            box-shadow: 0 0 .02rem rgba(0,0,0,.9)
        }
/*公用弹窗end*/

		.left{
            float: left;
        }
        .right{
            float: right;
        }


		/*底部样式*/
		.icon-foot{
			width: 0.24rem;
			height: 0.24rem;
			display: block;
			margin: 0 auto;
			margin-top: 0.03rem;
		}
			
			
		.icon_index{
			background: url(/static/tab_icon_fanli@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.icon_circle{
			background: url(/static/tab_icon_circle@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.icon_mine{
			background: url(/static/tab_icon_mine@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.icon_index_show{
			background: url(/static/tab_icon_fanli_selected@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.icon_circle_show{
			background: url(/static/tab_icon_circle_selected@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.icon_mine_show{
			background: url(/static/tab_icon_mine_selected@3x.png) no-repeat;
			background-size: 100% 100%;
		}	
		.colorR{
            color: #cd4a47;
        }
        .colorG{
            color:#33d37e;
        }
        .view-bottom{
            padding: .25rem .2rem;
            color: #d8d8d8;
            text-align: center;
        }

		.aticle_content img{
			width: 100%;
			display: block;
		}

`
    } < /style>)
