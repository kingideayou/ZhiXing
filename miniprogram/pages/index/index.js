"use strict";
import tipsDataMan from '../../data/data-man.js';
import tipsDataWoman from '../../data/data-woman.js';

import kegelDataMan from '../../data/kegel-man.js';
import kegelDataWoman from '../../data/kegel-woman.js';

import physicalDataMan from '../../data/physical-man.js';
import physicalDataWoman from '../../data/physical-woman.js';

var app = getApp();

Page({
    data: {
        motto: 'Hello World ~',
        userInfo: {},
        hasUserInfo: false,
        title: "",
        content: "",
        kegelTitle: "",
        physicalTitle: "",
        keepDays: 0,
        noGender: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: false//wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName')
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onLoad: function () {
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            });
        }

        var _this = this;
        var gender = wx.getStorageSync('gender');
        console.log("index.js === > gender = " + gender)
        if (gender != "") {
            _this.setData({
                noGender: false
            })
        } else {
            return
        }

        var days = wx.getStorageSync('days')

        if (days == '' || isNaN(days)) {
            days = 0;
        }

        this.setData({
            keepDays: days
        })

        var tipIndex = Math.floor((Math.random()*tipsDataMan.titles.length)+1) % tipsDataMan.titles.length;
        if (gender == '1') { // 男
            this.setData({
                title: tipsDataMan.titles[tipIndex],
                content: tipsDataMan.contents[tipIndex],
                kegelTitle: kegelDataMan.titles[days % kegelDataMan.titles.length],
                physicalTitle: physicalDataMan.titles[days % physicalDataMan.titles.length]
            })
        } else { // 女
            this.setData({
                title: tipsDataWoman.titles[tipIndex],
                content: tipsDataWoman.contents[tipIndex],
                kegelTitle: kegelDataWoman.titles[days % kegelDataWoman.titles.length],
                physicalTitle: physicalDataWoman.titles[days % physicalDataWoman.titles.length]
            })
        }  
        
    },
    onShow: function () {

        var gender = wx.getStorageSync('gender');
        // console.log("index.js === > gender = " + gender)
        if (gender == "") {
            return
        }

        var _this = this;

        var lastStartDay = wx.getStorageSync('lastStartDay')
        var date = new Date();
        var dateStr = date.toLocaleDateString()

        try {
            if (lastStartDay != dateStr) { // 不是同一日期，刷新所有数据
                wx.setStorageSync('lastStartDay', dateStr)
                
                var days = wx.getStorageSync('days')

                if (days == '' || isNaN(days)) {
                    days = 0;
                }

                var tipIndex = Math.floor((Math.random()*tipsDataMan.titles.length)+1) % tipsDataMan.titles.length;
                if (gender == '1') { // 男
                    _this.setData({
                        title: tipsDataMan.titles[tipIndex],
                        content: tipsDataMan.contents[tipIndex],
                        kegelTitle: kegelDataMan.titles[days % kegelDataMan.titles.length],
                        physicalTitle: physicalDataMan.titles[days % physicalDataMan.titles.length]
                    })
                } else { // 女
                    _this.setData({
                        title: tipsDataWoman.titles[tipIndex],
                        content: tipsDataWoman.contents[tipIndex],
                        kegelTitle: kegelDataWoman.titles[days % kegelDataWoman.titles.length],
                        physicalTitle: physicalDataWoman.titles[days % physicalDataWoman.titles.length]
                    })
                } 
            } else {// 是同一日期，只刷新 Tips
                var gender = wx.getStorageSync('gender');
                var tipIndex = Math.floor((Math.random()*tipsDataMan.titles.length)+1) % tipsDataMan.titles.length;
                if (gender == '1') { // 男
                    _this.setData({
                        title: tipsDataMan.titles[tipIndex],
                        content: tipsDataMan.contents[tipIndex],
                    })
                } else { // 女
                    _this.setData({
                        title: tipsDataWoman.titles[tipIndex],
                        content: tipsDataWoman.contents[tipIndex],
                    })
                }  
            }
        } catch (e) {
        }
        
    },
    getUserProfile: function () {
        var _this = this;
        wx.getUserProfile({
            desc: '展示用户信息',
            success: function (res) {
                console.log("222222222222222");
                console.log(res.userInfo.gender);
                _this.setData({
                    noGender: false
                })
                wx.setStorageSync('gender', res.userInfo.gender);
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
                _this.onLoad()
            }
        });
    },
    getUserInfo: function (e) {
        console.log(e);
        console.log("1111111111111");
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    jumpToKegelPage: function (e) {
        var urlStr = ""
        var days = wx.getStorageSync('days')

        if (days == '' || isNaN(days)) {
            days = 0;
        }

        var daysInt = 0;

        var gender = wx.getStorageSync('gender');

        if (gender == '1') {
            daysInt = (parseInt(days, 10) + 1) % kegelDataMan.titles.length
            urlStr = "/pages/man/kegel" + daysInt + "/kegel?title=" + kegelDataMan.titles[daysInt - 1]
        } else {
            daysInt = (parseInt(days, 10) + 1) % kegelDataWoman.titles.length
            urlStr = "/pages/woman/kegel" + daysInt + "/kegel?title=" + kegelDataWoman.titles[daysInt - 1]
        }

        console.log("urlStr : " + urlStr)
        
        wx.navigateTo({
            url: urlStr,
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function(data) {
                console.log(data)
              },
              someEvent: function(data) {
                console.log(data)
              }
            },
            success: function(res) {
                console.log("跳转 111111")
              // 通过eventChannel向被打开页面传送数据
            //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    },
    jumpToPhysicalPage: function (e) {

        var urlStr = ""
        var days = wx.getStorageSync('days')

        if (days == '' || isNaN(days)) {
            days = 0;
        }

        var daysInt = 0;

        var gender = wx.getStorageSync('gender');

        if (gender == '1') {
            daysInt = (parseInt(days, 10) + 1) % physicalDataMan.titles.length
            urlStr = "/pages/man/physic" + daysInt + "/physic?title=" + physicalDataMan.titles[daysInt - 1]
        } else {
            daysInt = (parseInt(days, 10) + 1) % physicalDataWoman.titles.length
            urlStr = "/pages/woman/physic" + daysInt + "/physic?title=" + physicalDataWoman.titles[daysInt - 1]
        }
        // var urlStr = "/pages/man/physic1/physic"
        // var curDays = wx.getStorageSync('days')
        wx.navigateTo({
            url: urlStr,
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function(data) {
                console.log(data)
              },
              someEvent: function(data) {
                console.log(data)
              }
            },
            success: function(res) {
                console.log("跳转 111111")
              // 通过eventChannel向被打开页面传送数据
            //   res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFjLENBQUE7QUFFaEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLGFBQWE7UUFDcEIsUUFBUSxFQUFFLEVBQUU7UUFDWixXQUFXLEVBQUUsS0FBSztRQUNsQixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztRQUNuRCxxQkFBcUIsRUFBRSxLQUFLO1FBQzVCLGVBQWUsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQztLQUN6RztJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELE1BQU07UUFFSixJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxxQkFBcUIsRUFBRSxJQUFJO2FBQzVCLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUNELGNBQWM7UUFBZCxpQkFZQztRQVZDLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDaEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsVUFBQyxHQUFHO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLEtBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO29CQUN0QixXQUFXLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFDRCxXQUFXLFlBQUMsQ0FBTTtRQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcDxJQXBwT3B0aW9uPigpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgbW90dG86ICdIZWxsbyBXb3JsZCcsXG4gICAgdXNlckluZm86IHt9LFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgY2FuSVVzZUdldFVzZXJQcm9maWxlOiBmYWxzZSxcbiAgICBjYW5JVXNlT3BlbkRhdGE6IHd4LmNhbklVc2UoJ29wZW4tZGF0YS50eXBlLnVzZXJBdmF0YXJVcmwnKSAmJiB3eC5jYW5JVXNlKCdvcGVuLWRhdGEudHlwZS51c2VyTmlja05hbWUnKSAvLyDlpoLpnIDlsJ3or5Xojrflj5bnlKjmiLfkv6Hmga/lj6/mlLnkuLpmYWxzZVxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYmluZFZpZXdUYXAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxuICAgIH0pXG4gIH0sXG4gIG9uTG9hZCgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHd4LmdldFVzZXJQcm9maWxlKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBjYW5JVXNlR2V0VXNlclByb2ZpbGU6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBnZXRVc2VyUHJvZmlsZSgpIHtcbiAgICAvLyDmjqjojZDkvb/nlKh3eC5nZXRVc2VyUHJvZmlsZeiOt+WPlueUqOaIt+S/oeaBr++8jOW8gOWPkeiAheavj+asoemAmui/h+ivpeaOpeWPo+iOt+WPlueUqOaIt+S4quS6uuS/oeaBr+Wdh+mcgOeUqOaIt+ehruiupO+8jOW8gOWPkeiAheWmpeWWhOS/neeuoeeUqOaIt+W/q+mAn+Whq+WGmeeahOWktOWDj+aYteensO+8jOmBv+WFjemHjeWkjeW8ueeql1xuICAgIHd4LmdldFVzZXJQcm9maWxlKHtcbiAgICAgIGRlc2M6ICflsZXnpLrnlKjmiLfkv6Hmga8nLCAvLyDlo7DmmI7ojrflj5bnlKjmiLfkuKrkurrkv6Hmga/lkI7nmoTnlKjpgJTvvIzlkI7nu63kvJrlsZXnpLrlnKjlvLnnqpfkuK3vvIzor7fosKjmhY7loavlhplcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICAvLyDkuI3mjqjojZDkvb/nlKhnZXRVc2VySW5mb+iOt+WPlueUqOaIt+S/oeaBr++8jOmihOiuoeiHqjIwMjHlubQ05pyIMTPml6XotbfvvIxnZXRVc2VySW5mb+WwhuS4jeWGjeW8ueWHuuW8ueeql++8jOW5tuebtOaOpei/lOWbnuWMv+WQjeeahOeUqOaIt+S4quS6uuS/oeaBr1xuICAgIGNvbnNvbGUubG9nKGUpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcbiAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXG4gICAgfSlcbiAgfVxufSlcbiJdfQ==