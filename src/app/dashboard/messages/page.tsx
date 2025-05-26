
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Eye, Trash2, Search, Inbox, CheckCircle, Filter } from 'lucide-react';
import { messagesData as initialMessages, Message } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Added import for cn


export default function ManageMessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const { toast } = useToast();

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    // Mark as read if it's not already
    if (!message.read) {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    // Confirmation can be added here
    setMessages(messages.filter(msg => msg.id !== messageId));
    toast({
      title: "Message Deleted",
      description: "The message has been removed.",
    });
  };
  
  const handleToggleReadStatus = (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: !msg.read } : msg
      )
    );
  };


  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      const matchesSearch = 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'read' && msg.read) ||
        (filterStatus === 'unread' && !msg.read);
        
      return matchesSearch && matchesStatus;
    });
  }, [messages, searchTerm, filterStatus]);
  
  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">View Messages</CardTitle>
            <CardDescription>
              Review messages sent through your contact form. {unreadCount > 0 ? `${unreadCount} unread.` : 'All messages read.'}
            </CardDescription>
          </div>
          {/* Potential future actions like "Mark all as read" */}
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Inbox</CardTitle>
           <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground"/>
                <Select onValueChange={(value) => setFilterStatus(value as 'all' | 'read' | 'unread')} defaultValue={filterStatus}>
                    <SelectTrigger className="w-full md:w-[150px]">
                        <SelectValue placeholder="Filter status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="unread">Unread</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
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
                  <TableHead className="w-[50px]">Status</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length > 0 ? filteredMessages.map(message => (
                  <TableRow key={message.id} className={cn(!message.read && "bg-primary/5 font-medium")}>
                    <TableCell>
                      {!message.read ? (
                        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">New</Badge>
                      ) : (
                        <Badge variant="outline">Read</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                        <div>{message.name}</div>
                        <div className="text-xs text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>{message.subject || <span className="text-muted-foreground italic">No Subject</span>}</TableCell>
                    <TableCell className="text-xs">{format(parseISO(message.date), "MMM d, yyyy, HH:mm")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => handleViewMessage(message)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleToggleReadStatus(message.id)}>
                          {message.read ? <Mail className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(message.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                   <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {messages.length === 0 ? "No messages yet." : "No messages match your current filter."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {filteredMessages.length > 10 && (
            <CardFooter className="justify-center border-t pt-4">
                <p className="text-xs text-muted-foreground">Showing {filteredMessages.length} of {messages.length} messages</p>
            </CardFooter>
        )}
      </Card>

      {selectedMessage && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject || "Message Details"}</DialogTitle>
              <DialogDescription>
                From: {selectedMessage.name} ({selectedMessage.email})
                <br />
                Received: {format(parseISO(selectedMessage.date), "PPPp")}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 px-1 flex-grow overflow-y-auto">
              <h4 className="font-semibold mb-2">Message:</h4>
              <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{selectedMessage.message}</p>
            </div>
            <DialogFooter className="mt-auto">
              <Button variant="outline" onClick={() => handleToggleReadStatus(selectedMessage.id)}>
                {selectedMessage.read ? "Mark as Unread" : "Mark as Read"}
              </Button>
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
