class Validation {
	constructor(domTarget) {
		this.domTarget = domTarget[0];
		this.endOrder(this.domTarget);
	}

	/**
	 * resets the cart and displays the summary of the order.
	 * @param {HTMLElement} domTarget the target of the html input
	 */
	endOrder(domTarget) {
		let user = JSON.parse(localStorage.getItem("user"));
		let price = JSON.parse(localStorage.getItem("price"));
		const orderId = extractId(document.location.search);
		
		localStorage.removeItem("cart");
		data.Cart.deleteAll();
		domTarget.innerHTML = `
		<section class="validation">
			<h1>${user.firstName}, votre achat est bien confirmé !</h1>
			<h2>En voici le détail</h2>
			<ul>
				<li>Référence : ${orderId}</li>
				<li class="space">Prix total : ${price},00 €</li>
				<li class="space">Un mail contenant tous les détails de votre achat vous sera envoyé à ${user.email}</li>
			</ul>
			<p class="space">Merci d'avoir choisi un compagnion Orinourson !</p>
			<a href="/Front/html/index.html">
				Retourner à l'accueil
			</a>
		</section>
		`;
	}
}