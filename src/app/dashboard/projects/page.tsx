
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Search, ExternalLink, GithubIcon, Filter } from 'lucide-react';
import { projectsData as initialProjects, Project, filterCategories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Project Form Component
interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

function ProjectForm({ project: currentProject, onSave, onClose }: ProjectFormProps) {
  const [title, setTitle] = useState(currentProject?.title || '');
  const [description, setDescription] = useState(currentProject?.description || '');
  const [category, setCategory] = useState(currentProject?.category || '');
  const [technologies, setTechnologies] = useState(currentProject?.technologies.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(currentProject?.imageUrl || 'https://placehold.co/600x400.png');
  const [imageHint, setImageHint] = useState(currentProject?.imageHint || 'project image');
  const [githubLink, setGithubLink] = useState(currentProject?.githubLink || '');
  const [liveLink, setLiveLink] = useState(currentProject?.liveLink || '');

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) {
        toast({
            title: "Validation Error",
            description: "Title and Category are required.",
            variant: "destructive",
        });
        return;
    }
    onSave({
      id: currentProject?.id || Date.now().toString(), // Generate new ID if no current project
      title,
      description,
      category,
      technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      imageUrl,
      imageHint,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
    });
  };

  const availableCategories = Array.from(new Set(initialProjects.map(p => p.category)));


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={setCategory} defaultValue={category}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {availableCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
               <SelectItem value="New Category">Create New...</SelectItem>
            </SelectContent>
          </Select>
          {category === "New Category" && (
            <Input 
              placeholder="Enter new category name" 
              className="mt-2"
              onChange={(e) => setCategory(e.target.value)} 
              onBlur={(e) => { if(e.target.value.trim() === "") setCategory("");}} // Reset if empty
            />
          )}
        </div>
        <div>
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="imageHint">Image AI Hint (1-2 words)</Label>
          <Input id="imageHint" value={imageHint} onChange={(e) => setImageHint(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="githubLink">GitHub Link (Optional)</Label>
          <Input id="githubLink" value={githubLink || ''} onChange={(e) => setGithubLink(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="liveLink">Live Demo Link (Optional)</Label>
          <Input id="liveLink" value={liveLink || ''} onChange={(e) => setLiveLink(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        </DialogClose>
        <Button type="submit" className="btn-glow">Save Project</Button>
      </DialogFooter>
    </form>
  );
}


// Main Page Component
export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const { toast } = useToast();

  const handleAddNewProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    // Add a confirmation dialog here if desired
    setProjects(projects.filter(p => p.id !== projectId));
    toast({
        title: "Project Deleted",
        description: "The project has been successfully removed.",
    });
  };

  const handleSaveProject = (projectToSave: Project) => {
    if (editingProject) {
      setProjects(projects.map(p => (p.id === projectToSave.id ? projectToSave : p)));
      toast({ title: "Project Updated", description: `"${projectToSave.title}" has been updated.`});
    } else {
      setProjects([{ ...projectToSave, id: Date.now().toString() }, ...projects]);
       toast({ title: "Project Added", description: `"${projectToSave.title}" has been added.`});
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };
  
  const filteredProjects = projects.filter(project => {
    const matchesSearchTerm = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.technologies.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || project.category === categoryFilter;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Manage Your Projects</CardTitle>
            <CardDescription>Add, edit, or delete your portfolio projects from here.</CardDescription>
          </div>
          <Button onClick={handleAddNewProject} className="btn-glow w-full md:w-auto">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-xl">Project List</CardTitle>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search projects..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select onValueChange={setCategoryFilter} defaultValue={categoryFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length > 0 ? filteredProjects.map(project => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Image src={project.imageUrl || 'https://placehold.co/60x40.png'} alt={project.title} width={60} height={40} className="rounded object-cover" data-ai-hint={project.imageHint}/>
                    </TableCell>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0,3).map(tech => <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>)}
                        {project.technologies.length > 3 && <Badge variant="secondary" className="text-xs">+{project.technologies.length - 3}</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {project.liveLink && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={project.liveLink} target="_blank"><ExternalLink className="h-4 w-4" /></Link>
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={project.githubLink} target="_blank"><GithubIcon className="h-4 w-4" /></Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(project.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">No projects found matching your criteria.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         {filteredProjects.length > 5 && (
          <CardFooter className="justify-center border-t pt-4">
            <p className="text-xs text-muted-foreground">Showing {filteredProjects.length} projects</p>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => {
          setIsFormOpen(isOpen);
          if (!isOpen) setEditingProject(null);
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            <DialogDescription>
              {editingProject ? 'Update the details of your project.' : 'Fill in the details for your new project.'}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm 
            project={editingProject} 
            onSave={handleSaveProject}
            onClose={() => {
                setIsFormOpen(false);
                setEditingProject(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
