import React, { useState, useEffect } from 'react';
import { createProject, updateProject } from '../services/projectsService';

const ProjectForm = ({ setProjects, editProject, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editProject) {
      setTitle(editProject.title);
      setDescription(editProject.description);
    }
  }, [editProject]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProject) {
      const updatedProject = { ...editProject, title, description };
      onUpdate(updatedProject);
    } else {
      const newProject = await createProject({ title, description });
      setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Project Description"
        required
      />
      <button type="submit">
        {editProject ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
