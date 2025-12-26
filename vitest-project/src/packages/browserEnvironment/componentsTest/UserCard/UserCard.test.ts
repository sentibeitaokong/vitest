import {test,expect,vi} from "vitest";
import {render} from "vitest-browser-vue";
import UserCard from "./UserCard.vue";

test('UserProfile handles loading and data states', async () => {
    const { getByText } = render(UserCard,{
        props:{
            userName:'John'
        }
    })
    // Test loading state
    await expect.element(getByText('Loading...')).toBeInTheDocument()

    // Test for data to load (expect.element auto-retries)
    await expect.element(getByText('User: John')).toBeInTheDocument()
})