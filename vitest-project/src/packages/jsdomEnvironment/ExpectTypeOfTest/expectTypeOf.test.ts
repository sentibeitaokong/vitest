import {expectTypeOf,it} from "vitest";

it('expectTypeOf test',()=>{
    expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>()
})