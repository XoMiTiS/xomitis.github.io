<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import HeaderImage from './assets/header_bg.png'
import HouseMountainsImage from './assets/forma-house-mountains.png'
import HousePinesWaterImage from './assets/forma-pines-water.png'
import HouseRocksLightImage from './assets/forma-rocks-light.png'
import StudioImage from './assets/forma-interior.png'
import LogoBlack from './assets/logo_black.png'
import LogoWhite from './assets/logo_white.png'
import ArrowIcon from './components/icons/Arrow.vue'
import { useMedia } from '../composables/useMedia.js'

const { isMobile } = useMedia()

const isLoading = ref(true)
const siteLoaded = ref(false)

const loaderLetters = 'FORMA'
const visibleLoaderLetters = ref(1)

const visibleLoaderText = computed(() => {
  return loaderLetters.slice(0, visibleLoaderLetters.value)
})

let loaderTimer = null
let resourcesReady = false
let loaderCanFinish = false

const projectsModalOpen = ref(false)
const contactsModalOpen = ref(false)

const heroSection = ref(null)
const projectsSection = ref(null)
const studioSection = ref(null)
const ctaSection = ref(null)

const heroOffset = ref(0)
const projectsVisible = ref(false)
const studioVisible = ref(false)
const ctaVisible = ref(false)

let revealObserver = null
let scrollFrame = null

const projects = [
  {
    id: 1,
    title: 'Дом в горах',
    description: 'Частная резиденция · Алтай',
    index: '01',
    image: HouseMountainsImage,
    className: 'large',
  },
  {
    id: 2,
    title: 'Сосны и вода',
    description: 'Загородный дом · Карелия',
    index: '02',
    image: HousePinesWaterImage,
    className: 'small',
  },
  {
    id: 3,
    title: 'Скалы и свет',
    description: 'Частная резиденция · Крым',
    index: '03',
    image: HouseRocksLightImage,
    className: 'small',
  },
]

const preloadImages = [
  HeaderImage,
  HouseMountainsImage,
  HousePinesWaterImage,
  HouseRocksLightImage,
  StudioImage,
  LogoBlack,
  LogoWhite,
]

const heroBackgroundStyle = computed(() => ({
  backgroundImage: `url(${HeaderImage})`,
  '--hero-offset': `${heroOffset.value}px`,
}))

const studioStyle = {
  backgroundImage: `url(${StudioImage})`,
}

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const finishLoader = () => {
  if (!resourcesReady || !loaderCanFinish) {
    return
  }

  clearTimeout(loaderTimer)

  loaderTimer = setTimeout(() => {
    isLoading.value = false
  }, 450)
}

const animateLoader = () => {
  if (visibleLoaderLetters.value >= loaderLetters.length) {
    loaderCanFinish = true

    finishLoader()

    if (!resourcesReady) {
      loaderTimer = setTimeout(() => {
        visibleLoaderLetters.value = 1
        loaderCanFinish = false
        animateLoader()
      }, 700)
    }

    return
  }

  loaderTimer = setTimeout(() => {
    visibleLoaderLetters.value += 1
    animateLoader()
  }, 220)
}

const preloadImage = (src) => {
  return new Promise((resolve) => {
    const image = new Image()
    let finished = false

    const finish = async () => {
      if (finished) {
        return
      }

      finished = true

      try {
        if (image.decode) {
          await image.decode()
        }
      } catch (error) {
      }

      resolve()
    }

    const fail = () => {
      if (finished) {
        return
      }

      finished = true
      resolve()
    }

    image.onload = finish
    image.onerror = fail
    image.decoding = 'async'
    image.src = src

    if (image.complete && image.naturalWidth > 0) {
      finish()
    }
  })
}

const waitForPageLoad = () => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
      return
    }

    window.addEventListener(
      'load',
      resolve,
      {
        once: true,
      },
    )
  })
}

const waitForFonts = async () => {
  if (!document.fonts) {
    return
  }

  try {
    await document.fonts.ready
  } catch (error) {
  }
}

const scrollToProjects = () => {
  document.querySelector('#projects')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const scrollToStudio = () => {
  document.querySelector('#studio')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const lockPage = () => {
  document.body.style.overflow = 'hidden'
}

const unlockPage = () => {
  document.body.style.overflow = ''
}

const openProjectsModal = () => {
  projectsModalOpen.value = true
  lockPage()
}

const closeProjectsModal = () => {
  projectsModalOpen.value = false
}

const openContactsModal = () => {
  contactsModalOpen.value = true
  lockPage()
}

const closeContactsModal = () => {
  contactsModalOpen.value = false
}

const onLoaderAfterLeave = () => {
  siteLoaded.value = true

  if (!projectsModalOpen.value && !contactsModalOpen.value) {
    unlockPage()
  }
}

const onProjectsModalAfterLeave = () => {
  if (!isLoading.value && !contactsModalOpen.value) {
    unlockPage()
  }
}

const onContactsModalAfterLeave = () => {
  if (!isLoading.value && !projectsModalOpen.value) {
    unlockPage()
  }
}

const updateHeroParallax = () => {
  if (isMobile.value || !heroSection.value) {
    heroOffset.value = 0
    return
  }

  const rect = heroSection.value.getBoundingClientRect()

  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    return
  }

  heroOffset.value = Math.min(
    60,
    Math.max(
      0,
      -rect.top * 0.12,
    ),
  )
}

const onScroll = () => {
  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame)
  }

  scrollFrame = requestAnimationFrame(() => {
    updateHeroParallax()
  })
}

