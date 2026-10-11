<template lang="pug">
  .app-calendar
    .app-calendar__header
      .app-calendar__header-title 2026
      .app-calendar__header-switcher
        .app-calendar__switcher-button

    .app-calendar__main
      .app-calendar__main-title(
        v-for="title in mainTitles"
        :key="title"
      ) {{ title }}
      .app-calendar__main-description Создаю веб-интерфейсы, совмещая frontend-разработку с интересом к дизайну и визуальной части продукта.

    .app-calendar__learning
      .app-calendar__learning-title Сейчас изучаю

      .app-calendar__learning-blocks
        .app-calendar__learning-block(
          v-for="item in learningItems"
          :key="item.id"
        )
          .app-calendar__learning-dot
          .app-calendar__learning-text {{ item.text }}

      .app-calendar__learning-image

    .app-calendar__directions
      .app-calendar__directions-title Основные направления

      .app-calendar__directions-block(
        v-for="item in directions"
        :key="item.id"
      )
        .app-calendar__directions-number {{ item.number }}
        .app-calendar__directions-text {{ item.text }}

    .app-calendar__footer.unselectable
      a.app-calendar__footer-link(
        v-for="social in socials"
        :key="social.id"
        :href="social.url"
        :aria-label="social.label"
        target="_blank"
        rel="noopener noreferrer"
      )
        component.app-calendar__footer-button(
          :is="social.component"
        )
</template>

<script setup>
import TelegramIcon from '@/components/Calendar/icons/Telegram.vue'
import VkIcon from '@/components/Calendar/icons/Vk.vue'
import WhatsappIcon from '@/components/Calendar/icons/Whatsapp.vue'

const mainTitles = [
  'Frontend.',
  'UI/UX.',
  'Visual.',
]

const learningItems = [
  { id: 1, text: 'Vue.js' },
  { id: 2, text: 'JavaScript' },
  { id: 3, text: 'UI/UX' },
]

const directions = [
  { id: 1, number: '01', text: 'Frontend' },
  { id: 2, number: '02', text: 'UI/UX' },
  { id: 3, number: '03', text: 'Вёрстка' },
]

const socials = [
  {
    id: 1,
    name: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/79141082490',
    component: WhatsappIcon,
  },
  {
    id: 2,
    name: 'vk',
    label: 'ВКонтакте',
    url: 'https://vk.com/dloverd',
    component: VkIcon,
  },
  {
    id: 3,
    name: 'telegram',
    label: 'Telegram',
    url: 'https://t.me/denamored',
    component: TelegramIcon,
  },
]
</script>

<style scoped lang="stylus">
.app-calendar
  width 100%
  height auto
  padding 3.241vh 2.604vw 7.315vh 2.604vw
  background-color rgba(233, 235, 232, 1)
  box-sizing border-box
  border-left 1px solid rgba(210, 210, 210, 1)

  &__header
    &-title
      width 100%
      font-family "Open Sans"
      font-weight 600
      font-size 2.5vw
      color #0E0E0F
      margin-bottom 6.944vh

    &-switcher
      width 100%
      height .37vh
      background-color rgba(217, 217, 217, 1)
      border-radius 1.042vw
      box-shadow inset 0 0 1.5px 1px rgba(0, 0, 0, 0.25)
      position relative

  &__switcher-button
    width 100%
    height .556vh
    background-color rgba(233, 235, 232, 1)
    border-radius 1.042vw
    border 1px solid rgba(207, 207, 207, 1)
    cursor pointer
    transition background-color .15s ease
    position absolute
    left 0
    top 50%
    transform translateY(-50%)

    &:hover
      background-color rgba(125, 125, 125, 1)

    &:active
      background-color black

  &__main
    width 100%
    margin-top 4.63vh

    &-title
      font-family "Open Sans"
      font-size 1.354vw
      font-weight 500
      color rgba(18, 20, 18, 1)

    &-description
      width 11.302vw
      margin-top 2.13vh
      font-family "Open Sans"
      font-size .729vw
      font-weight 500
      color rgba(0, 0, 0, 1)

  &__learning
    margin-top 2.5vh

    &-title
      margin-bottom 1.111vh
      font-family "Open Sans"
      font-weight 600
      font-size .833vw
      color rgba(0, 0, 0, 1)

    &-blocks
      display block

    &-block
      display flex
      justify-content flex-start
      align-items center
      margin-bottom .741vh

      &:last-child
        margin-bottom 2.963vh

    &-dot
      width .521vw
      aspect-ratio 1 / 1
      background-color rgba(111, 199, 130, 1)
      border-radius 50%
      margin-right .417vw

    &-text
      font-family "Open Sans"
      font-size .729vw
      font-weight 500
      color rgba(0, 0, 0, 1)

    &-image
      width 100%
      min-height 13.148vh
      margin-bottom 5.093vh
      background-image url('../../assets/images/calendar/learning_image.png')
      background-size 100% 100%
      background-repeat no-repeat
      background-position center

  &__directions
    margin-bottom 15.37vh

    &-title
      width 10.156vw
      margin-bottom 1.759vh
      font-family "Open Sans"
      font-weight 600
      font-size .833vw
      color rgba(0, 0, 0, 1)

    &-block
      display flex
      justify-content flex-start
      align-items center
      margin-bottom 2.963vh
      font-family "Open Sans"
      font-size .833vw
      font-weight 600
      color rgba(0, 0, 0, 1)

      &:last-child
        margin-bottom 0

    &-number
      margin-right 1.771vw

  &__footer
    width 100%
    display flex
    justify-content space-between
    align-items center

    &-link
      display inline-flex
      align-items center
      justify-content center
      color inherit
      text-decoration none
      transition opacity .15s ease

      &:hover
        opacity .7

    &-button
      width 1.35vw
</style>
