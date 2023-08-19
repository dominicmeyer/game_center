import { Score } from "@/types/score";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("Score Tests", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("Parse", () => {
        const score = new Score(0,0,0,0)
        const json = JSON.stringify(score)
        const parsed = Score.parse(JSON.parse(json))

        expect(parsed instanceof Score)
        expect(parsed === score)
    })
})