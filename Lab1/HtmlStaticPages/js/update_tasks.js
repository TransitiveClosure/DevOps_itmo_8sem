update_tasks(".planning__list_tasks.global_tasks", "global_tasks", "global_task", "subtasks", create_global_task_element, create_global_tasks_list)
update_tasks(".planning__list_tasks.daily_tasks", get_choosen_data()  + "daily_tasks", "subtasks", "subtasks", create_daily_task_element, create_daily_tasks_list)

// .getDate().toLocaleDateString()