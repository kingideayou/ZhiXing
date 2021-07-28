import data from '/data.js'﻿

"use strict";
App({
    globalData: {},
    onLaunch: function () {
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.login({
            success: function (res) {
                console.log("===========>" + res.code);
                console.log("===========>" + res);
            },
            fail: function() {
                console.log("===========>>>> " + res.code);
            }
        });

        console.log("00000000000000 ---> " + data.titles)

        var date = new Date();
        var dateStr = date.toLocaleDateString()
        console.log("日期：" + dateStr)
        var hour = date.getHours();
        console.log("小时：" + hour)

        if (hour > 20) {
            console.log("晚上")
        } else {
            console.log("日间")
        }

        var value = 0;
        var lastStartDay = 0;
        try {
            value = wx.getStorageSync('days')
            lastStartDay = wx.getStorageSync('lastStartDay')
            console.log("value :" + value)
            console.log("lastStartDay :" + lastStartDay)
        } catch (e) {
        }
        
        try {
            if (lastStartDay != dateStr) {
                wx.setStorageSync('days', parseInt(value, 10) + 1)
                wx.setStorageSync('lastStartDay', dateStr)
            } else {
                console.log("同一天启动")
            }
        } catch (e) {
        }


        // wx.setNavigationBarColor({
        //   backgroundColor: '#fffff',
        //   frontColor: '#eeeeee',
        // })

        // wx.setBackgroundColor({
        //     backgroundColorTop: '#000000', // 顶部窗口的背景色为白色
        //     backgroundColorBottom: '#000000', // 底部窗口的背景色为白色
        // })

        // wx.setTabBarStyle({
        //     color: '#FF0000',
        //     selectedColor: '#00FF00',
        //     backgroundColor: '#0000FF',
        //     borderStyle: 'white'
        //   })
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxHQUFHLENBQWE7SUFDZCxVQUFVLEVBQUUsRUFBRTtJQUNkLFFBQVE7UUFFTixJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ3hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRy9CLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsVUFBQSxHQUFHO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRXZCLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7fSxcbiAgb25MYXVuY2goKSB7XG4gICAgLy8g5bGV56S65pys5Zyw5a2Y5YKo6IO95YqbXG4gICAgY29uc3QgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cbiAgICBsb2dzLnVuc2hpZnQoRGF0ZS5ub3coKSlcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9ncycsIGxvZ3MpXG5cbiAgICAvLyDnmbvlvZVcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMuY29kZSlcbiAgICAgICAgLy8g5Y+R6YCBIHJlcy5jb2RlIOWIsOWQjuWPsOaNouWPliBvcGVuSWQsIHNlc3Npb25LZXksIHVuaW9uSWRcbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcbn0pIl19