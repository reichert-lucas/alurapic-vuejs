<template lang="">
	<div>

		<img src="/static/lobo.jpeg" width="75px" height="75px" alt="Exemplo de imagem estática">

		<h1 v-meu-transform.animate="25" class="centralizado">{{ titulo }}</h1>
        <p v-show="message" class="centralizado">{{ message }}</p>
		
		<input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre suas fotos pelo nome"/>

		<ul class="lista-fotos">
			<li class="lista-fotos-item" v-for="foto of fotosComFiltro">
				<meu-painel :titulo="foto.titulo">
					<imagem-responsiva v-meu-transform:scale.animate.reverse="1.2" :url="foto.url" :titulo="foto.titulo"/>

                    <router-link :to="{name: 'altera', params: {id: foto._id}}">
                        <meu-botao tipo="button"
                                    rotulo="ALTERAR"/>
                    </router-link>
                    

                    <meu-botao tipo="button" 
                                rotulo="REMOVER"
                                :confirmacao="false"
                                estilo="perigo"
                                @botaoAtivado="remove(foto)"/>

				</meu-painel>
			</li>
		</ul>

	</div>
</template>
<script>
	import Painel from '../shared/painel/Painel.vue'
	import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
	import Botao from '../shared/botao/Botao.vue'
    import transform from '../../directives/Transform';
    import FotoService from '../../domain/foto/FotoService'

	export default {

		components: {
			'meu-painel': Painel,
			'imagem-responsiva': ImagemResponsiva,
			'meu-botao': Botao
		},

        directives: {
            'meu-transform': transform
        },

		data () {
			return {
				titulo: 'Alurapic 122',
				fotos: [],
				filtro: '',
				message: '',
			}
		},

		created () {
            this.service = new FotoService(this.$resource);

            this.service
            .lista()
			.then(fotos => this.fotos = fotos, err => { // quando a respota for convertida para json sera setado o valor e fotos, e esse fotos vai ser setado nas fotos do componente
                this.message = err.message
            }) 
		},

		computed: {
			fotosComFiltro() {
				if (this.filtro) {
					let exp = new RegExp(this.filtro.trim(), 'i')
					return this.fotos.filter(foto => exp.test(foto.titulo))
				} else {
					return this.fotos
				}
			}
		},

        methods: {
            remove(foto) {

                this.service.apaga(foto._id)
                                .then( () => {
                                    let index = this.fotos.indexOf(foto)
                                    this.fotos.splice(index, 1)
                                    this.message = 'Foto Removida com Sucesso'
                                }, err => this.message = err.message)                            
            }
        },

	};
</script>
<style>
	.titulo {
		text-align: center;
	}

	.lista-fotos {
		list-style: none;
	}

	.lista-fotos .lista-fotos-item {
		display: inline-block;
	}

	.centralizado{
        text-align: center;
    }

	.filtro{
		display: block;
		width: 100%;
	}
	
</style>