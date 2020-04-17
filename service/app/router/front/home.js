module.exports = app => {
    const { router, controller } = app;
    router.get('/front/getArticleList', controller.front.home.getArticleList);
    router.get('/front/getArticleById/:id', controller.front.home.getArticleById);
    router.get('/front/getNavList', controller.front.home.getNavList);
    router.get('/front/getTypeList', controller.front.home.getTypeList);
    router.get('/front/getArticBylistId/:id', controller.front.home.getArticBylistId);
  
  };
  