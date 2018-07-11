import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './Board'
import BoatLocation from './BoatLocation'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (toRow, toCell) => {
    const {game, updateGame} = this.props

    const board = game.players.filter(x => {return x.currentUser === this.props.userId})[0].myBoard.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell) return game.turn
        else return cell
      })
    )

    let winHolder = false

    // game.players.filter(x => {return x.currentUser !== this.props.userId})[0].boatLocation.map(
    //   (row, rowIndex) => row.map((cell, cellIndex) => {
    //     if (rowIndex === toRow && cellIndex === toCell && cell === "b") return console.log( "you hit the boat!" )
    //       // this.props.game.status = 'finished'  
    //     else return cell
    //   })
    // )
    
    game.players.filter(x => {return x.currentUser !== this.props.userId})[0].boatLocation.map(
      (row, rowIndex) => row.map((cell, cellIndex) => {
        if (rowIndex === toRow && cellIndex === toCell && cell === "b") return winHolder = true
        else return cell
      })
    )

    console.log('WIN?',winHolder)

    updateGame(game.id, board)
  }



  render() {

    const {game, users, authenticated, userId} = this.props

    console.log('USER ID', userId)
   

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)  

    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player && player.symbol === game.turn &&
        <div>It's your turn!</div>
      }



      {/* FIX SECTION SO ONLY PERSON WHO DIDNT START GAME CAN JOIN */}
      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName}</p>
      }

      <hr />

      {
        game.status !== 'pending' &&
        <div>
          <Board board={ game.players.filter(x => {return x.currentUser === userId})[0].myBoard } makeMove={this.makeMove} />
          <br/>
          <BoatLocation board={ game.players.filter(x => {return x.currentUser === userId})[0].boatLocation } />
        </div>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
