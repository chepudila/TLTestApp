<template>
  <div id="app">
    <h1>{{title}}</h1>
    <div>
      <router-link to="/" custom v-slot="{ navigate, isExactActive }">
        <button v-bind:class="['nav-button', isExactActive && 'nav-button_active']" @click="navigate" @keypress.enter="navigate" role="link">Main</button>
      </router-link>
      <router-link to="/table" custom v-slot="{ navigate, isExactActive }">
        <button v-bind:class="['nav-button', isExactActive && 'nav-button_active']"  @click="navigate" @keypress.enter="navigate" role="link">Table</button>
      </router-link>
    </div>
    <router-view v-bind:class="'router-view'"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        title: "TestApp for Traffic Light",
      }
    }
  }
</script>

<style lang="scss">
  $link_button_color: #8B0000;
  $link_button_text_color: #FFFFFF;
  $link_button_active_text_color: #FFE4B5;
  $link_button_hover_color: transparent;
  $link_button_hover_text_color: #8B0000;

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-image: url('/src/assets/background.jpg');
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    max-height: 100%;
    padding: 100px 10px;

    h1 {
      margin-bottom: 20px;
      font-size: 40px;
    }

    .nav-button {
      margin: 0 10px;
      border: 2px solid $link_button_color;
      background-color: $link_button_color;
      color: $link_button_text_color;
      border-radius: 5px;
      padding: 5px 10px;
      transition: 0.5s;
      font-size: 25px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 0 10px 5px rgba(0,0,0,0.9);

      &:hover {
        background-color: $link_button_hover_color;
        color: $link_button_hover_text_color;
      }

      &:focus {
        outline: none;
      }
    }

    .nav-button_active {
      color: $link_button_active_text_color;
    }

    .router-view {
      margin-top: 50px;
    }

  }

  @media (max-width: 768px) {
    #app {
      padding: 20px 10px;
    }
  }
</style>
