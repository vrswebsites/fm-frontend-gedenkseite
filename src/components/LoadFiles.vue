<template>
    <img src="../assets/logo.svg" height="100px" width="100px" />
    <img src="../assets/tiny-vue-logo.png" />
    <div class="loading">
        <h1>Internal and External Files Loading</h1>
        <h2>CSS</h2>
        <h2>JavaScript</h2>
        <p>Images less then 4kb will be generate a blob file</p>
    </div>
</template>
<!-- <style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
</style> -->


<script setup>
import { onMounted } from "vue";
import { hello } from '../assets/js/demo.js';
hello('Vite User');

onMounted(() => {
    const script = document.createElement("script");
    script.src = "https://cdns.symplr.de/trauer.de/trauer.js";
    script.onload = () => {
        console.log("Loaded Dynamically:");
    };
    document.body.appendChild(script);
});
</script>
