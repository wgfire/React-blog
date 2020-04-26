

let servicePath = {
    getArticleList: 'getArticleList' ,  //  首页文章列表接口
    getArticleById: 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getNavList:"getNavList",//导航列表
    getTypeList:"getTypeList",// 文章分类信息
    getArticBylistId:"getArticBylistId/",// 根据类型id获得某个类型下的所有文章
    getMusicList:'getMusicList',
    addViewcount:'addViewcount/'
    
}
export default servicePath;