const onKeydown = (event) => {
  if (event.key !== 'Escape') {
    return
  }

  if (projectsModalOpen.value) {
    closeProjectsModal()
  }

  if (contactsModalOpen.value) {
    closeContactsModal()
  }
}

onMounted(async () => {
  animateLoader()
  lockPage()

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        if (entry.target === projectsSection.value) {
          projectsVisible.value = true
        }

        if (entry.target === studioSection.value) {
          studioVisible.value = true
        }

        if (entry.target === ctaSection.value) {
          ctaVisible.value = true
        }

        revealObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.18,
    },
  )

  if (projectsSection.value) {
    revealObserver.observe(projectsSection.value)
  }

  if (studioSection.value) {
    revealObserver.observe(studioSection.value)
  }

  if (ctaSection.value) {
    revealObserver.observe(ctaSection.value)
  }

  window.addEventListener(
    'scroll',
    onScroll,
    {
      passive: true,
    },
  )

  window.addEventListener(
    'keydown',
    onKeydown,
  )

  updateHeroParallax()

  const resourcesLoading = Promise.all([
    waitForPageLoad(),
    waitForFonts(),
    ...preloadImages.map(preloadImage),
  ])

  await Promise.race([
    resourcesLoading,
    wait(10000),
  ])

  resourcesReady = true

  finishLoader()
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()

  window.removeEventListener(
    'scroll',
    onScroll,
  )

  window.removeEventListener(
    'keydown',
    onKeydown,
  )

  clearTimeout(loaderTimer)

  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame)
  }

  unlockPage()
})
</script>

<template lang="pug">
  .app(
    :class="{ 'is-loaded': siteLoaded }"
  )
    Transition(
      name="loader"
      @after-leave="onLoaderAfterLeave"
    )
      .app-loader(v-if="isLoading")
        .app-loader__logo
          | {{ visibleLoaderText }}

        .app-loader__line
          .app-loader__line-progress

    header.app-header
      .app-header__logo
        img.app-header__logo-icon(
          :src="LogoBlack"
          alt="Forma"
        )

      nav.app-header__nav
        .app-header__nav-item(
          @click="scrollToProjects"
        ) Проекты

        .app-header__nav-item(
          @click="scrollToStudio"
        ) Студия

        .app-header__nav-item(
          @click="openContactsModal"
        ) Контакты

    main
      section.app-hero(
        ref="heroSection"
      )
        .app-hero__background(
          :style="heroBackgroundStyle"
        )

        .app-hero__content
          .app-hero__label
            span Пространства
            span которые вдохновляют

          .app-hero__title
            span Архитектура
            span для жизни

          .app-hero__description(
            v-if="!isMobile"
          )
            span Создаём дома и пространства, которые
            span гармонично вписываются в природу
            span и становятся частью вашей жизни.

          .app-hero__button.unselectable(
            @click="scrollToProjects"
          )
            span Смотреть проекты
            ArrowIcon.app-hero__button-arrow

      section.app-projects#projects(
        ref="projectsSection"
        :class="{ 'is-visible': projectsVisible }"
      )
        .app-projects__header
          .app-projects__label Избранные проекты

          .app-projects__all(
            @click="openProjectsModal"
          )
            span Все проекты

            ArrowIcon.app-projects__all-arrow(
              v-if="!isMobile"
            )

        .app-projects__content
          .app-projects__item(
            v-for="project in projects"
            :key="project.id"
            :class="`app-projects__item_${project.className}`"
          )
            .app-projects__item-image(
              :style="{ backgroundImage: `url(${project.image})` }"
            )

            .app-projects__item-info
              .app-projects__item-content
                .app-projects__item-title
                  | {{ project.title }}

              .app-projects__item-meta
                .app-projects__item-description
                  | {{ project.description }}

                .app-projects__item-number
                  .app-projects__item-line
                  .app-projects__item-index
                    | {{ project.index }}

      section.app-studio#studio(
        ref="studioSection"
        :class="{ 'is-visible': studioVisible }"
      )
        .app-studio__image(
          :style="studioStyle"
        )

        .app-studio__content
          .app-studio__label Студия Forma

          .app-studio__title
            span !{'Продуманная<br> архитектура<br> для настоящей жизни'}

          .app-studio__description
            span !{'Мы верим, что хорошая архитектура делает жизнь<br> спокойнее, глубже и счастливее. В нашей работе<br> важны контекст, природа и люди, для которых<br> мы создаём пространство.'}

          .app-studio__stats
            .app-studio__stat
              .app-studio__stat-value 10+
              .app-studio__stat-label Лет опыта

            .app-studio__stat
              .app-studio__stat-value 50+
              .app-studio__stat-label
                | Реализованных проектов

            .app-studio__stat
              .app-studio__stat-value 12
              .app-studio__stat-label
                | Регионов России

      section.app-cta(
        ref="ctaSection"
        :class="{ 'is-visible': ctaVisible }"
      )
        .app-cta__label Давайте знакомиться
        .app-cta__title Обсудим ваш проект?
        .app-cta__description
          | Расскажите о своей идее. Начнём с разговора.

        .app-cta__button.unselectable(
          @click="openContactsModal"
        )
          span Связаться с нами
          ArrowIcon.app-cta__button-arrow

    footer.app-footer#contacts
      .app-footer__top
        .app-footer__brand
          .app-footer__logo
            img.app-footer__logo-icon(
              :src="LogoWhite"
              alt="Forma"
            )

          .app-footer__brand-description
            | Архитектура для жизни

        .app-footer__column
          .app-footer__column-title Навигация

          .app-footer__column-item(
            @click="scrollToProjects"
          ) Проекты

          .app-footer__column-item(
            @click="scrollToStudio"
          ) Студия

          .app-footer__column-item(
            @click="openContactsModal"
          ) Контакты

        .app-footer__column
          .app-footer__column-title Контакты

          a.app-footer__column-item(
            href="mailto:hello@forma.studio"
          ) hello@forma.studio

          .app-footer__column-item Москва

          .app-footer__column-item
            | Работаем по всей России

      .app-footer__line

      .app-footer__bottom
        .app-footer__copyright © 2026 FORMA

        .app-footer__bottom-right
          .app-footer__privacy
            | Политика конфиденциальности

          .app-footer__top-button(
            @click="scrollToTop"
          )
            span Наверх
            ArrowIcon.app-footer__top-button_arrow

    Teleport(to="body")
      Transition(
        name="projects-modal"
        @after-leave="onProjectsModalAfterLeave"
      )
        .projects-modal(
          v-if="projectsModalOpen"
          @click.self="closeProjectsModal"
        )
          .projects-modal__header
            .projects-modal__label
              | Избранная архитектура

            .projects-modal__close.unselectable(
              @click="closeProjectsModal"
            )
              span Закрыть
              span.projects-modal__close-icon ×

          .projects-modal__content
            .projects-modal__title Все проекты

            .projects-modal__items
              .projects-modal__item(
                v-for="(project, index) in projects"
                :key="project.id"
                :style="{ '--project-delay': `${450 + index * 120}ms` }"
              )
                .projects-modal__item-media
                  img.projects-modal__item-image(
                    :src="project.image"
                    :alt="project.title"
                  )

                .projects-modal__item-info
                  .projects-modal__item-left
                    .projects-modal__item-title
                      | {{ project.title }}

                  .projects-modal__item-right
                    .projects-modal__item-description
                      | {{ project.description }}

                    .projects-modal__item-number
                      .projects-modal__item-line
                      .projects-modal__item-index
                        | {{ project.index }}

    Teleport(to="body")
      Transition(
        name="contacts-modal"
        @after-leave="onContactsModalAfterLeave"
      )
        .contacts-modal(
          v-if="contactsModalOpen"
          @click.self="closeContactsModal"
        )
          .contacts-modal__window
            .contacts-modal__top
              .contacts-modal__label
                | Связаться с нами

              .contacts-modal__close.unselectable(
                @click="closeContactsModal"
              ) ×

            .contacts-modal__title
              span Обсудим
              span ваш проект

            .contacts-modal__description
              | Расскажите нам о своей идее, и мы обсудим,
              br
              | как можем помочь реализовать её.

            .contacts-modal__items
              a.contacts-modal__item(
                href="mailto:hello@forma.studio"
              )
                .contacts-modal__item-label Почта
                .contacts-modal__item-value
                  | hello@forma.studio

              .contacts-modal__item
                .contacts-modal__item-label Город
                .contacts-modal__item-value Москва

            a.contacts-modal__button(
              href="mailto:hello@forma.studio"
            )
              span Написать нам
              ArrowIcon.contacts-modal__button-arrow
