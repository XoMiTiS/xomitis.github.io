<script setup>
import { ref } from 'vue'
import HeaderImage from './assets/header_bg.png'
import HouseMountainsImage from './assets/forma-house-mountains.png'
import HousePinesWaterImage from './assets/forma-pines-water.png'
import HouseRocksLightImage from './assets/forma-rocks-light.png'
import StudioImage from './assets/forma-interior.png'
import ArrowIcon from './components/icons/Arrow.vue'
import { useMedia } from '../composables/useMedia.js'

const { isMobile } = useMedia()

const projectsModalOpen = ref(false)
const contactsModalOpen = ref(false)

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
  unlockPage()
}

const openContactsModal = () => {
  contactsModalOpen.value = true
  lockPage()
}

const closeContactsModal = () => {
  contactsModalOpen.value = false
  unlockPage()
}

const heroStyle = {
  backgroundImage: `url(${HeaderImage})`,
}

const studioStyle = {
  backgroundImage: `url(${StudioImage})`,
}

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
</script>

<template lang="pug">
  .app
    header.app-header
      .app-header__logo
        img.app-header__logo-icon(src="./assets/logo_black.png")

      nav.app-header__nav
        .app-header__nav-item(@click="scrollToProjects") Проекты
        .app-header__nav-item(@click="scrollToStudio") Студия
        .app-header__nav-item(@click="openContactsModal") Контакты

    main
      section.app-hero(:style="heroStyle")
        .app-hero__content
          .app-hero__label
            span Пространства
            span которые вдохновляют

          .app-hero__title
            span Архитектура
            span для жизни

          .app-hero__description(v-if="!isMobile")
            span Создаём дома и пространства, которые
            span гармонично вписываются в природу
            span и становятся частью вашей жизни.

          .app-hero__button.unselectable(@click="scrollToProjects")
            span Смотреть проекты
            ArrowIcon.app-hero__button-arrow

      section.app-projects#projects
        .app-projects__header
          .app-projects__label Избранные проекты

          .app-projects__all(@click="openProjectsModal")
            span Все проекты
            ArrowIcon.app-projects__all-arrow(v-if="!isMobile")

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
                .app-projects__item-title {{ project.title }}

              .app-projects__item-meta
                .app-projects__item-description {{ project.description }}

                .app-projects__item-number
                  .app-projects__item-line
                  .app-projects__item-index {{ project.index }}

      section.app-studio#studio
        .app-studio__image(:style="studioStyle")

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
              .app-studio__stat-label Реализованных проектов

            .app-studio__stat
              .app-studio__stat-value 12
              .app-studio__stat-label Регионов России

      section.app-cta
        .app-cta__label Давайте знакомиться
        .app-cta__title Обсудим ваш проект?
        .app-cta__description Расскажите о своей идее. Начнём с разговора.

        .app-cta__button.unselectable(@click="openContactsModal")
          span Связаться с нами
          ArrowIcon.app-cta__button-arrow

    footer.app-footer#contacts
      .app-footer__top
        .app-footer__brand
          .app-footer__logo
            img.app-footer__logo-icon(src="./assets/logo_white.png")

          .app-footer__brand-description Архитектура для жизни

        .app-footer__column
          .app-footer__column-title Навигация
          .app-footer__column-item(@click="scrollToProjects") Проекты
          .app-footer__column-item(@click="scrollToStudio") Студия
          .app-footer__column-item(@click="openContactsModal") Контакты

        .app-footer__column
          .app-footer__column-title Контакты
          a.app-footer__column-item(href="mailto:hello@forma.studio") hello@forma.studio
          .app-footer__column-item Москва
          .app-footer__column-item Работаем по всей России

      .app-footer__line

      .app-footer__bottom
        .app-footer__copyright © 2026 FORMA

        .app-footer__bottom-right
          .app-footer__privacy Политика конфиденциальности

          .app-footer__top-button(@click="scrollToTop")
            span Наверх
            ArrowIcon.app-footer__top-button_arrow

    Teleport(to="body")
      .projects-modal(
        v-if="projectsModalOpen"
        @click.self="closeProjectsModal"
      )
        .projects-modal__header
          .projects-modal__label Избранная архитектура

          .projects-modal__close.unselectable(@click="closeProjectsModal")
            span Закрыть
            span.projects-modal__close-icon ×

        .projects-modal__content
          .projects-modal__title Все проекты

          .projects-modal__items
            .projects-modal__item(
              v-for="project in projects"
              :key="project.id"
            )
              img.projects-modal__item-image(
                :src="project.image"
                :alt="project.title"
              )

              .projects-modal__item-info
                .projects-modal__item-left
                  .projects-modal__item-title {{ project.title }}
                .projects-modal__item-right
                  .projects-modal__item-description {{ project.description }}
                  .projects-modal__item-number
                    .projects-modal__item-line
                    .projects-modal__item-index {{ project.index }}

    Teleport(to="body")
      .contacts-modal(
        v-if="contactsModalOpen"
        @click.self="closeContactsModal"
      )
        .contacts-modal__window
          .contacts-modal__top
            .contacts-modal__label Связаться с нами
            .contacts-modal__close.unselectable(@click="closeContactsModal") ×

          .contacts-modal__title
            span Обсудим
            span ваш проект

          .contacts-modal__description
            | Расскажите нам о своей идее, и мы обсудим,
            br
            | как можем помочь реализовать её.

          .contacts-modal__items
            a.contacts-modal__item(href="mailto:hello@forma.studio")
              .contacts-modal__item-label Почта
              .contacts-modal__item-value hello@forma.studio

            .contacts-modal__item
              .contacts-modal__item-label Город
              .contacts-modal__item-value Москва

          a.contacts-modal__button(href="mailto:hello@forma.studio")
            span Написать нам
            ArrowIcon.contacts-modal__button-arrow
