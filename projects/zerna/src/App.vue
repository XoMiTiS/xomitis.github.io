<template lang="pug">
  .zerna
    Transition(name="loader")
      .zerna-loader(v-if="isLoading")
        .zerna-loader__logo {{ loaderText }}
        .zerna-loader__line
          .zerna-loader__line-progress

    section.zerna__hero(
      :style="{ backgroundImage: `url(${HeroImage})` }"
    )
      .zerna__header
        .zerna__header-logo.unselectable(
          @click="scrollToTop"
        )
          img(
            :src="LogoBrown"
            alt="ZЁRNA"
            draggable="false"
          )

        .zerna__header-buttons
          a.zerna__header-button.unselectable(
            @click="scrollTo('#coffee')"
          ) Кофе

          a.zerna__header-button.unselectable(
            @click="scrollTo('#about')"
          ) О нас

          a.zerna__header-button.unselectable(
            @click="scrollTo('#delivery')"
          ) Доставка

        .zerna__header-actions
          button.zerna__header-basket.unselectable(
            type="button"
            aria-label="Открыть корзину"
            @click="openBasket"
          )
            BasketIcon.zerna__header-basket_icon

            span.zerna__header-basket_count(
              v-if="cartCount"
            ) {{ cartCount }}

          button.zerna__header-menu.unselectable(
            type="button"
            :class="{ 'zerna__header-menu_open': menuOpen }"
            aria-label="Открыть меню"
            @click="toggleMenu"
          )
            span
            span

      .zerna__hero-title
        span !{'Хороший<br> день<br> начинается<br> с зерна'}

      .zerna__hero-description
        span !{'Спешелти-кофе для тех,<br> кто ценит вкус, людей<br> и большие планы.'}

      button.zerna__hero-button.unselectable(
        type="button"
        @click="scrollTo('#coffee')"
      )
        span Выбрать кофе
        ArrowIcon.zerna__hero-button_arrow

      .zerna__hero-advantages
        .zerna__hero-advantage
          img.zerna__hero-advantage_icon(:src="LeafIcon")
          .zerna__hero-advantage_text
            span Отборные
            span зёрна

        .zerna__hero-advantage
          img.zerna__hero-advantage_icon(:src="SunIcon")
          .zerna__hero-advantage_text
            span Свежая
            span обжарка

        .zerna__hero-advantage
          img.zerna__hero-advantage_icon(:src="DeliveryIcon")
          .zerna__hero-advantage_text
            span Быстрая
            span доставка

    section.zerna__coffee#coffee
      .zerna__coffee-title
        span Найди свой вкус

      .zerna__coffee-items
        article.zerna__coffee-item(
          v-for="product in products"
          :key="product.id"
        )
          .zerna__coffee-image
            img(
              :src="product.image"
              :alt="product.title"
              draggable="false"
            )

          .zerna__coffee-content
            .zerna__coffee-name {{ product.title }}

            .zerna__coffee-description {{ product.description }}

            .zerna__coffee-tags
              span.zerna__coffee-tag(
                v-for="tag in product.tags"
                :key="tag"
              ) {{ tag }}

            .zerna__coffee-bottom
              .zerna__coffee-price {{ formatPrice(product.price) }} ₽

              button.zerna__coffee-basket.unselectable(
                type="button"
                :aria-label="`Добавить ${product.title} в корзину`"
                @click="addToCart(product)"
              )
                BasketIcon.zerna__coffee-basket_icon

    section.zerna__about#about
      .zerna__about-image
        img(
          :src="HistoryImage"
          alt="Обжарка кофе ZЁRNA"
          draggable="false"
        )

      .zerna__about-content
        .zerna__about-eyebrow Наша история

        .zerna__about-title
          span !{'Больше,<br> чем просто кофе'}

        .zerna__about-description
          span
            | ZЁRNA — независимая кофейня и обжарка.
            br
            | Мы сами выбираем зёрна на фермах, бережно
            br
            | обжариваем небольшими партиями и делимся
            br
            | кофе, который вдохновляет.

        .zerna__about-advantages
          .zerna__about-advantage
            img.zerna__about-advantage_icon(:src="Leaf2Icon")
            .zerna__about-advantage_text
              span Прямые
              span поставки с ферм

          .zerna__about-separation

          .zerna__about-advantage
            img.zerna__about-advantage_icon(:src="FlameIcon")
            .zerna__about-advantage_text
              span Обжарка
              span в Санкт-Петербурге

          .zerna__about-separation

          .zerna__about-advantage
            img.zerna__about-advantage_icon(:src="HeartIcon")
            .zerna__about-advantage_text
              span Люди, которые
              span любят кофе

        button.zerna__about-button.unselectable(
          type="button"
        )
          span Узнать нашу историю
          ArrowIcon.zerna__about-button_arrow

    section.zerna__cta#delivery(
      :style="{ backgroundImage: `url(${CurrentCoffeeImage})` }"
    )
      .zerna__cta-eyebrow Твоё следующее утро

      .zerna__cta-title
        span Начни день с хорошего кофе

      .zerna__cta-description
        span Свежая обжарка. Любимый вкус. Доставка к твоей двери.

      button.zerna__cta-button.unselectable(
        type="button"
        @click="scrollTo('#coffee')"
      )
        span Выбрать кофе
        ArrowIcon.zerna__cta-button_arrow

    footer.zerna__footer
      .zerna__footer-top
        .zerna__footer-brand
          img.zerna__footer-logo(
            :src="LogoWhite"
            alt="ZЁRNA"
            draggable="false"
          )

          .zerna__footer-description Кофе для хороших дней

        .zerna__footer-column
          .zerna__footer-column_title Кофе

          .zerna__footer-column_item(
            @click="scrollTo('#coffee')"
          ) Для фильтра

          .zerna__footer-column_item(
            @click="scrollTo('#coffee')"
          ) Для эспрессо

          .zerna__footer-column_item(
            @click="scrollTo('#coffee')"
          ) Все сорта

        .zerna__footer-column
          .zerna__footer-column_title Информация

          .zerna__footer-column_item(
            @click="scrollTo('#about')"
          ) О нас

          .zerna__footer-column_item(
            @click="scrollTo('#delivery')"
          ) Доставка и оплата

          .zerna__footer-column_item Вопросы и ответы

        .zerna__footer-column
          .zerna__footer-column_title На связи

          a.zerna__footer-column_item(
            href="mailto:hello@zerna.coffee"
          ) hello@zerna.coffee

          .zerna__footer-column_item Санкт-Петербург
          .zerna__footer-column_item Telegram

      .zerna__footer-line

      .zerna__footer-bottom
        .zerna__footer-copyright © 2026 ZЁRNA

        .zerna__footer-bottom_right
          .zerna__footer-policy Политика конфиденциальности

          button.zerna__footer-up.unselectable(
            type="button"
            @click="scrollToTop"
          )
            span Наверх
            span ↑

    Transition(name="menu")
      .zerna-menu(
        v-if="menuOpen"
      )
        .zerna-menu__backdrop(
          @click="closeMenu"
        )

        .zerna-menu__panel
          .zerna-menu__logo
            img(
              :src="LogoBrown"
              alt="ZЁRNA"
              draggable="false"
            )

          .zerna-menu__items
            .zerna-menu__item.unselectable(
              @click="mobileNavigate('#coffee')"
            ) Кофе

            .zerna-menu__item.unselectable(
              @click="mobileNavigate('#about')"
            ) О нас

            .zerna-menu__item.unselectable(
              @click="mobileNavigate('#delivery')"
            ) Доставка

          .zerna-menu__bottom
            span Кофе для хороших дней
            span Санкт-Петербург

    Transition(name="basket")
      .zerna-basket(
        v-if="basketOpen"
      )
        .zerna-basket__backdrop(
          @click="closeBasket"
        )

        .zerna-basket__panel
          .zerna-basket__header
            .zerna-basket__title Корзина

            button.zerna-basket__close.unselectable(
              type="button"
              aria-label="Закрыть корзину"
              @click="closeBasket"
            )
              span
              span

          template(v-if="cart.length")
            .zerna-basket__items
              .zerna-basket__item(
                v-for="item in cart"
                :key="item.id"
              )
                img.zerna-basket__image(
                  :src="item.image"
                  :alt="item.title"
                  draggable="false"
                )

                .zerna-basket__info
                  .zerna-basket__name {{ item.title }}

                  .zerna-basket__description {{ item.description }}

                  .zerna-basket__bottom
                    .zerna-basket__price {{ formatPrice(item.price) }} ₽

                    .zerna-basket__quantity
                      button.unselectable(
                        type="button"
                        @click="decreaseQuantity(item)"
                      ) −

                      span {{ item.quantity }}

                      button.unselectable(
                        type="button"
                        @click="increaseQuantity(item)"
                      ) +

            .zerna-basket__summary
              .zerna-basket__summary-row
                span Товаров
                span {{ cartCount }}

              .zerna-basket__summary-row.zerna-basket__summary-row_total
                span Итого
                span {{ formatPrice(cartTotal) }} ₽

            button.zerna-basket__checkout.unselectable(
              type="button"
            )
              span Оформить заказ
              ArrowIcon.zerna-basket__checkout_arrow

          .zerna-basket__empty(
            v-else
          )
            .zerna-basket__empty-title Корзина пуста

            .zerna-basket__empty-description
              span Выберите кофе, который хочется попробовать.

            button.zerna-basket__empty-button.unselectable(
              type="button"
              @click="goToCoffee"
            ) Выбрать кофе
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import BasketIcon from '@/components/icons/Basket.vue'
import ArrowIcon from '@/components/icons/Arrow.vue'
import HeroImage from '@/assets/hero.webp'
import EthiopiaImage from '@/assets/coffee_efiopia-gedeo.webp'
import ColombiaImage from '@/assets/coffee_colombia-uila.webp'
import BrazilImage from '@/assets/coffee_brazil-serrado.webp'
import HistoryImage from '@/assets/history_image.webp'
import CurrentCoffeeImage from '@/assets/current-coffee_image.webp'
import LogoBrown from '@/assets/logo_brown.webp'
import LogoWhite from '@/assets/logo_white.webp'
import LeafIcon from '@/assets/leaf_1.svg'
import SunIcon from '@/assets/sun_1.svg'
import DeliveryIcon from '@/assets/delivery_1.svg'
import Leaf2Icon from '@/assets/leaf_2.svg'
import HeartIcon from '@/assets/heart.svg'
import FlameIcon from '@/assets/flame.svg'

