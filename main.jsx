import React from 'react'
import ReactDOM from 'react-dom'
import jq from 'jquery'

console.log("HELLO")

const query = new URLSearchParams(window.location.search).get('q')
const URL = `https://moma.corp.google.com/search?q=${encodeURIComponent(query)}`

const resultsPromise = fetch(URL, {credentials: "include"})
.then(response => response.ok ? response.text() : Promise.reject(response))
.then(body => jq(body)
	.find(".vNFZ7c > a")
	.map((index, element) => ({
		text: element.innerText,
		href: element.href,
		key: index,
	}))
)

class MomaFrame extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {results: null}
	}

	componentDidMount() {
		this.props.resultsPromise.then(results => this.setState({results}))
	}

	render() {
		return this.state.results ?
			<ul>
				{this.state.results.map((index, {text, href, key}) =>
					<li><a key={key} href={href}>{text}</a></li>
				)}
			</ul> :
			<div>Hello, World!</div>
	}
}

const root = document.createElement("div")

jq(root).insertBefore('#rso')

ReactDOM.render(<MomaFrame resultsPromise={resultsPromise}/>, root)

console.error("NOPE")
