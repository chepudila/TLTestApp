<template>
    <div id="NotFound">
        <h1 v-text="error"></h1>
    </div>
</template>>

<script>
    export default {
        name: 'NotFound',
        data () {
            return {
                error: 'Page not found'
            }
        }
    }
</script>

<style lang="scss" src="./NotFound.scss" scoped></style>