</template>

<style lang="stylus" scoped>
.app
  width 100%
  overflow hidden
  background-color #F3F1EC
  color #282725
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &.is-loaded
    .app-header
      animation header-enter .8s cubic-bezier(.16, 1, .3, 1) .1s forwards

    .app-hero__background
      animation hero-background-enter 1.6s cubic-bezier(.16, 1, .3, 1) forwards

    .app-hero__label
      animation hero-content-enter .7s cubic-bezier(.16, 1, .3, 1) .2s forwards

    .app-hero__title
      animation hero-content-enter .9s cubic-bezier(.16, 1, .3, 1) .35s forwards

    .app-hero__description
      animation hero-content-enter .8s cubic-bezier(.16, 1, .3, 1) .55s forwards

    .app-hero__button
      animation hero-button-enter .8s cubic-bezier(.16, 1, .3, 1) .7s forwards

.app-loader
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 99999
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #F3F1EC
  color #282725
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__logo
    min-width 12vw
    min-height 5vh
    display flex
    justify-content center
    align-items center
    font-family "Source Serif Pro", serif
    font-size 2.8vw
    font-weight 400
    line-height 1
    letter-spacing .08em
    margin-bottom 4vh
    white-space nowrap

  &__line
    width 8vw
    height .2vh
    overflow hidden
    background-color rgba(40, 39, 37, .15)

  &__line-progress
    width 100%
    height 100%
    background-color #975F3F
    transform translateX(-100%)
    animation forma-loading-line 1.8s ease-in-out infinite

