import { ref, computed, Ref } from 'vue'

export const useStrengthPassword = (password: Ref<Nullable<string>>) => {
  const getStrengthPassword = watchEffect(() => {
    if (!password.value) {
      return null
    }

    const length = password.value?.length
    if (length > 0 && length <= 2) {
      return 0
    }

    if (length > 2 && length <= 4) {
      return 1
    }

    if (length > 4 && length <= 8) {
      return 2
    }
    if (length > 8 && length <= 12) {
      return 3
    }
    if (length > 12) {
      return 4
    }
  })

  function initPassword() {
    password.value = null
  }

  return {
    password,
    initPassword,
    getStrengthPassword
  }
}
