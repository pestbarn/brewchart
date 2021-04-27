<template>
    <div id="app">
        <header v-if="$route.path === '/'">
            <ul>
                <li>
                    <router-link to="/bottles">
                        Bottle counter
                    </router-link>
                </li>
            </ul>
        </header>

        <img src="assets/loading.svg" id="loading" ref="loading">

        <div class="main" ref="main">
            <keep-alive>
                <router-view :key="$route.params.slug" ref="routerView"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import 'prefixfree'

export default {
    name: 'App',
    metaInfo: {
        titleTemplate: (titleChunk) => {
            return titleChunk ? `${titleChunk} - Brewchart` : 'Brewchart'
        }
    }
}
</script>
