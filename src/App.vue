<template>
    <div class="app">
        <el-menu theme="dark" :default-active="activeMenuIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
                <router-link to="/">数据管理</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/criteria">条件录入</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link to="/crawler">数据爬取</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link to="/dict">字典管理</router-link>
            </el-menu-item>
            <el-submenu index="5">
                <template slot="title">其他页面</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
                <el-menu-item index="5-3">选项3</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="main">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: mapGetters([
            'activeMenuIndex'
        ])
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import './asset/reset.scss';
    @import './asset/global.scss';

    .app {
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        overflow: auto;
        font-weight: 400;
        -webkit-font-smoothing: antialiased
    }

    .el-menu {
        z-index: 100
    }

    .main {
        margin: 15px
    }

    .is-leaf {
        .cell {
            padding: 0 !important;
            text-align: center
        }
    }

    .slide-fade-enter-active {
        transition: all .5s cubic-bezier(1, 0, 1, 1)
    }

    .slide-fade-leave-active {
        transition: all .3s ease
    }

    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0
    }
</style>