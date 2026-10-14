export const initialTasks = [
  { id: 'WEB-24', title: 'Map the new navigation structure', description: 'Outline key paths and simplify the top-level menu.', status: 'Backlog', priority: 'High', label: 'UX', assignee: 'AM', due: 'Oct 15', comments: 3 },
  { id: 'WEB-22', title: 'Audit current page templates', status: 'Backlog', priority: 'Medium', label: 'Research', assignee: 'JL', due: 'Oct 17', comments: 0 },
  { id: 'WEB-19', title: 'Collect customer feedback', status: 'Backlog', priority: 'Low', label: 'Research', assignee: 'SK', due: 'Oct 19', comments: 0 },
  { id: 'WEB-18', title: 'Design the project overview', description: 'Bring milestones, progress and team updates together.', status: 'In progress', priority: 'High', label: 'Design', assignee: 'JL', due: 'Oct 14', comments: 2 },
  { id: 'WEB-16', title: 'Build responsive header', status: 'In progress', priority: 'Critical', label: 'Frontend', assignee: 'AM', due: 'Oct 13', comments: 4 },
  { id: 'WEB-14', title: 'Create design token library', status: 'In progress', priority: 'Medium', label: 'Design system', assignee: 'SK', due: 'Oct 16', comments: 0 },
  { id: 'WEB-12', title: 'Homepage hero illustrations', description: 'Three directions for the new product story.', status: 'In review', priority: 'Medium', label: 'Illustration', assignee: 'SK', due: 'Oct 14', comments: 3 },
  { id: 'WEB-10', title: 'Review copy for feature pages', status: 'In review', priority: 'Low', label: 'Content', assignee: 'AM', due: 'Oct 16', comments: 1 },
  { id: 'WEB-08', title: 'Set up project workspace', status: 'Done', priority: 'High', label: 'Planning', assignee: 'AM', due: 'Oct 09', comments: 0 },
  { id: 'WEB-06', title: 'Kickoff with the product team', status: 'Done', priority: 'Medium', label: 'Planning', assignee: 'JL', due: 'Oct 08', comments: 0 },
];

export const taskStatuses = ['Backlog', 'In progress', 'In review', 'Done'];
export const teamMembers = {
  AM: { name: 'Alex Morgan', color: 'green' },
  JL: { name: 'Jordan Lee', color: 'purple' },
  SK: { name: 'Sam Kim', color: 'gold' },
};
