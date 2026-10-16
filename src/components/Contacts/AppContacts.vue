<template lang="pug">
  .app-contacts

    .app-contacts__title
      span Контакты

    .app-contacts__content
      .app-contacts__content-container
        .app-contacts__content-title
          span(v-if="!isMobile") !{'Готовы обсудить<br> проект?'}
          span(v-else) Готовы обсудить проект?

        .app-contacts__content-description
          span !{'Есть идея, задача или предложение о сотрудничестве?<br> Напишите мне — буду рад обсудить детали.'}

        .app-contacts__content-button.unselectable(@click="openFeedbackModal($event)")
          .app-contacts__button-text
            span Связаться
          ArrowIcon.app-contacts__button-arrow

        .app-contacts__label
          .app-contacts__label-line
          span © 2026 Неранов Никита

      .app-contacts__contact(v-if="!isMobile")
        a.app-contacts__contact-item(
          v-for="item in contacts"
          :key="item.id"
          :href="item.href"
          :target="item.external ? '_blank' : null"
          :rel="item.external ? 'noopener noreferrer' : null"
          @click="handleContactClick($event, item)"
        )
          img.app-contacts__item-icon(
            :src="item.icon"
            alt=""
          )

          .app-contacts__item-text {{ item.value }}
    .app-contacts__contact(v-if="isMobile")
      a.app-contacts__contact-item(
        v-for="item in contacts"
        :key="item.id"
        :href="item.href"
        :target="item.external ? '_blank' : null"
        :rel="item.external ? 'noopener noreferrer' : null"
        @click="handleContactClick($event, item)"
      )
        img.app-contacts__item-icon(
          :src="item.icon"
          alt=""
        )

        .app-contacts__item-text {{ item.value }}

    Teleport(to="body")
      .feedback-modal(
        v-if="isFeedbackOpen"
        @click="closeFeedbackModal"
      )
        .feedback-modal__window(ref="feedbackWindow" @click.stop)
          .feedback-modal__header
            .feedback-modal__header-content
              .feedback-modal__label Обратная связь
              .feedback-modal__title Напишите мне
            button.feedback-modal__close.unselectable(
              type="button"
              @click="closeFeedbackModal"
            ) ×

          .feedback-modal__description
            | Расскажите о задаче, проекте или предложении. Я свяжусь с вами удобным способом.

          .feedback-modal__socials
            a.feedback-modal__social(
              v-for="social in socials"
              :key="social.id"
              :href="social.url"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
            )
              component.feedback-modal__social-icon(
                :is="social.component"
              )
          form.feedback-modal__form(@submit.prevent="sendFeedback")
            .feedback-modal__field
              label.feedback-modal__field-label(for="feedback-name") Ваше имя
              input.feedback-modal__field-input(
                id="feedback-name"
                v-model="feedbackForm.name"
                type="text"
                placeholder="Никита"
                required
              )

            .feedback-modal__field
              label.feedback-modal__field-label(for="feedback-contact") Как с вами связаться
              input.feedback-modal__field-input(
                id="feedback-contact"
                v-model="feedbackForm.contact"
                type="text"
                placeholder="Email или Telegram"
                required
              )

            .feedback-modal__field
              label.feedback-modal__field-label(for="feedback-message") Сообщение
              textarea.feedback-modal__field-textarea(
                id="feedback-message"
                v-model="feedbackForm.message"
                placeholder="Расскажите немного о вашем проекте..."
                required
              )

            button.feedback-modal__submit.unselectable(type="submit")
              span Отправить
              ArrowIcon.feedback-modal__submit-arrow