const menuOpen = ref(false)
const basketOpen = ref(false)
const cart = ref([])
const isLoading = ref(true)
const loaderText = ref('Z')
const loaderWord = 'ZЁRNA'

const products = [
  {
    id: 'ethiopia',
    title: 'Эфиопия Гедео',
    description: 'Жасмин · Бергамот · Персик',
    tags: [
      'Фильтр',
      'Светлая обжарка',
    ],
    price: 990,
    image: EthiopiaImage,
  },
  {
    id: 'colombia',
    title: 'Колумбия Уила',
    description: 'Красные ягоды · Карамель · Цитрус',
    tags: [
      'Универсальная',
      'Средняя обжарка',
    ],
    price: 890,
    image: ColombiaImage,
  },
  {
    id: 'brazil',
    title: 'Бразилия Серрадо',
    description: 'Шоколад · Орехи · Карамель',
    tags: [
      'Эспрессо',
      'Средняя обжарка',
    ],
    price: 790,
    image: BrazilImage,
  },
]

const preloadImages = [
  HeroImage,
  EthiopiaImage,
  ColombiaImage,
  BrazilImage,
  HistoryImage,
  CurrentCoffeeImage,
  LogoBrown,
  LogoWhite,
  LeafIcon,
  SunIcon,
  DeliveryIcon,
  Leaf2Icon,
  HeartIcon,
  FlameIcon,
]

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const animateLoader = async () => {
  loaderText.value = loaderWord.slice(0, 1)

  for (let index = 2; index <= loaderWord.length; index++) {
    await wait(180)
    loaderText.value = loaderWord.slice(0, index)
  }

  await wait(450)
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU').format(price)
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

const lockBody = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBody = () => {
  if (!menuOpen.value && !basketOpen.value) {
    document.body.style.overflow = ''
  }
}

const openBasket = () => {
  basketOpen.value = true
  lockBody()
}

const closeBasket = () => {
  basketOpen.value = false

  setTimeout(() => {
    unlockBody()
  }, 400)
}

const addToCart = (product) => {
  const currentProduct = cart.value.find((item) => {
    return item.id === product.id
  })

  if (currentProduct) {
    currentProduct.quantity += 1
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
    })
  }

  openBasket()
}

