<template lang="pug">
  .app-projects#projects

    .app-projects__header
      .app-projects__header-container
        .app-projects__header-title Мои Работы
        .app-projects__header-counter
          | {{ counterLabel }}
      .app-projects__header-button.unselectable(v-if="!isMobile && projects.length > 3" @click="")
        .app-projects__header-button_text Посмотреть все проекты
        ArrowIcon.app-projects__header-button_arrow

    .app-projects__content
      .app-projects__content-item(
        v-for="(project, index) in projects"
        :key="project.id"
        @click="openProject(project)"
      )
        .app-projects__item-media(
          :style="{backgroundColor: project.color, backgroundImage: `url(${project.image})`, backgroundSize: `${project.width} auto`}"
        )
          img.app-projects__item-decor(
            v-for="decor in project.decorations"
            :key="decor.id"
            :src="decor.image"
            :class="`app-projects__item-decor_${decor.position}`"
            alt=""
          )
        .app-projects__item-title
          span {{ project.title }}

          .app-projects__item-index {{ formatIndex(index) }}
        .app-projects__item-description
          span {{ project.description }}
          ArrowIcon.app-projects__item-arrow(v-if="isMobile" @click="")
        .app-projects__item-container
          ArrowIcon.app-projects__item-arrow(v-if="!isMobile" @click="")

    Teleport(to="body")
      .project-modal(
        v-show="selectedProject"
        @click="closeProject"
      )
        .project-modal__close.unselectable(
          @click.stop="closeProject"
        )
          span Закрыть
          span.project-modal__close-icon ×

        .project-modal__content(
          @click.stop
        )
          .project-modal__title(
            v-if="selectedProject"
          ) {{ selectedProject.title }}

          .project-modal__images
            img.project-modal__image(
              v-for="project in projects"
              :key="project.id"
              :src="project.preview"
              :alt="project.title"
              v-show="selectedProject?.id === project.id"
              loading="eager"
            )

</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import ArrowIcon from '../icons/Arrow.vue'
import FormaImage from '@/assets/images/projects/forma.png'
import PulseImage from '@/assets/images/projects/pulse.png'
import ZernaImage from '@/assets/images/projects/zerna.png'

import LeavesImage from '@/assets/images/projects/zerna/leaves.png'
import CupImage from '@/assets/images/projects/zerna/cup.png'
import BranchImage from '@/assets/images/projects/zerna/branch_zerna.png'

import BranchFormaImage from '@/assets/images/projects/forma/branch_forma.png'
import StagesImage from '@/assets/images/projects/forma/stages.png'
import HouseImage from '@/assets/images/projects/forma/house.png'

import DancingBackgroundImage from '@/assets/images/projects/pulse/dancing_background.png'
import HeadphonesImage from '@/assets/images/projects/pulse/headphones.png'
import PImage from '@/assets/images/projects/pulse/p.png'

import FormaSiteImage from '@/assets/images/projects/forma/forma_preview.png'
import PulseSiteImage from '@/assets/images/projects/pulse/pulse_preview.png'
import ZernaSiteImage from '@/assets/images/projects/zerna/zerna_preview.png'

const projects = [
  {
    id: 1,
    title: 'Forma',
    description: 'Архитектурное бюро.',
    image: FormaImage,
    preview: FormaSiteImage,
    color: '#E9E6E0',
    width: '80%',
    decorations: [
      {
        id: 1,
        image: BranchFormaImage,
        position: 'branch',
      },
      {
        id: 2,
        image: StagesImage,
        position: 'stages',
      },
      {
        id: 3,
        image: HouseImage,
        position: 'house',
      },
    ],
  },
  {
    id: 2,
    title: 'Pulse',
    description: 'Музыкальный фестиваль.',
    image: PulseImage,
    preview: PulseSiteImage,
    color: '#121016',
    width: '80%',
    decorations: [
      {
        id: 1,
        image: DancingBackgroundImage,
        position: 'dancing',
      },
      {
        id: 2,
        image: HeadphonesImage,
        position: 'headphones',
      },
      {
        id: 3,
        image: PImage,
        position: 'p',
      },
    ],
  },
  {
    id: 3,
    title: 'Zёrna',
    description: 'Кофейный бренд.',
    image: ZernaImage,
    preview: ZernaSiteImage,
    color: '#EEDDC5',
    width: '80%',
    decorations: [
      {
        id: 1,
        image: LeavesImage,
        position: 'leaf',
      },
      {
        id: 2,
        image: CupImage,
        position: 'cup',
      },
      {
        id: 3,
        image: BranchImage,
        position: 'beans',
      },
    ],
  },
]

