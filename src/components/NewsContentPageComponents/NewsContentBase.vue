<script setup>
  import { defineProps } from "vue";

	const newsBaseData = defineProps({
		newsFullInfo: { type: String, default: "Вот вам яркий пример современных тенденций — перспективное планирование играет важную роль в формировании приоретизации разума над эмоциями. А ещё базовые сценарии поведения пользователей освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, подвергнуты целой серии независимых исследований."},
	});
</script>

<template>
  <div class="news-content-base-container">
    <div class="news-content-base">
      <p class="base-text-content">
        {{ newsBaseData.newsFullInfo }}
      </p>

      <!-- <p class="base-text-content">
        Вот вам яркий пример современных тенденций — перспективное планирование играет важную роль в формировании
        приоретизации разума над эмоциями. А ещё базовые сценарии поведения пользователей освещают чрезвычайно
        интересные особенности картины в целом, однако конкретные выводы, разумеется, подвергнуты целой серии
        независимых исследований.
      </p>
      <ul class="base-text-content-ul">
        <li>Ясность нашей позиции очевидна: перспективное планирование требует анализа позиций, занимаемых участниками в
          отношении поставленных задач.
        </li>
        <li>Идейные соображения высшего порядка, а также высокое качество позиционных исследований выявляет срочную
          потребность кластеризации усилий.
        </li>
        <li>Но тщательные исследования конкурентов призывают нас к новым свершениям, которые, в свою очередь, должны
          быть подвергнуты целой серии независимых исследований!
        </li>
      </ul>
      <p class="base-text-content">
        С учётом сложившейся международной обстановки, высокотехнологичная концепция общественного уклада требует
        определения и уточнения благоприятных перспектив. А также непосредственные участники технического прогресса
        могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Ясность нашей позиции
        очевидна: дальнейшее развитие различных форм деятельности в значительной степени обусловливает важность
        укрепления моральных ценностей.
      </p> -->

      <hr v-if="newsBaseData.newsFullInfo" style="width: 80%; margin: auto"/>

    </div>
  </div>
</template>

<style scoped>

.news-content-base-container{
  width: 100%;
  display: flex;
  justify-content: center;
  }

.news-content-base{
  display: flex;
  flex-direction: column;
  width: 90%;
  border: solid 1px #2B2B2B;
  border-bottom: none;
  background-color: #181818;
  height: auto;
}

.base-text-content{
  font-family: Nunito;
  font-size: 24px;
  color: white;
  margin: 30px;
  text-indent: 20px;
}

.base-text-content-ul{
  font-family: Nunito;
  font-size: 24px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px 60px 0px 60px;
}

ul.base-text-content-ul {
  list-style: none; /* Отказываемся от стандартных маркеров */
}
ul.base-text-content-ul li::before{

  content: "– "; /* Вот и наше тире! */
  padding-right: 20px; /* А здесь обеспечим утонченный отступ для тире */
  color: #1E66F5;
}



</style>