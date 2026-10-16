<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import HeroImage from './assets/header_bg.png'
import VoltImage from './assets/volt.png'
import NovaImage from './assets/nova.png'
import EchoImage from './assets/echo.png'
import ScheduleBlackImage from './assets/schedule_black.png'
import ScheduleImage from './assets/schedule.png'
import LogoImage from './assets/logo.png'
import HeroTitleImage from './assets/header_title.png'
import EchoTitleImage from './assets/echo_title.png'
import VoltTitleImage from './assets/volt_title.png'
import NovaTitleImage from './assets/nova_title.png'
import ScheduleTitleImage from './assets/schedule_title.png'
import TicketsTitleImage from './assets/tickets_title.png'
import LineupTitleImage from './assets/lineup_title.png'
import CtaTitleImage from './assets/cta_title.png'
import ArrowLongIcon from './components/ArrowLong.vue'
import ArrowShortIcon from '@/components/ArrowShort.vue'
import ArrowMediumIcon from './components/ArrowMedium.vue'
import ArrowShort from '@/components/ArrowShort.vue'

const isLoading = ref(true)
const siteLoaded = ref(false)

const loaderText = ref('P')
const pulseWord = 'PULSE'

const lineupSection = ref(null)
const scheduleSection = ref(null)
const ticketsSection = ref(null)
const ctaSection = ref(null)

const lineupVisible = ref(false)
const scheduleVisible = ref(false)
const ticketsVisible = ref(false)
const ctaVisible = ref(false)

let loaderTimer = null
let revealObserver = null

const artists = [
  {
    id: 1,
    name: VoltTitleImage,
    city: 'Берлин',
    style: 'Техно',
    date: '18.07',
    description: 'Энергия<br>  без границ',
    image: VoltImage,
  },
  {
    id: 2,
    name: NovaTitleImage,
    city: 'Париж',
    style: 'Хаус',
    date: '18.07',
    description: 'Свет<br> внутри нас',
    image: NovaImage,
  },
  {
    id: 3,
    name: EchoTitleImage,
    city: 'Лондон',
    style: 'Басс',
    date: '19.07',
    description: 'Отзвук<br> движения',
    image: EchoImage,
  },
]

const firstDay = [
  ['16:00', 'LUMA'],
  ['17:30', 'VOLT'],
  ['19:00', 'KREES'],
  ['21:00', 'NOVA'],
  ['23:00', 'ASTRAL (LIVE)'],
  ['01:00', 'MATRIX'],
]

const secondDay = [
  ['16:00', 'SINE'],
  ['17:30', 'ECHO'],
  ['19:00', 'BLANKA'],
  ['21:00', 'TOR'],
  ['23:00', 'KALT (LIVE)'],
  ['01:00', 'ENDLESS'],
]

const preloadImages = [
  HeroImage,
  VoltImage,
  NovaImage,
  EchoImage,
  ScheduleImage,
  ScheduleBlackImage,
  LogoImage,
  HeroTitleImage,
  VoltTitleImage,
  NovaTitleImage,
  EchoTitleImage,
  ScheduleTitleImage,
  TicketsTitleImage,
  LineupTitleImage,
  CtaTitleImage,
]

const heroStyle = computed(() => ({
  backgroundImage: `url(${HeroImage})`,
}))

const scheduleImageStyle = computed(() => ({
  backgroundImage: `url(${ScheduleBlackImage})`,
}))

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const animateLoader = () => {
  let index = 1

  const tick = () => {
    index += 1

    if (index > pulseWord.length) {
      index = 1
    }

    loaderText.value = pulseWord.slice(0, index)

    loaderTimer = setTimeout(tick, 180)
  }

  loaderTimer = setTimeout(tick, 180)
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

    image.onload = finish
    image.onerror = resolve
    image.decoding = 'async'
    image.src = src

    if (image.complete && image.naturalWidth > 0) {
      finish()
    }
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

const scrollTo = (selector) => {
  document.querySelector(selector)?.scrollIntoView({
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

const openTicket = () => {
  scrollTo('#tickets')
}

const setupObserver = () => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        if (entry.target === lineupSection.value) {
          lineupVisible.value = true
        }

        if (entry.target === scheduleSection.value) {
          scheduleVisible.value = true
        }

        if (entry.target === ticketsSection.value) {
          ticketsVisible.value = true
        }

        if (entry.target === ctaSection.value) {
          ctaVisible.value = true
        }

        revealObserver.unobserve(entry.target)
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px',
    },
  )

  if (lineupSection.value) {
    revealObserver.observe(lineupSection.value)
  }

  if (scheduleSection.value) {
    revealObserver.observe(scheduleSection.value)
  }

  if (ticketsSection.value) {
    revealObserver.observe(ticketsSection.value)
  }

  if (ctaSection.value) {
    revealObserver.observe(ctaSection.value)
  }
}

const onLoaderAfterLeave = () => {
  siteLoaded.value = true
  document.body.style.overflow = ''
  setupObserver()
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'

  animateLoader()

  await Promise.all([
    waitForFonts(),
    ...preloadImages.map(preloadImage),
    wait(1000),
  ])

  clearTimeout(loaderTimer)

  loaderText.value = pulseWord

  await wait(350)

  isLoading.value = false
})

