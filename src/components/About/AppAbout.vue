<template lang="pug">
  .app-about
    .app-about__title(v-if="!isMobile")
      span Обо мне
    .app-about__content(v-if="!isMobile")
      .app-about__content-text
        .app-about__content-title !{'Здравствуйте, Я<br> Никита Неранов.'}
        .app-about__content-description !{'Frontend-разработчик, интересующийся UI/UX и<br> визуальной стороной веб-разработки.'}
        .app-about__content-button.unselectable(@click="openAboutModal")
          .app-about__button-text Больше обо мне
          ArrowIcon.app-about__button-arrow
      .app-about__content-image
      .app-about__content-skills
        .app-about__skills-item(v-for="skill in skills" :key="skill.id")
          .app-about__skills-value {{skill.value}}
          .app-about__skills-description {{skill.description}}
    .app-about__container(v-if="isMobile")
      .app-about__title
        span Обо мне
      .app-about__content-text
        .app-about__content-title Никита Неранов
      .app-about__content-container
        .app-about__content-image
        .app-about__content-skills
          .app-about__skills-container
            .app-about__skills-item(v-for="skill in skillsMobile" :key="skill.id")
              .app-about__skills-value {{skill.value}}
              .app-about__skills-description {{skill.description}}
              .app-about__skills-separation(v-if="skill.id < skillsMobile.length")
          .app-about__content-description(style="color: #8d8d8d; margin-top: 1vh; margin-bottom: 0; max-width: 48vw;") !{'Frontend-разработчик, интересующийся UI/UX и<br> визуальной стороной веб-разработки. Стремлюсь создавать понятные и аккуратные интерфейсы.'}
      .app-about__text
        span Больше всего интересуюсь созданием удобных, адаптивных и визуально продуманных веб-интерфейсов. Имею опыт работы в GameDev, где около года занимался разработкой пользовательских интерфейсов. Помимо программирования, увлекаюсь дизайном и компьютерной графикой. Мне интересно не только реализовывать готовые макеты, но и участвовать в создании визуальной составляющей проектов. Постоянно совершенствую свои навыки, изучаю новые подходы к разработке и стараюсь уделять внимание качеству, структуре и удобству интерфейсов.
      .app-about__title
        span О навыках
      ul.app-about__text.app-about__skills-list
        li
          strong Вёрстка и стилизация:
          ul
            li HTML, CSS — создание адаптивной и кроссбраузерной вёрстки.
            li Flexbox, Grid — построение структуры и расположение элементов.
            li Pug — использование шаблонизатора для HTML-разметки.
            li Stylus — работа с CSS-препроцессором.
            li БЭМ — организация структуры классов и стилей.

        li
          strong Разработка:
          ul
            li Vue.js — разработка пользовательских интерфейсов.
            li Создание переиспользуемых компонентов на Vue.js.
            li Базовые знания JavaScript и написание несложной логики.
            li Git — контроль версий и организация проектов.

        li
          strong UI/UX и графика:
          ul
            li Figma — работа с макетами и проектирование интерфейсов.
            li Базовое понимание композиции, типографики и принципов UI/UX.
            li GIMP, Adobe Photoshop — обработка и редактирование графики.

        li
          strong 3D-графика и игровые движки:
          ul
            li Blender — создание и редактирование HighPoly 3D-моделей.
            li Adobe Substance 3D — работа с материалами и текстурами.
            li Unreal Engine — знакомство с инструментами игрового движка и нодовой системой.

    Teleport(to="body")
      .about-modal(
        v-if="aboutModalOpen && !isMobile"
        @click="closeAboutModal"
      )
        .about-modal__content(@click.stop)
          .about-modal__header
            .about-modal__label Обо мне
            .about-modal__close.unselectable(@click="closeAboutModal")
              span Закрыть
              ArrowIcon.about-modal__close-arrow

          .about-modal__body
            .about-modal__about
              .about-modal__title
                | Никита Неранов
              .about-modal__subtitle
                | Frontend-разработчик с вниманием к дизайну и визуальной части интерфейсов.
              .about-modal__text
                | Больше всего интересуюсь созданием удобных, адаптивных и визуально продуманных веб-интерфейсов. Имею опыт работы в GameDev, где около года занимался разработкой пользовательских интерфейсов. Помимо программирования, увлекаюсь дизайном и компьютерной графикой. Мне интересно не только реализовывать готовые макеты, но и участвовать в создании визуальной составляющей проектов. Постоянно совершенствую свои навыки, изучаю новые подходы к разработке и стараюсь уделять внимание качеству, структуре и удобству интерфейсов.

            .about-modal__skills
              .about-modal__skills-title Навыки

              .about-modal__skills-block
                .about-modal__skills-name Вёрстка и стилизация
                ul.about-modal__skills-list
                  li HTML, CSS — адаптивная и кроссбраузерная вёрстка.
                  li Flexbox, Grid — построение структуры интерфейсов.
                  li Pug — шаблонизация HTML-разметки.
                  li Stylus — работа со стилями.
                  li БЭМ — организация классов и структуры компонентов.

              .about-modal__skills-block
                .about-modal__skills-name Разработка
                ul.about-modal__skills-list
                  li Vue.js — разработка пользовательских интерфейсов.
                  li Создание переиспользуемых компонентов.
                  li Базовые знания JavaScript.
                  li Git — контроль версий и организация проектов.

              .about-modal__skills-block
                .about-modal__skills-name UI/UX и графика
                ul.about-modal__skills-list
                  li Figma — работа с макетами и проектирование интерфейсов.
                  li Базовое понимание композиции, типографики и UI/UX.
                  li GIMP и Adobe Photoshop — работа с графикой.

              .about-modal__skills-block
                .about-modal__skills-name 3D
                ul.about-modal__skills-list
                  li Blender — создание и редактирование HighPoly 3D-моделей.
                  li Adobe Substance 3D — материалы и текстуры.
                  li Unreal Engine — знакомство с инструментами и нодовой системой.

