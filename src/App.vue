<template lang="pug">
  .portfolio
    .portfolio__body-top
      .portfolio__body-top_img
        .portfolio__body-content

          .portfolio__content-title
            span портфолио

          .portfolio__content-name
            span Никита Неранов

          .portfolio__content-separation_start

          .portfolio__about
            .portfolio__about-image
              .portfolio__about-image_img

            .portfolio__about-text
              .portfolio__section-title
                span обо мне

              .portfolio__about-description
                | {{ textAbout }}

          .portfolio__content-separation_skills

          .portfolio__skills
            .portfolio__section-title
              span навыки

            .portfolio__skills-items
              .portfolio__skills-item(
                v-for="item in itemsSkills"
                :key="item.id"
              )
                component.portfolio__skills-item_icon(
                  :is="item.icon"
                )

                .portfolio__skills-description
                  .portfolio__skills-description_title
                    | {{ item.title }}

                  .portfolio__skills-description_value
                    | {{ item.description }}

          .portfolio__content-separation_skills.portfolio__content-separation_skills_reverse

          .portfolio__projects
            .portfolio__section-title
              span примеры моих работ

            .portfolio__projects-items
              .portfolio__projects-arrow(
                @click="prevProject"
              )
                arrowIcon

              .portfolio__projects-item(
                v-for="item in visibleProjects"
                :key="item.key"
              )
                .portfolio__projects-item_img(
                  :style="{ backgroundImage: `url(${item.project.icon})` }"
                )

              .portfolio__projects-arrow(
                @click="nextProject"
              )
                arrowIcon

          .portfolio__content-separation_projects

          .portfolio__contacts
            .portfolio__contacts-title
              .portfolio__content-separation_contacts

              .portfolio__section-title
                span контакты

              .portfolio__content-separation_contacts

            .portfolio__contacts-items
              .portfolio__contacts-item(
                v-for="item in itemsContacts"
                :key="item.id"
              )
                img.portfolio__contacts-item_icon(
                  :src="item.icon"
                  alt=""
                )

                .portfolio__contacts-item_value
                  | {{ item.value }}

          .portfolio__content-separation_start.portfolio__content-separation_start_reverse

    .portfolio__body-bottom
      .portfolio__body-bottom_img

</template>
<script>
import mailIcon from "@/assets/images/icons/mail.svg";
import mapPinIcon from "@/assets/images/icons/map-pin.svg";
import phoneIcon from "@/assets/images/icons/phone.svg";
import flowlyIcon from "@/assets/images/projects/flowly.png";
import lumiereIcon from "@/assets/images/projects/lumiere.png";
import voyageIcon from "@/assets/images/projects/voyage.png";

import codeIcon from "@/components/icons/code.vue";
import pencilIcon from "@/components/icons/pencil.vue";
import settingsIcon from "@/components/icons/settings.vue";
import uxIcon from "@/components/icons/ux.vue";
import globalIcon from "@/components/icons/global.vue";
import arrowIcon from "@/components/icons/arrow.vue";


