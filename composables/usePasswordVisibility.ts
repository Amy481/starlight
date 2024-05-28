export function usePasswordVisibility() {
  const isPasswordVisible = ref(false);

  const handlePasswordVisible = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  return {
    isPasswordVisible,
    handlePasswordVisible,
  };
}
