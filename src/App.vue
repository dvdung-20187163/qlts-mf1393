<template>
  <div id="container">
    <the-navbar></the-navbar> 
    <div id="main">
      <the-header></the-header>
      <the-content></the-content>
    </div>

  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheNavbar from './components/layout/TheNavbar.vue';
import TheContent from './components/layout/TheContent.vue';
export default {
  name: 'App',
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
}
}
</script>

<style>
#app {
    margin: 0;
    padding: 0;
    font-family: MISA;
    font-size: 13px;
    width: 100vw;
    height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@font-face {
  font-family: MISA;
  src: url('./assets/font/roboto/Roboto-Regular.ttf');
}
#container {
  display: flex;
  
}
#main {
    display: flex;
    height: 100vh;
    width: 100%;
    flex-direction: column;
}
</style>