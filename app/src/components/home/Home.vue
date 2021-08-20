<template lang="">
	<div>
		<h1 class="centralizado">{{ titulo }}</h1>
		
		<input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="Filtre suas fotos pelo nome"/>

		<ul class="lista-fotos">
			<li class="lista-fotos-item" v-for="foto of fotosComFiltro">
				<meu-painel :titulo="foto.titulo">
					<imagem-responsiva :url="foto.url" :titulo="foto.titulo"/>
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

	export default {

		components: {
			'meu-painel': Painel,
			'imagem-responsiva': ImagemResponsiva,
			'meu-botao': Botao
		},

		data () {
			return {
				titulo: 'Alurapic 122',
				fotos: [],
				filtro: ''
				
			}
		},

		created () {
			this.$http.get('http://127.0.0.1:3000/v1/fotos') // faz a requisição para o servidor web e retorna uma promise
						.then(res => res.json()) // então, quando essa requisição for terminada, vai converter ela para json
						.then(fotos => this.fotos = fotos, err => console.log(err)) // quando a respota for convertida para json sera setado o valor e fotos, e esse fotos vai ser setado nas fotos do componente
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
                alert('remover a foto'+foto.titulo)
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

	

	.filtro{
		display: block;
		width: 100%;
	}
	
</style>