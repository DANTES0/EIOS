import { reactive } from 'vue';

export const authState = reactive({
  isVisible: false,
  isAccess: false,
  isVisibleModalAddUsers: false,
  isVisibleChangePhotoGallery: false,
  isVisibleUsersAll: false,
  isVisibleEditStudentModelComponent: false,
  editUserId: null,
  isArticle: ""
});

