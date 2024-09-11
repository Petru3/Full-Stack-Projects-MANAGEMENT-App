import React, { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';
import { getProjects, deleteProject, updateProject } from '../services/projectsService';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [editProject, setEditProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      setProjects(response);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project => {
      return (
        (filter === 'All' || project.status === filter) &&
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredProjects(filtered);
  }, [searchTerm, filter, projects]);

  const handleDelete = async (id) => {
    await deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleUpdate = async (updatedProject) => {
    const newProject = await updateProject(updatedProject);
    setProjects(
      projects.map((project) =>
        project.id === newProject.id ? newProject : project
      )
    );
    setEditProject(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <header>
        <h1>Project Management</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="filter-menu">
        <label>Filter by status:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <ProjectForm setProjects={setProjects} editProject={editProject} onUpdate={handleUpdate} />
      <ul>
        {filteredProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={handleDelete}
            onEdit={() => setEditProject(project)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
