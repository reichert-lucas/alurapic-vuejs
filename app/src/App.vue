<template>
	<div class="corpo">

		<meu-menu :rotas="routes"></meu-menu>

		<transition name="pagina">
			<router-view></router-view>
		</transition>

	</div>
</template>
<script>
import {routes} from './routes'
import Menu from './components/shared/menu/Menu.vue'

export default {

	components: {
		'meu-menu': Menu
	},

	data() {
		return {
			routes: routes.filter(route => route.menu) // retorna apenas os links que devem aparecer no menu
		}
	}
}
</script>
<style scoped>
	.corpo {
		font-family: Helvetica, sans-serif;
		margin: 0 auto;
		width: 96%;
	}

	.pagina-enter-active, .pagina-leave-active{ /* classe criada pelo vue js tendo como base o nome passado para a transition */
        opacity: 0;
    }

    .pagina-enter-active, .pagina-leave-active{
        transition: opacity .4s;
    }

</style>