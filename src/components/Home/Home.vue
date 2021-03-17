<template>
    <div id="Home">
        <h2>{{title}}</h2>
        <p>{{message}}</p>
        <img src="/src/assets/logo.png" alt="logo">
    </div>
</template>>

<script>
    export default {
        name: 'Home',
        data () {
            return {
                title: 'Welcome to my TestApp!',
                message: 'Glad to see you!'
            }
        }
    }
</script>

<style lang="scss" src="./Home.scss" scoped></style>