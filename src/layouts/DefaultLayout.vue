<script setup>
import { onMounted, computed } from "vue";
import { usePersonStore } from "@/stores/personStore";
import { useUserTypeStore } from "@/stores/userStore";
import VHeader from '@/components/VHeader.vue';
import Newsletter from "@/components/Newsletter.vue";
const personStore = usePersonStore();
const userStore = useUserTypeStore();

const userType = computed(() => userStore.userType);

onMounted(() => {
    personStore.fetchData();
});
</script>

<!-- Default Layout -->
<template>
    <VHeader :class="userType === 'premium' ? 'premium' : 'navbar-light'">
    </VHeader>
    <RouterView></RouterView>
    <Newsletter></Newsletter>
</template>
<style scoped>
.premium {
    background-color: rgb(226, 192, 82);
}
</style>
