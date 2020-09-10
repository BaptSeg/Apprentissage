function WelcomeFunc ({name, children}) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render () {
        return <div>
            <h1>Bonjour {this.props.name}</h1>
            <p>
                {this.props.children}
            </p>
        </div>
    }
}


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()} // Etat du component : C'est un objet qui va représenter les données utile au component et qui ne seront pas forcement exposées par des propriété
        this.timer = null       // On set le timer à null
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick.bind(this), 1000)     // Pas oublier de bind sinon la fonction n'aura pas accés à l'état date
        // Lorsque le component est monté, on set l'interval
    }

    componentwillUnmount() {
        window.clearInterval(this.timer)
        // Lorsque le component est démonté, il ne faut pas oublier de démonter le timer
    }

    tick () {
        this.setState({date: new Date()})
    }

    render () {
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>  // Cette fonction renvoie la date au format jour, mois, année selon une locale
    }
}

class Incrementer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {val: props.start}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    tick () {
        // this.setState({val: this.state.val + 1})

        this.setState( (state, props) => (
            {val: state.val + this.props.step}
        ))
        // Cette manière est mieux car elle évite des problèmes du fait qu'on utilise une valeur de l'état pour set cet état
    }

    render () {
        return <div>
            <p>L'incrementation est à : {this.state.val}</p>
        </div>
    }

}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}




class Home extends React.Component {

    render() {
        return <div>
            <Welcome name="Baptiste"></Welcome>
            <Welcome name="Aurélien"></Welcome>
            <Clock></Clock>
            <Incrementer start={10}></Incrementer>
            <Incrementer start={10} step={10}></Incrementer>
        </div>
    }
}


ReactDOM.render(<Home/>, document.querySelector("#app"))


// Lorsque l'on construit une class (que l'on utilise le constructeur), alors il est TOUJOURS necessaire de faire super(props)
// On peut utiliser un component dans un autre component comme avec l'exemple de la classe Home
