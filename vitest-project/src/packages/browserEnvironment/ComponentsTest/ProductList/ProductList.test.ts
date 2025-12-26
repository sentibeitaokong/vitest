import {test,expect,vi} from "vitest";
import {render} from "vitest-browser-vue";
import ProductList from "./ProductList.vue";
import { userEvent } from "vitest/browser";

test('ProductList filters and displays products correctly', async () => {
    const mockProducts = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
        { id: 2, name: 'Book', category: 'Education', price: 29 }
    ]
    const { getByLabelText, getByText,getByRole } = render(ProductList,{
        props:{
            products:mockProducts
        }
    })
    const select =getByRole('combobox')
    // Initially shows all products
    await expect.element(getByText('Laptop')).toBeInTheDocument()
    await expect.element(getByText('Book')).toBeInTheDocument()
    await expect.element(select).not.toHaveValue()
    // Filter by category
    await select.selectOptions(
     'Laptop'
    )

    // Only electronics should remain
    await expect.element(getByText('Laptop')).toBeInTheDocument()
    await expect.element(getByText('Book')).toBeInTheDocument()
    await expect.element(select).toHaveValue('Laptop')
    await select.selectOptions(
        'Book'
    )
    await expect.element(select).toHaveValue('Book')
})