</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ArrowIcon from '@/components/icons/Arrow.vue'

defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const skills = [
  {
    id: 1,
    value: '3',
    description: `Курс обучения Fullstack.`,
  },
  {
    id: 2,
    value: '1+',
    description: 'Год опыта в GameDev.',
  },
  {
    id: 3,
    value: '5',
    description: 'Направлений разработки.',
  },
]

const skillsMobile = [
  {
    id: 1,
    value: '3',
    description: `Курс обучения Fullstack.`,
  },
  {
    id: 2,
    value: '1+',
    description: 'Год опыта в GameDev.',
  },
]

const aboutModalOpen = ref(false)

const openAboutModal = () => {
  aboutModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeAboutModal = () => {
  aboutModalOpen.value = false
  document.body.style.overflow = ''
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && aboutModalOpen.value) {
    closeAboutModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>
<style scoped lang="stylus">
.app-about
  background-color rgba(15, 15, 15, 1)
  width 100%
  padding 3.148vh 2.969vw
  border-top .052vw solid rgba(255, 255, 255, 1)
  border-bottom .052vw solid rgba(255, 255, 255, 1)

  @media(platform: mobile)
    padding 2vh 2.5vw
    font-size 1.3vw

  &__title
    font-family "Open Sans"
    color #E9ECEC
    font-weight 600
    font-size .885vw
    letter-spacing -8%

    @media(platform: mobile)
      font-size 3.6vw
      letter-spacing -.02vw

  &__content
    display flex
    justify-content space-between
    align-items center

    &-text
      font-family "Open Sans"
      font-weight 600

    &-title
      font-size 3.333vw
      letter-spacing -8%
      color rgba(247, 247, 247, 1)

      @media (platform: mobile)
        font-size 6.5vw
        font-weight 700
        letter-spacing -.04em
        line-height 1
        margin 1vh 0

    &-description
      font-size .885vw
      letter-spacing -2%
      color #B5B6B4
      margin-bottom 2.315vh

      @media(platform: mobile)
        font-size 2.76vw
        margin-top 0.3vh
        margin-bottom 1vh
        line-height 1.4

    &-button
      padding 1.389vh 1.25vw
      border-radius 1.927vw
      display flex
      justify-content flex-start
      align-items center
      color rgba(241, 242, 246, 1)
      font-size .781vw
      letter-spacing -2%
      font-family "Open Sans"
      font-weight 600
      border .104vw solid rgba(134, 136, 136, 1)
      width fit-content
      cursor pointer
      transition all 0.15s ease

      &:hover
        @media(platform: desktop)
          color rgba(15, 15, 15, 1)
          background-color #E9ECEC
          border .104vw solid rgba(15, 15, 15, 1)

      &:active
        transform scale(0.95)
        color rgba(15, 15, 15, 1)
        background-color rgba(241, 242, 246, 1)
        border 0.185vh solid rgba(53, 52, 54, 1)

    &-image
      width 18.542vw
      background-image url("@/assets/images/about/photo.png")
      background-size 100% 100%
      background-position center
      aspect-ratio 1 / 1

      @media(platform: mobile)
        width 45vw
        border-radius 0.463vh

    &-skills
      font-family "Open Sans"
      font-weight 600
      letter-spacing -8%
      color rgba(141, 141, 141, 1)
      font-size .885vw
      border-left .104vw solid rgba(46, 46, 48, 1)
      padding 2.778vh 0 2.778vh .938vw

      @media(platform: mobile)
        font-size 2.5vw
        margin-left 2vw
        padding 0
        border-left none
        width fit-content

  &__button-arrow
    width .99vw
    margin-left .521vw
    margin-top 2%

    @media(platform: mobile)
      width 2.3vw
      margin-left .7vw
      margin-top 2%

  &__skills-container
    border-left .104vw solid rgba(46, 46, 48, 1)
    padding 0 0 0 2vw
    width fit-content

  &__skills-item
    margin-bottom 4.63vh

    @media(platform: mobile)
      margin-bottom 0

    &:last-of-type
      margin-bottom 0

  &__skills-value
    color rgba(220, 219, 218, 1)

    @media(platform: mobile)
      font-size 4vw

  &__skills-description
    white-space pre-line

    @media(platform: mobile)
      font-size 3vw

  &__container
    position relative

  &__skills-separation
    width 100%
    height 0.104vw
    background-color rgba(46, 46, 48, 1)
    margin 0.726vh 0 0.326vh 0

  &__content-container
    display flex
    align-items flex-start
    justify-content flex-start

  &__text
    @media(platform: mobile)
      font-family "Open Sans"
      font-weight 600
      font-size 2.76vw
      margin-bottom 1vh
      line-height 1.4
      color rgba(141, 141, 141, 1)

  &__skills-list
    @media(platform: mobile)
      padding-left 0
      list-style none

      > li
        margin-bottom 2vh

        &:last-child
          margin-bottom 0

        > strong
          display block
          color #E9ECEC
          font-size 3.2vw
          font-weight 600
          margin-bottom 0.8vh

        > ul
          padding-left 4vw
          list-style disc

          > li
            margin-bottom 0.6vh
            padding-left 0.5vw

            &:last-child
              margin-bottom 0

.about-modal
  position fixed
  inset 0
  width 100%
  height 100dvh
  z-index 9999
  background-color rgba(8, 8, 8, .96)
  padding 4vh 4vw
  box-sizing border-box
  overflow-y auto
  color #E9ECEC
  font-family "Open Sans"

  &__content
    width 100%
    min-height calc(100dvh - 8vh)
    border .052vw solid rgba(255, 255, 255, .15)
    padding 3vh 3vw
    box-sizing border-box

  &__header
    display flex
    justify-content space-between
    align-items center
    margin-bottom 7vh

  &__label
    font-size .885vw
    font-weight 600
    color rgba(141, 141, 141, 1)

  &__close
    width fit-content
    display flex
    align-items center
    justify-content space-between
    padding 1.389vh 1.25vw
    border-radius 1.927vw
    cursor pointer
    transition all .15s ease
    color rgba(241, 242, 246, 1)
    font-size .781vw
    letter-spacing -2%
    font-family "Open Sans"
    font-weight 600
    border .104vw solid rgba(134, 136, 136, 1)

    &:hover
      color #0F0F0F
      background-color #E9ECEC

    &:active
      transform scale(.92)

    &-arrow
      width .99vw
      margin-left .521vw
      margin-top 2%

  &__body
    display flex
    justify-content space-between
    align-items flex-start
    gap 7vw

  &__about
    width 45%

  &__title
    font-family "Inter"
    font-size 4vw
    font-weight 600
    line-height 1
    letter-spacing -.06em
    color rgba(247, 247, 247, 1)
    margin-bottom 2vh

  &__subtitle
    max-width 32vw
    font-size 1.1vw
    line-height 1.5
    color #B5B6B4
    margin-bottom 5vh

  &__text
    max-width 35vw
    font-size .9vw
    line-height 1.7
    color rgba(141, 141, 141, 1)

  &__skills
    width 45%

  &__skills-title
    font-family "Inter"
    font-size 2.5vw
    font-weight 600
    letter-spacing -.05em
    margin-bottom 3vh

  &__skills-block
    padding 2vh 0
    border-top .052vw solid rgba(255, 255, 255, .15)

    &:last-child
      border-bottom .052vw solid rgba(255, 255, 255, .15)

  &__skills-name
    font-size 1vw
    font-weight 600
    color #E9ECEC
    margin-bottom 1.2vh

  &__skills-list
    margin 0
    padding-left 1.2vw
    font-size .8vw
    line-height 1.7
    color rgba(141, 141, 141, 1)
</style>