onBeforeUnmount(() => {
  clearTimeout(loaderTimer)
  revealObserver?.disconnect()
  document.body.style.overflow = ''
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
      .loader(v-if="isLoading")
        .loader__logo {{ loaderText }}

        .loader__line
          .loader__line-progress

    header.header
      .header__brand
        img.header__brand-icon(
          :src="LogoImage"
          alt="Pulse"
        )

      nav.header__nav
        .header__nav-item.unselectable(
          @click="scrollTo('#lineup')"
        ) Лайнап

        .header__nav-item.unselectable(
          @click="scrollTo('#schedule')"
        ) Программа

        .header__nav-item.unselectable(
          @click="scrollTo('#tickets')"
        ) Билеты

      .header__menu
        span
        span

    main
      section.hero
        .hero__background(
          :style="heroStyle"
        )

        .hero__overlay

        .hero__content
          .hero__eyebrow !{'Фестиваль<br> электронной<br> музыки'}
          img.hero__title(
            :src="HeroTitleImage"
          )
          .hero__date 18 — 19 ИЮЛЯ 2027
          .hero__location !{'Индустриальная территория<br> Москва'}

          button.hero__button.unselectable(
            @click="openTicket"
          )
            span Купить билет
            ArrowLongIcon.hero__button-arrow

        .hero__right-label
          span Люди
          span Звук
          span Свобода
          span Движение

        .hero__right-label_bottom
          .hero__right-label_line
          span !{'Больше чем<br> музыка'}

      section.lineup#lineup(
        ref="lineupSection"
        :class="{ 'is-visible': lineupVisible }"
      )
        .lineup__header
          .lineup__eyebrow !{'Главные<br> артисты'}
          img.lineup__title(
            :src="LineupTitleImage"
          )
          .lineup__line
        .lineup__items
          .artist(
            v-for="(artist, index) in artists"
            :key="artist.id"
            :style="{ '--delay': `${index * 120}ms` }"
          )
            .artist__image-wrap
              img.artist__image(
                :src="artist.image"
                :alt="artist.name"
              )

              .artist__top
                .artist__top-left
                  span {{artist.style}}
                  span {{ artist.city }}
                span {{ artist.date }}

              .artist__bottom
                img.artist__name(
                  :src="artist.name"
                )

                .artist__description(v-html="artist.description")

      section.schedule#schedule(
        ref="scheduleSection"
        :class="{ 'is-visible': scheduleVisible }"
      )
        .schedule__content
          .schedule__header
            .schedule__eyebrow !{'Программа<br> фестиваля'}

            img.schedule__title(:src="ScheduleTitleImage")

            .schedule__line

          .schedule__days
            .schedule__day
              .schedule__date 18 ИЮЛЯ 2027

              .schedule__row(
                v-for="item in firstDay"
                :key="item[0]"
              )
                .schedule__time {{ item[0] }}
                .schedule__artist {{ item[1] }}

            .schedule__separation
            .schedule__day
              .schedule__date 19 ИЮЛЯ 2027

              .schedule__row(
                v-for="item in secondDay"
                :key="item[0]"
              )
                .schedule__time {{ item[0] }}
                .schedule__artist {{ item[1] }}

          .schedule__image(
            :style="scheduleImageStyle"
          )
            .schedule__image-title !{'ДВА ДНЯ<br> ОДИН РИТМ<br> ТЫСЯЧИ ЛЮДЕЙ'}
            .schedule__image-line

        .tickets#tickets(
          ref="ticketsSection"
          :class="{ 'is-visible': ticketsVisible }"
          :style="{backgroundImage: `url(${ScheduleImage})`}"
        )
          .tickets__eyebrow Билеты

          img.tickets__title(:src="TicketsTitleImage")

          .tickets__card
            .tickets__type Стандартный билет
            .tickets__price 6900₽

            .tickets__description !{'ДВА ДНЯ ФЕСТИВАЛЯ<br> ВСЕ СЦЕНЫ<br> БЕЗ ОГРАНИЧЕНИЙ'}

            button.tickets__arrow.unselectable
              ArrowShortIcon.tickets__arrow-icon

      section.cta(
        ref="ctaSection"
        :class="{ 'is-visible': ctaVisible }"
      )
        img.cta__title(:src="CtaTitleImage")

        .cta__meta
          span 18 — 19 ИЮЛЯ 2027
          span •
          span МОСКВА
          span •
          span 18+

        button.cta__button.unselectable(
          @click="openTicket"
        )
          span Купить билет
          ArrowLongIcon.cta__button-arrow

      footer.footer
        .footer__line

        .footer__top
          .footer__brand
            img.footer__brand-logo(
              :src="LogoImage"
              alt="Pulse"
            )

            .footer__brand-text Музыка. Люди. Движение.

          .footer__column
            .footer__column-title Фестиваль
            .footer__item(
              @click="scrollTo('#lineup')"
            ) Лайнап
            .footer__item(
              @click="scrollTo('#schedule')"
            ) Программа
            .footer__item(
              @click="scrollTo('#tickets')"
            ) Билеты

          .footer__column
            .footer__column-title На связи
            a.footer__item(
              href="mailto:hello@pulse-fest.ru"
            ) hello@pulse-fest.ru
            .footer__item Telegram
            .footer__item ВКонтакте

        .footer__bottom
          .footer__copyright © 2027 PULSE

          .footer__bottom-right
            .footer__privacy Политика конфиденциальности
            .footer__separation
            .footer__top-button.unselectable(
              @click="scrollToTop"
            )
              span Наверх
              ArrowShortIcon.footer__arrow