</template>

<style lang="stylus" scoped>
.app
  width 100%
  overflow hidden
  background-color #F3F1EC
  color #282725

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
  background-size cover
  background-position center
  background-repeat no-repeat
  display flex
  align-items center

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
    color rgba(0, 2, 6, 0.5)
    margin-bottom 2.5vh

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
    transition background-color .2s ease, transform .2s ease

    &:hover
      background-color #925B3C

    &:active
      transform scale(.97)

  &__button-arrow
    margin-left 1.823vw
    width 2.083vw
    height 2.407vh

.app-projects
  width 100%
  padding 5vh 6.25vw 6vh 6.25vw
  box-sizing border-box
  background-color #F3F1EC

  &__header
    display flex
    justify-content space-between
    align-items center
    margin-bottom 2.2vh

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

    &-arrow
      width 1vw

      @media(platform: mobile)
        width 3.5vw

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
    width 6.25vw
    height 2px
    margin-right 1vw
    background-color #C8C7C4

    @media(platform: mobile)
      height 1px

  &__item-index
    font-family Inter
    font-size 1.042vw
    font-weight 500
    letter-spacing -13%
    color #C8C7C4

.app-studio
  width 100%
  display grid
  grid-template-columns 55% 45%
  background-color #F3F1EC

  &__image
    width 100%
    min-height 64.907vh
    background-size cover
    background-position center
    background-repeat no-repeat

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

  &__title
    font-family "Source Serif Pro"
    font-size 3.125vw
    font-weight 400
    line-height 1.12
    margin-bottom 2.593vh
    text-align start

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

  &__stats
    width 100%
    padding-top 2vh
    border-top 2px solid rgba(213, 210, 204, 1)
    display grid
    grid-template-columns repeat(3, 1fr)

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

  &__label
    font-family Inter
    font-size .938vw
    letter-spacing 37%
    text-transform uppercase
    color rgba(40, 39, 37, .4)
    margin-bottom 2.593vh

  &__title
    font-family "Source Serif Pro"
    font-size 5.469vw
    font-weight 400
    letter-spacing 1%
    color rgba(38, 39, 39, 1)
    line-height 1
    margin-bottom 1.667vh

  &__description
    font-family Inter
    font-size 1.667vw
    color rgba(137, 137, 137, 1)
    margin-bottom 3vh
    letter-spacing -1%
    line-height 1.3

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
    transition background-color .2s ease, transform .2s ease

    &:hover
      background-color #925B3C

    &:active
      transform scale(.97)

  &__button-arrow
    margin-left 1vw
    width 1.083vw

.app-footer
  width 100%
  padding 5vh 6.25vw 2.5vh 6.25vw
  box-sizing border-box
  background-color #242426
  color rgba(255, 255, 255, .75)
  font-family 'Open Sans', sans-serif

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
    transition color .2s ease

    &:hover
      color #FFFFFF

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

    &_arrow
      transform rotateZ(-90deg)
      width 1vw

      @media(platform: mobile)
        width 2vw

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

  &__close-icon
    font-size 2vw
    font-weight 300
    line-height 1

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

  &__item-image
    width 100%
    height auto
    display block
    aspect-ratio 16 / 7
    object-fit cover

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

    @media(platform: mobile)
      margin-top 1vh

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

  &__window
    width 45vw
    padding 5.556vh 4.167vw
    box-sizing border-box
    background-color #F3F1EC

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
    font-family Inter
    font-size 2vw
    font-weight 300
    line-height 1
    color #282725
    cursor pointer

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

  &__button-arrow
    width 1.25vw
    margin-left 1.563vw

@media(platform: mobile)
  .app-header
    padding 2vh 5vw

    &__logo-icon
      font-size 7vw
      margin-right 3vw

    &__logo-text
      font-size 3vw
      letter-spacing 1vw

    &__nav
      display none

  .app-hero
    min-height 100svh
    background-position 65% center

    &__content
      width 90%
      margin-left 5vw
      padding-top 0vh

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
      width 10vw

    &__item-index
      font-size 2vw

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
      font-size 8vw

    &__logo-text
      font-size 4vw

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
</style>
