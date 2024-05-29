export const useNotificationStore = defineStore("notification", () => {
  const notificationMessage = ref("");
  const isNotification = ref(false);
  const notificationSuccess = () => {
    isNotification.value = true;
  };
  const notificationFail = () => {
    isNotification.value = false;
  };

  return {
    notificationMessage,
    isNotification,
    notificationSuccess,
    notificationFail,
  };
});
