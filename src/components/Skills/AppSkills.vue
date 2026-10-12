<template lang="pug">
  .app-skills

    .app-skills__title
      span Навыки

    .app-skills__content
      .app-skills__content-item(
        v-for="skill in skills"
        :key="skill.id"
      )
        .app-skills__item-value
          span {{ skill.value }}

    .app-skills__title
      span Инструменты

    .app-skills__content
      .app-skills__content-item(
        v-for="tool in tools"
        :key="tool.id"
        @click=""
      )
        img.app-skills__item-icon(
          :src="tool.icon"
        )
        .app-skills__item-value
          span {{ tool.value }}

</template>

<script setup>
import FigmaIcon from '@/assets/images/skills/figma.svg'
import BlenderIcon from '@/assets/images/skills/blender.svg'
import VueIcon from '@/assets/images/skills/vue.svg'
import GitIcon from '@/assets/images/skills/git.svg'
import GimpIcon from '@/assets/images/skills/gimp.svg'
import PhotoshopIcon from '@/assets/images/skills/photoshop.svg'
import SubstanceIcon from '@/assets/images/skills/substance.svg'
import UnrealIcon from '@/assets/images/skills/unreal.svg'

const skills = [
  { id: 1, value: 'HTML & CSS' },
  { id: 2, value: 'Pug' },
  { id: 3, value: 'Stylus' },
  { id: 4, value: 'БЭМ' },
  { id: 5, value: 'UI/UX' },
  { id: 6, value: 'Vue.js' },
  { id: 7, value: 'Компонентная разработка' },
]

const tools = [
  { id: 1, value: 'Figma',   icon: FigmaIcon },
  { id: 2, value: 'Blender', icon: BlenderIcon },
  { id: 3, value: 'Vue.js',  icon: VueIcon },
  { id: 4, value: 'Git',  icon: GitIcon },
  { id: 5, value: 'GIMP', icon: GimpIcon},
  { id: 6, value: 'Adobe Photoshop ', icon: PhotoshopIcon},
  { id: 7, value: 'Adobe Substance 3D', icon: SubstanceIcon},
  { id: 8, value: 'Unreal Engine', icon: UnrealIcon},
]
</script>

<style scoped lang="stylus">
.app-skills
  background-color rgba(240, 240, 238, 1)
  width 100%
  padding 3.148vh 4.323vw
  box-sizing border-box
  border-top .052vw solid rgba(255, 255, 255, 1)

  &__title
    font-family "Open Sans"
    color rgba(15, 15, 15, 1)
    font-weight 600
    font-size .885vw
    letter-spacing -0.08em
    margin-bottom 2.407vh

  &__content
    display flex
    flex-wrap wrap
    justify-content flex-start
    align-items flex-start
    gap .365vw
    margin-bottom 3.519vh

    &-item
      display flex
      align-items center
      padding .556vh .625vw
      background-color #E5E5E5
      border-radius 1.979vw
      font-family "Open Sans"
      color rgba(15, 15, 15, 1)
      font-weight 600
      font-size .885vw
      letter-spacing -0.08em

  &__item-icon
    width .781vw
    margin-right .26vw
    user-select none
</style>
