export default {
    install(Vue, options) {
        Vue.prototype.$message = function(html) {
            window.M.toast({html})
            console.log(options)
        }
        Vue.prototype.$error = function(html) {
            window.M.toast({html: `[Ошибка]: ${html}`})
        }
    }    
}