class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: "Baptiste",
            demo: "demo1",
            multiple: ['demo1', 'demo2'],
            checked: true
        }
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleChangeSelectMultiple = this.handleChangeSelectMultiple.bind(this)
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    }

    handleChangeInput (e) {  // On récupére l'événement pour utiliser "target"
        console.log(e)
        this.setState({
            nom: e.target.value,
        })
    }

    handleChangeSelect (e) {
        this.setState({
            demo: e.target.value
        })
    }

    handleChangeSelectMultiple (e) {
        this.setState({
            multiple: Array.from(e.target.selectedOptions).map(o => o.value)
        })
    }

    handleChangeCheckbox (e) {
        this.setState({
            checked: this.state.checked ? false : true
            //checked: e.target.checked
            // Les deux fonctionnent
        })
    }

    render () {
        return <div>

            <label htmlFor="nom">Mon nom</label>
            <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChangeInput}/>
            <textarea name="test" id="test" cols="30" rows="10" value={this.state.nom} onChange={this.handleChangeInput}></textarea>

            <select name="select" id="select" value={this.state.demo} onChange={this.handleChangeSelect}>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select>

            {JSON.stringify(this.state.multiple)}
            <select name="select" id="select" value={this.state.multiple} onChange={this.handleChangeSelectMultiple} multiple>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
            </select>

            <input type="checkbox" checked={this.state.checked} onChange={this.handleChangeCheckbox}/>
            {this.state.checked ? <div>Un message s'afficher</div> : null}
        </div>
        // Particularité : Tout comme les input, les textarea vont pouvoir prendre un attribut value qui va permetre de modifier sa valeur (A LA DIFFERENCE DE HTML CLASSIQUE)
    }
}

ReactDOM.render(<Home/>, document.querySelector("#app"))


// Lorsque l'on construit une class (que l'on utilise le constructeur), alors il est TOUJOURS necessaire de faire super(props)
// On peut utiliser un component dans un autre component comme avec l'exemple de la classe Home
