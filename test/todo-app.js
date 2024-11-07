import {Selector} from 'testcafe';

fixture("Todo app tests")
    .page("https://sofiefischer.dk/test/todo/");


test("Add a todo", async t => {
    await t
        .typeText(Selector("#todoInput", "Buy milk"))
        .click(Selector("#addTodo"))
        .typeText(Selector("#todoInput", "Mow lawn"))
        .click(Selector("#addTodo"))

        .expect(Selector("#todoList").childElementCount).eql(2)
});

test("Delete a todo", async t => {
    await t
        .typeText(Selector("#todoInput", "Buy milk"))
        .click(Selector("#addTodo"))
        .typeText(Selector("#todoInput", "Mow lawn"))
        .click(Selector("#addTodo"))
        .click(Selector("#todoList").child(0).find(".delete"))

        .expect(Selector("#todoList").childElementCount).eql(1)
});