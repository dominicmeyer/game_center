import { usePlayersStore } from "@/stores/playerStorage";
import { Player } from "@/types/player";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("playersStore Tests", () => {
    let playersStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        playersStore = usePlayersStore()
    })

    test("Init", () => {
        expect(playersStore.players.length === 0, "Store wasn't empty after init")
    })

    describe("Add Tests", () => {
        test("Add", () => {
            playersStore.add(new Player("Test"))
            expect(playersStore.players.length === 1, "Add didn't work")
        })

        test("Add Double", () => {
            playersStore.add(new Player("Test"))
            playersStore.add(new Player("Test"))
            expect(playersStore.players.length === 1, "Double added Player to Game")
        })
    })

    describe("Remove Tests", () => {
        test("Remove", () => {
            const gameType = new Player("Test")
            playersStore.add(gameType)
            playersStore.remove(gameType)
            expect(playersStore.players.length === 0, "Remove didn't work")
        })

        test("Remove Empty", () => {
            const gameType = new Player("Test")
            playersStore.remove(gameType)
        })

        test("Remove Remaining", () => {
            const player1 = new Player("Test")
            const player2 = new Player("Test")
            playersStore.add(player1)
            playersStore.add(player2)
            playersStore.remove(player1)
            expect(playersStore.players.length === 1, "Wrong remove")
        })
    })

    describe("FindPlayer Tests", () => {
        test("FindPlayer", () => {
            const player = new Player("Test")
            playersStore.add(player)
            expect(playersStore.findPlayer(player.name) === player)
        })

        test("FindPlayer null", () => {
            const player = new Player("Test")
            playersStore.add(player)
            expect(playersStore.findPlayer(player.name + "+") !== player)
        })
    })

    describe("Validate Tests", () => {
        test("Validate empty", () => {
            expect(playersStore.validate("Test"))
        })

        test("Validate deny", () => {
            playersStore.add(new Player("Test"))
            expect(!playersStore.validate("Test"))
        })

        test("Validate other name", () => {
            playersStore.add(new Player("Test"))
            expect(!playersStore.validate("Test+"))
        })
    })

    describe("Rename Tests", () => {
        test("Rename empty", () => {
            playersStore.renamePlayer("Test", "Test+")
        })

        test("Rename", () => {
            playersStore.add(new Player("Test"))
            playersStore.renamePlayer("Test", "Test+")
            expect(playersStore.findPlayer("Test+") !== null)
        })
    })
})