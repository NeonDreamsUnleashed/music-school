import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import StudentsPage from '@/pages/StudentsPage.vue';
import TeachersPage from '@/pages/TeachersPage.vue';
import SchedulePage from '@/pages/SchedulePage.vue';
import SubjectsPage from '@/pages/SubjectsPage.vue';
const routes = [
    { path: '/', component: HomePage },
    { path: '/students', component: StudentsPage },
    { path: '/teachers', component: TeachersPage },
    { path: '/schedule', component: SchedulePage },
    { path: '/subjects', component: SubjectsPage },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
