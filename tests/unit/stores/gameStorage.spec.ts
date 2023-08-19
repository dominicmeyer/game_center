import { IdentifiableByID } from "@/types/id";
import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from 'vitest';

describe("Score Tests", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("Parse", () => {
        const idProvider = { nextId: 0 }
        const id = new IdentifiableByID(idProvider)
        const json = JSON.stringify(id)
        id.parse(JSON.parse(json))

        expect(id.id === idProvider.nextId)
    })
})