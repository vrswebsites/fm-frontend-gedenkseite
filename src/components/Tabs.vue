<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const emit = defineEmits(["tabChanged"]);
const stickyTrigger = ref(null);
const router = useRouter();
const route = useRoute();

const tabList = [
	{ label: "Start", key: "start" },
	{ label: "Obituaries", key: "obituaries" },
	{ label: "Video Obituaries", key: "video-obituaries" },
	{ label: "Candles", key: "candles" },
	{ label: "Condolences", key: "condolences" },
];

const isNavbarSticky = ref(false);
const selectedTab = ref(route.params.tab || "start");
let observer = null;

const buildTabUrl = (key) => {
	return key === "start"
		? `/person/${route.params.id}/${route.params.givenName}`
		: `/person/${route.params.id}/${route.params.givenName}/${key}`;
};

const handleTabSelection = (key) => {
	selectedTab.value = key;
	const url = buildTabUrl(key);
	router.replace(url);
	emit("tabChanged", key === "start");
};

const isTabValid = (newTab) => tabList.some((tab) => tab.key === newTab);

watch(() => route.params.tab, (newTab) => {
	selectedTab.value = isTabValid(newTab) ? newTab : "start";
});

onMounted(() => {
	observer = new IntersectionObserver(
		([entry]) => {
			isNavbarSticky.value = !entry.isIntersecting;
		},
		{ threshold: 0 }
	);
	if (stickyTrigger.value) {
		observer.observe(stickyTrigger.value);
	}
});

onUnmounted(() => {
	if (observer) observer.disconnect();
});
</script>

<template>
	<div ref="stickyTrigger"></div>
	<!-- Navigation Bar -->
	<nav class="navbar" :class="{ 'navbar--sticky': isNavbarSticky }">
		<ul class="navbar__list">
			<li v-for="(tab, index) in tabList" :key="index" class="navbar__item" @click="handleTabSelection(tab.key)"
				:class="{ active: selectedTab === tab.key }" tabindex="0">
				{{ tab.label }}
			</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
.navbar {
	display: flex;
	align-items: center;
	background-color: var(--primary-color);
	color: var(--primary-color-shade-3);
	padding: 0;
	border-radius: 1rem;
	width: calc(100% - 2rem);
	max-width: 1200px;
	position: relative;
	transition: all 0.3s ease;
	will-change: transform;

	&__list {
		list-style: none;
		display: flex;
		padding: 0;
		margin: 0;
		flex-grow: 1;
		overflow-x: auto;
		scroll-behavior: smooth;
		white-space: nowrap;
	}

	&__item {
		padding: 1rem;
		cursor: pointer;
		font-size: 1.2rem;
		font-weight: bold;

		&.active {
			background-color: var(--primary-color-shade-1);
			border-radius: 1rem;
		}

		@media (min-width: 768px) {
			padding: 1rem 2rem;
		}
	}

	&--sticky {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		animation: slideDown 0.3s ease-in-out;
	}
}

@keyframes slideDown {
	from {
		transform: translateY(-100%);
	}

	to {
		transform: translateY(0);
	}
}
</style>
