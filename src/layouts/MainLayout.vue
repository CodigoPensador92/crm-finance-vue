<template>
<div>
<LoaderComp v-if="loading"/>
    <div class="app-main-layout" v-else>

    <NavBar @click="isOpen = !isOpen"/>

    <SideBar v-model="isOpen" :key="locale"/>

        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">
                <router-view/>
            </div>
        </main>

        <div class="fixed-action-btn" :key="locale + '1'">
            <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'CreateNewRecord'">
            <i class="large material-icons">add</i>
            </router-link>
      </div>
    </div>
</div>    
</template>

<script>
import NavBar from '@/components/app/NavBar.vue'
import SideBar from '@/components/app/SideBar.vue'
import LoaderComp from '@/components/app/LoaderComp.vue'
import messages from '@/utils/messages'

export default {
    name: 'main-layout',
    data: () => ({
        isOpen: true,
        loading: true
    }),
    async mounted() {
        if(!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        this.loading = false
    },
    components: {
    NavBar,
    SideBar,
    LoaderComp
    },
    computed: {
        error() {
        return this.$store.getters.error
        },
        locale() {
            return this.$store.getters.info.locale
        }
    },
    watch: {
        error(fbError) {
        this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    }
}
</script>