.app-header
  width 100%
  padding 2.963vh 6.25vw
  box-sizing border-box
  display flex
  justify-content space-between
  align-items center
  position absolute
  top 0
  left 0
  z-index 10
  font-family 'Open Sans', sans-serif
  opacity 0
  transform translateY(-2vh)
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__logo
    display flex
    justify-content flex-start
    align-items center

    &-icon
      width 100%

  &__nav
    display flex
    justify-content flex-end
    align-items center
    gap 3vw
    font-family Inter

  &__nav-item
    font-size 1.042vw
    font-weight 500
    color rgba(79, 79, 79, 1)
    cursor pointer
    transition color .2s ease

    &:hover
      color rgba(40, 39, 37, 1)

.app-hero
  width 100%
  min-height 100vh
  position relative
  overflow hidden
  display flex
  align-items center
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__background
    position absolute
    inset -3%
    background-size cover
    background-position center calc(50% + var(--hero-offset))
    background-repeat no-repeat
    opacity 0
    transform scale(1.1)
    will-change transform, background-position

  &__content
    width 40vw
    margin-left 6.25vw
    position relative
    z-index 2
    padding-top 7vh

  &__label
    display flex
    flex-direction column
    align-items flex-start
    font-family Inter
    font-size 1.042vw
    line-height 1.41
    letter-spacing 27%
    text-transform uppercase
    color rgba(0, 2, 6, .5)
    margin-bottom 2.5vh
    opacity 0
    transform translateY(3vh)

  &__title
    display flex
    flex-direction column
    align-items flex-start
    font-family "Source Serif Pro"
    font-size 5.2vw
    font-weight 400
    line-height .89
    letter-spacing -.2vw
    margin-bottom 3.981vh
    color rgba(38, 39, 39, 1)
    opacity 0
    transform translateY(3vh)

  &__description
    display flex
    flex-direction column
    align-items flex-start
    font-family Inter
    font-size 1.458vw
    letter-spacing -1%
    font-weight 400
    line-height 1.3
    color #4F4F4F
    margin-bottom 4vh
    opacity 0
    transform translateY(3vh)

  &__button
    width fit-content
    padding 2.778vh 2.083vw
    background-color rgba(151, 95, 63, 1)
    display flex
    justify-content center
    align-items center
    font-family Inter
    font-size 1.458vw
    color #F4E8D8
    cursor pointer
    opacity 0
    transform translateY(2vh)
    transition background-color .2s ease, transform .3s cubic-bezier(.16, 1, .3, 1)

    &:hover
      background-color #925B3C

      @media(platform: desktop)
        .app-hero__button-arrow
          transform translateX(.4vw)

    &:active
      transform scale(.97)

  &__button-arrow
    margin-left 1.823vw
    width 2.083vw
    height 2.407vh
    transition transform .3s cubic-bezier(.16, 1, .3, 1)

.app-projects
  width 100%
  padding 5vh 6.25vw 6vh 6.25vw
  box-sizing border-box
  background-color #F3F1EC
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__header
    display flex
    justify-content space-between
    align-items center
    margin-bottom 2.2vh
    opacity 0
    transform translateY(2vh)
    transition opacity .7s ease, transform .7s cubic-bezier(.16, 1, .3, 1)

  &__label
    font-family Inter
    font-size .833vw
    font-weight 600
    letter-spacing 42%
    text-transform uppercase
    color rgba(40, 39, 37, .5)

  &__all
    display flex
    align-items center
    gap .5vw
    font-family Inter
    font-weight 600
    font-size .65vw
    color #AE704D
    cursor pointer

    &:hover
      text-decoration underline
      text-underline-offset .37vh
      text-decoration-thickness 1px

      .app-projects__all-arrow
        transform translateX(.3vw)

    &-arrow
      width 1vw
      transition transform .3s cubic-bezier(.16, 1, .3, 1)

  &__content
    width 100%
    display grid
    grid-template-columns 1.1fr .9fr
    grid-template-rows repeat(2, auto)
    gap 2vh 1.8vw
    align-items start

  &__item
    width 100%
    min-width 0
    opacity 0
    transform translateY(4vh)
    transition opacity .8s cubic-bezier(.16, 1, .3, 1), transform .8s cubic-bezier(.16, 1, .3, 1)

    &:hover
      @media(platform: desktop)
        .app-projects__item-image
          transform scale(1.025)
          filter saturate(1.06)

  &__item_large
    grid-column 1
    grid-row 1 / 3

    .app-projects__item-image
      aspect-ratio 1.25 / 1

  &__item_small
    grid-column 2

    .app-projects__item-image
      aspect-ratio 2.4 / 1

  &__item-image
    width 100%
    background-size contain
    background-position center
    background-repeat no-repeat
    transform scale(1)
    filter saturate(1)
    transition transform .8s cubic-bezier(.16, 1, .3, 1), filter .5s ease
    will-change transform

  &__item-content
    display flex
    justify-content flex-start

  &__item-info
    margin-top 1.019vh

  &__item-number
    display flex
    justify-content space-between
    align-items center

  &__item-title
    font-family Inter
    font-weight 500
    font-size 1.771vw
    letter-spacing -6%
    line-height 1
    color #1A1E20

  &__item-description
    font-family Inter
    font-weight 500
    font-size .729vw
    letter-spacing .16vw
    text-transform uppercase
    color rgba(137, 137, 137, 1)

  &__item-meta
    display flex
    justify-content space-between
    align-items center
    margin-top 1.481vh

  &__item-line
    width 0
    height 2px
    margin-right 1vw
    background-color #C8C7C4
    transition width .8s cubic-bezier(.16, 1, .3, 1)

  &__item-index
    font-family Inter
    font-size 1.042vw
    font-weight 500
    letter-spacing -6%
    color #C8C7C4

  &.is-visible
    .app-projects__header
      opacity 1
      transform translateY(0)

    .app-projects__item
      opacity 1
      transform translateY(0)

      &:nth-child(2)
        transition-delay .12s

      &:nth-child(3)
        transition-delay .24s

    .app-projects__item-line
      width 6.25vw

