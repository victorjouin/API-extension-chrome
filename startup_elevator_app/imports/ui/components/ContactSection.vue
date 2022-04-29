<template>
  <section>
    <!--
    <div class="svg-border-rounded text-light">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
      >
        <path
            d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
    -->
    <v-container fluid id="contact">
      <v-row justify="center" class="ma-0">
            <v-col :cols="isXs ? 12 : 10">
                <h1 class="font-weight-light display-1" style="color:#e0a141" v-html="componentData.title"></h1>
              <v-row class="pb-8 mt-3">
                <h3 class="font-weight-light" v-html="componentData.subtitle">
                  
                </h3>
              </v-row>
            </v-col>
              </v-row>
            <!--
              <h3 class="font-weight-light mt-3">
                Telefone: +xx (xx) xxxxx-xxxx
              </h3>
              <h3 class="font-weight-light">
                Email: email@email.com
              </h3>
            <v-col cols="12" sm="7">
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Nome"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-textarea
                    v-model="textArea"
                    :rules="textAreaRules"
                    label="Mensagem"
                    required
                />

                <v-btn
                    :disabled="!valid"
                    color="primary"
                    :dark="valid"
                    rounded
                    block
                    class="mt-3"
                    @click="submit"
                >
                  Enviar
                </v-btn>
              </v-form>
            </v-col>
      -->
    </v-container>
    <div class="svg-border-waves text-white">
      <v-img src="/assets/img/borderWavesBlue.svg"/>
    </div>
    <!--

    <v-snackbar
        v-model="snackbar.enabled"
        timeout="3000"
        right
        top
        :color="snackbar.color"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="snackbar.enabled = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    -->
  </section>
</template>

<style scoped>
#contact {
  background-color: #f4f7f5;
  z-index: 0;
}

.svg-border-waves .v-image {
  left: 0;
  bottom:0;
  height: 3rem;
  background-color: #f4f7f5;
  width: 100%;
  overflow: hidden;
}

.svg-border-rounded svg {
  top: 0;
  left: 0;
  width: 100%;
  color: #f4f7f5;
  z-index: -1;
}

svg {
  overflow: hidden;
}
section {
  position: relative;
}
</style>

<script>
// import {db} from '@/main'

export default {
  props: {
    isXs: {default : false},
    componentData : {
      default : function() {
        return {
          title : "J’accompagne des projets",
          subtitle :"&nbsp;Vous accompagnez des projets, vous êtes directeur d’innovation. N’hésitez pas à nous contacter pour toute question. <b style='color : primary'><a target='_blank' href='https://tooap.com/'>Contact accompagnateurs</a></b>",
        }
      }
    }
    
  },
  data: () => ({
    icons: ["fa-facebook", "fa-twitter", "fa-linkedin", "fa-instagram"],
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "O campo nome é obrigatório",
      (v) => (v && v.length >= 6) || "O nome precisa ter mais de 6 caracteres",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "O campo email é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "O E-mail precisa ser válido",
    ],
    textArea: "",
    textAreaRules: [
      (v) => !!v || "O campo de texto é obrigatório",
      (v) => (v && v.length >= 10) || "Mínimo de 10 caracteres",
    ],
    lazy: false,
    snackbar: {
      enabled: false,
      text: '',
      color: ''
    }
  }),
  methods: {
    submit() {
      /*db.collection("contactData").add({
        name: this.name,
        email: this.email,
        message: this.textArea
      }).then(() => {
        this.snackbar.text = "Mensagem enviada com sucesso"
        this.snackbar.color = "success"
        this.snackbar.enabled = true
      }).catch(() => {
        this.snackbar.text = "Erro ao enviar mensagem"
        this.snackbar.color = "danger"
        this.snackbar.enabled = true
      })*/
    }
  }
};
</script>
