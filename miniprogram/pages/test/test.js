// miniprogram/pages/test/test.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theme: "man",
    htmlText: `
    <body>
        <div class="container">
            <article>
                <div class="img-wrap">
                    <img class="training-img" src="../../img/18.png">
                </div>
                <ul class="training-list">
                    <li>
                        <h1><i class="list-style"></i>动作说明</h1>
                        <p>
                            1. 坐在床上，抻直右腿，左脚掌抵住右腿内侧
                            <br/>
                            2. 身体向右腿倾斜，拉伸韧带，保持30秒
                            <br/>
                            3. 换边再做一次
                        </p>
                    </li>
                    <li>
                        <h1><i class="list-style"></i>动作目的</h1>
                        <p>
                            1. · 增加身体柔软度
                            <br/>
                            2. · 缓解臀部、背部疼痛
                        </p>
                    </li>
                </ul>
            </article>
        </div>   
        <script type="text/javascript">
        </script>
    </body>`
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    this.setData({
        theme: "woman"
    });

    // wx.setNavigationBarColor({
    //   backgroundColor: '#f9c813',
    //   frontColor: '#000000',
    // })

    // wx.setTabBarStyle({
    //   backgroundColor: '#f9c813',
    // })

    // wx.setBackgroundColor({
    //   backgroundColor: '#333333',
    // })

    var html = `
    <body>
        <div class="container">
            <article>
                <ul class="training-list">
                    <li>
                        <h1><i class="list-style"></i>动作说明</h1>
                        <p>
                            1. 坐在床上，抻直右腿，左脚掌抵住右腿内侧
                            <br/>
                            2. 身体向右腿倾斜，拉伸韧带，保持30秒
                            <br/>
                            3. 换边再做一次
                        </p>
                    </li>
                    <li>
                        <h1><i class="list-style"></i>动作目的</h1>
                        <p>
                            1. · 增加身体柔软度
                            <br/>
                            2. · 缓解臀部、背部疼痛
                        </p>
                    </li>
                </ul>
            </article>
        </div>   
        <script type="text/javascript">
        </script>
    </body>`;
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

  }
})