</template>

<style lang="stylus" scoped>
.app
  width 100%
  overflow hidden
  background-color #0A0D0D
  color #F6F6F2

.loader
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 99999
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color #080B09

  &__logo
    min-width 12vw
    display flex
    justify-content center
    font-family Impact, sans-serif
    font-size 4vw
    font-style italic
    letter-spacing -.1vw
    color #B9FF1A
    margin-bottom 3vh

  &__line
    width 8vw
    height .2vh
    overflow hidden
    background-color rgba(185, 255, 26, .15)

  &__line-progress
    width 100%
    height 100%
    background-color #B9FF1A
    transform translateX(-100%)
    animation loading-line 1.5s ease-in-out infinite

.header
  width 100%
  padding 1.944vh 7.552vw 0 2.396vw
  box-sizing border-box
  position absolute
  top 0
  left 0
  z-index 20
  display flex
  align-items center
  opacity 0
  transform translateY(-3vh)

  &__brand
    margin-right 4.01vw

  &__brand-icon
    width 13.177vw
    height 9.444vh
    display block

  &__nav
    display flex
    align-items center
    gap 3vw

  &__nav-item
    font-family Inter
    font-weight 400
    font-size 1.25vw
    color #FFFFFF
    cursor pointer
    transition color .25s ease

    &:hover
      color #B9FF1A

  &__menu
    width 2vw
    margin-left auto
    display flex
    flex-direction column
    gap .7vh
    cursor pointer

    span
      width 100%
      height 2px
      background-color #B9FF1A

