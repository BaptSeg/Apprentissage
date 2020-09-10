function Compteur () {
    const state = React.useState(0)
    console.log(state)
    return <button>cc</button>
}

ReactDOM.render(<div><Compteur/></div>, document.getElementById('app'))