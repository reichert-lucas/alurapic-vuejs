<template>
    <nav>
        <ul>
			<li v-for="(rota, index) in rotas"  :key="index">
				<router-link class="btn btn-primary" :to="rota.path ? rota.path : '/'">
					{{rota.titulo}}
				</router-link>
			</li>
		</ul>
    </nav>
</template>
<script>
export default {
    props: {
		rotas: { // vai ajudar a retornar um erro no console mais detalhado caso seja passado outro tipo de dado, ou caso não seja informado
			type: Array,
			required: true
		}
	}


}
</script>
<style scoped>
    
</style>