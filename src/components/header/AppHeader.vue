<template lang="pug">
  .app-header

    .app-header__nav
      .app-header__initials NN
      .app-header__nav-items
        .app-header__nav-item(v-if="!isMobile") Портфолио
        .app-header__nav-item 2026

    .app-header__content
      .app-header__content-text
        .app-header__content-title
          span !{'Создаю понятные<br> и продуманные<br> веб-интерфейсы.'}
        .app-header__content-description
          span(v-if="!isMobile") !{'Разрабатываю интерфейсы на Vue.js, работаю с Pug и <br> Stylus и уделяю внимание тому, как код превращается<br> в понятный пользовательский интерфейс.'}
          span(v-else) Разрабатываю интерфейсы на Vue.js, работаю с Pug и Stylus и уделяю внимание тому, как код превращается в понятный пользовательский интерфейс.
        .app-header__content-button.unselectable(v-if="isMobile" @click="scrollToProjects")
          .app-header__button-left
            .app-header__button-text Смотреть мои работы
            .app-header__button-line
          ArrowIcon.app-header__button-arrow

      .app-header__content-image-wrapper(v-if="!isMobile")
        .app-header__sand(ref="sandLayer")
        .app-header__content-image(
          :style="{ transform: `rotate(${rotation}deg)` }"
          @pointerdown="startRotation"
          @pointermove="moveRotation"
          @pointerup="endRotation"
          @pointercancel="endRotation"
        )

    .app-header__footer
      img.app-header__footer-icon(v-if="isMobile" src='../../assets/images/contacts/pin_white.svg')
      .app-header__footer-dislocation
        span Барнаул, Россия

</template>

<script setup>
import ArrowIcon from '../icons/Arrow.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const rotation = ref(0)

let isDragging = false
let lastPointerAngle = 0
let lastTime = 0
const autoVelocity = 0.08
let angularVelocity = autoVelocity
let animationFrame = null

const sandLayer = ref(null)

let sandAccumulator = 0

const createSandParticle = (intensity) => {
  if (!sandLayer.value) return

  const layer = sandLayer.value

  if (layer.children.length > 120) return

  const rect = layer.getBoundingClientRect()

  const center = rect.width / 2
  const radius = rect.width * 0.46

  const angle = Math.random() * Math.PI * 2

  const x = center + Math.cos(angle) * radius
  const y = center + Math.sin(angle) * radius

  const direction = Math.sign(angularVelocity) || 1

  const tangentX = -Math.sin(angle) * direction
  const tangentY = Math.cos(angle) * direction

  const outwardX = Math.cos(angle)
  const outwardY = Math.sin(angle)

  const force = 15 + intensity * 65

  const translateX =
    tangentX * force +
    outwardX * (10 + Math.random() * 25)

  const translateY =
    tangentY * force +
    outwardY * (10 + Math.random() * 25) +
    15

  const size = 3 + Math.random() * (3 + intensity * 5)

  const particle = document.createElement('span')

  Object.assign(particle.style, {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: `rgba(202, 174, 118, ${0.5 + Math.random() * 0.5})`,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
  })

  layer.appendChild(particle)

  const animation = particle.animate(
    [
      {
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1,
      },
      {
        transform: `translate(
          calc(-50% + ${translateX}px),
          calc(-50% + ${translateY}px)
        ) scale(.2)`,
        opacity: 0,
      },
    ],
    {
      duration: 450 + Math.random() * 400,
      easing: 'cubic-bezier(.15,.6,.3,1)',
      fill: 'forwards',
    },
  )

  animation.onfinish = () => {
    particle.remove()
  }
}

const getPointerAngle = (event, element) => {
  const rect = element.getBoundingClientRect()

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  return Math.atan2(
    event.clientY - centerY,
    event.clientX - centerX,
  ) * 180 / Math.PI
}

const stopInertia = () => {
  if (!animationFrame) return

  cancelAnimationFrame(animationFrame)
  animationFrame = null
}

const startRotation = (event) => {
  if (event.button !== 0) return

  stopInertia()

  isDragging = true
  angularVelocity = 0
  lastPointerAngle = getPointerAngle(event, event.currentTarget)
  lastTime = performance.now()

  event.currentTarget.setPointerCapture(event.pointerId)
}

const emitSand = (deltaTime) => {
  const speed = Math.abs(angularVelocity)

  if (speed < 0.05) return

  const intensity = Math.min(speed / 1.2, 1)

  sandAccumulator += intensity * deltaTime * 0.06

  let particles = Math.floor(sandAccumulator)

  sandAccumulator -= particles

  particles = Math.min(particles, 5)

  for (let i = 0; i < particles; i++) {
    createSandParticle(intensity)
  }
}

const moveRotation = (event) => {
  if (!isDragging) return

  const currentTime = performance.now()
  const currentAngle = getPointerAngle(event, event.currentTarget)

  let angleDifference = currentAngle - lastPointerAngle

  if (angleDifference > 180) {
    angleDifference -= 360
  }

  if (angleDifference < -180) {
    angleDifference += 360
  }

  const deltaTime = currentTime - lastTime

  rotation.value += angleDifference

  if (deltaTime > 0) {
    const currentVelocity = (angleDifference / deltaTime) * 3

    angularVelocity =
      angularVelocity * 0.6 +
      currentVelocity * 0.4

    emitSand(deltaTime)
  }

  lastPointerAngle = currentAngle
  lastTime = currentTime
}

