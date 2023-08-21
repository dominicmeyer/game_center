import { useGamesStore } from "@/stores/gameStorage";
import { Game } from "@/types/game";
import { GameType } from "@/types/gameType";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("gamesStore Tests", () => {
    let gamesStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        gamesStore = useGamesStore()
    })

    test("Init", () => {
        expect(gamesStore.games.length === 0, "Store wasn't empty after init")
    })

    describe("Add Tests", () => {
        test("Add", () => {
            gamesStore.add(new Game(0))
            expect(gamesStore.games.length === 1, "Add didn't work")
        })

        test("Add Double", () => {
            gamesStore.add(new Game(0))
            gamesStore.add(new Game(0))
            expect(gamesStore.games.length === 1, "Double added Player to Game")
        })
    })

    describe("Remove Tests", () => {
        test("Remove", () => {
            const game = new Game(0)
            gamesStore.add(game)
            gamesStore.remove(game)
            expect(gamesStore.games.length === 0, "Remove didn't work")
        })

        test("Remove Empty", () => {
            const game = new Game(0)
            gamesStore.remove(game)
        })

        test("Remove Remaining", () => {
            const game1 = new Game(0)
            const game2 = new Game(0)
            gamesStore.add(game1)
            gamesStore.add(game2)
            gamesStore.remove(game1)
            expect(gamesStore.games.length === 1, "Wrong remove")
        })
    })

    test("Filter", () => {
        gamesStore.add(new Game(0))
        gamesStore.add(new Game(0))
        gamesStore.add(new Game(1))

        expect(gamesStore.filter(GameType.parse({
            _name: "Test",
            _id: 0
        })).length === 2)
        expect(gamesStore.filter(GameType.parse({
            _name: "Test",
            _id: 1
        })).length === 1)
    })
})