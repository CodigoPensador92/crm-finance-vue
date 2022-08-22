export default {
    bind(el, {value}) {
        window.M.Tooltip.init(el, {html: value})
    },
    unbind(el) {
        var instance = window.M.Tooltip.getInstance(el)
        
        if(instance && instance.destroy){
            instance.destroy()
        }
       
    }
}