
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
  const [rawCategoryInput, setRawCategoryInput] = useState(currentProject?.category || ''); // For the text input when "New Category" is selected
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [technologies, setTechnologies] = useState(currentProject?.technologies.join(', ') || '');
  const [tags, setTags] = useState(currentProject?.tags.join(', ') || '');
  const [imageUrl, setImageUrl] = useState(currentProject?.imageUrl || 'https://placehold.co/600x400.png');
  const [imageHint, setImageHint] = useState(currentProject?.imageHint || 'project image');
  const [githubLink, setGithubLink] = useState(currentProject?.githubLink || '');
  const [liveLink, setLiveLink] = useState(currentProject?.liveLink || '');

  const { toast } = useToast();
  
  const availableCategories = Array.from(new Set(initialProjects.map(p => p.category).filter(Boolean)));


  useEffect(() => {
    if (currentProject) {
        const isExistingCategory = availableCategories.includes(currentProject.category);
        if (!isExistingCategory && currentProject.category) {
            setIsNewCategory(true);
            setRawCategoryInput(currentProject.category); // Set input field if category is custom
            setCategory("New Category"); // Set select to "New Category"
        } else {
            setIsNewCategory(false);
            setCategory(currentProject.category);
            setRawCategoryInput(currentProject.category);
        }
    } else {
        // New project
        setIsNewCategory(false);
        setCategory("");
        setRawCategoryInput("");
    }
  }, [currentProject, availableCategories]);


  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (value === "New Category") {
      setIsNewCategory(true);
      setRawCategoryInput(''); // Clear input when switching to new category
    } else {
      setIsNewCategory(false);
      setRawCategoryInput(value);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = isNewCategory ? rawCategoryInput.trim() : category;

    if (!title || !finalCategory) {
        toast({
            title: "Validation Error",
            description: "Title and Category are required.",
            variant: "destructive",
        });
        return;
    }

    if (isNewCategory && (finalCategory === "New Category" || finalCategory === "")) {
         toast({
            title: "Invalid Category",
            description: "Please enter a valid name for the new category.",
            variant: "destructive",
        });
        return;
    }

    onSave({
      id: currentProject?.id || Date.now().toString(),
      title,
      description,
      category: finalCategory,
      technologies: technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      imageUrl,
      imageHint,
      githubLink: githubLink || null,
      liveLink: liveLink || null,
    });
  };


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
          <Select onValueChange={handleCategoryChange} value={category}>
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
          {isNewCategory && (
            <Input 
              placeholder="Enter new category name" 
              className="mt-2"
              value={rawCategoryInput}
              onChange={(e) => setRawCategoryInput(e.target.value)}
            />
          )}
        </div>
        <div>
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input id="technologies" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
        </div>
      </div>
       <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
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
      // Add new project to the beginning of the list
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
                              project.technologies.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              project.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || project.category === categoryFilter;
    return matchesSearchTerm && matchesCategory;
  });
  
  const uniqueCategoriesForFilter = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];


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
                      {uniqueCategoriesForFilter.map(cat => (
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
                  <TableHead>Tags</TableHead>
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
                        {project.tags.slice(0,3).map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        {project.tags.length > 3 && <Badge variant="secondary" className="text-xs">+{project.tags.length - 3}</Badge>}
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