defineProps({
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const selectedProject = ref(null)

const openProject = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = ''
}

const onKeydown = (event) => {
  if (event.key === 'Escape' && selectedProject.value) {
    closeProject()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

const pad = (n) => String(n).padStart(2, '0')
const formatIndex = (index) => pad(index + 1)

const counterLabel = computed(() => `${pad(1)} — ${pad(projects.length)}`)
</script>

<style lang="stylus" scoped>
.app-projects
  width 100%
  height auto
  background-color rgba(245, 245, 245, 1)
  border-top 0.093vh solid rgba(210, 210, 210, 1)
  padding 3.981vh 2.969vw
  box-sizing border-box

  @media (platform: mobile)
    padding 2vh 2.5vw

  &__header
    display flex
    justify-content space-between
    align-items center
    font-family "Open Sans"
    font-weight 600
    font-size .885vw
    color rgba(55, 56, 57, 1)

    @media (platform: mobile)
      font-size 4vw

    &-container
      display flex
      align-items center
      justify-content flex-start

      @media (platform: mobile)
        width 100%
        justify-content space-between

    &-title
      margin-right .521vw
      letter-spacing -0.08em

      @media (platform: mobile)
        margin-right 0
        letter-spacing -0.04em

    &-counter
      opacity .5

    &-button
      display flex
      align-items center
      justify-content center
      cursor pointer

      &:hover
        .app-projects__header-button_text
          text-decoration underline
          text-underline-offset .37vh
          text-decoration-thickness 1px

      &_text
        margin-right .521vw
        letter-spacing -0.08em
        color rgba(55, 56, 57, 0.5)

        @media (platform: mobile)
          margin-right 1.042vw

      &_arrow
        width .99vw
        height auto
        color rgba(149, 150, 150, 1)
        margin-top 1%

        @media (platform: mobile)
          width 1.802vw

  &__content
    margin-top 2.593vh
    display flex
    justify-content flex-start
    align-items flex-start
    gap 1.25vw

    @media (platform: mobile)
      margin-top 1.8vh
      gap 2.25vw
      flex-direction column

    &-item
      width 19.271vw
      max-width 100%
      cursor pointer

      @media (platform: mobile)
        width 100%

      &:hover
        @media(platform: desktop)
          .app-projects__item-arrow
            left calc(100% - .99vw)

          .app-projects__item-decor
            opacity 1

          .app-projects__item-decor_leaf
            transform translateX(50%) rotate(-8deg)

          .app-projects__item-decor_cup
            transform translateX(0) rotate(4deg)

          .app-projects__item-decor_beans
            transform translate(-50%, 0)

          .app-projects__item-decor_branch
            transform translate(0, 0) rotate(5deg)

          .app-projects__item-decor_house
            transform translate(0, 0)

          .app-projects__item-decor_stages
            transform translate(0, 0)

          .app-projects__item-decor_dancing
            transform translateY(0) scale(1)

          .app-projects__item-decor_headphones
            transform translateX(0) rotate(-8deg)

          .app-projects__item-decor_p
            transform translate(0, 0) rotate(5deg)

  &__item-media
    width 100%
    aspect-ratio 1 / 1
    display flex
    justify-content center
    align-items center
    border-radius .26vw
    overflow hidden
    position relative
    background-repeat no-repeat
    background-position center
    cursor pointer

    @media (platform: mobile)
      border-radius 0.521vw
      aspect-ratio 2 / 1

  &__item-decor
    position absolute
    pointer-events none
    opacity 0
    transition transform .5s ease, opacity .35s ease
    z-index 1

    &__leaf
      width 2vw
      left -1.5vw
      transform translateX(-4vw) rotate(-20deg)

    &__cup
      width 3vw
      right -1vw
      transform translateX(5vw) rotate(12deg)

    &__beans
      width 2vw
      left 0
      bottom 0
      transform translate(-50%, 5vh)

    &_branch
      width 15vw
      left -2vw
      top -2vh
      transform translate(-4vw, -3vh)

    &_house
      width 11vw
      left -2vw
      bottom -1vh
      transform translate(-6vw, 6vh)

    &_stages
      width 11vw
      right -2vw
      bottom -1vh
      transform translate(6vw, 6vh)

    &_dancing
      width 100%
      left 0
      bottom -1vh
      transform translateY(5vh) scale(1.08)
      opacity 0

    &_headphones
      width 7vw
      left -1.5vw
      top 2vh
      transform translateX(-5vw) rotate(-25deg)

    &_p
      width 7vw
      right -1.5vw
      top 1vh
      transform translate(5vw, -2vh) rotate(18deg)

  &__item-title
    margin-top 1.481vh
    display flex
    justify-content space-between
    align-items center
    font-family "Open Sans"
    font-weight 600
    font-size .885vw
    letter-spacing -0.06em
    text-transform uppercase
    color rgba(55, 56, 57, 1)

    @media (platform: mobile)
      font-size 3.6vw
      margin-top 0.8vh

  &__item-index
    color rgba(55, 56, 57, 0.5)

  &__item-description
    margin .926vh 0
    font-family "Open Sans"
    font-weight 600
    font-size .885vw
    letter-spacing -0.06em
    color rgba(55, 56, 57, 0.5)

    @media (platform: mobile)
      font-size 3vw
      margin 0.521vw 0 1.042vw 0
      display flex
      justify-content space-between
      align-items center

  &__item-arrow
    width .99vw
    height auto
    color rgba(63, 63, 63, 1)

    @media(platform: desktop)
      position absolute
      left 0
      top 0
      transition left .3s ease

    @media (platform: mobile)
      width 3.6vw

  &__item-container
    width 100%
    height 1.389vh
    position relative

.project-modal
  position fixed
  inset 0
  width 100%
  height 100dvh
  background rgba(15, 15, 15, .96)
  z-index 9999
  overflow-y auto
  padding 3vh 3vw
  box-sizing border-box

  &__images
    width 100%

  &__close
    padding 1.389vh 1.25vw
    border-radius 1.927vw
    display flex
    justify-content space-between
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
    position absolute
    top 2vh
    right 2vw

    &:hover
      @media(platform: desktop)
        color rgba(15, 15, 15, 1)
        background-color #E9ECEC
        border .104vw solid rgba(15, 15, 15, 1)

    &:active
      transform scale(0.98)
      color rgba(15, 15, 15, 1)
      background-color rgba(241, 242, 246, 1)
      border 0.185vh solid rgba(53, 52, 54, 1)

  &__close-icon
    font-size 1.3vw
    line-height 1
    margin-left 1vw

  &__content
    width 75vw
    margin 0 auto

  &__title
    margin-bottom 2vh
    font-family "Open Sans"
    font-weight 600
    font-size 2.5vw
    letter-spacing -0.06em
    color white

  &__image
    display block
    width 100%
    height auto

@media(platform: mobile)
  .project-modal
    padding 2vh 2.5vw

    &__close
      position initial
      width 100%
      font-size 4.4vw
      border-radius 0
      border 0.185vh solid rgba(134, 136, 136, 1)
      padding 1.2vh 4vw

    &__close-icon
      font-size 5vw
      margin-left 2vw

    &__content
      width 100%

    &__title
      margin-top 2vh
      margin-bottom 2vh
      font-size 6vw

    &__image
      width 100%
</style>