.is-loaded
  .header
    animation header-enter .8s cubic-bezier(.16, 1, .3, 1) forwards

  .hero__background
    animation hero-background-enter 1.4s cubic-bezier(.16, 1, .3, 1) forwards

  .hero__eyebrow
    animation hero-item-enter .7s cubic-bezier(.16, 1, .3, 1) .15s forwards

  .hero__title
    animation hero-title-enter .9s cubic-bezier(.16, 1, .3, 1) .25s forwards

  .hero__date
    animation hero-item-enter .7s cubic-bezier(.16, 1, .3, 1) .42s forwards

  .hero__location
    animation hero-item-enter .7s cubic-bezier(.16, 1, .3, 1) .5s forwards

  .hero__button
    animation hero-item-enter .7s cubic-bezier(.16, 1, .3, 1) .6s forwards

  .hero__right-label
    animation hero-right-enter .8s cubic-bezier(.16, 1, .3, 1) .7s forwards

.hero
  width 100%
  min-height 100vh
  position relative
  overflow hidden
  display flex
  align-items center
  padding-bottom 7.963vh
  border-bottom 0.185vh solid rgba(47, 51, 50, 1)

  &__background
    position absolute
    inset 0
    background-size cover
    background-position center
    background-repeat no-repeat
    opacity 0
    transform scale(1.08)

  &__overlay
    position absolute
    inset 0
    background linear-gradient(90deg, rgba(5, 7, 6, .82) 0%, rgba(5, 7, 6, .15) 55%, rgba(5, 7, 6, .3) 100%)

  &__content
    width 47vw
    margin-left 2.8vw
    position relative
    z-index 2
    padding-top 8vh

  &__eyebrow
    display flex
    justify-content flex-start
    text-align start
    font-family Oswald
    font-weight 400
    font-size 1.25vw
    line-height 1.37
    letter-spacing .22vw
    text-transform uppercase
    margin-top 11.574vh
    opacity 0
    transform translateY(2vh)

  &__title
    margin -2.926vh 0 0 0
    opacity 0
    transform translateY(4vh)
    clip-path inset(100% 0 0 0)

  &__date
    margin-top 1vh
    font-family Oswald
    font-weight 500
    font-size 3.125vw
    color #D7D3DA
    opacity 0
    transform translateY(2vh)

  &__location
    font-family Oswald
    font-weight 500
    font-size 1.25vw
    margin-top 3.944vh
    letter-spacing .22vw
    line-height 1.37
    text-transform uppercase
    opacity 0
    transform translateY(2vh)

  &__button
    margin-top 3vh
    padding 2.778vh 2.76vw
    border 0
    display flex
    align-items center
    justify-content space-between
    background-color #C7FB3C
    color #000000
    font-family Inter
    font-size 1.354vw
    font-weight 700
    text-transform uppercase
    cursor pointer
    opacity 0
    transform translateY(2vh)
    transition transform .25s ease, background-color .25s ease

    &:hover
      transform translateY(-.3vh)
      background-color #D0FF55

  &__button-arrow
    margin-left 1.719vw
    height 2.778vh

  &__right-label
    position absolute
    right 7.552vw
    top 18.519vh
    z-index 2
    display flex
    flex-direction column
    font-family Oswald
    font-weight 500
    font-size 1.042vw
    letter-spacing .16vw
    color #D7D3DA
    text-transform uppercase
    opacity 0
    transform translateX(2vw)

    &_bottom
      position absolute
      display flex
      align-items flex-end
      justify-content flex-end
      right 7.552vw
      bottom 7.685vh
      font-family Oswald
      font-weight 500
      font-size 1.042vw
      letter-spacing 9%
      text-transform uppercase
      line-height 1.34
      color #D7D3DA

    &_line
      width 4.531vw
      height 5px
      background-color #C0BFC4
      margin-bottom 0.741vh
      margin-right 1.406vw

.lineup
  width 100%
  padding 4vh 2.8vw
  box-sizing border-box
  background-color #080B09

  &__header
    display grid
    grid-template-columns 8vw auto 1fr auto
    align-items end
    margin-bottom 1.481vh
    opacity 0
    transform translateY(3vh)
    transition opacity .8s ease, transform .8s cubic-bezier(.16, 1, .3, 1)

  &__eyebrow
    display flex
    flex-direction column
    font-family Oswald
    font-weight 500
    font-size 1.042vw
    text-transform uppercase
    line-height 1.45
    letter-spacing .24vw
    margin-bottom 2.222vh
    margin-right 2.813vw
    width fit-content

  &__title
    margin-right 2.813vw

  &__line
    height 4px
    margin-bottom 4.074vh
    background-color rgba(132, 130, 128, 1)

  &__items
    display flex
    padding 0 0 0 1.563vw

  &.is-visible
    .lineup__header
      opacity 1
      transform translateY(0)

    .artist
      opacity 1
      transform translateY(0)
      transition-delay var(--delay)

