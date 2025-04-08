import { computed } from 'vue';
import { useStore } from 'vuex';

export default function useRoles() {
    const store = useStore();

    const roles = computed(() => store.getters.userRoles);

    const hasRole = (role) => computed(() => store.getters.hasRole(role));

    const hasAnyRole = (rolesList) => computed(() => store.getters.hasAnyRole(rolesList));

    const isTeacher = hasRole('ROLE_TEACHER');
    const isAdmin = hasRole('ROLE_ADMIN');
    const isStudent = hasRole('ROLE_STUDENT');

    const isAdminOrTeacher = hasAnyRole(['ROLE_ADMIN', 'ROLE_TEACHER']);

    const isAnyRole = hasAnyRole(['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT']);


    return {
        roles,
        hasRole,
        hasAnyRole,
        isTeacher,
        isAdmin,
        isStudent,
        isAdminOrTeacher,
        isAnyRole
    };
}