export default {
  components: {
    arrowIcon,
  },

  data() {
    return {
      currentProjectIndex: 0,

      textAbout: `
        Учусь на 3 курсе Колледжа Алтайского государственного университета по направлению Fullstack-разработки. Больше всего меня привлекает frontend-разработка.
        Около года работал в сфере GameDev, где получил практический опыт разработки с использованием Vue.js, Stylus и Pug.
        Также интересуюсь визуальной стороной разработки: работаю с Figma и SVG, создаю и редактирую векторную графику, под конкретные задачи. В свободное время изучаю 3D-моделирование.
      `,

      itemsSkills: [
        {
          id: 'frontend',
          title: 'Frontend',
          icon: codeIcon,
          description: 'Vue.js и базовый JavaScript. Работа с Pug и Stylus, использование БЭМ при организации структуры компонентов и стилей. Базовое понимание SCSS и SASS.'
        },
        {
          id: 'design',
          title: 'UI / UX',
          icon: uxIcon,
          description: 'Работа с Figma. Базовое понимание композиции, типографики и структуры пользовательских интерфейсов.'
        },
        {
          id: 'layout',
          title: 'Вёрстка',
          icon: globalIcon,
          description: 'Адаптивная вёрстка, Flexbox и Grid. Работа с размерами, отступами и расположением элементов на странице.'
        },
        {
          id: 'graphics',
          title: 'Графика',
          icon: pencilIcon,
          description: 'Создание и редактирование существующих SVG под конкретные задачи.'
        },
        {
          id: 'tools',
          title: 'Инструменты',
          icon: settingsIcon,
          description: 'Git для контроля версий. Базовое понимание SQL и работа с базами данных в DBeaver.'
        },
      ],

      itemsProject: [
        {
          id: 'project-1',
          title: 'Проект 1',
          icon: flowlyIcon,
          description: 'Описание первого проекта.',
        },
        {
          id: 'project-2',
          title: 'Проект 2',
          icon: lumiereIcon,
          description: 'Описание второго проекта.',
        },
        {
          id: 'project-3',
          title: 'Проект 3',
          icon: voyageIcon,
          description: 'Описание третьего проекта.',
        },
      ],

      itemsContacts: [
        {
          id: 'email',
          icon: mailIcon,
          value: 'nneranov@mail.ru',
        },
        {
          id: 'phone',
          icon: phoneIcon,
          value: '+7 914 108 24 90',
        },
        {
          id: 'location',
          icon: mapPinIcon,
          value: 'Barnaul, Russia',
        },
      ],
    }
  },

  computed: {
    visibleProjects() {
      if (!this.itemsProject.length) {
        return [];
      }

      return [0, 1, 2].map((offset) => {
        const index =
          (this.currentProjectIndex + offset) % this.itemsProject.length;

        return {
          project: this.itemsProject[index],
          key: `${this.currentProjectIndex}-${offset}`,
        };
      });
    },
  },

  methods: {
    nextProject() {
      if (!this.itemsProject.length) {
        return;
      }

      this.currentProjectIndex =
        (this.currentProjectIndex + 1) % this.itemsProject.length;
    },

    prevProject() {
      if (!this.itemsProject.length) {
        return;
      }

      this.currentProjectIndex =
        (this.currentProjectIndex - 1 + this.itemsProject.length) %
        this.itemsProject.length;
    },
  },
};
</script>


