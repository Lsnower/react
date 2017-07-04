import React, {
    Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../mine_style.js';
class Prolist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            sex: null,
            age:new Date().getFullYear()-1990,
            land:null,
            asy: false,
            ageasy: false,
            landasy:false,
            userimg:null,
            username:null,
            dwland:'点击重新获取位置'
        }
        this.showtotal = this.showtotal.bind(this);
        this.dingwei = this.dingwei.bind(this);
        this.dingweiss = this.dingweiss.bind(this);
    }
    componentWillMount(){
        var t = this;
        setTimeout(function(){
            var selectContactDom = $(t.refs.select_contact);
            var showContactDom = $(t.refs.show_contact);
            console.log(t.refs)
            var contactProvinceCodeDom = $(t.refs.contact_province_code);
            var contactCityCodeDom = $(t.refs.contact_city_code);
            selectContactDom.on('click', function () {
                console.log(111)
                var sccode = showContactDom.attr('data-city-code');
                var scname = showContactDom.attr('data-city-name');

                var oneLevelId = showContactDom.attr('data-province-code');
                var twoLevelId = showContactDom.attr('data-city-code');
                var threeLevelId = showContactDom.attr('data-district-code');
                var iosSelect = new IosSelect(3, 
                    [iosProvinces, iosCitys, iosCountys],
                    {
                        title: '地址选择',
                        itemHeight: 35,
                        relation: [1, 1, 0, 0],
                        oneLevelId: oneLevelId,
                        twoLevelId: twoLevelId,
                        threeLevelId: threeLevelId,
                        callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                            contactProvinceCodeDom.val(selectOneObj.id); 
                            contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                            contactCityCodeDom.val(selectTwoObj.id);
                            contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                            showContactDom.attr('data-province-code', selectOneObj.id);
                            showContactDom.attr('data-city-code', selectTwoObj.id);
                            showContactDom.attr('data-district-code', selectThreeObj.id);
                            showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                        }
                });
            });
        },100)
        
    }
    componentDidMount() {
        var t = this;
        setTimeout(this.dingwei,100);
    }
    dingweiss(){
        var that = this;
        that.dingwei();
        $.ajax({
            url:'/user/user/updateUser.do',
            data:{land:that.state.dwland},
                type:'post',
                success:function(d){
                    if(d.code == 200){
                        Router.push({
                            pathname: '/mobi/user/profile'
                        })          
                    }
                }
            })
    }
    dingwei(){
        var that = this;
        var geolocation = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
            geolocation.getCurrentPosition(function(e){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var pt = e.point;
                    geoc.getLocation(pt, function(rs){
                        var addComp = rs.addressComponents;
                        var myland =addComp.province+'-'+ addComp.city+'-'+ addComp.district;
                        that.setState({
                            dwland:myland
                        })
                    });
                }
                else {
                    that.setState({
                        dwland:'点击重新获取位置'
                    })
                }
          })
    }
    showtotal(){
       var that = this;
        $(that.refs.success_mask).show();
        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
			$(that.refs.success_mask).animate({'opacity':0},500,function(){
				$(that.refs.success_mask).hide();
                                
			})					
		}) 
    }
    render() {
        let a,b,c,d,e,f;
        return (
            <section className="page-main main-mine-profile main-profile">
                <p className="landtipmsg">定位到当前位置</p>
                <ul className="page-mainC">
                    <li onClick={this.dingweiss}>
                        <div className="page-content dingwei">
                            <span></span>
                        </div>
                    </li>
                </ul>
                <p className="landtipmsg">手动选择地区</p>
                <ul className="page-mainC">
                    
                    <li>
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }}>
                                <span style={{'fontSize':'0.15rem','color':'#222'}}>选择地区</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" id="seaT"></span>
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="form-item item-line" ref="select_contact">                 
                    <label>省、市</label>                 
                    <div className="pc-box">                     
                        <input type="hidden" name="contact_province_code" data-id="0001" ref="contact_province_code" value="" data-province-name="" />                     
                        <input type="hidden" name="contact_city_code" ref="contact_city_code" value="" data-city-name="" /><span data-city-code="510100" data-province-code="510000" data-district-code="510105" ref="show_contact">四川省 成都市 青羊区</span> 
                    </div>             
                </div> 
                <style jsx global>{`
                    .page-mainC li{
                        height:0.45rem;
                        line-height:0.45rem;
                    }
                    .landtipmsg{
                        font-size:0.14rem;
                        color:#999999;
                        text-indent:5%;
                        line-height:0.3rem;
                    }
                    .page-mainC{
                        margin-bottom:0;
                    }
                    .landtipmsg:nth-child(1){
                        margin-top:0.3rem;
                    }
                    .dingwei{
                        font-size:0.15rem;
                        color:#222;
                        background:url(../../../../static/mine/mine_data_geo@2x.png) no-repeat 0rem center;
                        text-indent:0.2rem;
                        background-size:0.15rem;
                        height:100%;
                    }
                `}</style>
            </section>
        )
    }
}



export default () => (
    <div>
        <Header_title text="地区"/>
        <div><Header text="地区" /></div>
        <Style/>
        <Prolist/>
        
    </div>
)