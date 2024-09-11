import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/projectsService';
import ProjectItem from '../components/ProjectsItem';
import ProjectForm from '../components/ProjectsForm';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [editProject, setEditProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects();
      setProjects(response);
      setFilteredProjects(response);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Șterge token-ul pentru logout
    window.location.reload(); // Reîncarcă pagina sau redirecționează către pagina de login
  };

  return (
    <div>
      <header>
        <h1>Home</h1>
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
          <option value="DONE">Done</option>
          <option value="IN_PROGRESS">In Progress</option>
        </select>
      </div>
      <ProjectForm setProjects={setProjects} editProject={editProject} onUpdate={(updatedProject) => {
        setProjects(
          projects.map((project) =>
            project.id === updatedProject.id ? updatedProject : project
          )
        );
        setEditProject(null);
      }} />
      <ul>
        {filteredProjects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onDelete={async (id) => {
              await deleteProject(id);
              setProjects(projects.filter((project) => project.id !== id));
            }}
            onEdit={() => setEditProject(project)}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