.app-studio
  width 100%
  display grid
  grid-template-columns 55% 45%
  background-color #F3F1EC
  overflow hidden
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__image
    width 100%
    min-height 64.907vh
    background-size cover
    background-position center
    background-repeat no-repeat
    clip-path inset(0 100% 0 0)
    transform scale(1.04)
    transition clip-path 1.1s cubic-bezier(.16, 1, .3, 1), transform 1.3s cubic-bezier(.16, 1, .3, 1)
    will-change clip-path, transform

  &__content
    padding 3.611vh 6.146vw 3.611vh 3.698vw
    box-sizing border-box
    display flex
    flex-direction column
    justify-content center
    align-items flex-start

  &__label
    font-family Inter
    font-size .938vw
    font-weight 400
    letter-spacing .26vw
    text-transform uppercase
    color #898989
    margin-bottom 3.981vh
    opacity 0
    transform translateY(2vh)
    transition opacity .7s ease .25s, transform .7s cubic-bezier(.16, 1, .3, 1) .25s

  &__title
    font-family "Source Serif Pro"
    font-size 3.125vw
    font-weight 400
    line-height 1.12
    margin-bottom 2.593vh
    text-align start
    opacity 0
    transform translateY(2.5vh)
    transition opacity .8s ease .38s, transform .8s cubic-bezier(.16, 1, .3, 1) .38s

  &__description
    display flex
    flex-direction column
    font-family Inter
    text-align start
    font-size 1.458vw
    line-height 1.3
    letter-spacing -4%
    color #898989
    margin-bottom 3.704vh
    opacity 0
    transform translateY(2vh)
    transition opacity .8s ease .5s, transform .8s cubic-bezier(.16, 1, .3, 1) .5s

  &__stats
    width 100%
    padding-top 2vh
    border-top 2px solid rgba(213, 210, 204, 1)
    display grid
    grid-template-columns repeat(3, 1fr)
    opacity 0
    transform translateY(2vh)
    transition opacity .8s ease .62s, transform .8s cubic-bezier(.16, 1, .3, 1) .62s

  &__stat
    display flex
    justify-content flex-start
    align-items flex-start
    flex-direction column

    &:last-of-type
      margin-left 4vw

  &__stat-value
    font-family "Source Serif Pro"
    font-size 3.333vw
    line-height 1.02

  &__stat-label
    max-width 1vw
    margin-top .8vh
    font-family Inter
    font-size .833vw
    line-height 1.3
    letter-spacing 24%
    text-transform uppercase
    color rgba(137, 137, 137, 1)

  &.is-visible
    .app-studio__image
      clip-path inset(0 0 0 0)
      transform scale(1)

    .app-studio__label
      opacity 1
      transform translateY(0)

    .app-studio__title
      opacity 1
      transform translateY(0)

    .app-studio__description
      opacity 1
      transform translateY(0)

    .app-studio__stats
      opacity 1
      transform translateY(0)

.app-cta
  width 100%
  padding 7vh 2vw
  box-sizing border-box
  display flex
  flex-direction column
  justify-content center
  align-items center
  text-align center
  background-color #F3F1EC
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__label
    font-family Inter
    font-size .938vw
    letter-spacing 37%
    text-transform uppercase
    color rgba(40, 39, 37, .4)
    margin-bottom 2.593vh
    opacity 0
    transform translateY(2vh)
    transition opacity .7s ease, transform .7s cubic-bezier(.16, 1, .3, 1)

  &__title
    font-family "Source Serif Pro"
    font-size 5.469vw
    font-weight 400
    color rgba(38, 39, 39, 1)
    line-height 1
    margin-bottom 1.667vh
    opacity 0
    transform translateY(3vh)
    letter-spacing .08em
    transition opacity .9s ease .12s, transform .9s cubic-bezier(.16, 1, .3, 1) .12s, letter-spacing 1.1s cubic-bezier(.16, 1, .3, 1) .12s

  &__description
    font-family Inter
    font-size 1.667vw
    color rgba(137, 137, 137, 1)
    margin-bottom 3vh
    letter-spacing -1%
    line-height 1.3
    opacity 0
    transform translateY(2vh)
    transition opacity .8s ease .25s, transform .8s cubic-bezier(.16, 1, .3, 1) .25s

  &__button
    padding 1.6vh 2vw
    background-color #AE704D
    display flex
    justify-content center
    align-items center
    font-family 'Open Sans', sans-serif
    font-size .85vw
    color #FFFFFF
    cursor pointer
    opacity 0
    transform translateY(2vh)
    transition opacity .8s ease .4s, transform .8s cubic-bezier(.16, 1, .3, 1) .4s, background-color .2s ease

    &:hover
      background-color #925B3C

      @media(platform: desktop)
        .app-cta__button-arrow
          transform translateX(.35vw)

  &__button-arrow
    margin-left 1vw
    width 1.083vw
    transition transform .3s cubic-bezier(.16, 1, .3, 1)

  &.is-visible
    .app-cta__label
      opacity 1
      transform translateY(0)

    .app-cta__title
      opacity 1
      transform translateY(0)
      letter-spacing .01em

    .app-cta__description
      opacity 1
      transform translateY(0)

    .app-cta__button
      opacity 1
      transform translateY(0)

