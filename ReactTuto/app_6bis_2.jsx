class Field extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {name, value, onChange, children} = this.props
        return <div className="form-group">
            <label htmlFor={name}>{children}</label>
            <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control"/>
        </div>
    }
}

function CheckBox ({name, value, onChange, children}) {
    return <div className="form-check">
        <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-check-input"/>
        <label htmlFor={name} className="form-check-label">{children}</label>
    </div>
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: "Nom",
            prenom: "Prénom",
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        const name = e.target.name  // On récupère le nom du champs
        const type = e.target.type  // On récupère le type de champs
        const value = type === 'checkbox' ? e.target.checked : e.target.value   // Si le type de champs est 'checkbox' alors on récupère plutot e.target.checked et non pas e.target.value
        this.setState({
            [name]: value   // Prendre l'élement qui à cette clef
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        console.log(data)
    }


    render () {
        return <form className="container" onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prénom</Field>
            <CheckBox name="newsletter" checked={this.state.checked} onChange={this.handleChange}>S'baboner à la newsletter</CheckBox>
            <div className="form-group">
                <button className="btn btn-primary">Envoyer</button>
            </div>
        </form>
    }
}

ReactDOM.render(<Home/>, document.querySelector("#app"))


