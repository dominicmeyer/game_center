import { useGameTypesStore } from "@/stores/gameTypeStorage";
import { GameType } from "@/types/gameType";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("GameTypesStore Tests", () => {
    let gameTypesStore: any;

    beforeEach(() => {
        setActivePinia(createPinia())
        gameTypesStore = useGameTypesStore()
    })

    test("Init", () => {
        expect(gameTypesStore.gameTypes.length === 0, "Store wasn't empty after init")
    })

    describe("Get Tests", () => {
        test("Get", () => {
            const gameType = new GameType("Test")
            gameTypesStore.add(gameType)
            const getType = gameTypesStore.get(gameType.id)

            expect(gameType === getType)
        })

        test("Get undefined", () => {
            const gameType = new GameType("Test")
            gameTypesStore.add(gameType)
            const getType = gameTypesStore.get(gameType.id + 1)

            expect(gameType !== getType && getType === undefined)
        })
    })

    describe("Add Tests", () => {
        test("Add", () => {
            gameTypesStore.add(new GameType("Test"))
            expect(gameTypesStore.gameTypes.length === 1, "Add didn't work")
        })

        test("Add Double", () => {
            gameTypesStore.add(new GameType("Test"))
            gameTypesStore.add(new GameType("Test"))
            expect(gameTypesStore.gameTypes.length === 1, "Double added Player to Game")
        })
    })

    describe("Remove Tests", () => {
        test("Remove", () => {
            const gameType = new GameType("Test")
            gameTypesStore.add(gameType)
            gameTypesStore.remove(gameType)
            expect(gameTypesStore.gameTypes.length === 0, "Remove didn't work")
        })

        test("Remove Empty", () => {
            const gameType = new GameType("Test")
            gameTypesStore.remove(gameType)
        })

        test("Remove Remaining", () => {
            const gameType1 = new GameType("Test")
            const gameType2 = new GameType("Test")
            gameTypesStore.add(gameType1)
            gameTypesStore.add(gameType2)
            gameTypesStore.remove(gameType1)
            expect(gameTypesStore.gameTypes.length === 1, "Wrong remove")
        })
    })
})