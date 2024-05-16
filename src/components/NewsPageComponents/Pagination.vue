<template>
	<div>
		<div class="pagination-row">

			<button class="pagination-button"> 
				<img src="/src/assets/pagination/double_arrow_left.svg" alt=""> 
			</button>

			<button class="pagination-button"> 
				<img src="/src/assets/pagination/arrow_left.svg" alt=""> 
			</button>

			<img class="bracket" src="/src/assets/pagination/bracket_left.svg" alt="">

			<span v-for="(item, index) in new Array(10)" :key="index">
				<button class="pagination-button">{{ index }}</button>
			</span>

			<div class="triangle"></div>
			
			<img src="/src/assets/pagination/bracket_right.svg" alt="">

			<button class="pagination-button"> 
				<img src="/src/assets/pagination/arrow_right.svg" alt=""> 
			</button>

			<button class="pagination-button">
				<img src="/src/assets/pagination/double_arrow_right.svg" alt=""> 	
			</button>

		</div>
	</div>
</template>
  
<script setup>

</script>
  
<style>
	.pagination-row {
		/* margin-top: 31px; */
		display:flex;
		align-items:center;
	}

	.pagination-button {
		padding: 8px;
		margin: 2px;
		border-radius: 3px;
		font-size: 1em;
		cursor: pointer;
	}
	.bracket {
	}
	
	.triangle {
		/* position: absolute;  */
		/* top: 110px; */
		/* left: calc(50% - 7px); */
		margin-top: -72px;
		width: 0;
		height: 0;
		border-left: 14px solid transparent;
		border-right: 14px solid transparent;
		border-bottom: 22px solid #1E66F5;
		transform: rotate(180deg);
	}
</style>
  