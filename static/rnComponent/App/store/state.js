export default {
    showSharePop: false,    //分享页的展开与关闭，默认是false
    isOpen: false,    //右边的侧边栏是否显示
    isOpenLeft: false,    //左边的侧边栏是否显示
    direction: false,
    collections: [],
    result: {
        title: '',      //文章的标题
        author: '',     //文章的作者
        total: '',      //文章的字数
        listContent: [],    //文章的内容,
        datetime: '',    //请求当前页文章的具体时间，同时也返回前一天与后一天的时间,
    }
}