<script setup>
import AppHeader from './components/header/AppHeader.vue'
import AppCalendar from './components/Calendar/AppCalendar.vue'
import AppProjects from '@/components/Projects/AppProjects.vue'
import AppAbout from '@/components/About/AppAbout.vue'
import AppSkills from '@/components/Skills/AppSkills.vue'
import AppContacts from '@/components/Contacts/AppContacts.vue'
import { useMedia } from '@/composables/useMedia'

const { isMobile } = useMedia()

import { ref, onMounted, onBeforeUnmount } from 'vue'
import FormaPreview from '@/assets/images/projects/forma/forma_preview.png'
import PulsePreview from '@/assets/images/projects/pulse/pulse_preview.png'
import ZernaPreview from '@/assets/images/projects/zerna/zerna_preview.png'

const isLoading = ref(true)

const preloadImages = [
  FormaPreview,
  PulsePreview,
  ZernaPreview,
]

const preloadImage = (src) => {
  return new Promise((resolve) => {
    const image = new Image()

    image.onload = resolve
    image.onerror = resolve
    image.src = src

    if (image.complete) {
      resolve()
    }
  })
}

const waitForPageLoad = () => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
      return
    }

    window.addEventListener('load', resolve, { once: true })
  })
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'

  await Promise.all([
    waitForPageLoad(),
    ...preloadImages.map(preloadImage),
  ])

  isLoading.value = false
  document.body.style.overflow = ''
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template lang="pug">
  .app
    Transition(name="loader")
      .app__loader(v-if="isLoading")
        .app__loader-logo NN
        .app__loader-line
          .app__loader-line_progress
    .app__content
      AppHeader.app__header(:isMobile="isMobile")
      AppCalendar.app__calendar(v-if="!isMobile")
      AppProjects.app__projects(:isMobile="isMobile")
      AppAbout.app__about(:isMobile="isMobile")
      AppSkills.app__skills(v-if="!isMobile")
      AppContacts.app__contacts(:isMobile="isMobile")
</template>

<style lang="stylus" scoped>
.app
  width 100%
  overflow hidden

  &__content
    width 100%
    display grid
    grid-template-columns repeat(20, minmax(0, 1fr))
    grid-template-rows auto auto auto auto

  &__header
    grid-column 1 / 18
    grid-row 1
    width 100%
    min-width 0

  &__calendar
    grid-column 18 / 21
    grid-row 1 / 3
    width 100%
    min-width 0
    height 100%

  &__projects
    grid-column 1 / 18
    grid-row 2
    width 100%
    min-width 0

  &__about
    grid-column 1 / 15
    grid-row 3
    width 100%
    min-width 0

  &__skills
    grid-column 15 / 21
    grid-row 3
    width 100%
    min-width 0
    position relative
    z-index 2
    height 110%

  &__contacts
    grid-column 1 / 21
    grid-row 4
    width 100%
    min-width 0
    position relative
    z-index 1

@media (platform: mobile)
  .app
    &__content
      display block

    &__header
      width 100%
      min-height 100svh

    &__projects
      width 100%
      min-height 100svh

    &__about
      width 100%
      min-height 100svh

    &__contacts
      width 100%
      min-height 100svh

.app__loader
  position fixed
  inset 0
  width 100%
  height 100dvh
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #0E0E0F
  z-index 99999

  &-logo
    font-family 'Open Sans', sans-serif
    font-weight 600
    font-size 2vw
    color rgba(221, 223, 223, 1)
    margin-bottom 2vh

    @media(platform: mobile)
      font-size 7vw
      margin-bottom 2vh

  &-line
    width 8vw
    height .2vh
    overflow hidden
    background-color rgba(255, 255, 255, .15)

    @media(platform: mobile)
      width 25vw
      height .15vh

  &-line_progress
    width 100%
    height 100%
    background-color rgba(248, 247, 247, 1)
    transform translateX(-100%)
    animation loading-line 1.2s ease-in-out infinite

.loader-leave-active
  transition opacity .4s ease

.loader-leave-to
  opacity 0

@keyframes loading-line
  0%
    transform translateX(-100%)

  50%
    transform translateX(0)

  100%
    transform translateX(100%)
</style>
