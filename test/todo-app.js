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
    
    test("Change theme", async t => {
        // Arrange: Forvent at temaet er 'light' i starten
        await t
            .expect(Selector('body').getAttribute('data-theme')).eql('light') 
    
        // Act: Klik på 'Dark' i tema-dropdown
        .click(Selector('#themeSelector').withText('Dark')) 
    
        // Assert: Temaet skal være ændret til 'dark'
        .expect(Selector('body').getAttribute('data-theme')).eql('dark') 
    
        // Act: Klik på 'Light' i tema-dropdown
        .click(Selector('#themeSelector').withText('Light')) 
    
        // Assert: Temaet skal være ændret tilbage til 'light'
        .expect(Selector('body').getAttribute('data-theme')).eql('light'); 
    });


    test("Filter tasks by priority", async t => {
        // 1. Sørg for, at priority selector er synlig, før du interagerer med den
        await t.expect(Selector('#prioritySelector').visible).ok('Priority selector is not visible');
    
        // 2. Opret en opgave med høj prioritet
        await t
            .typeText(Selector("#todo-input"), "High priority task")
            .click(Selector("#prioritySelector").withText('High'))  // Klik på "High"
            .click(Selector("#addTodo"));
    
        // 3. Opret en opgave med medium prioritet
        await t
            .typeText(Selector("#todo-input"), "Medium priority task")
            .click(Selector("#prioritySelector").withText('Medium'))  // Klik på "Medium"
            .click(Selector("#addTodo"));
    
        // 4. Bekræft, at opgaverne er blevet tilføjet korrekt
        await t
            .expect(Selector('.todo-list').innerText).contains('High priority task')
            .expect(Selector('.todo-list').innerText).contains('Medium priority task');
    });
    