const increaseQuantity = (item) => {
  item.quantity += 1
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1
    return
  }

  cart.value = cart.value.filter((product) => {
    return product.id !== item.id
  })
}

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu()
    return
  }

  menuOpen.value = true
  lockBody()
}

const closeMenu = () => {
  menuOpen.value = false

  setTimeout(() => {
    unlockBody()
  }, 400)
}

const mobileNavigate = (selector) => {
  closeMenu()

  setTimeout(() => {
    scrollTo(selector)
  }, 350)
}

const goToCoffee = () => {
  closeBasket()

  setTimeout(() => {
    scrollTo('#coffee')
  }, 350)
}

const onKeydown = (event) => {
  if (event.key !== 'Escape') {
    return
  }

  if (basketOpen.value) {
    closeBasket()
    return
  }

  if (menuOpen.value) {
    closeMenu()
  }
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)

  await Promise.all([
    animateLoader(),
    waitForFonts(),
    ...preloadImages.map(preloadImage),
    wait(1000),
  ])

  isLoading.value = false

  if (!menuOpen.value && !basketOpen.value) {
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style lang="stylus">
.zerna-loader
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 99999
  display flex
  flex-direction column
  justify-content center
  align-items center
  background-color rgba(253, 245, 236, 1)

  &__logo
    min-width 15vw
    margin-bottom 4vh
    display flex
    justify-content center
    align-items center
    font-family "Playfair Display", serif
    font-weight 600
    font-size 4vw
    line-height 1
    letter-spacing -.03em
    color rgba(38, 15, 5, 1)
    white-space nowrap

  &__line
    width 8vw
    height .2vh
    overflow hidden
    background-color rgba(38, 15, 5, .15)

  &__line-progress
    width 100%
    height 100%
    background-color rgba(0, 50, 192, 1)
    transform translateX(-100%)
    animation zerna-loading-line 1.6s ease-in-out infinite

.loader-leave-active
  transition opacity .55s ease

.loader-leave-to
  opacity 0

@keyframes zerna-loading-line
  0%
    transform translateX(-100%)

  50%
    transform translateX(0)

  100%
    transform translateX(100%)

.zerna
  width 100%
  min-height 100%
  background-color rgba(253, 245, 236, 1)
  font-family Inter
  color rgba(38, 15, 5, 1)

  &__hero
    min-height 100vh
    box-sizing border-box
    background-size cover
    background-position center
    background-repeat no-repeat
    padding 0 5.469vw

    &-title
      margin-top 7.222vh
      margin-bottom 3.981vh
      display flex
      justify-content flex-start
      font-family "Playfair Display"
      font-weight 600
      font-size 6.25vw
      line-height .91
      letter-spacing .02em
      color rgba(38, 15, 5, 1)
      text-align start

    &-description
      margin-bottom 3.611vh
      display flex
      justify-content flex-start
      font-weight 400
      font-size 1.667vw
      line-height 1.27
      color rgba(117, 98, 90, 1)
      text-align start

    &-button
      width fit-content
      margin-bottom 5.926vh
      padding 1.778vh 1.563vw
      border 0
      border-radius 44.5px
      display flex
      justify-content flex-start
      align-items center
      background-color rgba(0, 50, 192, 1)
      font-family Inter
      font-weight 700
      font-size 1.25vw
      letter-spacing .05em
      line-height 1.27
      color rgba(213, 224, 247, 1)
      cursor pointer
      transition transform .25s ease, background-color .25s ease

      &:hover
        transform translateY(-.278vh)
        background-color rgba(0, 43, 166, 1)

      &_arrow
        width 1.771vw
        margin-left .26vw
        margin-top .5vh
        color rgba(238, 232, 227, 1)

    &-advantages
      padding-bottom 4.815vh
      display flex
      align-items center

    &-advantage
      margin-right 3.125vw
      display flex
      align-items center

      &:last-child
        margin-right 0

      &_icon
        width 3.281vw
        margin-right 0.469vw
        display flex
        justify-content center
        align-items center

      &_text
        display flex
        flex-direction column
        font-weight 500
        font-size 1.042vw
        text-align start
        line-height 1.4
        color rgba(59, 42, 29, 1)

  &__header
    padding 1.759vh .781vw 0 .781vw
    display flex
    justify-content space-between
    align-items center

    &-logo
      width 16.302vw
      cursor pointer

      img
        width 100%
        display block

    &-buttons
      display flex
      justify-content space-between

    &-button
      margin-right 3.385vw
      font-weight 500
      font-size 1.354vw
      letter-spacing -.05em
      color rgba(54, 25, 11, 1)
      cursor pointer
      transition color .25s ease

      &:last-child
        margin-right 0

      &:hover
        color rgba(0, 50, 192, 1)

    &-actions
      display flex
      align-items center

    &-basket
      width 2.188vw
      height 3.889vh
      padding 0
      border 0
      position relative
      display flex
      justify-content center
      align-items center
      background transparent
      color rgba(240, 236, 235, 1)
      cursor pointer

      &_icon
        width 100%
        height 100%

      &_count
        min-width 1.042vw
        height 1.042vw
        padding 0 .156vw
        box-sizing border-box
        position absolute
        top -.463vh
        right -.521vw
        border-radius 50%
        display flex
        justify-content center
        align-items center
        background-color rgba(0, 50, 192, 1)
        color white
        font-size .573vw
        font-weight 600

    &-menu
      display none

  &__coffee
    padding 3.704vh 3.125vw 5.093vh 3.125vw
    box-sizing border-box
    background-color rgba(253, 245, 236, 1)

    &-title
      margin-bottom 2.037vh
      font-family "Playfair Display"
      font-weight 600
      font-size 5.208vw
      line-height 1
      color rgba(38, 15, 5, 1)
      text-align start

    &-items
      display grid
      grid-template-columns repeat(3, 1fr)

    &-item
      margin-right 2.083vw
      width 29.271vw
      overflow hidden
      border 1px solid rgba(54, 25, 11, .08)
      border-radius .521vw
      background-color rgba(255, 250, 244, .55)
      position relative

      &:last-child
        margin-right 0

      &:hover
        .zerna__coffee-image
          img
            transform scale(1.035)

    &-image
      width 100%
      overflow hidden

      img
        width 100%
        height 50.167vh
        display block
        object-fit cover
        transition transform .7s cubic-bezier(.16, 1, .3, 1)

    &-content
      padding 2.13vh 1.354vw 2.963vh 1.354vw
      text-align start

    &-name
      font-family Inter
      font-weight 500
      font-size 1.667vw
      letter-spacing -4%
      color rgba(38, 15, 5, 1)

    &-description
      font-family Inter
      margin-top 1.111vh
      font-weight 400
      font-size 1.25vw
      line-height 1.27
      color rgba(137, 132, 127, 1)

    &-tags
      margin-top 2.778vh
      display flex
      flex-wrap wrap

    &-tag
      margin-right 0.781vw
      margin-bottom .556vh
      padding .556vh .781vw
      border-radius 1.042vw
      background-color rgba(248, 238, 225, 1)
      font-weight 500
      font-family Inter
      font-size 1.042vw
      color rgba(96, 85, 77, 1)

      &:last-child
        margin-right 0

    &-bottom
      margin-top 1.389vh
      display flex
      justify-content space-between
      align-items center

    &-price
      font-weight 600
      font-size 1.458vw
      color rgba(38, 15, 5, 1)

    &-basket
      width 3.646vw
      position absolute
      right 1.198vw
      bottom 3.241vh
      height 3.646vw
      padding 0
      border 0
      border-radius 50%
      display flex
      justify-content center
      align-items center
      background-color rgba(0, 50, 192, 1)
      color rgba(255, 255, 255, 1)
      cursor pointer
      transition transform .25s ease, background-color .25s ease

      &:hover
        transform scale(1.05)
        background-color rgba(0, 43, 166, 1)

      &_icon
        width 1.563vw
        height 1.563vw

  &__about
    display grid
    grid-template-columns 1fr 1fr
    background-color rgba(253, 245, 236, 1)
    text-align start

    &-image
      width 100%
      overflow hidden

      img
        width 100%
        height 100%
        min-height 58.333vh
        display block
        object-fit cover

    &-content
      padding 5.556vh 4.01vw
      box-sizing border-box

    &-eyebrow
      font-family Inter
      margin-bottom 1.667vh
      font-weight 500
      font-size 1.042vw
      letter-spacing 8%
      line-height 1.27
      text-transform uppercase
      color rgba(137, 132, 127, 1)

    &-title
      margin-bottom 1.296vh
      font-family "Playfair Display"
      font-weight 400
      font-size 4.271vw
      line-height 1
      color rgba(38, 15, 5, 1)

    &-description
      margin-top 3.148vh
      font-family Inter
      font-weight 500
      font-size 1.25vw
      line-height 1.3
      color rgba(117, 98, 90, 1)

    &-advantages
      margin-top 4.074vh
      display flex
      align-items flex-end
      justify-content space-between

    &-advantage
      display flex
      flex-direction column

      &_icon
        margin-bottom 1.204vh
        width 2.604vw
        height 4.63vh

      &_text
        display flex
        flex-direction column
        font-weight 500
        font-size .938vw
        line-height 1.3
        color rgba(54, 25, 11, 1)

    &-separation
      width 4px
      height 5.556vh
      background-color rgba(219, 206, 191, 1)
      border-radius 1.563vw

    &-button
      width fit-content
      margin-top 2.778vh
      padding 1.667vh 2.083vw
      border 0
      border-radius 3vw
      display flex
      align-items center
      background-color rgba(0, 50, 192, 1)
      color rgba(255, 255, 255, 1)
      font-family Inter
      font-weight 600
      font-size 1.042vw
      cursor pointer
      transition transform .25s ease, background-color .25s ease

      &:hover
        transform translateY(-.278vh)
        background-color rgba(0, 43, 166, 1)

      &_arrow
        width 1.563vw
        margin-left .521vw

  &__cta
    min-height 48vh
    padding 5.741vh 18.115vw
    box-sizing border-box
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-size cover
    background-position center
    background-repeat no-repeat
    text-align center

    &-eyebrow
      margin-bottom 1.667vh
      font-weight 500
      font-family Inter
      font-size 1.25vw
      line-height 1.27
      text-transform uppercase
      color rgba(137, 132, 127, 1)

    &-title
      font-family "Playfair Display"
      font-weight 500
      font-size 4.479vw
      line-height 1
      color rgba(38, 15, 5, 1)

    &-description
      margin-top 3.148vh
      font-weight 500
      font-size 1.667vw
      font-family Inter
      letter-spacing -7%
      color rgba(27, 9, 3, 1)

    &-button
      margin-top 2.963vh
      padding 1.574vh 2.344vw
      border 0
      border-radius 4vw
      display flex
      align-items center
      background-color rgba(0, 50, 192, 1)
      color white
      font-family Inter
      font-weight 700
      font-size 1.25vw
      cursor pointer
      transition transform .25s ease, background-color .25s ease

      &:hover
        transform translateY(-.278vh)
        background-color rgba(0, 43, 166, 1)

      &_arrow
        width 1.563vw
        margin-left .521vw

  &__footer
    padding 4.63vh 6.771vw 2.778vh 6.771vw
    box-sizing border-box
    background-color rgba(42, 21, 10, 1)
    color rgba(239, 227, 216, 1)
    text-align start

    &-top
      display grid
      grid-template-columns 2fr 1fr 1.2fr 1fr

    &-logo
      width 13.183vw
      display block

    &-description
      margin-top 1.667vh
      font-family Inter
      font-weight 500
      letter-spacing -3.5%
      font-size 1.354vw
      color rgba(226, 217, 203, 1)

    &-column
      display flex
      flex-direction column

      &_title
        font-family Inter
        margin-bottom 2.593vh
        font-size 1.25vw
        color rgba(239, 227, 216, 1)
        font-weight 700
        text-transform uppercase

      &_item
        width fit-content
        margin-bottom 1.944vh
        font-size 1.458vw
        font-weight 500
        font-family Inter
        letter-spacing -6%
        color rgba(226, 217, 203, 1)
        text-decoration none
        cursor pointer
        transition color .2s ease

        &:hover
          color white

    &-line
      width 100%
      height 2px
      margin-top 6.852vh
      background-color rgba(80, 62, 51, 1)

    &-bottom
      padding-top 2.315vh
      display flex
      justify-content space-between
      align-items center
      font-size .833vw
      color rgba(253, 245, 236, .75)

      &_right
        display flex
        align-items center

    &-policy
      margin-right 5.208vw

    &-up
      padding 0
      border 0
      display flex
      align-items center
      background transparent
      color rgba(253, 245, 236, .85)
      font-family Inter
      font-size .833vw
      cursor pointer

      span
        &:last-child
          margin-left 1.563vw
          font-size 1.25vw

.zerna-basket
  width 100%
  height 100dvh
  position fixed
  inset 0
  z-index 3000

  &__backdrop
    position absolute
    inset 0
    background-color rgba(38, 15, 5, .55)
    backdrop-filter blur(5px)

  &__panel
    width 34vw
    height 100%
    padding 4.63vh 2.604vw
    box-sizing border-box
    position absolute
    top 0
    right 0
    overflow-y auto
    background-color rgba(253, 245, 236, 1)

  &__header
    display flex
    justify-content space-between
    align-items center

  &__title
    font-family "Playfair Display"
    font-weight 600
    font-size 3.125vw
    color rgba(38, 15, 5, 1)

  &__close
    width 2.083vw
    height 2.083vw
    padding 0
    border 0
    position relative
    background transparent
    cursor pointer

    span
      width 100%
      height 2px
      position absolute
      top 50%
      left 0
      background-color rgba(38, 15, 5, 1)

      &:first-child
        transform rotate(45deg)

      &:last-child
        transform rotate(-45deg)

  &__items
    margin-top 4.63vh

  &__item
    padding 1.852vh 0
    border-bottom 1px solid rgba(54, 25, 11, .15)
    display grid
    grid-template-columns 7.292vw 1fr

  &__image
    width 7.292vw
    height 7.292vw
    display block
    object-fit cover

  &__info
    padding-left 1.302vw
    text-align start

  &__name
    font-weight 600
    font-size 1.146vw
    color rgba(38, 15, 5, 1)

  &__description
    margin-top .556vh
    font-size .833vw
    color rgba(117, 98, 90, 1)

  &__bottom
    margin-top 1.574vh
    display flex
    justify-content space-between
    align-items center

  &__price
    font-weight 600
    font-size 1.042vw
    color rgba(38, 15, 5, 1)

  &__quantity
    display flex
    align-items center
    border 1px solid rgba(54, 25, 11, .3)

    button
      width 2.083vw
      height 2.083vw
      padding 0
      border 0
      background transparent
      color rgba(38, 15, 5, 1)
      font-size 1.25vw
      cursor pointer

    span
      width 2.083vw
      text-align center
      font-size .833vw

  &__summary
    margin-top 3.704vh
    padding-top 2.315vh
    border-top 1px solid rgba(54, 25, 11, .2)

    &-row
      margin-bottom 1.389vh
      display flex
      justify-content space-between
      font-size 1.042vw
      color rgba(117, 98, 90, 1)

      &_total
        margin-top 2.315vh
        font-family "Playfair Display"
        font-weight 600
        font-size 1.667vw
        color rgba(38, 15, 5, 1)

  &__checkout
    width 100%
    margin-top 2.315vh
    padding 1.852vh 1.563vw
    border 0
    border-radius 4vw
    display flex
    justify-content space-between
    align-items center
    background-color rgba(0, 50, 192, 1)
    color white
    font-family Inter
    font-size 1.042vw
    font-weight 600
    cursor pointer

    &_arrow
      width 1.563vw

  &__empty
    height 75vh
    display flex
    flex-direction column
    justify-content center
    align-items center
    text-align center

    &-title
      font-family "Playfair Display"
      font-weight 600
      font-size 3.125vw
      color rgba(38, 15, 5, 1)

    &-description
      width 20vw
      margin-top 1.389vh
      font-size .938vw
      line-height 1.5
      color rgba(117, 98, 90, 1)

    &-button
      margin-top 2.778vh
      padding 1.667vh 2.083vw
      border 0
      border-radius 4vw
      background-color rgba(0, 50, 192, 1)
      color white
      font-family Inter
      font-size .938vw
      font-weight 600
      cursor pointer

.zerna-menu
  display none

.basket-enter-active
  .zerna-basket__backdrop
    transition opacity .35s ease

  .zerna-basket__panel
    transition transform .55s cubic-bezier(.16, 1, .3, 1)

.basket-leave-active
  .zerna-basket__backdrop
    transition opacity .3s ease

  .zerna-basket__panel
    transition transform .4s cubic-bezier(.7, 0, .84, 0)

.basket-enter-from
  .zerna-basket__backdrop
    opacity 0

  .zerna-basket__panel
    transform translateX(100%)

.basket-leave-to
  .zerna-basket__backdrop
    opacity 0

  .zerna-basket__panel
    transform translateX(100%)

@media(platform: mobile)
  .zerna-loader
    &__logo
      min-width 50vw
      font-size 11vw

    &__line
      width 30vw

  .zerna
    &__hero
      min-height 100svh
      padding 0 5vw
      background-position 61% center
      position relative

      &::after
        content ''
        position absolute
        inset 0
        background linear-gradient(180deg, rgba(253, 245, 236, .1) 0%, rgba(253, 245, 236, .35) 42%, rgba(253, 245, 236, .98) 76%, rgba(253, 245, 236, 1) 100%)

      &-title
        margin-top 10vh
        margin-bottom 5vh
        text-align center
        position relative
        display flex
        justify-content center
        z-index 2
        font-size 13vw
        line-height .9

      &-description
        margin-bottom 16vh
        position relative
        text-align center
        display flex
        justify-content center
        z-index 2
        font-size 4.5vw

      &-button
        width 100%
        justify-content center
        margin-bottom 4vh
        padding 1.8vh 6vw
        position relative
        z-index 2
        font-size 5vw

        &_arrow
          width 6vw
          margin-left 2vw
          margin-top 0

      &-advantages
        padding-bottom 0
        position relative
        z-index 2
        justify-content space-between

      &-advantage
        margin-right 0

        &_icon
          width 10vw
          margin-right 1vw

        &_text
          font-size 3.2vw

    &__header
      padding 2vh 0
      position relative
      z-index 2001

      &-logo
        width 35vw

      &-buttons
        display none

      &-actions
        margin-left auto

      &-basket
        width 7vw
        height 7vw
        margin-right 4vw
        color rgba(54, 25, 11, 1)

        &_count
          min-width 4vw
          height 4vw
          padding 0 1vw
          top -1.5vw
          right -2vw
          font-size 2vw

      &-menu
        width 7vw
        height 7vw
        padding 0
        border 0
        position relative
        display block
        background transparent
        cursor pointer

        span
          width 100%
          height 2px
          position absolute
          left 0
          background-color rgba(54, 25, 11, 1)
          transition top .4s ease, transform .4s ease

          &:first-child
            top 32%

          &:last-child
            top 68%

        &_open
          span
            top 50%

            &:first-child
              transform rotate(45deg)

            &:last-child
              transform rotate(-45deg)

    &__coffee
      padding 5vh 5vw

      &-title
        margin-bottom 3vh
        font-size 11vw

      &-items
        display flex
        flex-direction column

      &-item
        width 100%
        margin-right 0
        margin-bottom 3vh
        border-radius 2vw

        &:last-child
          margin-bottom 0

      &-content
        padding 2vh 3vw 2.5vh 3vw

      &-name
        font-size 4vw

      &-description
        margin-top .8vh
        font-size 3vw

      &-tags
        margin-top 1.5vh

      &-tag
        margin-right 1.5vw
        padding .7vh 2vw
        font-size 2.4vw

      &-price
        font-size 4vw

      &-basket
        width 12vw
        height 12vw

        &_icon
          width 5vw
          height 5vw

    &__about
      display flex
      flex-direction column

      &-image
        img
          min-height 45vh

      &-content
        padding 5vh 5vw

      &-eyebrow
        font-size 2.5vw

      &-title
        font-size 10vw

      &-description
        font-size 3.3vw

        br
          display none

      &-advantages
        margin-top 4vh
        flex-direction column
        align-items stretch

      &-advantage
        padding 2vh 0
        flex-direction row
        align-items center
        border-bottom 1px solid rgba(54, 25, 11, .15)

        &_icon
          width 10vw
          margin-bottom 0
          font-size 5vw

        &_text
          font-size 3vw

      &-separation
        display none

      &-button
        width 100%
        margin-top 4vh
        padding 1.8vh 5vw
        justify-content center
        font-size 3vw

        &_arrow
          width 6vw
          margin-left 2vw

    &__cta
      min-height 50vh
      padding 5vh 5vw

      &-eyebrow
        font-size 2.5vw

      &-title
        font-size 9vw

      &-description
        margin-top 2vh
        font-size 3vw

      &-button
        margin-top 3vh
        padding 1.8vh 6vw
        font-size 3vw

        &_arrow
          width 6vw
          margin-left 2vw

    &__footer
      padding 5vh 6vw 3vh 6vw

      &-top
        display flex
        flex-direction column

      &-brand
        margin-bottom 5vh

      &-logo
        width 35vw

      &-description
        font-size 3vw

      &-column
        margin-bottom 4vh

        &_title
          font-size 2.7vw

        &_item
          margin-bottom 1.2vh
          font-size 3.2vw

      &-line
        margin-top 2vh

      &-bottom
        padding-top 2.5vh
        flex-direction column
        align-items flex-start
        font-size 2.5vw

        &_right
          width 100%
          margin-top 3vh
          justify-content space-between

      &-policy
        margin-right 0

      &-up
        font-size 2.5vw

        span
          &:last-child
            margin-left 3vw
            font-size 4vw

  .zerna-menu
    width 100%
    height 100dvh
    position fixed
    inset 0
    z-index 2000
    display block

    &__backdrop
      position absolute
      inset 0
      background-color rgba(38, 15, 5, .45)
      backdrop-filter blur(4px)

    &__panel
      width 82vw
      height 100%
      padding 14vh 7vw 6vh 7vw
      box-sizing border-box
      position absolute
      top 0
      right 0
      display flex
      flex-direction column
      background-color rgba(253, 245, 236, 1)

    &__logo
      width 35vw

      img
        width 100%
        display block

    &__items
      margin-top 8vh
      display flex
      flex-direction column

    &__item
      padding 2.5vh 0
      border-bottom 1px solid rgba(54, 25, 11, .15)
      font-family "Playfair Display"
      font-weight 600
      font-size 10vw
      color rgba(38, 15, 5, 1)
      cursor pointer

    &__bottom
      margin-top auto
      display flex
      flex-direction column
      font-size 3vw
      line-height 1.6
      color rgba(117, 98, 90, 1)

  .zerna-basket
    &__panel
      width 100%
      padding 5vh 5vw

    &__title
      font-size 9vw

    &__close
      width 8vw
      height 8vw

    &__items
      margin-top 4vh

    &__item
      grid-template-columns 25vw 1fr

    &__image
      width 25vw
      height 25vw

    &__info
      padding-left 4vw

    &__name
      font-size 4vw

    &__description
      font-size 2.7vw

    &__price
      font-size 3.5vw

    &__quantity
      button
        width 9vw
        height 9vw
        font-size 5vw

      span
        width 9vw
        font-size 3vw

    &__summary
      &-row
        font-size 3.5vw

        &_total
          font-size 5vw

    &__checkout
      padding 2vh 5vw
      font-size 3vw

      &_arrow
        width 6vw

    &__empty
      &-title
        font-size 9vw

      &-description
        width 80vw
        font-size 3vw

      &-button
        padding 2vh 7vw
        font-size 3vw

.menu-enter-active
  .zerna-menu__backdrop
    transition opacity .35s ease

  .zerna-menu__panel
    transition transform .55s cubic-bezier(.16, 1, .3, 1)

.menu-leave-active
  .zerna-menu__backdrop
    transition opacity .25s ease

  .zerna-menu__panel
    transition transform .4s cubic-bezier(.7, 0, .84, 0)

.menu-enter-from
  .zerna-menu__backdrop
    opacity 0

  .zerna-menu__panel
    transform translateX(100%)

.menu-leave-to
  .zerna-menu__backdrop
    opacity 0

  .zerna-menu__panel
    transform translateX(100%)
</style>
