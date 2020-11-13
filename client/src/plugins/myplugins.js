import { mapState, mapMutations } from 'vuex'

const myPlugins = {
    install(Vue) {
        Vue.mixin({
            data: () => ({
                api: process.env.VUE_APP_URL,
                systemname: process.env.System_Name,
            }),
            computed: {
                ...mapState([
                    'sObjLogs',
                    'sBlnDark',
                    'sBlnDrawer',
                    'sBlnSortByAsc',
                    'sStrColorBackground',
                    'sStrColorBubleSender',
                    'sStrColorBubleSelf',
                    'sStrColorAttachment',
                ])
            },
            methods: {
                ...mapMutations([
                    'CHANGE_sObjLogs',
                    'CHANGE_sBlnDark',
                    'CHANGE_sBlnDrawer',
                    'CHANGE_sBlnSortByAsc',
                    'CHANGE_sStrColorBackground',
                    'CHANGE_sStrColorBubleSender',
                    'CHANGE_sStrColorBubleSelf',
                    'CHANGE_sStrColorAttachment',
                ])
            }
        })
    }
}

export default myPlugins