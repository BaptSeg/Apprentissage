class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: "Nom",
            prenom: "Prénom",
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        const name = e.target.name  // On récupère le nom du champs
        const type = e.target.type  // On récupère le type de champs
        const value = type === 'checkbox' ? e.target.checked : e.target.value   // Si le type de champs est 'checkbox' alors on récupère plutot e.target.checked et non pas e.target.value
        this.setState({
            [name]: value   // Prendre l'élement qui à cette clef
        })
    }

    render () {
        return <div>
            <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" value={this.state.nom} id="nom" name="nom" onChange={this.handleChange}/>
            </div>
            <div>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" value={this.state.prenom} id="prenom" name="prenom" onChange={this.handleChange}/>
            </div>
            <div>
                <label htmlFor="newsletter">S'abonner à la newsletter</label>
                <input type="checkbox" checked={this.state.newsletter} id="newsletter" name="newsletter" onChange={this.handleChange}/>
            </div>
            {JSON.stringify(this.state)}

            <input type="text" defaultValue="Baptiste"/>
        </div>
            // Le dernier correspond à si l'on souhaite ne pas controler le champs avec React mais si on veut simplement mettre une valeur par défaut
    }
}

ReactDOM.render(<Home/>, document.querySelector("#app"))