.artist
  width 29.792vw
  position relative
  opacity 0
  transform translateY(5vh)
  transition opacity .8s ease, transform .8s cubic-bezier(.16, 1, .3, 1)
  margin-right 1.354vw

  &:last-child
    margin-right 0

  &__image-wrap
    width 100%
    position relative
    overflow hidden

  &__image
    width 100%
    transition transform .8s cubic-bezier(.16, 1, .3, 1), filter .5s ease

  &:hover
    .artist__image
      transform scale(1.035)
      filter contrast(1.1)

  &__top
    width calc(100% - 2vw)
    position absolute
    top 1.2vw
    left 1vw
    display flex
    justify-content space-between
    font-family Oswald
    font-weight 500
    font-size 1.875vw
    letter-spacing 3%
    line-height 1.37
    color #FFFEFE
    text-transform uppercase

    &-left
      display flex
      flex-direction column
      font-size 1.042vw
      line-height 1.42

  &__bottom
    width calc(100% - 2vw)
    position absolute
    left 1vw
    bottom 1vw
    display flex
    justify-content space-between
    align-items end

  &__description
    font-family Oswald
    font-size 1.042vw
    letter-spacing 28%
    text-align end
    line-height 1.4
    text-transform uppercase

.schedule
  width 100%
  display grid
  grid-template-columns 2fr 1fr
  border-top 2px solid rgba(255, 255, 255, .15)
  border-bottom 4px solid rgba(120, 144, 34, 1)

  &__content
    padding 3vh 2.8vw 4vh 2.8vw
    box-sizing border-box
    display grid
    grid-template-columns 1.5fr 1fr
    grid-template-rows auto auto
    gap 2vh 2vw
    opacity 0
    transform translateX(-3vw)
    transition opacity .9s ease, transform 1s cubic-bezier(.16, 1, .3, 1)

  &__header
    grid-column 1 / 3
    display grid
    grid-template-columns auto auto 1fr
    align-items end

  &__eyebrow
    font-family Oswald
    font-size 1.042vw
    letter-spacing 24%
    font-weight 500
    line-height 1.45
    text-transform uppercase
    margin-bottom 2.13vh
    margin-right 2.292vw

  &__title
    margin-right 2.292vw

  &__line
    height 4px
    margin-bottom 4.815vh
    background-color #848280

  &__days
    display flex
    justify-content flex-start
    align-items flex-start

  &__day
    margin-right 2.604vw

    &:last-of-type
      margin-right 0
      margin-left 2.604vw

  &__separation
    height 100%
    width 4px
    background-color rgba(30, 33, 33, 1)

  &__date
    padding-bottom 1.3vh
    font-family Oswald
    font-weight 500
    font-size 1.875vw
    color #C8FF2D
    line-height 1.37
    border-bottom 4px solid rgba(30, 33, 33, 1)

  &__row
    padding 1.019vh 0
    display grid
    grid-template-columns 4vw auto
    border-bottom 4px solid rgba(30, 33, 33, 1)
    font-family Oswald
    font-size 1.25vw
    font-weight 500
    letter-spacing 8%
    line-height 1.37

  &__artist
    letter-spacing 10%
    margin-left 3.958vw
    width 10.573vw

  &__image
    width 100%
    background-size cover
    background-position center
    background-repeat no-repeat
    display flex
    justify-content space-between
    align-items flex-end
    padding 3.241vh 0.156vw
    box-sizing border-box

    &-title
      font-family Oswald
      font-weight 500
      font-size 1.042vw
      line-height 1.39
      letter-spacing 26%
      color #EDECEB

    &-line
      width 4.531vw
      height 0.208vw
      background-color rgba(132, 130, 128, 1)
      margin-bottom 1.389vh

  &.is-visible
    .schedule__content
      opacity 1
      transform translateX(0)

