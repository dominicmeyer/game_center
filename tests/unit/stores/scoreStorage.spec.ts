import { useScoresStore } from "@/stores/scoreStorage";
import { Game } from "@/types/game";
import { Player } from "@/types/player";
import { Score } from "@/types/score";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("scoresStore Tests", () => {
    let scoresStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        scoresStore = useScoresStore()
    })

    test("Init", () => {
        expect(scoresStore.scores.length === 0, "Store wasn't empty after init")
    })

    describe("Filter Tests", () => {
        test("Filter empty", () => {
            const game1 = new Game(0)

            expect(scoresStore.filter(game1).length === 0)
        })

        test("Filter", () => {
            const game1 = new Game(0)
            const score1 = new Score(0, 0, 0, game1.id)

            scoresStore.add(score1)
            expect(scoresStore.filter(game1).length === 1)
        })

        test("Filter multiple", () => {
            const game1 = new Game(0)
            const score1 = new Score(0, 0, 0, game1.id)
            const score2 = new Score(1, 0, 0, game1.id)

            scoresStore.add(score1)
            scoresStore.add(score2)
            expect(scoresStore.filter(game1).length === 2)
        })

        test("Filter two games", () => {
            const game1 = new Game(0)
            const score1 = new Score(0, 0, 0, game1.id)
            const score2 = new Score(1, 0, 0, game1.id + 1)

            scoresStore.add(score1)
            scoresStore.add(score2)
            expect(scoresStore.filter(game1).length === 1)
        })

        test("Filter player", () => {
            const game1 = new Game(0)
            const player1 = new Player("Test1")
            const score1 = new Score(player1.id, 0, 0, game1.id)
            const score2 = new Score(player1.id + 1, 0, 0, game1.id)

            scoresStore.add(score1)
            scoresStore.add(score2)
            expect(scoresStore.filter(game1, player1).length === 1)
        })
    })

    describe("HighestRound Tests", () => {
        test("HighestRound empty", () => {
            const game1 = new Game(0)

            expect(scoresStore.highestRound(game1) === 0)
        })

        test("HighestRound", () => {
            const game1 = new Game(0)
            const player1 = new Player("Test1")
            const score1 = new Score(player1.id, 1, 0, game1.id)

            scoresStore.add(score1)
            expect(scoresStore.highestRound(game1) === 1)
        })

        test("HighestRound multiple", () => {
            const game1 = new Game(0)
            const player1 = new Player("Test1")
            const score1 = new Score(player1.id, 1, 0, game1.id)
            const score2 = new Score(player1.id, 2, 0, game1.id)

            scoresStore.add(score1)
            scoresStore.add(score2)
            expect(scoresStore.highestRound(game1) === 2)
        })

        test("HighestRound wrong game", () => {
            const game1 = new Game(0)
            const player1 = new Player("Test1")
            const score1 = new Score(player1.id, 1, 0, game1.id + 1)

            scoresStore.add(score1)
            expect(scoresStore.highestRound(game1) === 0)
        })
    })

    describe("LatestScore Tests", () => {
        test("LatestScore empty", () => {
            const player1 = new Player("Test1")
            const game1 = new Game(0)

            expect(scoresStore.latestScore(game1, player1) === null)
        })

        test("LatestScore", () => {
            const player1 = new Player("Test1")
            const game1 = new Game(0)
            const score1 = new Score(player1.id, 0, 0, game1.id)

            scoresStore.add(score1)
            expect(scoresStore.latestScore(game1, player1) === score1)
        })

        test("LatestScore wrong player", () => {
            const player1 = new Player("Test1")
            const player2 = new Player("Test2")
            const game1 = new Game(0)
            const score1 = new Score(player2.id, 0, 0, game1.id)

            scoresStore.add(score1)
            expect(scoresStore.latestScore(game1, player1) === null)
            expect(scoresStore.latestScore(game1, player2) === score1)
        })

        test("LatestScore wrong game", () => {
            const player1 = new Player("Test1")
            const game1 = new Game(0)
            const score1 = new Score(player1.id, 0, 0, game1.id + 1)

            scoresStore.add(score1)
            expect(scoresStore.latestScore(game1, player1) === null)
            expect(scoresStore.scores.pop() === score1)
        })

        test("LatestScore multiple", () => {
            const player1 = new Player("Test1")
            const game1 = new Game(0)
            const score1 = new Score(player1.id, 0, 0, game1.id)
            const score2 = new Score(player1.id, 0, 1, game1.id)

            scoresStore.add(score1)
            expect(scoresStore.latestScore(game1, player1) === score2)
            expect(scoresStore.scores.length === 2)
        })
    })

    describe("Add Tests", () => {
        test("Add", () => {
            scoresStore.add(new Score(0, 0, 0, 0))
            expect(scoresStore.scores.length === 1, "Add didn't work")
        })

        test("Add Double", () => {
            scoresStore.add(new Score(0, 0, 0, 0))
            scoresStore.add(new Score(0, 0, 0, 0))
            expect(scoresStore.scores.length === 1, "Double added Player to Game")
        })
    })

    describe("Remove Tests", () => {
        test("Remove", () => {
            const gameType = new Score(0, 0, 0, 0)
            scoresStore.add(gameType)
            scoresStore.remove(gameType)
            expect(scoresStore.scores.length === 0, "Remove didn't work")
        })

        test("Remove Empty", () => {
            const gameType = new Score(0, 0, 0, 0)
            scoresStore.remove(gameType)
        })

        test("Remove Remaining", () => {
            const score1 = new Score(0, 0, 0, 0)
            const score2 = new Score(1, 0, 0, 0)
            scoresStore.add(score1)
            scoresStore.add(score2)
            scoresStore.remove(score1)
            expect(scoresStore.scores.length === 1, "Wrong remove")
        })
    })
})