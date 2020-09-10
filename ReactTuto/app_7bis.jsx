const scaleNames = {
    c: "Celcius",
    f: "Fahrenheit"
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function toFahrenheit (celsius) {
    return (celsius * 9/5) + 32
}


function BoilingVerdict ({celsius}) {
    if (celsius >= 100) {
        return <div>
            <p className="alert alert-success">L'eau boue.</p>
        </div>
    }
    return <div>
        <p className="alert alert-danger">L'eau ne boue pas.</p>
    </div>
}

function Column2 ({left, right}) {
    return <div className="row">
        <div className="col-sm-6">{left}</div>
        <div className="col-sm-6">{right}</div>
    </div>
}


class TemperatureInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render () {
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]

        return <div className="form-group">
            <label htmlFor={name}>Température (en {scaleName})</label>
            <input type="text" className="form-control" id={name} value={this.props.temperature} onChange={this.handleChange}/>
        </div>
    }
}



class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: '20'
        }
        this.headleCelsiusChange = this.headleCelsiusChange.bind(this)
        this.headleFahrenheitChange = this.headleFahrenheitChange.bind(this)
    }

    headleCelsiusChange (temperature) {
        this.setState({
            scale: 'c',
            temperature: temperature
        })
    }
    headleFahrenheitChange (temperature) {
        this.setState({
            scale: 'f',
            temperature: temperature
        })
    }

    render () {
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : toCelsius(temperature)
        const fahrenheit = scale === 'f' ? temperature : toFahrenheit(temperature)
        return <div className="form-group">
            <Column2
                left={<TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.headleCelsiusChange}></TemperatureInput>}
                right={<TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.headleFahrenheitChange}></TemperatureInput>}
            />
            <BoilingVerdict celsius={temperature}></BoilingVerdict>
        </div>
    }
}


ReactDOM.render(<Calculator/>, document.getElementById("app"))