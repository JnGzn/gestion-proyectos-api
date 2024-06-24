// models/associations.ts
import Project from './project.model';
import Task from './task.model';
import User from './user.model';

// Un Project tiene muchas Tasks
Project.hasMany(Task, { foreignKey: 'project_idproject', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_idproject', as: 'project' });

// Un User tiene muchas Tasks
User.hasMany(Task, { foreignKey: 'user_iduser', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_iduser', as: 'user' });

export { Project, Task, User };
