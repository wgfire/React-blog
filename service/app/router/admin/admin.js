module.exports = app =>{
    const {router,controller} = app
    router.get('/admin/checkLogin',controller.admin.main.checkLogin)
}

