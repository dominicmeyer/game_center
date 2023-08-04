import { Player, QwirkleGame, GameStorage, Score } from "@/types/types.ts";
import { describe, expect, test } from 'vitest';

const game1 = new QwirkleGame(0,[])
const game2 = new QwirkleGame(1,[])
const player1 = new Player("PlayerOne")
const player2 = new Player("PlayerTwo")

const newStorage = async () => {
    const store = new GameStorage()
    await store.create()
    return store
}

describe("GameStorage Tests: constructor & create", () => {
    test("GameStorage empty", async () => {
        const gameStorage = await newStorage()

        expect((await gameStorage.getGames()).length == 0)
    })
})

describe("GameStorage Tests: add", () => {
    test("Add", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)

        const games = await gameStorage.getGames()

        expect(games.length == 1)
        expect(games.pop()!.equals(game1))
    })

    test("Add double", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.add(game1)

        const games = await gameStorage.getGames()

        expect(games.length == 1)
        expect(games.pop()!.equals(game1))
    })
})

describe("GameStorage Tests: getGames", () => {
    test("getGames", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)

        const games = await gameStorage.getGames()

        expect(games.length == 1)
        expect(games.pop()!.equals(game1))
    })

    test("getGames empty", async () => {
        const gameStorage = await newStorage()

        const games = await gameStorage.getGames()

        expect(games.length == 0)
    })
})

describe("GameStorage Tests: addPlayer", () => {
    test("addPlayer", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.addPlayer(player1.getName(),game1)

        const addedGame = (await gameStorage.getGames()).pop()!

        expect(addedGame.getLatestScore(player1) != null)
        expect(addedGame.getLatestScore(player1)?.getRound() == Score.StartingRound)
        expect(addedGame.getLatestScore(player1)?.getScore() == Score.StartingScore)
    })

    test("addPlayer double", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.addPlayer(player1.getName(),game1)
        await gameStorage.addPlayer(player1.getName(),game1)

        const addedGame = (await gameStorage.getGames()).pop()!

        expect(addedGame.getLatestScore(player1) != null)
        expect(addedGame.getScores().length == 1)
        expect(addedGame.getLatestScore(player1)?.getRound() == Score.StartingRound)
        expect(addedGame.getLatestScore(player1)?.getScore() == Score.StartingScore)
    })
})

describe("GameStorage Tests: addToPlayerScore", () => {
    test("addToPlayerScore", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.addPlayer(player1.getName(),game1)
        await gameStorage.addToPlayerScore(1, player1, game1)

        const addedGame = (await gameStorage.getGames()).pop()!

        expect(addedGame.getLatestScore(player1) != null)
        expect(addedGame.getLatestScore(player1)?.getRound() == Score.StartingRound + 1)
        expect(addedGame.getLatestScore(player1)?.getScore() == Score.StartingScore + 1)
    })

    test("addToPlayerScore wrong player", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.addPlayer(player1.getName(),game1)
        await gameStorage.addToPlayerScore(1, player1, game1)
        await gameStorage.addToPlayerScore(0, player2, game1)

        const addedGame = (await gameStorage.getGames()).pop()!

        expect(addedGame.getLatestScore(player1) != null)
        expect(addedGame.getPlayers().length == 1)
        expect(addedGame.getLatestScore(player1)?.getRound() == Score.StartingRound + 1)
        expect(addedGame.getLatestScore(player1)?.getScore() == Score.StartingScore + 1)
    })

    test("addToPlayerScore wrong game", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.addPlayer(player1.getName(),game1)
        await gameStorage.addToPlayerScore(1, player1, game1)
        await gameStorage.addToPlayerScore(1, player1, game2)

        expect((await gameStorage.getGames()).length == 1)
    })
})

describe("GameStorage Tests: remove", () => {
    test("Remove", async () => {
        const gameStorage = await newStorage()

        await gameStorage.add(game1)
        await gameStorage.remove(game1)

        const games = await gameStorage.getGames()

        expect(games.length == 0)
    })
})