.app-footer
  width 100%
  padding 5vh 6.25vw 2.5vh 6.25vw
  box-sizing border-box
  background-color #242426
  color rgba(255, 255, 255, .75)
  font-family 'Open Sans', sans-serif
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__top
    width 100%
    display grid
    grid-template-columns 2fr 1fr 1fr
    gap 5vw
    margin-bottom 5vh

  &__brand
    display flex
    justify-content flex-start
    align-items flex-start
    flex-direction column

  &__logo
    margin-bottom 1.852vh

  &__logo-icon
    width 23.333vh

  &__brand-description
    font-size .75vw
    letter-spacing .12vw
    color rgba(255, 255, 255, .45)

  &__column
    display flex
    flex-direction column
    align-items flex-start
    font-family Inter

  &__column-title
    font-weight 400
    font-size .938vw
    letter-spacing 28%
    text-transform uppercase
    color rgba(137, 137, 137, 1)
    margin-bottom 3.333vh

  &__column-item
    font-weight 400
    margin-bottom 1.852vh
    letter-spacing -7%
    font-size 1.042vw
    color rgba(255, 255, 255, .55)
    text-decoration none
    cursor pointer
    position relative
    transition color .2s ease

    &::after
      content ''
      width 0
      height 1px
      position absolute
      left 0
      bottom -.3vh
      background-color rgba(255, 255, 255, .55)
      transition width .3s cubic-bezier(.16, 1, .3, 1)

    &:hover
      color #FFFFFF

      &::after
        width 100%

  &__line
    width 100%
    height 1px
    background-color rgba(255, 255, 255, .15)

  &__bottom
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding-top 2vh
    font-family Inter

  &__copyright
    letter-spacing 16%
    font-size 1.042vw
    color rgba(137, 137, 137, 1)
    font-weight 500

  &__bottom-right
    display flex
    align-items center
    gap 3vw

  &__privacy
    font-size 1.25vw
    letter-spacing -5%
    color rgba(137, 137, 137, 1)

  &__top-button
    display flex
    align-items center
    gap 1vw
    font-size 1.25vw
    color rgba(137, 137, 137, 1)
    cursor pointer
    letter-spacing -5%

    &:hover
      .app-footer__top-button_arrow
        transform rotateZ(-90deg) translateX(.3vw)

    &_arrow
      transform rotateZ(-90deg)
      width 1vw
      transition transform .3s cubic-bezier(.16, 1, .3, 1)

.projects-modal
  width 100%
  height 100dvh
  padding 4.63vh 6.25vw 8vh 6.25vw
  box-sizing border-box
  position fixed
  top 0
  left 0
  z-index 1000
  overflow-y auto
  background-color #F3F1EC
  color #282725
  will-change clip-path, opacity
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__header
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-bottom 7.407vh

  &__label
    font-family Inter
    font-size .833vw
    font-weight 500
    letter-spacing .25vw
    text-transform uppercase
    color #898989

  &__close
    display flex
    justify-content flex-end
    align-items center
    gap 1vw
    font-family Inter
    font-size 1.042vw
    color #4F4F4F
    cursor pointer
    transition color .2s ease, transform .3s cubic-bezier(.16, 1, .3, 1)

    &:hover
      @media(platform: desktop)
        transform translateX(-.3vw)

        .projects-modal__close-icon
          transform rotate(90deg)

  &__close-icon
    display inline-block
    font-size 2vw
    font-weight 300
    line-height 1
    transition transform .4s cubic-bezier(.16, 1, .3, 1)

  &__content
    width 100%

  &__title
    font-family "Source Serif Pro"
    font-size 5.208vw
    font-weight 400
    line-height 1
    margin-bottom 7.407vh

  &__items
    width 100%
    display flex
    flex-direction column
    align-items flex-start

  &__item
    width 100%
    padding-bottom 6.481vh
    margin-bottom 6.481vh
    border-bottom 1px solid #C8C7C4

    &:last-child
      margin-bottom 0

    &:hover
      @media(platform: desktop)
        .projects-modal__item-image
          transform scale(1.015)
          filter saturate(1.05)

  &__item-media
    width 100%
    overflow hidden

  &__item-image
    width 100%
    height auto
    display block
    aspect-ratio 16 / 7
    object-fit cover
    transform scale(1)
    transition transform 1s cubic-bezier(.16, 1, .3, 1), filter .6s ease

  &__item-info
    width 100%
    margin-top 2.222vh

  &__item-left
    display flex
    flex-direction column
    align-items flex-start

  &__item-title
    font-family "Source Serif Pro"
    font-size 2.5vw
    font-weight 400
    line-height 1

  &__item-description
    font-family Inter
    font-size .833vw
    font-weight 500
    letter-spacing .16vw
    text-transform uppercase
    color #898989

  &__item-number
    display flex
    justify-content flex-end
    align-items center

  &__item-right
    margin-top 1.296vh
    display flex
    justify-content space-between
    align-items center

  &__item-line
    width 6.25vw
    height 1px
    margin-right 1.042vw
    background-color #C8C7C4

  &__item-index
    font-family Inter
    font-size 1.042vw
    font-weight 500
    color #C8C7C4

