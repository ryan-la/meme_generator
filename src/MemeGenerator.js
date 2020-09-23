import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes") //fetches json object
            .then(response => response.json()) //returns a promise that needs to be turned into a javascript object
            //data from api
            .then(response => {
                //destructuring
                const { memes } = response.data //response.data.memes, gotta look at the link carefully, start at bracket
                // console.log(response)
                // console.log(memes) //memes = response.data.memes
                // console.log(memes[0]) //array 0 has an object
                // console.log(memes[0].id) 
                this.setState({
                    allMemeImgs: memes
                })
            })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        //Clicking on a "Submit" button, prevent it from submitting a form
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg: randMemeImg
        })

    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.topText} //to make it controlled, need to set value equal to current value of state
                        name="topText" //name property matches state
                        placeholder="Top Text"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        value={this.state.bottomText}
                        name="bottomText" //name property matches state
                        placeholder="Bottom Text"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
                {/* why cant I do this */}
                {/* <h1>{this.state.allMemeImgs[0].id}</h1> */}
            </div>

        )
    }
}

export default MemeGenerator