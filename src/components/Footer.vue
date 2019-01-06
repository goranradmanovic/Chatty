<template>
	<footer class="footer">
      <p class="footer__info">Designed &amp; Developed by <a class="footer__info--link" href="https://goranradmanovic.github.io/" target="_blank">Goran Radmanovic</a></p>
      <p class="footer__copyright">Copyright 2019</p>
    </footer>
</template>

<script>
	export default {
		name: 'Footer'
	}
</script>

<style>
	.footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 10px;
		font-weight: 500;
		color: #333;
	}

	.footer__info, .footer__copyright {
		width: 100%;
		font-size: .9em;
		text-align: center;
	}

	.footer__info--link {
		text-decoration: none;
		color: teal;
	}

	.footer__info--link:hover {
		text-decoration: underline;
	}
</style>