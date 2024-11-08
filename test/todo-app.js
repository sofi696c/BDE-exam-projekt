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
    
    // Test for at ændre tema
    test("Change theme", async t => {
        await t
            // Arrange
            .expect(Selector('body').getAttribute('data-theme')).eql('light') // Forventet standardtema (f.eks. 'light')
    
            // Act
            .click(Selector('#themeSelector').withText('Dark')) // Vælg 'Dark' tema
            .expect(Selector('body').getAttribute('data-theme')).eql('dark') // Forvent 'dark' tema
    
            // Act
            .click(Selector('#themeSelector').withText('Light')) // Vælg 'Light' tema
            .expect(Selector('body').getAttribute('data-theme')).eql('light'); // Forvent 'light' tema
    });


    // Test for at filtrere opgaver efter prioritet
    test("Filter tasks by priority", async t => {
        await t
            // Arrange: Opret nogle opgaver med forskellige prioriteter
            .typeText(Selector("#todo-input"), "High priority task")
            .click(Selector("#prioritySelector").withText('High')) 
            .click(Selector("#addTodo"))
            
            .typeText(Selector("#todo-input"), "Medium priority task")
            .click(Selector("#prioritySelector").withText('Medium')) 
            .click(Selector("#addTodo"))
            
            .typeText(Selector("#todo-input"), "Low priority task")
            .click(Selector("#prioritySelector").withText('Low')) 
            .click(Selector("#addTodo"))
    
            // Act: Filter opgaver efter høj prioritet
            .click(Selector("#filterPriority").withText('High')) 
    
            // Assert: Forvent at kun opgaver med høj prioritet vises
            .expect(Selector("#todo-list").childElementCount).eql(1) 
            .expect(Selector("#todo-list").child(0).textContent).contains('High priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('Medium priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('Low priority task'); 
    
        // Act: Filter opgaver efter medium prioritet
        await t
            .click(Selector("#filterPriority").withText('Medium')) 
    
            // Assert: Forvent at kun opgaver med medium prioritet vises
            .expect(Selector("#todo-list").childElementCount).eql(1) // Der bør kun være én opgave med medium prioritet
            .expect(Selector("#todo-list").child(0).textContent).contains('Medium priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('High priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('Low priority task'); 
    
        // Act: Filter opgaver efter lav prioritet
        await t
            .click(Selector("#filterPriority").withText('Low')) 
    
            // Assert: Forvent at kun opgaver med lav prioritet vises
            .expect(Selector("#todo-list").childElementCount).eql(1) 
            .expect(Selector("#todo-list").child(0).textContent).contains('Low priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('High priority task') 
            .expect(Selector("#todo-list").child(0).textContent).notContains('Medium priority task'); 
    });
    