.tickets
  padding 3.519vh 7.031vw 7.13vh 2.448vw
  box-sizing border-box
  position relative
  overflow hidden
  border-left 2px solid rgba(32, 34, 35, 1)
  background-position center
  background-repeat no-repeat
  background-size cover
  opacity 0
  transform translateX(3vw)
  transition opacity .9s ease .15s, transform 1s cubic-bezier(.16, 1, .3, 1) .15s

  &__eyebrow
    font-family Oswald
    font-weight 500
    font-size 1.042vw
    text-transform uppercase
    letter-spacing 24%
    line-height 1.45
    color rgba(215, 211, 218, 1)

  &__title
    margin 2.037vh 0 3.704vh 0

  &__card
    padding 2vh 1.5vw
    position relative
    border 3px solid #BCD634

  &__type
    font-family Oswald
    font-size 1.042vw
    letter-spacing 16%
    line-height 1.45
    text-transform uppercase
    color #FFFFFF
    margin-bottom 0.156vw

  &__price
    line-height 1
    font-family Oswald
    font-size 4.635vw
    font-weight 500
    letter-spacing -5%
    color #FFFFFF
    margin-bottom 2.778vh

  &__description
    display flex
    flex-direction column
    margin-top 2vh
    font-family Oswald
    font-weight 500
    font-size 1.042vw
    line-height 1.59
    letter-spacing 24%
    text-transform uppercase

  &__arrow
    width 3.438vw
    height 3.438vw
    position absolute
    right 1.719vw
    display flex
    justify-content center
    align-items center
    top 3.981vh
    border 4px solid #BCD634
    border-radius 50%
    background transparent
    color #C3DC3C
    cursor pointer
    transition transform .3s ease, background-color .3s ease, color .3s ease

    &-icon
      width 1.979vw
      transform rotateZ(90deg)

    &:hover
      transform rotate(-40deg)
      background-color #BCD634
      color #080B09

  &.is-visible
    opacity 1
    transform translateX(0)

.cta
  padding 7vh 3vw 5vh 3vw
  box-sizing border-box
  display flex
  flex-direction column
  align-items center
  text-align center
  opacity 0
  transform translateY(5vh)
  transition opacity .9s ease, transform 1s cubic-bezier(.16, 1, .3, 1)

  &__title
    margin 0
    font-family Impact, sans-serif
    font-size 7vw
    line-height .9
    font-weight 400
    color #B9FF1A

  &__meta
    margin-top 0.741vh
    display flex
    gap 1vw
    font-family Oswald
    font-weight 500
    font-size 3.704vh
    letter-spacing 6%
    line-height 1.37
    color #F6F5F6

  &__button
    margin-top 2.5vh
    padding 2.407vh 2.865vw
    border 0
    display flex
    justify-content space-between
    align-items center
    font-size 1.354vw
    background-color #C7FB3C
    color #000000
    font-family Inter
    font-weight 700
    text-transform uppercase
    cursor pointer
    transition transform .25s ease

    &:hover
      transform translateY(-.3vh)

    &-arrow
      width 3.021vw
      margin-left 1.667vw

  &.is-visible
    opacity 1
    transform translateY(0)

.footer
  padding 0 4.583vw 7.685vh 4.583vw

  &__line
    width 100%
    height 4px
    background-color #789022

  &__top
    padding 6.852vh 1.042vw
    display grid
    grid-template-columns 2fr 1fr 1fr
    gap 5vw

  &__brand-logo
    width 14.219vw

  &__brand-text
    margin-top 3.796vh
    font-family Oswald
    font-weight 500
    font-size 1.458vw
    letter-spacing 12%

  &__column
    display flex
    flex-direction column
    gap 1vh

  &__column-title
    margin-bottom 2.87vh
    font-family Roboto Mono
    font-size 1.25vw
    text-transform uppercase

  &__item
    font-family Inter
    font-size 1.25vw
    color #D8D9D9
    letter-spacing 2%
    text-decoration none
    cursor pointer
    transition color .2s ease

    &:hover
      color #B9FF1A

  &__bottom
    padding-top 2vh
    border-top 2px solid rgba(116, 117, 117, 1)
    display flex
    justify-content space-between
    font-family Inter
    font-weight 700
    font-size 1.25vw
    letter-spacing 3%
    color #B0AFB2

  &__bottom-right
    display flex
    justify-content flex-end
    align-items center
    color #EBEBEA
    font-weight 500
    letter-spacing -6%

  &__privacy
    margin-right 2.969vw

  &__separation
    height 100%
    width 0.104vw
    background-color #828584
    margin-right 2.969vw

  &__top-button
    display flex
    justify-content space-between
    align-items center
    gap 1vw
    cursor pointer

  &__arrow
    width 1.458vw
    height 2.037vh