.contacts-modal
  width 100%
  height 100dvh
  padding 4vh 4vw
  box-sizing border-box
  position fixed
  top 0
  left 0
  z-index 1001
  display flex
  justify-content center
  align-items center
  background-color rgba(20, 20, 20, .72)
  -webkit-user-select none
  user-select none
  -webkit-tap-highlight-color transparent

  &__window
    width 45vw
    padding 5.556vh 4.167vw
    box-sizing border-box
    background-color #F3F1EC
    transform-origin center
    will-change transform, opacity

  &__top
    width 100%
    display flex
    justify-content space-between
    align-items center
    margin-bottom 5.556vh

  &__label
    font-family Inter
    font-size .833vw
    font-weight 500
    letter-spacing .25vw
    text-transform uppercase
    color #898989

  &__close
    display inline-block
    font-family Inter
    font-size 2vw
    font-weight 300
    line-height 1
    color #282725
    cursor pointer
    transition transform .4s cubic-bezier(.16, 1, .3, 1)

    &:hover
      @media(platform: desktop)
        transform rotate(90deg)

  &__title
    display flex
    flex-direction column
    align-items flex-start
    font-family "Source Serif Pro"
    font-size 4.167vw
    font-weight 400
    line-height .95
    color #262727
    margin-bottom 2.593vh

  &__description
    width 80%
    font-family Inter
    font-size 1.25vw
    line-height 1.4
    color #898989
    margin-bottom 4.63vh

  &__items
    width 100%
    border-top 1px solid #C8C7C4

  &__item
    width 100%
    padding 2.222vh 0
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #C8C7C4
    text-decoration none

  &__item-label
    font-family Inter
    font-size .833vw
    letter-spacing .15vw
    text-transform uppercase
    color #898989

  &__item-value
    font-family Inter
    font-size 1.146vw
    color #282725

  &__button
    width fit-content
    margin-top 4.63vh
    padding 1.944vh 2.083vw
    display flex
    justify-content center
    align-items center
    background-color #975F3F
    font-family Inter
    font-size 1.042vw
    color #F4E8D8
    text-decoration none
    transition background-color .2s ease

    &:hover
      background-color #825037

      .contacts-modal__button-arrow
        transform translateX(.3vw)

  &__button-arrow
    width 1.25vw
    margin-left 1.563vw
    transition transform .3s cubic-bezier(.16, 1, .3, 1)

.loader-leave-active
  transition opacity .55s ease

.loader-leave-to
  opacity 0

.projects-modal-enter-active
  transition opacity .55s ease, clip-path .7s cubic-bezier(.16, 1, .3, 1)

  .projects-modal__header
    animation modal-content-enter .7s cubic-bezier(.16, 1, .3, 1) .25s backwards

  .projects-modal__title
    animation modal-content-enter .8s cubic-bezier(.16, 1, .3, 1) .32s backwards

  .projects-modal__item
    animation modal-project-enter .8s cubic-bezier(.16, 1, .3, 1) var(--project-delay) backwards

.projects-modal-leave-active
  transition opacity .35s ease, clip-path .4s cubic-bezier(.7, 0, .84, 0)

.projects-modal-enter-from
  opacity 0
  clip-path inset(100% 0 0 0)

.projects-modal-enter-to
  opacity 1
  clip-path inset(0 0 0 0)

.projects-modal-leave-from
  opacity 1
  clip-path inset(0 0 0 0)

.projects-modal-leave-to
  opacity 0
  clip-path inset(0 0 100% 0)

.contacts-modal-enter-active
  transition background-color .45s ease

  .contacts-modal__window
    transition opacity .55s ease, transform .6s cubic-bezier(.16, 1, .3, 1)

  .contacts-modal__label
    animation modal-content-enter .6s cubic-bezier(.16, 1, .3, 1) .2s backwards

  .contacts-modal__title
    animation modal-content-enter .7s cubic-bezier(.16, 1, .3, 1) .28s backwards

  .contacts-modal__description
    animation modal-content-enter .7s cubic-bezier(.16, 1, .3, 1) .36s backwards

  .contacts-modal__items
    animation modal-content-enter .7s cubic-bezier(.16, 1, .3, 1) .44s backwards

  .contacts-modal__button
    animation modal-content-enter .7s cubic-bezier(.16, 1, .3, 1) .52s backwards

.contacts-modal-leave-active
  transition background-color .3s ease

  .contacts-modal__window
    transition opacity .3s ease, transform .35s cubic-bezier(.7, 0, .84, 0)

.contacts-modal-enter-from
  background-color rgba(20, 20, 20, 0)

  .contacts-modal__window
    opacity 0
    transform translateY(4vh) scale(.94)

.contacts-modal-enter-to
  background-color rgba(20, 20, 20, .72)

  .contacts-modal__window
    opacity 1
    transform translateY(0) scale(1)

.contacts-modal-leave-from
  background-color rgba(20, 20, 20, .72)

  .contacts-modal__window
    opacity 1
    transform translateY(0) scale(1)

.contacts-modal-leave-to
  background-color rgba(20, 20, 20, 0)

  .contacts-modal__window
    opacity 0
    transform translateY(3vh) scale(.96)

