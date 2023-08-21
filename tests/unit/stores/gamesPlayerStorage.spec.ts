import { useGamesPlayersStore } from "@/stores/gamesPlayerStorage";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("GamesPlayerStore Tests", () => {
    let gamesPlayerStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        gamesPlayerStore = useGamesPlayersStore()
    })

    test("Init", () => {
        expect(gamesPlayerStore.filter().length === 0, "Store wasn't empty after init")
    })

    describe("Add Tests", () => {
        test("Add", () => {
            gamesPlayerStore.add(0, 0)
            expect(gamesPlayerStore.filter(0, 0).length === 1, "Add didn't work")
        })

        test("Add Double", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.add(0, 0)
            expect(gamesPlayerStore.filter(0, 0).length === 1, "Double added Player to Game")
        })
    })

    describe("Remove Tests", () => {
        test("Remove", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.remove(0, 0)
            expect(gamesPlayerStore.filter(0, 0).length === 0, "Remove didn't work")
        })

        test("Remove Empty", () => {
            gamesPlayerStore.remove(0, 0)
        })

        test("Remove Remaining", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.add(1, 1)
            gamesPlayerStore.remove(0, 0)
            expect(gamesPlayerStore.filter(1, 1).length === 1, "Wrong remove")
        })

        test("Remove Game", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.add(0, 1)
            gamesPlayerStore.remove(0)
            expect(gamesPlayerStore.filter().length === 0, "Remove game didn't work")
        })

        test("Remove Player", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.add(1, 0)
            gamesPlayerStore.remove(undefined, 0)
            expect(gamesPlayerStore.filter().length === 0, "Remove player didn't work")
        })

        test("Remove without Param", () => {
            gamesPlayerStore.add(0, 0)
            gamesPlayerStore.remove()
            expect(gamesPlayerStore.filter(0, 0).length === 1, "Empty remove was still removing")
        })
    })

    describe("Filter Tests", () => {
        const players = [0, 1, 2, 3]
        const games = [0, 1, 2]

        beforeEach(() => {
            for (const g in games) {
                for (const p in players) {
                    gamesPlayerStore.add(g, p)
                }
            }
        })

        test("Filter without Param", () => {
            expect(gamesPlayerStore.filter().length === players.length * games.length)
        })

        test("Filter Game", () => {
            expect(gamesPlayerStore.filter(games.pop()).length === players.length)
        })

        test("Filter Player", () => {
            expect(gamesPlayerStore.filter(undefined, players.pop()).length === games.length)
        })

        test("Filter specific", () => {
            expect(gamesPlayerStore.filter(games.pop(), players.pop()).length === 1)
        })
    })
})