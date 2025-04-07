import { reactive } from 'vue';

export const authState = reactive({
    isVisible: false,
    isAccess: true,
    currentUser: null,
    isVisibleAddUserStudentModalComponent: false,
    isVisibleAddUserModalComponent: false,
    isVisibleModalAddUsers: false,
    isVisibleChangePhotoGallery: false,
    isVisibleUsersAll: false,
    isVisibleEditStudentModelComponent: false,
    isVisibleEditUserModelComponent: false,
    editUserId: null,
    isArticle: '',
});
