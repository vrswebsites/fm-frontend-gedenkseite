<script setup>
import { usePersonStore } from "@/stores/personStore";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import PersonInfoTab from '@/components/Tabs.vue';
import ResponsiveImages from '@/components/ResponsiveImage.vue';
import VProfileHeader from "./VProfileHeader.vue";
import VGridLayout from "./VGridLayout.vue";
const personStore = usePersonStore();
const route = useRoute();
const isStartTabActive = computed(() => route.params.tab === "start" || !route.params.tab);

defineProps(["id", "givenName"]);

onMounted(() => {
	personStore.selectPerson(Number(route.params.id));
});

const person = computed(() => personStore.selectedPersonDetails);
</script>
<template>
	<div v-if="person" class="flex items-center flex-col space-y-8">
		<VProfileHeader v-if="person" :personData="person"></VProfileHeader>

		<!-- Navigation -->
		<PersonInfoTab @tabChanged="isStartTabActive = $event"></PersonInfoTab>

		<!-- Grid Component -->
		<VGridLayout>
			<!-- Left Column Content -->
			<template #left>
				<div class="profile__overview">
					<template v-if="isStartTabActive || route.params.tab === 'obituaries'">
						<h3 class="text-xl pb-4">Obituaries</h3>
						<ul v-if="person.obituaries">
							<li>{{ person.obituaries.title }}</li>
							<li>{{ person.obituaries.description }}</li>
							<li>{{ person.obituaries.publicationDate }}</li>
							<li>{{ person.obituaries.publisher }}</li>
							<ResponsiveImages :sizes="person.obituaries.sizes"></ResponsiveImages>
						</ul>
					</template>

					<template v-if="isStartTabActive || route.params.tab === 'video-obituaries'">
						<h3 class="text-xl pb-4">Video Obituaries</h3>
						<div v-if="person.videoObituaries && person.videoObituaries.length">
							<video v-for="(video, index) in person.videoObituaries" :key="index" controls>
								<source :src="video.contentUrl" type="video/mp4">
							</video>
						</div>
						<div v-else>
							<p>No video data available</p>
						</div>

					</template>

					<template v-if="isStartTabActive || route.params.tab === 'candles'">
						<h3 class="text-xl pb-4">Candles</h3>
						<ul v-if="person.candles && person.candles.length">
							<li v-for="(candleGroup, index) in person.candles" :key="index">
								<p><strong>Candle Count:</strong> {{ candleGroup.candleCount }}</p>
								<ul>
									<li v-for="(candle, msgIndex) in candleGroup.candles" :key="msgIndex">
										<img :src="candle.mediaUrl" alt="Candle" width="50" />
										<p><strong>{{ candle.author }}</strong> ({{ candle.date }} - {{ candle.time }}):
											{{
												candle.content }}</p>
									</li>
								</ul>
							</li>
						</ul>
					</template>

					<template v-if="isStartTabActive || route.params.tab === 'condolences'">
						<h3 class="text-xl pb-4">Condolences</h3>
						<ul v-if="person.condolences && person.condolences.length">
							<li v-for="(condolenceGroup, index) in person.condolences" :key="index">
								<p><strong>Condolence Count:</strong> {{ condolenceGroup.condolenceCount }}</p>
								<ul>
									<li v-for="(message, msgIndex) in condolenceGroup.condolences" :key="msgIndex">
										<p><strong>{{ message.author }}</strong> ({{ message.date }} - {{ message.time
										}}): {{
												message.content }}</p>
									</li>
								</ul>
							</li>
						</ul>
					</template>
				</div>
			</template>

			<!-- Right Column Content -->
			<template #right>
				<div class="row row-1">
					<h2 class="text-lg font-bold">Overview</h2>
					<div v-if="person.createdBy" class="flex flex-col">
						<span>{{ person.createdBy.name }}</span>
						<span>{{ person.createdBy.location }}</span>
						<span>{{ person.createdBy.date }}</span>
						<span>{{ person.createdBy.relation }}</span>
						<span><strong>Besuche</strong> {{ person.noOfVisitors }}</span>
					</div>
				</div>
				<div class="row row-2">
					<h2 class="text-lg font-bold">Row 2</h2>
				</div>
			</template>
		</VGridLayout>
	</div>
</template>