</template>
<script setup>
import { reactive, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

import ArrowIcon from '@/components/icons/Arrow.vue'
import mailIcon from '@/assets/images/contacts/mail.svg'
import pinIcon from '@/assets/images/contacts/pin.svg'
import linkIcon from '@/assets/images/contacts/link.svg'
import WhatsappIcon from '@/components/Calendar/icons/Whatsapp.vue'
import VkIcon from '@/components/Calendar/icons/Vk.vue'
import TelegramIcon from '@/components/Calendar/icons/Telegram.vue'
import MaxIcon from '@/components/Calendar/icons/Max.vue'

const contacts = [
  {
    id: 1,
    icon: mailIcon,
    value: 'nneranov@mail.ru',
    modal: true,
  },
  {
    id: 2,
    icon: pinIcon,
    value: 'Барнаул, Россия',
    href: 'https://yandex.ru/maps/?text=Барнаул',
    external: true,
  },
  {
    id: 3,
    icon: linkIcon,
    value: 'Telegram / VK / WhatsApp / MAX',
    modal: true,
  },
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
  {
    id: 4,
    name: 'max',
    label: 'Max',
    url: 'https://max.ru/u/f9LHodD0cOI_8D9nIbmoBNu1LxGifVW6gAAu-AIUXXiCXog2fHyd9x3MX1c',
    component: MaxIcon,
  },
]

defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const isFeedbackOpen = ref(false)
const feedbackWindow = ref(null)
let feedbackSourceRect = null
let feedbackAnimation = null

const feedbackForm = reactive({
  name: '',
  contact: '',
  message: '',
})

const openFeedbackModal = async (event) => {
  feedbackSourceRect = event.currentTarget.getBoundingClientRect()

  isFeedbackOpen.value = true
  document.body.style.overflow = 'hidden'

  await nextTick()

  const modal = feedbackWindow.value

  if (!modal) return

  const modalRect = modal.getBoundingClientRect()

  const sourceCenterX =
    feedbackSourceRect.left + feedbackSourceRect.width / 2

  const sourceCenterY =
    feedbackSourceRect.top + feedbackSourceRect.height / 2

  const modalCenterX =
    modalRect.left + modalRect.width / 2

  const modalCenterY =
    modalRect.top + modalRect.height / 2

  const translateX = sourceCenterX - modalCenterX
  const translateY = sourceCenterY - modalCenterY

  const scaleX =
    feedbackSourceRect.width / modalRect.width

  const scaleY =
    feedbackSourceRect.height / modalRect.height

  feedbackAnimation?.cancel()

  feedbackAnimation = modal.animate(
    [
      {
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        opacity: 0,
        borderRadius: '2vw',
      },
      {
        transform: 'translate(0, 0) scale(1, 1)',
        opacity: 1,
        borderRadius: '0',
      },
    ],
    {
      duration: 550,
      easing: 'cubic-bezier(.16, 1, .3, 1)',
      fill: 'both',
    },
  )
}

const handleContactClick = (event, item) => {
  if (!item.modal) return

  event.preventDefault()
  openFeedbackModal(event)
}

const closeFeedbackModal = async () => {
  const modal = feedbackWindow.value

  if (!modal || !feedbackSourceRect) {
    isFeedbackOpen.value = false
    document.body.style.overflow = ''
    return
  }

  const modalRect = modal.getBoundingClientRect()

  const sourceCenterX =
    feedbackSourceRect.left + feedbackSourceRect.width / 2

  const sourceCenterY =
    feedbackSourceRect.top + feedbackSourceRect.height / 2

  const modalCenterX =
    modalRect.left + modalRect.width / 2

  const modalCenterY =
    modalRect.top + modalRect.height / 2

  const translateX = sourceCenterX - modalCenterX
  const translateY = sourceCenterY - modalCenterY

  const scaleX =
    feedbackSourceRect.width / modalRect.width

  const scaleY =
    feedbackSourceRect.height / modalRect.height

  feedbackAnimation?.cancel()

  feedbackAnimation = modal.animate(
    [
      {
        transform: 'translate(0, 0) scale(1, 1)',
        opacity: 1,
      },
      {
        transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
        opacity: 0,
      },
    ],
    {
      duration: 350,
      easing: 'cubic-bezier(.7, 0, .84, 0)',
      fill: 'both',
    },
  )

  await feedbackAnimation.finished.catch(() => {})

  isFeedbackOpen.value = false
  document.body.style.overflow = ''
}

const sendFeedback = async () => {
  try {
    const response = await fetch(
      'https://portfolio-feedback.a08926443.workers.dev',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: feedbackForm.name,
          contact: feedbackForm.contact,
          message: feedbackForm.message,
        }),
      },
    )

    if (!response.ok) {
      throw new Error('Ошибка отправки')
    }

    feedbackForm.name = ''
    feedbackForm.contact = ''
    feedbackForm.message = ''

    closeFeedbackModal()
  } catch (error) {
    console.error('Ошибка отправки:', error)
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isFeedbackOpen.value) {
    closeFeedbackModal()
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
.app-contacts
  background-color rgba(217, 217, 217, 1)
  width 100%
  padding 2.87vh 2.969vw 1.296vh 2.969vw
  box-sizing border-box
  background-image url("@/assets/images/contacts/footer.png")
  background-repeat no-repeat
  background-size 50% 100%
  background-position right

  @media(platform: mobile)
    padding 2vh 2.5vw
    font-size 1.3vw
    background-image url("@/assets/images/contacts/footer_mobile.png")
    background-size cover
    position relative

  &__title
    font-family "Open Sans"
    color rgba(81, 82, 85, 1)
    font-weight 600
    font-size .885vw
    letter-spacing -0.08em
    margin-bottom 2.963vh

    @media(platform: mobile)
      font-size 3.6vw
      letter-spacing -0.04em
      color rgba(55, 56, 57, 1)
      margin-bottom 10vh

  &__content
    font-family "Inter"
    color rgba(5, 5, 5, 1)
    font-weight 600
    display flex
    justify-content flex-start
    align-items flex-start

    &-title
      font-size 2.5vw
      letter-spacing -2%
      line-height 100%
      margin-bottom 1.574vh

      @media(platform: mobile)
        font-size 10vw
        font-weight 700
        margin-bottom 5vh

    &-description
      margin-bottom 2.315vh
      line-height 137%
      font-size .781vw
      color rgba(53, 52, 54, 1)

      @media(platform: mobile)
        margin-bottom 5vh
        font-size 4vw

    &-button
      padding 1.389vh 1.25vw
      border-radius 1.927vw
      display flex
      justify-content center
      align-items center
      color rgba(15, 15, 15, 1)
      font-size .781vw
      letter-spacing -2%
      font-family "Open Sans"
      font-weight 700
      border .104vw solid rgba(53, 52, 54, 1)
      width fit-content
      cursor pointer
      transition all 0.1s ease
      margin-bottom 1.204vh

      @media(platform: mobile)
        font-size 4.4vw
        padding 1.2vh 4vw
        border-radius 0
        width 100%
        margin-bottom 5vh
        justify-content space-between

      &:hover
        @media(platform: desktop)
          color rgba(241, 242, 246, 1)
          background-color rgba(15, 15, 15, 1)
          border .104vw solid rgba(53, 52, 54, 1)

      &:active
        transform scale(0.95)
        color rgba(241, 242, 246, 1)
        background-color rgba(15, 15, 15, 1)
        border .104vw solid rgba(53, 52, 54, 1)

        @media(platform: mobile)
          transform scale(0.98)

  &__button-text
    margin-right .208vw

    @media(platform: mobile)
      margin-right 0

  &__button-arrow
    width .99vw
    margin-top 2%

    @media(platform: mobile)
      width 4vw
      margin-top 1%

  &__label
    display flex
    justify-content flex-start
    align-items center
    font-family Inter
    font-weight 600
    font-size .781vw
    color rgba(53, 52, 54, 1)

    @media(platform: mobile)
      font-size 3.6vw
      font-weight 700
      color rgba(53, 52, 54, 1)
      position absolute
      bottom 3vh
      left 2.5vw

    &-line
      width 1.042vw
      height .185vh
      background-color rgba(15, 15, 15, 1)
      margin-right .677vw

      @media(platform: mobile)
        width 1.8vw
        height 0.278vh
        background-color rgba(53, 52, 54, 1)

  &__contact
    font-family Inter
    color rgba(53, 52, 54, 1)
    font-size .729vw
    font-weight 600
    margin-left 12.344vw

    @media(platform: mobile)
      margin-left 0
      font-size 3vw

    &-item
      display flex
      justify-content flex-start
      align-items center
      margin-bottom 2.315vh
      width fit-content
      cursor pointer

      &:last-of-type
        margin-bottom 0

      &:hover
        .app-contacts__item-text
          text-decoration underline
          text-underline-offset .37vh
          text-decoration-thickness 1px

  &__item-icon
    width .938vw
    height 1.667vh
    margin-right 1.302vw

    @media(platform: mobile)
      width 3vw
      height 3.2vh

.feedback-modal
  position fixed
  inset 0
  width 100%
  height 100dvh
  display flex
  justify-content center
  align-items center
  padding 4vh 3vw
  box-sizing border-box
  background-color rgba(0, 0, 0, .75)
  backdrop-filter blur(.4vw)
  z-index 9999

  &__window
    width 38vw
    padding 4vh 3vw
    box-sizing border-box
    background-color rgba(15, 15, 15, 1)
    border .052vw solid rgba(255, 255, 255, .15)
    color rgba(241, 242, 246, 1)
    overflow hidden
    will-change transform, opacity

  &__header
    display flex
    justify-content space-between
    align-items flex-start
    margin-bottom 2vh

  &__label
    font-family "Open Sans"
    font-size .781vw
    font-weight 600
    color rgba(125, 124, 125, 1)
    margin-bottom 1vh

  &__title
    font-family "Inter"
    font-size 2.5vw
    font-weight 600
    letter-spacing -.05em
    line-height 1

  &__socials
    display flex
    align-items center
    gap .8vw
    margin-bottom 3vh

  &__social
    width 2.5vw
    aspect-ratio 1 / 1
    display flex
    justify-content center
    align-items center
    border .052vw solid rgba(134, 136, 136, 1)
    border-radius 50%
    color rgba(241, 242, 246, 1)
    cursor pointer
    transition all .15s ease

    &:hover
      background-color rgba(241, 242, 246, 1)
      color rgba(15, 15, 15, 1)
      transform translateY(-.3vh)

    &:active
      transform scale(.92)

  &__social-icon
    width 1vw
    height auto

  &__close
    width 2.5vw
    aspect-ratio 1 / 1
    display flex
    justify-content center
    align-items center
    padding 0
    border .052vw solid rgba(134, 136, 136, 1)
    border-radius 50%
    background transparent
    color rgba(241, 242, 246, 1)
    font-size 1.4vw
    cursor pointer
    transition all .15s ease

    &:hover
      background-color rgba(241, 242, 246, 1)
      color rgba(15, 15, 15, 1)

    &:active
      transform scale(.9)

  &__description
    width 80%
    font-family "Open Sans"
    font-size .8vw
    font-weight 500
    line-height 1.5
    color rgba(141, 141, 141, 1)
    margin-bottom 4vh

  &__form
    width 100%

  &__field
    width 100%
    margin-bottom 2.5vh

  &__field-label
    display block
    font-family "Open Sans"
    font-size .729vw
    font-weight 600
    color rgba(141, 141, 141, 1)
    margin-bottom .8vh

  &__field-input
    width 100%
    padding 1.3vh 0
    box-sizing border-box
    border none
    border-bottom .052vw solid rgba(134, 136, 136, 1)
    outline none
    background transparent
    font-family "Inter"
    font-size .885vw
    color rgba(241, 242, 246, 1)

    &::placeholder
      color rgba(100, 100, 100, 1)

    &:focus
      border-bottom-color rgba(241, 242, 246, 1)

  &__field-textarea
    width 100%
    min-height 12vh
    padding 1.3vh 0
    box-sizing border-box
    border none
    border-bottom .052vw solid rgba(134, 136, 136, 1)
    outline none
    resize none
    background transparent
    font-family "Inter"
    font-size .885vw
    line-height 1.5
    color rgba(241, 242, 246, 1)

    &::placeholder
      color rgba(100, 100, 100, 1)

    &:focus
      border-bottom-color rgba(241, 242, 246, 1)

  &__submit
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding 1.4vh 1.2vw
    box-sizing border-box
    border .052vw solid rgba(134, 136, 136, 1)
    background transparent
    color rgba(241, 242, 246, 1)
    font-family "Open Sans"
    font-size .781vw
    font-weight 600
    cursor pointer
    transition all .15s ease

    &:hover
      background-color rgba(241, 242, 246, 1)
      color rgba(15, 15, 15, 1)

    &:active
      transform scale(.98)

  &__submit-arrow
    width .99vw
    height auto

@media(platform: mobile)
  .feedback-modal
    padding 2vh 2.5vw
    align-items center

    &__window
      width 100%
      padding 3vh 5vw

    &__label
      font-size 3vw

    &__title
      font-size 8vw

    &__close
      width 10vw
      font-size 6vw

    &__description
      width 100%
      font-size 3.5vw
      margin-bottom 4vh

    &__field
      margin-bottom 3vh

    &__field-label
      font-size 3vw

    &__field-input
      padding 1.5vh 0
      font-size 4vw

    &__field-textarea
      min-height 15vh
      padding 1.5vh 0
      font-size 4vw

    &__submit
      padding 1.5vh 4vw
      font-size 4vw

    &__submit-arrow
      width 4vw

    &__socials
      gap 3vw
      margin-bottom 4vh

    &__social
      width 11vw

    &__social-icon
      width 4.5vw
</style>
