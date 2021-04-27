<template>
    <article class="home">
        Home
    </article>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        const loading = this.$findRefByName('loading')
        if (!loading.hidden) loading.hidden = true
    },
    methods: {
        toTop() {
            window.scrollTo(0, 0)
        }
    }
}
</script>