<style lang="stylus">
.portfolio
  width 100%
  height auto
  display flex
  justify-content flex-start
  align-items center
  flex-direction column
  position relative

  &__body-top
    width 70%
    height auto
    position relative

    &_img
      width 100%
      height 2001px
      background-image url('@/assets/images/pergament/pergament_top.png')
      background-size 100% 100%
      background-repeat no-repeat
      background-position top
      box-sizing border-box
      padding-top 21%

  &__body-content
    display flex
    justify-content flex-start
    align-items center
    flex-direction column
    box-sizing border-box
    padding 0 270px

  &__content-title
    font-family Playfair Display
    font-size 60px
    font-weight 500
    color black
    text-transform uppercase

  &__content-name
    font-family Playfair Display
    font-size 24px
    font-weight 500
    color black
    text-transform uppercase
    margin 20px 0 0 0

  &__section-title
    font-family Playfair Display
    font-size 30px
    font-weight 500
    color rgba(55, 34, 15, 1)
    text-transform uppercase

    span
      display block

  &__content-separation_start
    width 100%
    height 100px
    background-image url('@/assets/images/separation/separation_top-bottom.png')
    background-position center
    background-repeat no-repeat
    background-size contain
    margin -30px 0 0 0

    &_reverse
      transform rotate(180deg)
      margin 0

  &__about
    width 100%
    height auto
    margin-top 20px
    display flow-root

    &-text
      max-width none

    .portfolio__section-title
      margin-bottom 15px

    &-description
      font-family Playfair Display
      font-size 20px
      font-weight 500
      color black
      margin-bottom 15px
      word-spacing 1px

    &-image
      float right
      width 40%
      height 348px
      margin 0 0 20px 30px
      border 2px solid rgba(0, 0, 0, 0.5)
      border-radius 5px
      background-color rgba(0, 0, 0, 0.1)
      box-sizing border-box
      overflow hidden

      &_img
        width 100%
        height 100%
        background-image url('@/assets/images/image.jpg')
        background-position 59% 80%
        background-repeat no-repeat
        background-size 165% 190%

  &__content-separation_skills
    width 100%
    height 70px
    background-image url('@/assets/images/separation/separation_skills.png')
    background-position center
    background-repeat no-repeat
    background-size contain

    &_reverse
      transform rotate(180deg)

  &__skills
    width 100%
    height auto
    position relative

    .portfolio__section-title
      margin 15px 0 0 0

    &-items
      display flex
      justify-content flex-start
      margin 25px 0 50px 0

    &-item
      width 90px
      height 90px
      border 2px solid rgba(0, 0, 0, 0.3)
      border-radius 50%
      box-sizing border-box
      margin-right 85px
      display flex
      justify-content center
      align-items center
      position relative

      &:hover
        background-color rgba(0, 0, 0, 0.5)

        .portfolio__skills-description
          display block

        .portfolio__skills-item_icon
          color white

      &_icon
        width 34px
        height 34px
        display block
        color #37220F

      &:nth-child(5n)
        margin-right 0

    &-description
      display none
      position absolute
      top 105px
      left 50%
      transform translateX(-50%)
      width 350px
      padding 18px
      box-sizing border-box
      background-color rgba(20, 15, 10, 0.88)
      color white
      border-radius 5px
      z-index 10

      &_title
        font-family Playfair Display
        font-size 24px
        margin-bottom 10px

      &_value
        font-family Playfair Display
        font-size 18px
        line-height 1.4

  &__projects
    width 100%
    height auto

    .portfolio__section-title
      margin 15px 0 0 0

    &-items
      width 100%
      height 150px
      display flex
      justify-content space-between
      margin-top 25px

    &-arrow
      width 5%
      height 100%
      display flex
      justify-content center
      align-items center

      color #37220F

      &:hover
        color #8B6F47
      
      &:first-child
        transform rotate(180deg)

      svg
        width 25px
        height 25px

    &-item
      width 28%
      height 100%
      border 2px solid rgba(0, 0, 0, 0.5)
      border-radius 5px
      background-color rgba(0, 0, 0, 0.1)
      box-sizing border-box
      overflow hidden

      &_img
        width 100%
        height 100%
        background-position center
        background-repeat no-repeat
        background-size cover

  &__content-separation_projects
    width 100%
    height 70px
    background-image url('@/assets/images/separation/separation_projects.png')
    background-position center
    background-repeat no-repeat
    background-size contain
    margin 50px 0 0 0

  &__contacts
    width 100%
    height auto

    &-title
      display flex
      justify-content space-between
      align-items center

    .portfolio__section-title
      flex-shrink 0

    &-items
      width 100%
      display flex
      justify-content space-evenly
      margin 45px 0 35px 0
      box-sizing border-box                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

    &-item
      display flex
      align-items center

      &_icon
        width 30px
        height 30px
        margin 0 10px 0 0

      &_value
        font-family Playfair Display
        font-size 23px
        font-weight 600
        color rgba(55, 34, 15, 1)

  &__content-separation_contacts
    width 100%
    height 40px
    background-image url('@/assets/images/separation/separation_contacts.png')
    background-position center
    background-repeat no-repeat
    background-size contain
    margin 10px 0 0 0

    &:last-child
      transform scaleX(-1)

  &__body-bottom
    width 70%
    height auto
    position relative

    &_img
      width 100%
      height 210px
      background-image url('@/assets/images/pergament/pergament_bottom.png')
      background-size 100% 100%
      background-repeat no-repeat
      background-position top
      position absolute
      top -100px
</style>