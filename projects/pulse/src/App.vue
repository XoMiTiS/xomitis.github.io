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

const isLoading = ref(true)
const siteLoaded = ref(false)
const mobileMenuOpen = ref(false)
const ticketModalOpen = ref(false)
const ticketSubmitted = ref(false)
const ticketQuantity = ref(1)
const phoneError = ref(false)

const ticketPrice = 6900

const ticketForm = ref({
  name: '',
  email: '',
  phone: '',
})

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
    description: 'Энергия<br> без границ',
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

const ticketTotal = computed(() => {
  return ticketPrice * ticketQuantity.value
})

const formatPrice = (value) => {
  return new Intl.NumberFormat('ru-RU').format(value)
}

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

const openMobileMenu = () => {
  mobileMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false

  if (!ticketModalOpen.value && !isLoading.value) {
    document.body.style.overflow = ''
  }
}

const toggleMobileMenu = () => {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
    return
  }

  openMobileMenu()
}

const mobileNavigate = (selector) => {
  closeMobileMenu()

  setTimeout(() => {
    scrollTo(selector)
  }, 400)
}

const openTicketModal = () => {
  ticketSubmitted.value = false
  phoneError.value = false
  ticketModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeTicketModal = () => {
  ticketModalOpen.value = false
  phoneError.value = false

  if (!mobileMenuOpen.value && !isLoading.value) {
    document.body.style.overflow = ''
  }
}

const increaseTicketQuantity = () => {
  if (ticketQuantity.value >= 6) {
    return
  }

  ticketQuantity.value += 1
}

const decreaseTicketQuantity = () => {
  if (ticketQuantity.value <= 1) {
    return
  }

  ticketQuantity.value -= 1
}

const formatPhone = (event) => {
  const rawValue = event.target.value
  let digits = rawValue.replace(/\D/g, '')

  phoneError.value = false

  if (rawValue.startsWith('+7')) {
    digits = digits.slice(1)
  } else if (digits.length === 11 && digits.startsWith('8')) {
    digits = digits.slice(1)
  } else if (digits.length === 11 && digits.startsWith('7')) {
    digits = digits.slice(1)
  }

  digits = digits.slice(0, 10)

  if (!digits.length) {
    ticketForm.value.phone = ''
    return
  }

  let formatted = `+7${digits.slice(0, 3)}`

  if (digits.length > 3) {
    formatted += ` ${digits.slice(3, 6)}`
  }

  if (digits.length > 6) {
    formatted += `-${digits.slice(6, 8)}`
  }

  if (digits.length > 8) {
    formatted += `-${digits.slice(8, 10)}`
  }

  ticketForm.value.phone = formatted
}

const validatePhone = () => {
  const digits = ticketForm.value.phone.replace(/\D/g, '')
  phoneError.value = digits.length !== 11
  return !phoneError.value
}

const submitTicket = () => {
  if (!validatePhone()) {
    return
  }

  ticketSubmitted.value = true
}

const onKeydown = (event) => {
  if (event.key !== 'Escape') {
    return
  }

  if (ticketModalOpen.value) {
    closeTicketModal()
    return
  }

  if (mobileMenuOpen.value) {
    closeMobileMenu()
  }
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

  if (!mobileMenuOpen.value && !ticketModalOpen.value) {
    document.body.style.overflow = ''
  }

  setupObserver()
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  animateLoader()
  window.addEventListener('keydown', onKeydown)

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
  window.removeEventListener('keydown', onKeydown)
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

    header.header(
      :class="{ 'header_menu-open': mobileMenuOpen }"
    )
      .header__brand
        img.header__brand-icon(
          :src="LogoImage"
          alt="Pulse"
          draggable="false"
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

      button.header__menu.unselectable(
        type="button"
        :class="{ 'header__menu_open': mobileMenuOpen }"
        :aria-label="mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="mobileMenuOpen"
        @click="toggleMobileMenu"
      )
        span
        span

    Transition(name="mobile-menu")
      .mobile-menu(
        v-if="mobileMenuOpen"
      )
        .mobile-menu__backdrop(
          @click="closeMobileMenu"
        )

        .mobile-menu__panel
          .mobile-menu__label Навигация

          nav.mobile-menu__nav
            .mobile-menu__item.unselectable(
              @click="mobileNavigate('#lineup')"
            )
              span 01
              span Лайнап

            .mobile-menu__item.unselectable(
              @click="mobileNavigate('#schedule')"
            )
              span 02
              span Программа

            .mobile-menu__item.unselectable(
              @click="mobileNavigate('#tickets')"
            )
              span 03
              span Билеты

            .mobile-menu__item.unselectable(
              @click="mobileNavigate('#contacts')"
            )
              span 04
              span Контакты

          .mobile-menu__bottom
            .mobile-menu__date 18 — 19 ИЮЛЯ 2027
            .mobile-menu__city Москва

    Transition(name="ticket-modal")
      .ticket-modal(
        v-if="ticketModalOpen"
      )
        .ticket-modal__backdrop(
          @click="closeTicketModal"
        )

        .ticket-modal__panel(
          role="dialog"
          aria-modal="true"
          aria-label="Покупка билета"
        )
          button.ticket-modal__close.unselectable(
            type="button"
            aria-label="Закрыть"
            @click="closeTicketModal"
          )
            span
            span

          template(v-if="!ticketSubmitted")
            .ticket-modal__header
              .ticket-modal__eyebrow PULSE / TICKETS

              .ticket-modal__title
                span ПОКУПКА
                span БИЛЕТА

              .ticket-modal__header-line

            .ticket-modal__content
              .ticket-modal__ticket
                .ticket-modal__ticket-top
                  .ticket-modal__ticket-label STANDARD
                  .ticket-modal__ticket-number 01

                .ticket-modal__ticket-name
                  span PULSE
                  span 2027

                .ticket-modal__ticket-meta
                  .ticket-modal__ticket-meta-item
                    span Дата
                    strong 18 — 19 ИЮЛЯ

                  .ticket-modal__ticket-meta-item
                    span Город
                    strong МОСКВА

                .ticket-modal__ticket-bottom
                  .ticket-modal__ticket-price
                    span Цена
                    strong {{ formatPrice(ticketPrice) }} ₽

                  .ticket-modal__quantity
                    button.ticket-modal__quantity-button.unselectable(
                      type="button"
                      aria-label="Уменьшить количество"
                      @click="decreaseTicketQuantity"
                    ) −

                    span.ticket-modal__quantity-value {{ ticketQuantity }}

                    button.ticket-modal__quantity-button.unselectable(
                      type="button"
                      aria-label="Увеличить количество"
                      @click="increaseTicketQuantity"
                    ) +

              form.ticket-modal__form(
                @submit.prevent="submitTicket"
              )
                .ticket-modal__form-title Данные покупателя

                label.ticket-modal__field
                  span Имя

                  input(
                    v-model="ticketForm.name"
                    type="text"
                    placeholder="Ваше имя"
                    autocomplete="name"
                    required
                  )

                label.ticket-modal__field
                  span Email

                  input(
                    v-model="ticketForm.email"
                    type="email"
                    placeholder="mail@example.com"
                    autocomplete="email"
                    required
                  )

                label.ticket-modal__field(
                  :class="{ 'ticket-modal__field_error': phoneError }"
                )
                  span Телефон

                  input(
                    :value="ticketForm.phone"
                    type="tel"
                    inputmode="numeric"
                    maxlength="15"
                    placeholder="+7999 999-99-99"
                    autocomplete="tel"
                    @input="formatPhone"
                    @blur="ticketForm.phone && validatePhone()"
                    required
                  )

                  .ticket-modal__field-error(
                    v-if="phoneError"
                  ) Введите номер полностью

                .ticket-modal__summary
                  .ticket-modal__summary-row
                    span Билетов
                    span {{ ticketQuantity }}

                  .ticket-modal__summary-row.ticket-modal__summary-row_total
                    span Итого
                    span {{ formatPrice(ticketTotal) }} ₽

                button.ticket-modal__submit.unselectable(
                  type="submit"
                )
                  span Оформить билет
                  ArrowLongIcon.ticket-modal__submit-arrow

                .ticket-modal__policy
                  | Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных

          .ticket-modal__success(
            v-else
          )
            .ticket-modal__success-index 01 / SUCCESS

            .ticket-modal__success-title
              span БИЛЕТ
              span ОФОРМЛЕН

            .ticket-modal__success-text
              | Подтверждение отправлено на
              br
              strong {{ ticketForm.email }}

            .ticket-modal__success-info
              .ticket-modal__success-row
                span Билетов
                strong {{ ticketQuantity }}

              .ticket-modal__success-row
                span Сумма
                strong {{ formatPrice(ticketTotal) }} ₽

            button.ticket-modal__success-button.unselectable(
              type="button"
              @click="closeTicketModal"
            ) Вернуться на сайт

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
            draggable="false"
            alt="Pulse"
          )

          .hero__date 18 — 19 ИЮЛЯ 2027

          .hero__location !{'Индустриальная территория<br> Москва'}

          button.hero__button.unselectable(
            @click="openTicketModal"
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
            draggable="false"
            alt="Лайнап"
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
                draggable="false"
              )

              .artist__top
                .artist__top-left
                  span {{ artist.style }}
                  span {{ artist.city }}

                span {{ artist.date }}

              .artist__bottom
                img.artist__name(
                  :src="artist.name"
                  draggable="false"
                )

                .artist__description(
                  v-html="artist.description"
                )

      section.schedule#schedule(
        ref="scheduleSection"
        :class="{ 'is-visible': scheduleVisible }"
      )
        .schedule__content
          .schedule__header
            .schedule__eyebrow !{'Программа<br> фестиваля'}

            img.schedule__title(
              :src="ScheduleTitleImage"
              draggable="false"
              alt="Расписание"
            )

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
          :style="{ backgroundImage: `url(${ScheduleImage})` }"
        )
          .tickets__eyebrow Билеты

          img.tickets__title(
            :src="TicketsTitleImage"
            draggable="false"
            alt="Билеты"
          )

          .tickets__card
            .tickets__type Стандартный билет
            .tickets__price 6900₽

            .tickets__description !{'ДВА ДНЯ ФЕСТИВАЛЯ<br> ВСЕ СЦЕНЫ<br> БЕЗ ОГРАНИЧЕНИЙ'}

            button.tickets__arrow.unselectable(
              type="button"
              aria-label="Купить билет"
              @click="openTicketModal"
            )
              ArrowShortIcon.tickets__arrow-icon

      section.cta(
        ref="ctaSection"
        :class="{ 'is-visible': ctaVisible }"
      )
        img.cta__title(
          :src="CtaTitleImage"
          draggable="false"
          alt="Увидимся на танцполе"
        )

        .cta__meta
          span 18 — 19 ИЮЛЯ 2027
          span •
          span МОСКВА
          span •
          span 18+

        button.cta__button.unselectable(
          @click="openTicketModal"
        )
          span Купить билет
          ArrowLongIcon.cta__button-arrow

    footer.footer#contacts
      .footer__line

      .footer__top
        .footer__brand
          img.footer__brand-logo(
            :src="LogoImage"
            alt="Pulse"
            draggable="false"
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
  user-select none
  -webkit-user-select none
  -webkit-tap-highlight-color transparent
  -webkit-user-drag none

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

  &_menu-open
    z-index 1002

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
    width 2.5vw
    height 2vw
    margin-left auto
    padding 0
    border 0
    position relative
    z-index 1003
    display flex
    justify-content center
    align-items center
    background transparent
    cursor pointer

    span
      width 100%
      height 2px
      display block
      position absolute
      left 0
      background-color #B9FF1A
      transform-origin center
      transition top .45s cubic-bezier(.16, 1, .3, 1), transform .45s cubic-bezier(.16, 1, .3, 1)

      &:first-child
        top 32%

      &:last-child
        top 68%

    &_open
      span
        top 50%

        &:first-child
          top 65%
          transform rotate(45deg)

        &:last-child
          transform rotate(-45deg)

.mobile-menu
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 1000

  &__backdrop
    position absolute
    inset 0
    background-color rgba(0, 0, 0, .68)
    backdrop-filter blur(5px)

  &__panel
    width 32vw
    height 100%
    padding 14vh 3.5vw 5vh 3.5vw
    box-sizing border-box
    position absolute
    top 0
    right 0
    display flex
    flex-direction column
    background-color #0A0D0D
    border-left 1px solid rgba(199, 251, 60, .22)

  &__label
    margin-bottom 5vh
    font-family 'Roboto Mono'
    font-size .729vw
    font-weight 500
    letter-spacing .25vw
    text-transform uppercase
    color rgba(255, 255, 255, .4)

  &__nav
    width 100%
    display flex
    flex-direction column

  &__item
    width 100%
    padding 2.3vh 0
    display grid
    grid-template-columns 3vw 1fr
    align-items center
    border-bottom 1px solid rgba(255, 255, 255, .15)
    cursor pointer

    span
      &:first-child
        font-family 'Roboto Mono'
        font-size .729vw
        color #B9FF1A

      &:last-child
        font-family Oswald
        font-size 2.7vw
        font-weight 500
        line-height 1
        text-transform uppercase
        color #FFFFFF
        transition color .25s ease, transform .35s cubic-bezier(.16, 1, .3, 1)

    &:hover
      span
        &:last-child
          color #B9FF1A
          transform translateX(.5vw)

  &__bottom
    margin-top auto
    padding-top 3vh
    border-top 1px solid rgba(255, 255, 255, .15)

  &__date
    font-family Oswald
    font-size 1.354vw
    font-weight 500
    color #B9FF1A

  &__city
    margin-top 1vh
    font-family 'Roboto Mono'
    font-size .729vw
    text-transform uppercase
    color rgba(255, 255, 255, .55)

.ticket-modal
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 2000
  display flex
  justify-content center
  align-items center

  &__backdrop
    position absolute
    inset 0
    background-color rgba(0, 0, 0, .82)
    backdrop-filter blur(8px)

  &__panel
    width 72vw
    min-height 70vh
    padding 4.63vh 3.646vw
    box-sizing border-box
    position relative
    z-index 2
    overflow hidden
    background-color #0A0D0D
    border 2px solid #2F3332

  &__close
    width 2.5vw
    height 2.5vw
    padding 0
    border 0
    position absolute
    top 2vw
    right 2vw
    z-index 4
    background transparent
    cursor pointer

    span
      width 100%
      height 2px
      position absolute
      top 50%
      left 0
      background-color #C8FF2D
      transition transform .3s ease

      &:first-child
        transform rotate(45deg)

      &:last-child
        transform rotate(-45deg)

    &:hover
      span
        &:first-child
          transform rotate(135deg)

        &:last-child
          transform rotate(45deg)

  &__header
    margin-bottom 4.63vh

  &__eyebrow
    margin-bottom 1.481vh
    font-family 'Roboto Mono'
    font-size .729vw
    font-weight 500
    letter-spacing .16vw
    color #C8FF2D

  &__title
    display flex
    flex-direction column
    font-family Oswald
    font-size 4.167vw
    font-weight 500
    line-height .9
    letter-spacing -.1vw

  &__header-line
    width 100%
    height 2px
    margin-top 3vh
    background-color #353837

  &__content
    display grid
    grid-template-columns 1fr 1.1fr
    gap 4.167vw

  &__ticket
    min-height 43vh
    padding 2.778vh 1.823vw
    box-sizing border-box
    position relative
    display flex
    flex-direction column
    overflow hidden
    background-color #C8FF2D
    color #090C0B

  &__ticket-top
    display flex
    justify-content space-between
    font-family 'Roboto Mono'
    font-size .729vw
    font-weight 600
    letter-spacing .1vw

  &__ticket-name
    margin-top 4vh
    display flex
    flex-direction column
    font-family Oswald
    font-size 5.208vw
    font-weight 600
    line-height .78

  &__ticket-meta
    margin-top 4vh
    display grid
    grid-template-columns 1fr 1fr

  &__ticket-meta-item
    display flex
    flex-direction column

    span
      margin-bottom .8vh
      font-family 'Roboto Mono'
      font-size .625vw
      letter-spacing .1vw
      text-transform uppercase

    strong
      font-family Oswald
      font-size 1.25vw
      font-weight 500

  &__ticket-bottom
    margin-top auto
    padding-top 2.5vh
    border-top 2px solid rgba(9, 12, 11, .35)
    display flex
    justify-content space-between
    align-items flex-end

  &__ticket-price
    display flex
    flex-direction column

    span
      margin-bottom .5vh
      font-family 'Roboto Mono'
      font-size .625vw
      text-transform uppercase

    strong
      font-family Oswald
      font-size 2.083vw
      font-weight 500

  &__quantity
    display flex
    align-items center
    border 2px solid #090C0B

  &__quantity-button
    width 2.604vw
    height 2.604vw
    padding 0
    border 0
    background transparent
    color #090C0B
    font-family Oswald
    font-size 1.563vw
    cursor pointer
    transition background-color .2s ease, color .2s ease

    &:hover
      background-color #090C0B
      color #C8FF2D

  &__quantity-value
    width 2.604vw
    text-align center
    font-family Oswald
    font-size 1.042vw
    font-weight 500

  &__form
    display flex
    flex-direction column

  &__form-title
    margin-bottom 3vh
    font-family Oswald
    font-size 1.458vw
    font-weight 500
    letter-spacing .08vw
    text-transform uppercase

  &__field
    margin-bottom 2.5vh
    display flex
    flex-direction column

    span
      margin-bottom .9vh
      font-family 'Roboto Mono'
      font-size .625vw
      letter-spacing .08vw
      text-transform uppercase
      color #969A98

    input
      width 100%
      padding 1.481vh 0
      border 0
      border-bottom 2px solid #3B3E3D
      outline none
      box-sizing border-box
      background transparent
      color #FFFFFF
      font-family Inter
      font-size 1.042vw
      border-radius 0
      transition border-color .25s ease

      &::placeholder
        color #575B59

      &:focus
        border-color #C8FF2D

    &_error
      input
        border-color #FF5353

  &__field-error
    margin-top .7vh
    font-family 'Roboto Mono'
    font-size .573vw
    color #FF5353

  &__summary
    margin-top 1vh
    padding-top 2vh
    border-top 1px solid #353837

  &__summary-row
    margin-bottom 1vh
    display flex
    justify-content space-between
    font-family Inter
    font-size .938vw
    color #A4A6A5

    &_total
      margin-top 1.5vh
      margin-bottom 0
      font-family Oswald
      font-size 1.667vw
      font-weight 500
      color #FFFFFF

  &__submit
    width 100%
    margin-top 3vh
    padding 2.037vh 1.823vw
    border 0
    display flex
    justify-content space-between
    align-items center
    background-color #C8FF2D
    color #090C0B
    font-family Inter
    font-size 1.042vw
    font-weight 700
    text-transform uppercase
    cursor pointer
    transition background-color .25s ease, transform .25s ease

    &:hover
      background-color #D8FF68
      transform translateY(-.2vh)

  &__submit-arrow
    width 2.604vw

  &__policy
    margin-top 1.2vh
    font-family 'Roboto Mono'
    font-size .521vw
    line-height 1.5
    color #656866

  &__success
    min-height 55vh
    display flex
    flex-direction column
    justify-content center
    align-items center
    text-align center

  &__success-index
    margin-bottom 3vh
    font-family 'Roboto Mono'
    font-size .729vw
    letter-spacing .2vw
    color #C8FF2D

  &__success-title
    display flex
    flex-direction column
    font-family Oswald
    font-size 6.25vw
    font-weight 500
    line-height .8
    color #C8FF2D

  &__success-text
    margin-top 4vh
    font-family Inter
    font-size 1.042vw
    line-height 1.5
    color #A9ACAA

    strong
      color #FFFFFF

  &__success-info
    width 25vw
    margin-top 4vh
    border-top 1px solid #353837

  &__success-row
    padding 1.5vh 0
    border-bottom 1px solid #353837
    display flex
    justify-content space-between
    font-family Inter
    font-size .938vw

    strong
      font-family Oswald
      font-size 1.146vw
      font-weight 500
      color #C8FF2D

  &__success-button
    margin-top 4vh
    padding 1.852vh 2.604vw
    border 2px solid #C8FF2D
    background transparent
    color #C8FF2D
    font-family Inter
    font-size .833vw
    font-weight 700
    text-transform uppercase
    cursor pointer
    transition background-color .25s ease, color .25s ease

    &:hover
      background-color #C8FF2D
      color #090C0B

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
  border-bottom .185vh solid rgba(47, 51, 50, 1)

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
      margin-bottom .741vh
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
    display block
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
    padding 3.241vh .156vw
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
      height .208vw
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
    margin-bottom .156vw

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

  &__meta
    margin-top .741vh
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
    font-family 'Roboto Mono'
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
    width .104vw
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

.mobile-menu-enter-active
  .mobile-menu__backdrop
    transition opacity .4s ease

  .mobile-menu__panel
    transition transform .6s cubic-bezier(.16, 1, .3, 1)

.mobile-menu-leave-active
  .mobile-menu__backdrop
    transition opacity .3s ease

  .mobile-menu__panel
    transition transform .4s cubic-bezier(.7, 0, .84, 0)

.mobile-menu-enter-from
  .mobile-menu__backdrop
    opacity 0

  .mobile-menu__panel
    transform translateX(100%)

.mobile-menu-enter-to
  .mobile-menu__backdrop
    opacity 1

  .mobile-menu__panel
    transform translateX(0)

.mobile-menu-leave-from
  .mobile-menu__backdrop
    opacity 1

  .mobile-menu__panel
    transform translateX(0)

.mobile-menu-leave-to
  .mobile-menu__backdrop
    opacity 0

  .mobile-menu__panel
    transform translateX(100%)

.ticket-modal-enter-active
  transition opacity .35s ease

  .ticket-modal__panel
    transition opacity .45s ease, transform .6s cubic-bezier(.16, 1, .3, 1)

.ticket-modal-leave-active
  transition opacity .3s ease

  .ticket-modal__panel
    transition opacity .3s ease, transform .4s cubic-bezier(.7, 0, .84, 0)

.ticket-modal-enter-from
  opacity 0

  .ticket-modal__panel
    opacity 0
    transform translateY(5vh) scale(.97)

.ticket-modal-enter-to
  opacity 1

  .ticket-modal__panel
    opacity 1
    transform translateY(0) scale(1)

.ticket-modal-leave-from
  opacity 1

  .ticket-modal__panel
    opacity 1
    transform translateY(0) scale(1)

.ticket-modal-leave-to
  opacity 0

  .ticket-modal__panel
    opacity 0
    transform translateY(3vh) scale(.98)

@media(platform: mobile)
  .loader
    &__logo
      min-width 40vw
      font-size 12vw

    &__line
      width 30vw

  .header
    padding 2vh 5vw
    align-items center

    &__brand
      width auto
      margin-right 0

    &__brand-icon
      width 34vw
      height auto

    &__nav
      display none

    &__menu
      width 8vw
      height 8vw
      display flex

      span
        height 2px

  .mobile-menu
    &__panel
      width 82vw
      padding 15vh 7vw 6vh 7vw

    &__label
      margin-bottom 6vh
      font-size 2.5vw
      letter-spacing .8vw

    &__item
      padding 2.5vh 0
      grid-template-columns 10vw 1fr

      span
        &:first-child
          font-size 2.5vw

        &:last-child
          font-size 10vw

    &__date
      font-size 4vw

    &__city
      font-size 2.5vw

  .ticket-modal
    align-items flex-end

    &__panel
      width 100%
      height 94dvh
      min-height 0
      padding 8vh 5vw 5vh 5vw
      border-left 0
      border-right 0
      border-bottom 0
      overflow-y auto

    &__close
      width 8vw
      height 8vw
      top 4vw
      right 5vw

    &__header
      margin-bottom 4vh

    &__eyebrow
      font-size 2.5vw
      letter-spacing .5vw

    &__title
      font-size 11vw

    &__header-line
      margin-top 2vh

    &__content
      display flex
      flex-direction column
      gap 5vh

    &__ticket
      min-height 48vh
      padding 3vh 5vw

    &__ticket-top
      font-size 2.5vw

    &__ticket-name
      margin-top 4vh
      font-size 16vw

    &__ticket-meta
      margin-top 4vh

    &__ticket-meta-item
      span
        font-size 2vw

      strong
        font-size 3.5vw

    &__ticket-price
      span
        font-size 2vw

      strong
        font-size 6vw

    &__quantity-button
      width 10vw
      height 10vw
      font-size 6vw

    &__quantity-value
      width 10vw
      font-size 4vw

    &__form-title
      font-size 5vw

    &__field
      margin-bottom 2.5vh

      span
        font-size 2.2vw

      input
        padding 1.7vh 0
        font-size 4vw

    &__field-error
      margin-top 1vh
      font-size 2.2vw

    &__summary-row
      font-size 3vw

      &_total
        font-size 5vw

    &__submit
      padding 2vh 5vw
      font-size 3vw

    &__submit-arrow
      width 8vw

    &__policy
      font-size 2vw

    &__success
      min-height 75vh

    &__success-index
      font-size 2.5vw

    &__success-title
      font-size 17vw

    &__success-text
      font-size 3.5vw

    &__success-info
      width 100%

    &__success-row
      font-size 3vw

      strong
        font-size 4vw

    &__success-button
      padding 2vh 7vw
      font-size 3vw

  .hero
    min-height 100svh
    padding-bottom 4vh

    &__background
      background-position 58% center

    &__overlay
      background linear-gradient(90deg, rgba(5, 7, 6, .85) 0%, rgba(5, 7, 6, .3) 65%, rgba(5, 7, 6, .45) 100%)

    &__content
      width 90vw
      margin-left 5vw
      padding-top 13vh

    &__eyebrow
      margin-top 4vh
      font-size 2.7vw
      letter-spacing .5vw

    &__title
      width 88vw
      height auto
      margin 0

    &__date
      margin-top 2vh
      font-size 6vw

    &__location
      margin-top 2vh
      font-size 2.5vw
      letter-spacing .4vw

    &__button
      margin-top 3vh
      padding 1.8vh 6vw
      font-size 3vw

    &__button-arrow
      width 7vw
      height auto
      margin-left 5vw

    &__right-label
      display none

      &_bottom
        display none

  .lineup
    padding 5vh 5vw

    &__header
      display grid
      grid-template-columns auto 1fr
      align-items end
      margin-bottom 3vh

    &__eyebrow
      grid-column 1 / 3
      width 100%
      margin-bottom 2vh
      margin-right 0
      font-size 2.5vw
      letter-spacing .6vw

    &__title
      width 38vw
      height auto
      margin-right 4vw

    &__line
      width 100%
      height 2px
      margin-bottom 1vh

    &__items
      width 100%
      padding 0
      display flex
      flex-direction column

  .artist
    width 100%
    margin-right 0
    margin-bottom 3vh

    &:last-child
      margin-bottom 0

    &__image-wrap
      width 100%

    &__image
      width 100%
      display block
      aspect-ratio 1 / 1.1
      object-fit cover

    &__top
      width calc(100% - 8vw)
      top 4vw
      left 4vw
      font-size 5vw

      &-left
        font-size 2.8vw
        line-height 1.4

    &__bottom
      width calc(100% - 8vw)
      left 4vw
      bottom 4vw

    &__name
      width 42vw
      height auto

    &__description
      width 30vw
      font-size 2.5vw
      line-height 1.4
      letter-spacing .5vw

  .schedule
    display flex
    flex-direction column
    border-top 2px solid rgba(255, 255, 255, .15)
    border-bottom 2px solid #789022

    &__content
      width 100%
      padding 5vh 5vw
      display block

    &__header
      display grid
      grid-template-columns auto 1fr
      margin-bottom 4vh

    &__eyebrow
      grid-column 1 / 3
      width 100%
      margin-bottom 2vh
      margin-right 0
      font-size 2.5vw
      letter-spacing .6vw

    &__title
      width 52vw
      height auto
      margin-right 4vw

    &__line
      width 100%
      height 2px
      margin-bottom 1vh

    &__days
      width 100%
      display flex
      flex-direction column

    &__day
      width 100%
      margin-right 0
      margin-bottom 4vh

      &:last-of-type
        margin-left 0
        margin-bottom 0

    &__separation
      display none

    &__date
      font-size 5vw
      border-bottom 2px solid rgba(30, 33, 33, 1)

    &__row
      padding 1.4vh 0
      grid-template-columns 20vw 1fr
      border-bottom 2px solid rgba(30, 33, 33, 1)
      font-size 3.2vw

    &__artist
      width auto
      margin-left 0

    &__image
      width 100%
      min-height 35vh
      margin-top 4vh
      padding 3vh 3vw

      &-title
        font-size 2.5vw

      &-line
        width 14vw
        height 2px

  .tickets
    width 100%
    min-height 55vh
    padding 5vh 5vw
    border-left 0
    background-position center
    background-size cover

    &__eyebrow
      font-size 2.5vw
      letter-spacing .6vw

    &__title
      width 55vw
      height auto
      margin 2vh 0 4vh 0

    &__card
      width 100%
      padding 3vh 5vw
      box-sizing border-box
      border 2px solid #BCD634

    &__type
      font-size 2.5vw
      margin-bottom 1vh

    &__price
      font-size 12vw
      margin-bottom 3vh

    &__description
      margin-top 0
      font-size 2.5vw
      line-height 1.6
      letter-spacing .5vw

    &__arrow
      width 12vw
      height 12vw
      top 4vh
      right 5vw
      border-width 2px

      &-icon
        width 7vw

  .cta
    padding 7vh 5vw

    &__title
      width 90vw
      height auto

    &__meta
      margin-top 2vh
      flex-wrap wrap
      justify-content center
      gap 1vw 2vw
      font-size 4vw

    &__button
      margin-top 3vh
      padding 1.8vh 7vw
      font-size 3vw

      &-arrow
        width 7vw
        margin-left 5vw

  .footer
    padding 0 5vw 4vh 5vw

    &__line
      height 2px

    &__top
      padding 5vh 0
      display flex
      flex-direction column

    &__brand
      margin-bottom 5vh

    &__brand-logo
      width 38vw

    &__brand-text
      margin-top 2vh
      font-size 3vw

    &__column
      margin-bottom 4vh

      &:last-child
        margin-bottom 0

    &__column-title
      margin-bottom 2vh
      font-size 2.5vw

    &__item
      font-size 3.5vw
      margin-bottom 1vh

    &__bottom
      padding-top 3vh
      flex-direction column
      align-items flex-start
      font-size 2.5vw

    &__bottom-right
      width 100%
      margin-top 3vh
      justify-content space-between

    &__privacy
      margin-right 0

    &__separation
      display none

    &__top-button
      gap 2vw

    &__arrow
      width 4vw
      height auto

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
