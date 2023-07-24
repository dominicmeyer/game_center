import { describe, expect, test } from 'vitest'
import { Player } from "@/types/types.ts"

describe("Player Tests", () => {
    test("Setting Name", () => {
        const player = new Player("Dominic")
        expect(player.getName() == "Dominic")
    })
})