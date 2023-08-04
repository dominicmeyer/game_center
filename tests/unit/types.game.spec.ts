import { Player, QwirkleGame, Game, Score, GameType } from "@/types/types.ts";
import { describe, expect, test } from 'vitest';

const player1 = new Player("PlayerOne")
const player2 = new Player("PlayerTwo")

const score1 = new Score(player1, 0, 1)
const score2 = new Score(player2, 0, 2)

const qwirkleGame = new QwirkleGame(0, [])
const game1 = new Game(GameType.Qwirkle, 0, [])
const game2 = new Game(GameType.Qwirkle, 0, [])
const game3 = new Game(GameType.Qwirkle, 0, [score1])
const game4 = new Game(GameType.Qwirkle, 0, [score1, score2])
const game5 = new Game(GameType.Qwirkle, 0, [score1, score2, score2])

describe("Game Tests: equals", () => {
    test("Equals qwirkleGame", () => {
        expect(game1.equals(qwirkleGame))
    })

    test("Equals", () => {
        expect(game1.equals(game1))
    })

    test("Equals not", () => {
        expect(!game1.equals(game2))
    })
})

describe("Game Tests: getPlayerScores", () => {
    test("getPlayerScores empty", () => {
        expect(game1.getPlayerScores(player1).length == 0)
    })

    test("getPlayerScores not empty", () => {
        const scores = game3.getPlayerScores(player1)
        expect(scores.length == 1)
        expect(scores.map((s) => s.getPlayer().equals(player1)).reduce((acc, v) => acc && v))
    })

    test("getPlayerScores other Player", () => {
        expect(game3.getPlayerScores(player2).length == 0)
    })
})

describe("Game Tests: getLatestScore", () => {
    test("getLatestScore null", () => {
        expect(game1.getLatestScore() == null)
    })

    test("getLatestScore one score", () => {
        expect(game3.getLatestScore() == score1)
    })

    test("getLatestScore", () => {
        expect(game4.getLatestScore() == score2)
    })

    test("getLatestScore wrong player", () => {
        expect(game3.getLatestScore(player2) == null)
    })

    test("getLatestScore player", () => {
        expect(game4.getLatestScore(player1) == score1)
        expect(game4.getLatestScore(player2) == score2)
    })
})

describe("Game Tests: getPlayers", () => {
    test("getPlayers empty", () => {
        expect(game1.getPlayers().length == 0)
    })

    test("getPlayers", () => {
        const players = game4.getPlayers()
        expect(players.length == 2)
        
        const firstPlayer = players.pop()
        const secondPlayer = players.pop()
        expect(!firstPlayer!.equals(secondPlayer!))
    })

    test("getPlayers double score", () => {
        expect(game5.getPlayers().length == 2)
    })
})

describe("Game Tests: vsText", () => {
    test("vsText", () => {
        expect(game5.getVsText().split(' ').filter((t) => player1.getName() == t).length == 1)
        expect(game5.getVsText().split(' ').filter((t) => player2.getName() == t).length == 1)
    })
})

describe("Game Tests: addPlayer", () => {
    test("addPlayer", () => {
        const game = new QwirkleGame(0, [])

        expect(game.getPlayers().length == 0)

        game.addPlayer(player1.getName())

        expect(game.getPlayers().pop()!.equals(player1))
        expect(game.getLatestScore()! == score1)
    })

    test("addPlayer double", () => {
        const game = new QwirkleGame(0, [])

        expect(game.getPlayers().length == 0)

        game.addPlayer(player1.getName())
        game.addPlayer(player1.getName())

        expect(game.getScores().length == 1)
        expect(game.getPlayers().pop()!.equals(player1))
        expect(game.getLatestScore()! == score1)
    })
})

describe("Game Tests: addToPlayerScore", () => {
    test("addToPlayerScore", () => {
        const game = new QwirkleGame(0, [])

        expect(game.getPlayers().length == 0)

        game.addToPlayerScore(score1.getPlayer(), score1.getRound(), score1.getScore())

        expect(game.getPlayers().pop()!.equals(player1))
        expect(game.getLatestScore()! == score1)
    })

    test("addToPlayerScore invalid round", () => {
        const game = new QwirkleGame(0, [score1])

        expect(game.getPlayers().length == 0)

        game.addToPlayerScore(score1.getPlayer(), score1.getRound(), score1.getScore())

        expect(game.getPlayers().pop()!.equals(player1))
        expect(game.getLatestScore()! == score1)
    })

    test("addToPlayerScore invalid player", () => {
        const game = new QwirkleGame(0, [score1])

        expect(game.getPlayers().length == 0)

        game.addToPlayerScore(score2.getPlayer(), score2.getRound(), score2.getScore())

        expect(game.getPlayers().length == 1)
        expect(game.getPlayers().pop()!.equals(player1))
        expect(game.getLatestScore()! == score1)
    })
})