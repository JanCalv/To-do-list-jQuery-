$(function(){
    /* 
    * This is the code for the to do list app
    */
    oAppManager = { 
         /*
        * DOM Elements in variables
        * first letter in variables indicates their data type
        * ex: s = string, i = integer, o = object etc..
        */
        oDOMElements: {
            sTask: $('.task-input'),
            addBtn: $('.add-btn'),
            taskTab: $('.tab-list-item'),
            taskTable: $('.task-table'),
            completeTable: $('.complete-table'),
            completeItem: $('.complete-items'),
            taskItem: $('.task-items'),
            tabCont: $('.tab-container'),
            clearBtn: $('.clear-btn')
        },    

        /*
        * binding functions to the buttons
        */
        setUpEventListener: function(){
            $(document).on('keypress', this.addTaskKeyPress);
            this.oDOMElements.addBtn.click(this.addTask);
            this.oDOMElements.taskTab.click(this.toggleTab);
            this.oDOMElements.taskTable.on('click', 'div[class="del-btn"]', this.deleteTask);
            this.oDOMElements.taskTable.on('click', 'div[class="check-btn"]', this.completeTask);
            this.oDOMElements.clearBtn.on('click', function(){location.reload()});
        },

        /*
         function for toggling task and complete task tab
        */
        toggleTab: function(){
            oAppManager.oDOMElements.completeTable.toggleClass('hide');
            oAppManager.oDOMElements.taskTable.toggleClass('hide');
        },

        /*
        function triggered when enter key was pressed
        */
        addTaskKeyPress: function(e){
            if(e.which == 13) {
                oAppManager.addTask();
            }
        },

        /*
        * function for adding task to the UI
        */
        addTask: function(){
            if(oAppManager.oDOMElements.sTask.val() !== ''){
                let sRow = oAppManager.oDOMElements.taskItem.clone().prop('hidden', false);
                sRow.removeAttr('class');
                sRow.find('.task-desc').text(oAppManager.oDOMElements.sTask.val());
                oAppManager.oDOMElements.tabCont.find('.task-table').append(sRow);
                oAppManager.oDOMElements.sTask.val('');
            }
        },

        /*
        * function when you press the check button to complete a task
        * transfer the current task to the complete task tab
        */
        completeTask: function(){
            let sRowComplete = oAppManager.oDOMElements.completeItem.clone().prop('hidden', false);
            let sCompleteTask = $(this).parent().find('.task-desc').text();
            sRowComplete.find('.task-desc-com').text(sCompleteTask); 
            oAppManager.oDOMElements.tabCont.find('.complete-table').append(sRowComplete);
            alert(`"${sCompleteTask}" has been moved to completed tasks.`);
            $(this).parentsUntil('.task-table').fadeOut();
        },

        /*
        * delete task
        */
        deleteTask: function(){
            $(this).parentsUntil('.task-table').fadeOut();
        },

        /* initialization function (needs to run as soon as the program starts) */
        init: function(){
            this.setUpEventListener();
        }
    };
    // Initialization function declaration
    oAppManager.init();
});