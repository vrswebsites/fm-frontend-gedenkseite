<script setup>
import { ref, watch, onMounted } from "vue";
import { usePersonStore } from "@/stores/personStore";
import { useRouter, useRoute } from "vue-router";
import ResponsiveImages from "@/components/ResponsiveImage.vue";

const personStore = usePersonStore();
const emit = defineEmits(["tabChanged"]);

const router = useRouter();
const route = useRoute();

const tabs = [
	{
		label: "Start",
		key: "start",
		content: "Basic information about the person",
	},
	{
		label: "Obituaries",
		key: "obituaries",
		content:
			personStore.selectedPersonDetails?.obituaries ||
			"No obituaries available.",
	},
	{
		label: "Video Obituaries",
		key: "video-obituaries",
		content: personStore.selectedPersonDetails?.videoObituaries || [],
	},
	{
		label: "Candles",
		key: "candles",
		content: personStore.selectedPersonDetails?.candles || [],
	},
	{
		label: "Condolences",
		key: "condolences",
		content: personStore.selectedPersonDetails?.condolences || [],
	},
];

const selectedTab = ref(route.params.tab || "start");

onMounted(() => {
	if (route.params.tab && route.params.tab !== "start") {
		router.replace(
			`/person/${route.params.id}/${route.params.givenName}/${route.params.tab}`
		);
	}
});

const selectTab = (key) => {
	selectedTab.value = key;
	const url =
		key === "start"
			? `/person/${route.params.id}/${route.params.givenName}`
			: `/person/${route.params.id}/${route.params.givenName}/${key}`;

	router.replace(url);
	emit("tabChanged", key === "start");
};

watch(
	() => route.params.tab,
	(newTab) => {
		if (tabs.some((tab) => tab.key === newTab)) {
			selectedTab.value = newTab;
		} else {
			selectedTab.value = "start";
		}
	}
);

</script>

<template>
	<!-- Navigation Bar -->
	<nav class="navbar">
		<ul class="navbar__list">
			<li class="navbar__list__item" v-for="(tab, index) in tabs" :key="index" @click="selectTab(tab.key)"
				:class="{ active: selectedTab === tab.key }">
				{{ tab.label }}
			</li>
		</ul>
	</nav>

	<!-- Tab Content -->
	<div class="tab-content">
		<!-- Obituaries Tab -->
		<div v-if="selectedTab === 'obituaries'">
			<h3>Obituaries</h3>
			<h4> {{ tabs[1].content.title }} </h4>
			<p>{{ tabs[1].content.description }}</p>
			<ResponsiveImages :sizes="tabs[1].content.sizes"></ResponsiveImages>
		</div>

		<!-- Video Obituaries Tab -->
		<div v-if="selectedTab === 'video-obituaries'">
			<h3>Video Obituaries</h3>
			<template v-if="tabs[2].content.length">
				<video v-for="(video, index) in tabs[2].content" :key="index" width="400" controls>
					<source :src="video.contentUrl" type="video/mp4" />
				</video>
			</template>
			<p v-else>No video Obituaries available.</p>
		</div>

		<!-- Candles Tab -->
		<div v-if="selectedTab === 'candles'">
			<h3>Candles</h3>
			<div v-if="tabs[3].content && tabs[3].content.length">
				<ul>
					<li v-for="(candleGroup, index) in tabs[3].content" :key="index">
						<p><strong>Candle Count:</strong> {{ candleGroup.candleCount }}</p>
						<ul>
							<li v-for="(candle, candleIndex) in candleGroup.candles" :key="candle.mediaID">
								<img :src="candle.mediaUrl" alt="Candle" />
								<p>
									{{ candle.content }} -
									<strong>{{ candle.author }}</strong> ({{ candle.date }} -
									{{ candle.time }})
								</p>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<p v-else>No candles available.</p>
		</div>

		<!-- Condolences Tab -->
		<div v-if="selectedTab === 'condolences'">
			<h3>Condolences</h3>
			<ul v-if="tabs[4].content.length">
				<li v-for="(condolenceGroup, index) in tabs[4].content" :key="index">
					<p>
						<strong>Condolence Count:</strong>
						{{ condolenceGroup.condolenceCount }}
					</p>
					<ul>
						<li v-for="(message, msgIndex) in condolenceGroup.condolences" :key="msgIndex">
							<p>
								<strong>{{ message.author }}</strong> ({{ message.date }} -
								{{ message.time }}): {{ message.content }}
							</p>
						</li>
					</ul>
				</li>
			</ul>
			<p v-else>No condolences available.</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.navbar {
	display: flex;
	align-items: center;
	background-color: #0055a5;
	color: white;
	padding: 0;

	&__list {
		list-style: none;
		display: flex;
		padding: 0;
		margin: 0;
		flex-grow: 1;
	}

	&__list__item {
		padding: 1rem 2rem;
		cursor: pointer;
		font-size: 1.2rem;
		font-weight: bold;

		&.active {
			background-color: rgba(255, 255, 255, 0.2);
		}
	}
}

.tab-content {
	padding: 1rem;
	background-color: #f4f4f4;
}
</style>
