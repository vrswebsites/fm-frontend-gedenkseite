<script setup>
import { useUserTypeStore } from "@/stores/userStore";

const userStore = useUserTypeStore();

const setPremium = () => {
    userStore.setUserType("premium");
};

const setNormal = () => {
    userStore.setUserType("normal");
};
</script>

<template>
    <div>
        <h1>Admin Panel</h1>
        <button @click="setPremium">Set premium</button>
        <button @click="setNormal">Set Normal</button>
        <p>Current User Type: {{ userStore.userType }}</p>
    </div>
    <router-view></router-view>
</template>
