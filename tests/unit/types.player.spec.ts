import { Player } from "@/types/types.ts";
import { describe, expect, test } from 'vitest';

const player1 = new Player("PlayerOne")
const player2 = new Player("PlayerTwo")

describe("Player Tests: equals", () => {
    test("Equals", () => {
        expect(player1.equals(player1),"Equals should be true")
    })

    test("Equals not", () => {
        expect(!player1.equals(player2),"Equals should be false")
    })
})