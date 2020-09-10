let n = 0

function render() {
	const items = [
		"Tache 1",
		"Tache 2",
		"Tache 3"
	]
	const lis = items.map((item, k) => <li key={k}>{item}</li>)			// Ici on parcourt la tableau items -> On stock dans item l'élement parcouru, et on stock dans k l'index
																						// de cet item. Ensuite on donne un clef unique à chaque <li>

	const title = <React.Fragment>
			<h1 id={"title" + n}> Bonjour les gens <span>{n}</span></h1>
			<ul>{lis}</ul>
		</React.Fragment>
	ReactDOM.render(title, document.querySelector("#app"))

}


render()

window.setInterval(() => {
	n++
	render()
}, 1000)