import { createRouter, createWebHistory } from "vue-router";
import PersonProfile from "@/components/PersonProfile.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/register",
          name: "register",
          component: RegisterView,
        },
        {
          path: "/person/:id/:givenName/:tab?",
          name: "PersonProfile",
          component: PersonProfile,
          props: (route) => ({
            id: Number(route.params.id),
            givenName: route.params.givenName,
          }),
        },
      ],
    },
    {
      path: "/signin",
      component: EmptyLayout,
    },
    {
      path: "/admin",
      component: AdminLayout,
    },
  ],
});

export default router;
