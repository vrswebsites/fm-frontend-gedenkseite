<script setup>
import { ref, defineEmits, computed, onMounted } from "vue";
import { usePersonStore } from "@/stores/personStore";

const store = usePersonStore();
const emit = defineEmits(["tabChanged"]);

const selectedTab = ref(0);

onMounted(() => {
	const savedTab = localStorage.getItem("selectedTab");
	if (savedTab !== null) {
		selectedTab.value = parseInt(savedTab);
	}
});

const tabs = computed(() => [
	{ label: "Start", content: "Basic information about the person" },
	{ label: "Obituaries", content: store.selectedPersonDetails?.obituaries?.description || "No obituaries available." },
	{ label: "Video Obituaries", content: store.selectedPersonDetails?.videoObituaries || [] },
	{ label: "Candles", content: store.selectedPersonDetails?.candles || [] },
	{ label: "Condolences", content: store.selectedPersonDetails?.condolences || [] }
]);

const selectTab = (index) => {
	selectedTab.value = index;
	localStorage.setItem("selectedTab", index);
	emit("tabChanged", index === 0);
};

const addCandle = () => {
	console.log("Add candle");
};

const updateCandle = () => {
	console.log("Update candle");
};

const removeCandle = () => {
	console.log("Remove candle");
};
</script>


<template>
	<!-- Navigation Bar -->
	<nav class="navbar">
		<ul class="nav__list">
			<li v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
				:class="{ active: selectedTab === index }">
				{{ tab.label }}
			</li>
		</ul>
	</nav>

	<!-- Tab Content -->
	<div class="tab-content">
		<!-- obituaries Tab -->
		<div v-if="selectedTab === 1">
			<h3>Obituaries</h3>
			<p>{{ tabs[1].content }}</p>
		</div>

		<!-- videoObituaries Tab -->
		<div v-if="selectedTab === 2">
			<h3>video Obituaries</h3>
			<template v-if="tabs[2].content.length">
				<video v-for="(video, index) in tabs[2].content" :key="index" width="400" controls>
					<source :src="video.contentUrl" type="video/mp4">
				</video>
			</template>
			<p v-else>No video Obituaries available.</p>
		</div>

		<!-- Candles Tab -->
		<div v-if="selectedTab === 3">
			<h3>Candles</h3>
			<div v-if="tabs[3].content && tabs[3].content.length">
				<ul>
					<li v-for="(candleGroup, index) in tabs[3].content" :key="index">
						<p><strong>Candle Count:</strong> {{ candleGroup.candleCount }}</p>
						<ul>
							<li v-for="(candle, candleIndex) in candleGroup.candles" :key="candle.mediaID">
								<img :src="candle.mediaUrl" alt="Candle" width="50" />
								<p>{{ candle.content }} - <strong>{{ candle.author }}</strong> ({{ candle.date }} - {{
									candle.time
								}})</p>
							</li>
						</ul>
					</li>
				</ul>
				<div class="candle-crud">
					<button @click="addCandle">add Candle</button>
					<button @click="updateCandle">update Candle</button>
					<button @click="removeCandle">remove Candle</button>
				</div>
			</div>

			<p v-else>No candles available.</p>
		</div>

		<!-- Condolences Tab -->
		<div v-if="selectedTab === 4">
			<h3>Condolences</h3>
			<ul v-if="tabs[4].content.length">
				<li v-for="(condolenceGroup, index) in tabs[4].content" :key="index">
					<p><strong>Condolence Count:</strong> {{ condolenceGroup.condolenceCount }}</p>
					<ul>
						<li v-for="(message, msgIndex) in condolenceGroup.condolences" :key="msgIndex">
							<p><strong>{{ message.author }}</strong> ({{ message.date }} - {{ message.time }}): {{
								message.content }}</p>
						</li>
					</ul>
				</li>
			</ul>

			<p v-else>No condolences available.</p>
		</div>
	</div>
</template>

<style scoped>
.navbar {
	display: flex;
	align-items: center;
	background-color: #0082c8;
	color: white;
}

.nav__list {
	list-style: none;
	display: flex;
	padding: 0;
	margin: 0;
	flex-grow: 1;
}

.nav__list li {
	padding: 10px 15px;
	cursor: pointer;
	font-weight: bold;
}

.nav__list li.active {
	background-color: rgba(255, 255, 255, 0.2);
}

.tab-content {
	padding: 15px;
	background-color: #f4f4f4;
	border-radius: 5px;
}

.candle-crud {
	display: flex;
	gap: 1em;
}
</style>
