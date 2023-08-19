import { GameType } from "@/types/gameType";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("GameType Tests", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("Parse", () => {
        const gameType = new GameType("Test")
        const json = JSON.stringify(gameType)
        const parsed = GameType.parse(JSON.parse(json))

        expect(parsed instanceof GameType)
        expect(gameType === parsed)
    })
})