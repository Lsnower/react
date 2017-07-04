export default () => ( < style jsx global > {
        `
html {
    background: #e7e7e8;
    -webkit-text-size-adjust: none;
}
body {
    overflow-x: hidden;
    overflow-y: auto;
}
.container {
    width: 100%;
    height: 100%;
}
.headerBox {
    width: 100%;
    height: .8rem;
    margin-top: .08rem;
    display: -webkit-flex;
    display: flex;
}
.header {
    height: 100%;
    flex: 1;
    background: #fff;
    box-sizing: border-box;
    padding: .2rem 0 0 .14rem;
}
.blank {
    height: 100%;
    width: 1px;
}
.headerDL {
    height: .37rem;
    display: -webkit-flex;
    display: flex;
}
.headerDT {
    width: .37rem;
    height: .37rem;
}
.headerLeft {
    background: url(../../static/bowl/top_icon_vcoin@3x.png) no-repeat left top;
    background-size: 100% 100%;
}
.headerRight {
    background: url(../../static/bowl/top_icon_integration@3x.png) no-repeat left top;
    background-size: 100% 100%;
}


.headerDD {
    height: .37rem;
    flex: 1;
    box-sizing: border-box;
    padding-left: .08rem;
}
.numbers {
    height: .18rem;
    font-size: .15rem;
    line-height: .18rem;
    color:#222222;
    letter-spacing:0;
}
.goDetail {
    text-decoration: none;
    font-size:.1rem;
    -webkit-transform:scale(0.8);
    -moz-transform:scale(0.8);
    -o-transform:scale(0.8);
    transform:scale(0.8);
    color:#999999;
}
.changeRule {
    height: .42rem;
    width: 100%;
    box-sizing: border-box;
    padding-top: .13rem;
}
.goRules {
    text-decoration: none;
    display: block;
    overflow: hidden;
    width: .88rem;
    height: .16rem;
    line-height: .16rem;
    color:#999999;
    float: right;
}
.goRules span {
    display: inline-block;
    height: .16rem;
    font-size:.13rem;
    float: left;
    margin-right: .09rem;
}
.changeIcon {
    width: .16rem;
    height: .16rem;
    background: url(../../static/bowl/icon_rule2@3x.png) no-repeat left top;
    background-size: 100% 100%;
}

.changeListBox {
    width: 100%;
    background: #fff;
}
.changeListHeader {
    width: 100%;
    height: .44rem;
    display: -webkit-flex;
    display: flex;
    flex-flow: row;
}
.changeListHeader>div {
    height: 100%;
    flex: 1;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
}
.changeListHeader>div>a {
    text-decoration: none;
    display: box;
    width: .62rem;
    height: 100%;
    line-height: .44rem;
    box-sizing: border-box;
    font-size:.14rem;
    letter-spacing: .01rem;
    text-align: center;
    color:#222222;
}

.blackLine {
    border-bottom:.02rem solid #222;
}


.changeListContain {
    width: 100%;
}

ul,li {
    list-style-type: none;
}
.listContain {
    width: 100%;
    height: 100%;
}
.listContain>li {
    width: 100%;
    height: .6rem;
    box-sizing: border-box;
    padding: .18rem .14rem;
    border-top:1px solid #e7e7e8;
}
.listContain>li>dl {
    width: 40%;
    height: .24rem;
    box-sizing: border-box;
    padding: .04rem 0;
    display: -webkit-flex;
    display: flex;
    flex-flow: row;
    float:left;
}
.listContain>li>dl>dt {
    height: .15rem;
    width: .2rem;
    margin-right: .05rem;
    background: url(../../static/bowl/cell_icon_vcoin@3x.png) no-repeat left top;
    background-size: 100% 100%;

}

.listContain>li>dl>dt.imgJF {
    background: url(../../static/bowl/cell_icon_integration@3x.png) no-repeat left top;
    background-size: 100% 100%;

}

.listContain>li>dl>dd {
    height: .15rem;
    font-size: .13rem;
    color: #222;
}
.listContain>li>p {
    float:left;
    height: .24rem;
    line-height: .24rem;
    font-size:.12rem;
    color:#999999;
    text-align:left;
}

.listContain>li>a {
    text-decoration: none;
    display: block;
    width: .9rem;
    height: .24rem;
    line-height: .24rem;
    font-size: .13rem;
    color: #222;
    text-align: center;
    float:right;
    background: url(../../static/bowl/cell_btn_bg@3x.png) no-repeat left top;
    background-size: 100% 100%;
}













`
    } < /style>)