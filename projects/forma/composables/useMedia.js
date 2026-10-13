import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useMedia() {
  const isMobile = ref(false)

  let mediaQuery

  const updateMedia = (event) => {
    isMobile.value = event.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(max-width: 768px)')

    isMobile.value = mediaQuery.matches

    mediaQuery.addEventListener('change', updateMedia)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', updateMedia)
  })

  return {
    isMobile,
  }
}
