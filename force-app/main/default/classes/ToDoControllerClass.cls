public with sharing class ToDoControllerClass {
    @AuraEnabled
    public static String addTodo(String payload) {
        // Deserialize the JSON payload into a ToDo object
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);

        // Create a new instance of the ToDo__c object
        SObject todo = (Sobject) Type.forName('ToDo__c').newInstance();
        // Set the Name and Done__c fields of the ToDo__c object from the ToDo object
        todo.put('Name', payloadObject.todoName);
        todo.put('Done__c', payloadObject.done);

        // Insert the new ToDo__c object into the database
        insert todo;

        // Return the ID of the newly created ToDo__c object
        return String.valueOf(todo.Id);
    }
    @AuraEnabled
    public static void updateTodo(String payload) {
    // Deserialize the JSON payload into a ToDo object
        ToDo payloadObject = (ToDo) JSON.deserialize(payload, ToDo.class);

        // Create a new instance of the ToDo__c object
        SObject todo = (Sobject) Type.forName('ToDo__c').newInstance();
        // Set the Id, Name, and Done__c fields of the ToDo__c object from the ToDo object
        todo.put('Id', payloadObject.todoId);
        todo.put('Name', payloadObject.todoName);
        todo.put('Done__c', payloadObject.done);

        // Update the existing ToDo__c object in the database
        update todo;
    }
    @AuraEnabled
    public static void deleteTodo(String todoId) {
        // Create a new instance of the ToDo__c object
        SObject todo = (Sobject) Type.forName('ToDo__c').newInstance();
        // Set the Id field of the ToDo__c object to the todoId parameter
        todo.put('Id', todoId);

        // Delete the ToDo__c object from the database
        delete todo;
    }
    @AuraEnabled(cacheable=true)
    public static List<ToDo> getAllTodos() {
        // Query the database for all ToDo__c objects created in the last 7 days
        //The 'Database.query' method is used to execute a SOQL query against the Salesforce database
        //The 'LAST_N_DAYS' keyword is used to specify the time range for the query.
        List<SObject> todos = Database.query(
        'SELECT Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = LAST_N_DAYS:7 ORDER BY CreatedDate DESC'
        );
        // Convert the list of SObjects into a list of ToDo objects
        return getToDos(todos);
    }
    @AuraEnabled
    public static List<ToDo> getCurrentTodos() {
        List<SObject> todos = Database.query(
        'SELECT Id, Name, CreatedDate, Done__c FROM ToDo__c WHERE CreatedDate = TODAY ORDER BY CreatedDate DESC'
        );
        return getToDos(todos);
    }
    //Wrap ToDo__c SObject into ToDo object
    public static List<ToDo> getToDos(List<SObject> objs) {
      List<ToDo> todos = new List<ToDo>();
      for (SObject obj : objs) {
        ToDo todo = new ToDo();
        todo.todoId = obj.Id;
        todo.todoName = String.valueOf(obj.get('Name'));
        todo.todoDate = Date.valueOf(obj.get('CreatedDate'));
        todo.done = Boolean.valueOf(obj.get('Done__c'));
        todos.add(todo);
      }

        return todos;
    }

  //Wrapper Class to represent a ToDo Item
    public class ToDo {
        @AuraEnabled
        public String todoId;
        @AuraEnabled
        public String todoName;
        @AuraEnabled
        public Date todoDate;
        @AuraEnabled
        public Boolean done;
    }


}