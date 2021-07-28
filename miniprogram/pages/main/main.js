// miniprogram/pages/index/main.js
import tipsData from '../../data.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        title: tipsData.titles[0],
        content: tipsData.contents[0]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  jumpToPage: function (e) {
    var urlStr = "/pages/page2/page2"
    var curDays = wx.getStorageSync('days')
    if (curDays % 2 == 0) {
      urlStr = "/pages/page2/page2"
    } else {
      urlStr = "/pages/test/test"
    }
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
})