<script setup>
import { ref, watch, onMounted } from "vue";

const lightness = ref(10);
const hue = ref(120);
const updateTheme = () => {
    document.documentElement.style.setProperty("--color-primary", `oklch(${lightness.value}% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-50", `oklch(95% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-100", `oklch(85% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-200", `oklch(75% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-300", `oklch(65% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-400", `oklch(55% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-500", `oklch(${lightness.value}% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-600", `oklch(40% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-700", `oklch(30% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-800", `oklch(20% 0.3 ${hue.value})`);
    document.documentElement.style.setProperty("--color-primary-900", `oklch(10% 0.3 ${hue.value})`);

    localStorage.setItem("theme", JSON.stringify({ lightness: lightness.value, hue: hue.value }));
}

watch([lightness, hue], updateTheme);

onMounted(() => {
    const saveTheme = JSON.parse(localStorage.getItem("theme"));
    if (saveTheme) {
        lightness.value = saveTheme.lightness;
        hue.value = saveTheme.hue;
    }
    updateTheme();
})
</script>
<template>

    <div class="p-4 bg-[var(--color-primary-500)] text-white rounded-lg shadow-lg">
        <h1>Theme Customizer</h1>
        <input type="range" v-model="hue" min="0" max="360" class="w-full">
        <input type="range" v-model="lightness" min="10" max="90" class="w-full">
        <p class="mt-4"> Current Theme <strong> Hue {{ hue }}</strong>,<strong> lightness {{ lightness }}</strong> </p>
    </div>
</template>