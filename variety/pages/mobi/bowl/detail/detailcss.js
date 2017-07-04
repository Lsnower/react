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


.changeListBox {
    width: 100%;
    
}
.changeListHeader {
    width: 100%;
    height: .44rem;
    background: #fff;
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
    width: .6rem;
    height: 100%;
    line-height: .44rem;
    box-sizing: border-box;
    font-size: .15rem;
    text-align: center;
    color:#222222;
}
.blackLine {
    border-bottom:.02rem solid #222;
}
.detailListContain {
    width: 100%;
}



.monthNum {
    width: 100%;
    height: .3rem;
    box-sizing: border-box;
    padding-left: .14rem;
}
.monthNum>p {
    width: 100%;
    height: .3rem;
    line-height: .3rem;
    font-size: .12rem;
    color: #999999;
}





ul,li {
    list-style-type: none;
}
.listContain {
    width: 100%;
    height: .6rem;
    background: #fff;
    box-sizing: border-box;
    padding: .12rem 0 0 .14rem;
}
.listContain>div {
    width: 100%;
    height: 100%;
    color: #999999;
    box-sizing: border-box;
    padding: 0 .14rem 0 0;
    overflow: hidden;
    border-bottom: .01rem solid #e7e7e8;
}
.listContain>div>dl {
    width: .8rem;
    height: 100%;
    float:left;
    text-align:center;
}
.listContain>div>dl>dt {
    width: .4rem;
    height: .19rem;
    font-size: .15rem;

}
.listContain>div>dl>dd {
    width: .4rem;
    height: .18rem;
    font-size: .13rem;
}

.listContain>div>p {
    width:1rem;
    height: 100%;
    line-height: .37rem;
    font-size: .13rem;
    text-align: left;
    float:left;
}

.listContain>div>h2 {
    width: 1rem;
    height: 100%;
    line-height: .37rem;
    font-size: .15rem;
    color:#222222;
    font-weight: 100;
    text-align: right;
    float:right;
}







`
    } < /style>)