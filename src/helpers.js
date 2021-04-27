export default {
    install(Vue) {
        Vue.prototype.$findRefByName = function(refName) {
            let obj = this
            while (obj) {
                if (obj.$refs[refName]) {
                    return obj.$refs[refName]
                }
                obj = obj.$parent
            }
            return undefined
        }

        Vue.prototype.$formatDate = function(date) {
            const year = parseInt(String(date).slice(0, 4))
            const month = parseInt(String(date).slice(4, 6))
            const day = parseInt(String(date).slice(6, 8))

            return new Date(`${year}-${month}-${day}`).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }
    }
}
