import { Player } from "@/types/player";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("Score Tests", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("Parse", () => {
        const player = new Player("Test")
        const json = JSON.stringify(player)
        const parsed = Player.parse(JSON.parse(json))

        expect(parsed instanceof Player)
        expect(parsed === player)
    })
})