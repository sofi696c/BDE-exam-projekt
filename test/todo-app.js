import {Selector} from 'testcafe';

fixture("Todo app tests")
    .page("https://sofiefischer.dk/todo/");
    //.page("http://localhost:5174/todo/");



    test("Add a todo", async t => {
        await t
            // Arrange  + Act
            .typeText(Selector("#todo-input"), "Buy milk")
            .click(Selector("#addTodo"))
            .typeText(Selector("#todo-input"), "Mow lawn")
            .click(Selector("#addTodo"))

            // Assert
            .expect(Selector("#todo-list").childElementCount).eql(2)
    });
    
    test("Delete a todo", async t => {
        await t
            // Arrange + Act
            .typeText(Selector("#todo-input"), "Buy milk")
            .click(Selector("#addTodo"))
            .typeText(Selector("#todo-input"), "Mow lawn")
            .click(Selector("#addTodo"))
            .click(Selector("#todo-list").child(0).find("#delete"))

            // Assert
            .expect(Selector("#todo-list").childElementCount).eql(1)
    });
    

    