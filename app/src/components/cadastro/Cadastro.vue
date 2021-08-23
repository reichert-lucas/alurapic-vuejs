<!-- alurapic/src/components/cadastro/Cadastro.vue -->

<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>

    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Cadastrando</h2>
    
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(grava)">
        <div class="controle">
            <validation-provider name="Título" rules="required|min:3" v-slot="{ errors }">
                <label for="titulo">TÍTULO</label>
                <input id="titulo" autocomplete="off" 
                                        v-model.lazy="foto.titulo">

                <span class="error">{{ errors[0] }}</span>
            </validation-provider>
        </div>

        <div class="controle">
            <validation-provider name="URL" rules="required|min:3" v-slot="{ errors }">
                <label for="url">URL</label>
                <input id="url" autocomplete="off" 
                        v-model.lazy="foto.url">

                <span class="error">{{ errors[0] }}</span>
            </validation-provider>
            
            <imagem-responsiva v-show="foto.url" :url="foto.url" :titulo="foto.titulo" />
        </div>

        <div class="controle">
            <validation-provider name="Descrição" rules="required|min:3" v-slot="{ errors }">
                <label for="descricao">DESCRIÇÃO</label>
                <textarea id="descricao" autocomplete="off" 
                        v-model="foto.descricao"></textarea>

                <span class="error">{{ errors[0] }}</span>
            </validation-provider>
            
        </div>

        <div class="centralizado">
            <meu-botao rotulo="GRAVAR" tipo="submit"/>
            <router-link :to="{ name: 'home' }"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
        </div>

        </form>

    </ValidationObserver>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto'
import FotoService from '../../domain/foto/FotoService'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/pt_BR.json';

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

export default {

    components: {
        'imagem-responsiva': ImagemResponsiva, 
        'meu-botao': Botao,
        ValidationProvider, // componente usado para setar as regras dis campos
        ValidationObserver // componente usado para não submeter o formulário caso não tenha algum campo inválido
    },

    data () {
        return {
            foto: new Foto(),
            id: this.$route.params.id
        }
    },

    created(){
        this.service = new FotoService(this.$resource)

        if (this.id) {
            this.service.busca(this.id)
                        .then(foto => this.foto = foto)
        }

    },

    methods: {
        grava(){

            this.$refs.form.setErrors({})

            this.service
                .cadastra(this.foto)
                .then(() => {
                    this.$router.push({name: 'home'})
                    //this.foto = new Foto()
                }, err => console.log(err))
        }
    },
}

</script>
<style scoped>

    .centralizado {
        text-align: center;
    }
    .controle {
        font-size: 1.2em;
        margin-bottom: 20px;

    }
    .controle label {
        display: block;
        font-weight: bold;
    }

    .controle label + input, .controle textarea {
        width: 100%;
        font-size: inherit;
        border-radius: 5px
    }

    .centralizado {
        text-align: center;
    }

    .error{
        color: red;
    }

</style>