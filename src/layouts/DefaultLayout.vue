<script setup>
import { onMounted, computed } from "vue";
import { usePersonStore } from "@/stores/personStore";
import { useUserTypeStore } from "@/stores/userStore";

const store = usePersonStore();
const userStore = useUserTypeStore();

const userType = computed(() => userStore.userType);

onMounted(() => {
    store.fetchData();
});
</script>

<!-- Default Layout -->
<template>
    <div :class="userType === 'premium' ? 'premium' : 'normal'">
        <p>User Type: {{ userType }}</p>
        <router-view></router-view>
    </div>

</template>
<style scoped>
.premium {
    background-color: rgb(226, 192, 82);
}

.normal {
    background-color: white;
}
</style>