const startInertia = () => {
  let previousTime = performance.now()

  const animate = (currentTime) => {
    const deltaTime = currentTime - previousTime
    previousTime = currentTime

    rotation.value += angularVelocity * deltaTime

    emitSand(deltaTime)

    const friction = Math.pow(
      0.985,
      deltaTime / 16.67,
    )

    angularVelocity =
      autoVelocity +
      (angularVelocity - autoVelocity) * friction

    animationFrame = requestAnimationFrame(animate)
  }

  animationFrame = requestAnimationFrame(animate)
}

const endRotation = () => {
  if (!isDragging) return

  isDragging = false
  startInertia()
}

const scrollToProjects = () => {
  document.querySelector('#projects')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

onMounted(() => {
  startInertia()
})

onBeforeUnmount(() => {
  stopInertia()
})
</script>

<style lang="stylus" scoped>
.app-header
  width 100%
  padding 3.519vh 2.969vw
  box-sizing border-box
  font-family 'Open Sans', sans-serif
  font-weight 600
  font-size .885vw
  color rgba(221, 223, 223, 1)
  background-color #0E0E0F
  background-image url('../../assets/images/header/lines_circle.png')
  background-size auto 100%
  background-repeat no-repeat
  overflow hidden

  @media(platform: mobile)
    padding 6vh 8vw
    font-size 3vw

  &__nav
    display flex
    justify-content space-between
    align-items center

    &-items
      display flex
      align-items center
      gap 3.385vw

    &-item
      letter-spacing -0.08em
      white-space nowrap

      @media(platform: mobile)
        letter-spacing -0.04em

  &__content
    display flex
    justify-content center
    align-items center
    gap 3.646vw
    margin-top 7.222vh

    @media(platform: mobile)
      margin-top 10vh
      flex-direction column
      justify-content flex-end
      align-items flex-end

    &-text
      position relative
      z-index 2

    &-title
      font-family 'Inter', sans-serif
      font-size 3.333vw
      font-weight 600
      line-height 1.2
      letter-spacing -0.05em
      color rgba(248, 247, 247, 1)

      @media(platform: mobile)
        font-size 7vw
        font-weight 600
        letter-spacing -.04em
        line-height 1.5

    &-description
      margin-top 2.5vh
      font-family 'Open Sans', sans-serif
      font-size .885vw
      font-weight 500
      line-height 1.5
      letter-spacing -0.02em
      color rgba(125, 124, 125, 1)

      @media(platform: mobile)
        font-size 4vw
        margin-top 10vh
        max-width 90%

    &-button
      display flex
      align-items center
      width fit-content
      margin-top 4.63vh
      font-size .781vw
      color rgba(125, 124, 125, 1)
      cursor pointer

      @media(platform: mobile)
        font-size 4.4vw
        border-radius 0
        border 0.185vh solid rgba(134, 136, 136, 1)
        padding 1.2vh 4vw
        transition 0.1s all ease
        margin-top 10vh
        width 100%
        justify-content space-between

      &:hover
        .app-header__button-text
          text-decoration underline
          text-underline-offset .37vh
          text-decoration-thickness 1px

          @media(platform: mobile)
            text-decoration none
            text-decoration-offset

      &:active
        @media(platform: mobile)
          transform scale(0.95)
          color rgba(15, 15, 15, 1)
          background-color rgba(241, 242, 246, 1)
          border 0.185vh solid rgba(53, 52, 54, 1)

  &__content-image-wrapper
    width 23.958vw
    aspect-ratio 1 / 1
    flex-shrink 0
    position relative
    z-index 1

  &__content-image
    width 100%
    height 100%
    background-image url('../../assets/images/header/plate.png')
    background-position center
    background-size contain
    background-repeat no-repeat
    cursor grab
    user-select none
    touch-action none
    transform-origin center
    will-change transform

    &:active
      cursor grabbing

  &__sand
    position absolute
    inset 0
    width 100%
    height 100%
    pointer-events none
    overflow visible
    z-index 2

  &__button-left
    display flex
    align-items center

  &__button-arrow
    margin-left .521vw
    cursor pointer
    width .99vw
    height auto
    margin-top 2%

    @media(platform: mobile)
      width 4vw
      margin-left 0
      margin-top 1%

  &__footer
    margin-top 3.704vh

    @media(platform: mobile)
      display flex
      justify-content flex-start
      align-items center
      margin-top 10vh

    &-dislocation
      font-family 'Open Sans', sans-serif
      font-weight 600
      font-size .885vw
      letter-spacing -0.02em
      color rgba(125, 124, 125, 1)

      @media(platform: mobile)
        font-size 2.6vw

    &-icon
      @media(platform: mobile)
        width 2.6vw
        margin-right 1vw
</style>
