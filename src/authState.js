import { reactive } from 'vue';

export const authState = reactive({
	isVisible: false,
	isAccess: true,
	isVisibleModalAddUsers: false,
	isVisibleChangePhotoGallery: false,
	isVisibleUsersAll: false,
	isVisibleEditStudentModelComponent: false,
	editUserId: null,
	isArticle: ''
});

