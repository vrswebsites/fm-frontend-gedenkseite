<script setup>
import ResponsiveImage from './ResponsiveImage.vue';

defineProps({
    personData: Object
});

const imageSources = [
    {
        "256w": { path: "https://trauer.merkur.de/smc/standard/header/themesite/site-1-header-5-xs.jpg" },
        "512w": { path: "https://trauer.merkur.de/smc/standard/header/themesite/site-1-header-5-md.jpg" },
        "1024w": { path: "https://trauer.merkur.de/smc/standard/header/themesite/site-1-header-5-xl.jpg" }
    }
];
</script>
<template>
    <div class="profile-banner">
        <ResponsiveImage class="profile-banner__background" :sizes="imageSources" />

        <div class="profile-banner__content">
            <div class="profile-banner__image-wrapper">
                <img :src="personData.image[0].contentUrl" :alt="personData.givenName || 'Profile Image'"
                    class="profile-banner__image" />
            </div>

            <div class="profile-banner__details">
                <h1 class="profile-banner__name">
                    {{ personData.givenName }} {{ personData.additionalName }} {{ personData.familyName }}
                </h1>
                <div class="profile-banner__dates">
                    <span>Birth Date: <strong>{{ personData.birthDate }}</strong></span>
                    <span>Death Date: <strong>{{ personData.deathDate }}</strong></span>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile-banner {
    position: relative;
    width: 100%;
    text-align: center;

    &__background {
        width: 100%;
        height: auto;
        display: block;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 1rem;
    }

    &__image-wrapper {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        border: 4px solid white;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        top: -6rem;

        @media (min-width: 768px) {
            width: 12.5rem;
            height: 12.5rem;
            top: -7.5rem;
        }
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .profile-banner__details {
        margin-top: -5rem;

        h1 {
            font-size: 2.5rem;
            font-weight: bold;
        }

        .profile-banner__dates {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
    }
}
</style>
