import { Game } from "@/types/game";
import { Player } from "@/types/player";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("Game Tests", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("Parse", () => {
        const game = new Game(0)
        const json = JSON.stringify(game)
        const parsed = Game.parse(JSON.parse(json))

        expect(parsed instanceof Game)
        expect(parsed === game)
    })

    test("Add", () => {
        const game = new Game(0)
        const player1 = new Player("Test1")
        const player2 = new Player("Test2")

        game.add(player1)

        expect(game.players.length === 1, "Too many Players present, expected one")
        expect(game.players.pop()! === player1, "Wrong player got added")

        game.add(player1)

        expect(game.players.length === 1, "Player got added twice")

        game.add(player2)

        expect(game.players.length === 2, "Second Player wasn't added")
        expect([player1, player2].map((p) => game.players.includes(p)).reduce((acc, b) => acc && b, true), "Some player is missing")
    })
})