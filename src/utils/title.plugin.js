import localizeFilter from "@/filters/localize.filter"

export default {
    install(Vue) {
        Vue.prototype.$title = function(titleKey){
            const appName = 'Finances'
            return `${localizeFilter(titleKey)} | ${localizeFilter(appName)}`
        }
    }
}

   