.loader-leave-active
  transition opacity .5s ease

.loader-leave-to
  opacity 0

@media(platform: mobile)
  .loader
    &__logo
      min-width 40vw
      font-size 12vw

    &__line
      width 30vw

  .header
    padding 2vh 5vw

    &__brand
      width 32vw

    &__nav
      display none

    &__menu
      width 7vw

  .hero
    min-height 100svh

    &__background
      background-position 58% center

    &__content
      width 90vw
      margin-left 5vw
      padding-top 14vh

    &__eyebrow
      font-size 2.5vw

    &__title
      font-size 19vw

    &__date
      font-size 6vw

    &__location
      font-size 2.3vw

    &__button
      padding 1.8vh 6vw
      font-size 3vw

    &__button-arrow
      font-size 5vw

    &__right-label
      display none

  .lineup
    padding 5vh 5vw

    &__header
      display flex
      flex-wrap wrap
      align-items center
      gap 2vh 4vw

    &__eyebrow
      width 100%
      font-size 2vw

    &__title
      font-size 12vw

    &__line
      flex 1

    &__all
      width 100%
      font-size 2vw

    &__items
      grid-template-columns 1fr
      gap 3vh

  .artist
    &__image
      aspect-ratio 1 / 1.1

    &__top
      top 4vw
      left 4vw
      width calc(100% - 8vw)
      font-size 2.2vw

    &__bottom
      left 4vw
      bottom 4vw
      width calc(100% - 8vw)

    &__name
      font-size 15vw

    &__description
      width 24vw
      font-size 2vw

  .schedule
    grid-template-columns 1fr

    &__content
      padding 5vh 5vw
      display block

    &__header
      display flex
      flex-wrap wrap
      margin-bottom 4vh

    &__eyebrow
      width 100%
      font-size 2vw

    &__title
      font-size 11vw

    &__line
      flex 1
      margin-left 5vw

    &__days
      grid-template-columns 1fr
      gap 4vh

    &__date
      font-size 4vw

    &__row
      grid-template-columns 18vw auto
      font-size 3vw

    &__image
      margin-top 4vh
      min-height 30vh

  .tickets
    padding 5vh 5vw

    &__eyebrow
      font-size 2vw

    &__title
      font-size 12vw

    &__card
      padding 3vh 5vw

    &__type
      font-size 2vw

    &__price
      font-size 11vw

    &__description
      font-size 2.2vw

    &__arrow
      width 12vw
      height 12vw
      right 5vw
      font-size 5vw

  .cta
    padding 8vh 5vw

    &__title
      font-size 15vw

    &__meta
      flex-wrap wrap
      justify-content center
      font-size 3vw

    &__button
      padding 1.8vh 8vw
      font-size 3vw

  .footer
    padding 0 5vw 3vh 5vw

    &__top
      grid-template-columns 1fr
      gap 4vh

    &__brand-logo
      width 35vw

    &__brand-text
      font-size 3vw

    &__column-title
      font-size 2vw

    &__item
      font-size 3vw

    &__bottom
      flex-direction column
      gap 2vh
      font-size 2.5vw

    &__bottom-right
      justify-content space-between

@keyframes loading-line
  0%
    transform translateX(-100%)

  50%
    transform translateX(0)

  100%
    transform translateX(100%)

@keyframes header-enter
  0%
    opacity 0
    transform translateY(-3vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes hero-background-enter
  0%
    opacity 0
    transform scale(1.08)

  100%
    opacity 1
    transform scale(1)

@keyframes hero-item-enter
  0%
    opacity 0
    transform translateY(3vh)

  100%
    opacity 1
    transform translateY(0)

@keyframes hero-title-enter
  0%
    opacity 0
    transform translateY(5vh)
    clip-path inset(100% 0 0 0)

  100%
    opacity 1
    transform translateY(0)
    clip-path inset(0 0 0 0)

@keyframes hero-right-enter
  0%
    opacity 0
    transform translateX(3vw)

  100%
    opacity 1
    transform translateX(0)
</style>
