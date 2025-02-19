<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
    sizes: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const selectedSrc = ref("");

const updateImage = () => {
    console.log("called");

    if (!props.sizes.length || !props.sizes[0]) return;

    const images = props.sizes[0];
    const width = window.innerWidth;
    console.log(width);
    if (width < 512) {
        selectedSrc.value = images["256w"]?.path || "";
    } else if (width >= 512 && width < 1024) {
        selectedSrc.value = images["512w"]?.path || "";
    } else {
        selectedSrc.value = images["1024w"]?.path || "";
    }
};

watch(
    () => props.sizes,
    () => updateImage(),
    { immediate: true }
);

const resizeHandler = () => {
    updateImage();
};

onMounted(() => {
    updateImage();
    window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
    window.removeEventListener("resize", resizeHandler);
});
</script>

<template>
    <img v-if="selectedSrc" :src="selectedSrc" alt="Responsive Image" />
    <p v-else>No image available</p>
</template>
