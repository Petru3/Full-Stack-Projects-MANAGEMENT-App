import React from 'react';

const ProjectItem = ({ project, onDelete, onEdit }) => {
  return (
    <li>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <button onClick={() => onDelete(project.id)}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </li>
  );
};

export default ProjectItem;