@media(platform: mobile)
  .app-loader
    &__logo
      min-width 42vw
      min-height 6vh
      font-size 10vw
      letter-spacing .08em
      margin-bottom 3vh

    &__line
      width 28vw
      height .15vh

  .app-header
    padding 2vh 5vw

    &__logo
      width 40vw

    &__logo-icon
      width 100%
      height auto

    &__nav
      display none

  .app-hero
    min-height 100svh

    &__background
      inset 0
      background-position 65% center

    &__content
      width 90%
      margin-left 5vw
      padding-top 0

    &__label
      font-size 2.3vw
      letter-spacing .8vw
      margin-bottom 3vh

    &__title
      font-size 14vw
      letter-spacing -.5vw
      margin-bottom 4vh

    &__description
      font-size 3.5vw
      max-width 80%
      margin-bottom 5vh
      color #E5E5E5

    &__button
      padding 1.5vh 5vw
      font-size 3.5vw

    &__button-arrow
      margin-left 5vw
      width 4vw

  .app-projects
    padding 5vh 5vw

    &__label
      font-size 2vw
      letter-spacing .8vw

    &__all
      font-size 2.5vw

    &__content
      display flex
      flex-direction column
      gap 4vh

    &__item
      width 100%
      transform translateY(2vh)

      &_large
        .app-projects__item-image
          aspect-ratio 1 / 1

      &_small
        .app-projects__item-image
          aspect-ratio 1.5 / 1

    &__item-image
      background-size cover

    &__item-title
      font-size 5vw

    &__item-description
      font-size 1.8vw
      letter-spacing .5vw

    &__item-line
      width 0
      height 1px

    &__item-index
      font-size 2vw

    &.is-visible
      .app-projects__item-line
        width 10vw

  .app-studio
    display flex
    flex-direction column

    &__image
      min-height 50vh

    &__content
      padding 5vh 5vw

    &__label
      font-size 2vw
      letter-spacing .8vw

    &__title
      font-size 9vw
      margin-bottom 3vh

    &__description
      font-size 3vw

    &__stats
      gap 5vw

    &__stat-value
      font-size 7vw

    &__stat-label
      font-size 1.7vw

  .app-cta
    padding 8vh 5vw

    &__label
      font-size 2vw
      letter-spacing .8vw

    &__title
      font-size 10vw

    &__description
      font-size 3vw

    &__button
      padding 1.5vh 5vw
      font-size 3.5vw

    &__button-arrow
      margin-left 5vw
      width 4vw

  .app-footer
    padding 5vh 5vw 3vh 5vw

    &__top
      grid-template-columns 1fr
      gap 4vh

    &__logo-icon
      width 40vw
      height auto

    &__brand-description
      font-size 2.5vw

    &__column-title
      font-size 2vw

    &__column-item
      font-size 3vw

    &__bottom
      flex-direction column
      align-items flex-start
      gap 2vh

    &__copyright
      font-size 2vw

    &__bottom-right
      width 100%
      justify-content space-between

    &__privacy
      font-size 2vw

    &__top-button
      font-size 2.5vw

      &_arrow
        width 2vw

  .projects-modal
    padding 3vh 5vw 6vh 5vw

    &__header
      margin-bottom 5vh

    &__label
      font-size 2.2vw
      letter-spacing .7vw

    &__close
      gap 2vw
      font-size 3vw

    &__close-icon
      font-size 7vw

    &__title
      font-size 12vw
      margin-bottom 5vh

    &__item
      padding-bottom 4vh
      margin-bottom 4vh

    &__item-image
      aspect-ratio 1.4 / 1

    &__item-info
      margin-top 2vh

    &__item-title
      font-size 7vw

    &__item-right
      margin-top 1vh

    &__item-description
      font-size 2vw
      letter-spacing .4vw

    &__item-line
      width 12vw
      margin-right 3vw

    &__item-index
      font-size 2.5vw

  .contacts-modal
    padding 3vh 5vw

    &__window
      width 100%
      padding 4vh 6vw

    &__top
      margin-bottom 4vh

    &__label
      font-size 2.2vw
      letter-spacing .7vw

    &__close
      font-size 8vw

    &__title
      font-size 12vw
      margin-bottom 3vh

    &__description
      width 100%
      font-size 3.5vw
      margin-bottom 4vh

    &__item
      padding 2vh 0
      align-items flex-start
      flex-direction column

    &__item-label
      font-size 2vw
      margin-bottom 1vh

    &__item-value
      font-size 3.5vw

    &__button
      margin-top 4vh
      padding 1.7vh 5vw
      font-size 3.5vw

    &__button-arrow
      width 4vw
      margin-left 5vw

@keyframes forma-loading-line
  0%
    transform translateX(-100%)

  50%
    transform translateX(0)

  100%
    transform translateX(100%)

@keyframes header-enter
  0%
    opacity 0
    transform translateY(-2vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes hero-background-enter
  0%
    opacity 0
    transform scale(1.1)

  100%
    opacity 1
    transform scale(1.06)

@keyframes hero-content-enter
  0%
    opacity 0
    transform translateY(3vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes hero-button-enter
  0%
    opacity 0
    transform translateY(2vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes modal-content-enter
  0%
    opacity 0
    transform translateY(2.5vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes modal-project-enter
  0%
    opacity 0
    transform translateY(4vh)

  100%
    opacity 1
    transform translateY(0)
</style>
