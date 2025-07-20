
'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Eye, Trash2, Search, Inbox, CheckCircle, Filter, Loader2, AlertCircle } from 'lucide-react';
import { type Message } from '@/data/mockData'; 
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from '@/components/ui/alert';


// Helper function to format date from various types
const formatDate = (dateValue: Date | string | undefined): string => {
  if (!dateValue) return 'No Date';
  try {
    if (typeof dateValue === 'string') {
      // إذا كانت الصيغة ISO
      const isoDate = parseISO(dateValue);
      if (!isNaN(isoDate.getTime())) {
        return format(isoDate, "MMM d, yyyy, HH:mm");
      }
      // إذا كانت نص منسق (مثل 14/07/2025, 21:26) نعيده كما هو
      return dateValue;
    }
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      return format(dateValue, "MMM d, yyyy, HH:mm");
    }
  } catch (error) {
    console.warn("Error formatting date:", dateValue, error);
    return typeof dateValue === 'string' ? dateValue : 'Invalid Date';
  }
  return typeof dateValue === 'string' ? dateValue : 'Invalid Date';
};

// Helper function to format date for dialog
const formatDateForDialog = (dateValue: Date | string | undefined): string => {
  if (!dateValue) return 'No Date';
  try {
    if (typeof dateValue === 'string') {
      const isoDate = parseISO(dateValue);
      if (!isNaN(isoDate.getTime())) {
        return format(isoDate, "PPPp");
      }
      return dateValue;
    }
    if (dateValue instanceof Date && !isNaN(dateValue.getTime())) {
      return format(dateValue, "PPPp");
    }
  } catch (error) {
    console.warn("Error formatting date for dialog:", dateValue, error);
    return typeof dateValue === 'string' ? dateValue : 'Invalid Date';
  }
  return typeof dateValue === 'string' ? dateValue : 'Invalid Date';
};


export default function ManageMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error fetching messages: ${response.statusText}`);
      }
      const data: Message[] = await response.json();
      setMessages(data.map(msg => ({
        ...msg,
        // Ensure date is a string or Date object for consistency, parseISO will handle strings
        date: typeof msg.date === 'string' ? parseISO(msg.date) : msg.date, 
      })));
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError(err instanceof Error ? err.message : 'Failed to load messages. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);


  const handleViewMessage = async (messageToView: Message) => {
    let messageForDialog = { ...messageToView };

    if (!messageToView.read) {
      try {
        // Optimistically update UI
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageToView.id ? { ...msg, read: true } : msg
          )
        );
        messageForDialog.read = true;

        const response = await fetch(`/api/messages/${messageToView.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ read: true }),
        });

        if (!response.ok) {
          // Revert optimistic update on failure
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === messageToView.id ? { ...msg, read: false } : msg
            )
          );
          messageForDialog.read = false; // Revert for dialog as well
          const errorResult = await response.json();
          toast({ title: "Error", description: errorResult.error || "Failed to mark as read.", variant: "destructive" });
        } else {
           // toast({ title: "Message Updated", description: "Marked as read." }); // Optional success toast
        }
      } catch (e) {
        // Revert optimistic update on network error
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageToView.id ? { ...msg, read: false } : msg
          )
        );
        messageForDialog.read = false;
        toast({ title: "Error", description: "An error occurred.", variant: "destructive" });
      }
    }
    setSelectedMessage(messageForDialog);
    setIsViewDialogOpen(true);
  };
  
  const handleDeleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorResult = await response.json();
        toast({ title: "Error", description: errorResult.error || "Failed to delete message.", variant: "destructive" });
      } else {
        toast({ title: "Message Deleted", description: "The message has been removed." });
        // إعادة جلب الرسائل من قاعدة البيانات بعد الحذف
        fetchMessages();
      }
    } catch (e) {
      toast({ title: "Error", description: "An error occurred while deleting.", variant: "destructive" });
    }

    if (selectedMessage && selectedMessage.id === messageId) {
      setIsViewDialogOpen(false);
      setSelectedMessage(null);
    }
  };
  
  const handleToggleReadStatus = async (messageId: string) => {
    const messageToUpdate = messages.find(msg => msg.id === messageId);
    if (!messageToUpdate) return;

    const newReadState = !messageToUpdate.read;
    const originalMessages = [...messages];
    
    // Optimistic UI update
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: newReadState } : msg
      )
    );
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(prev => prev ? {...prev, read: newReadState} : null);
    }

    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: newReadState }),
      });

      if (!response.ok) {
        setMessages(originalMessages); // Revert
        if (selectedMessage && selectedMessage.id === messageId) {
          setSelectedMessage(prev => prev ? {...prev, read: !newReadState} : null);
        }
        const errorResult = await response.json();
        toast({ title: "Error", description: errorResult.error || `Failed to mark as ${newReadState ? 'read' : 'unread'}.`, variant: "destructive" });
      } else {
        toast({ title: `Message Marked as ${newReadState ? 'Read' : 'Unread'}` });
      }
    } catch (e) {
      setMessages(originalMessages); // Revert
      if (selectedMessage && selectedMessage.id === messageId) {
         setSelectedMessage(prev => prev ? {...prev, read: !newReadState} : null);
      }
      toast({ title: "Error", description: "An error occurred.", variant: "destructive" });
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter(msg => {
      const matchesSearch = 
        (msg.name && msg.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (msg.email && msg.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (msg.message && msg.message.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = 
        filterStatus === 'all' ||
        (filterStatus === 'read' && msg.read) ||
        (filterStatus === 'unread' && !msg.read);
        
      return matchesSearch && matchesStatus;
    });
  }, [messages, searchTerm, filterStatus]);
  
  const unreadCount = useMemo(() => messages.filter(msg => !msg.read).length, [messages]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">View Messages</CardTitle>
            <CardDescription>
              Review messages sent through your contact form. 
              {!isLoading && !error && (unreadCount > 0 ? `${unreadCount} unread.` : 'All messages read.')}
              {error && " Error loading messages."}
            </CardDescription>
          </div>
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Loading messages...</p>
            </div>
          ) : error ? (
             <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
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
                          <Badge variant="default" className="bg-accent text-accent-foreground">New</Badge> 
                        ) : (
                          <Badge variant="outline">Read</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                          <div>{message.name}</div>
                          <div className="text-xs text-muted-foreground">{message.email}</div>
                      </TableCell>
                      <TableCell>{message.subject || <span className="text-muted-foreground italic">No Subject</span>}</TableCell>
                      <TableCell className="text-xs">{formatDate(
                        message.createdAtFormatted || message.createdAt || (message.date && typeof message.date === 'object' && 'toDate' in message.date && typeof (message.date as any).toDate === 'function'
                          ? (message.date as any).toDate()
                          : message.date)
                      )}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" onClick={() => handleViewMessage(message)} title="View Message">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleToggleReadStatus(message.id)} title={message.read ? "Mark as Unread" : "Mark as Read"}>
                            {message.read ? <Mail className="h-4 w-4" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(message.id)} className="text-destructive hover:text-destructive" title="Delete Message">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : (
                     <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        {messages.length === 0 && !isLoading ? "No messages received yet." : "No messages match your current filter."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {!isLoading && !error && filteredMessages.length > 10 && (
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
                Received: {formatDateForDialog(
                  selectedMessage?.createdAtFormatted || selectedMessage?.createdAt || (selectedMessage?.date && typeof selectedMessage.date === 'object' && 'toDate' in selectedMessage.date && typeof (selectedMessage.date as any).toDate === 'function'
                    ? (selectedMessage.date as any).toDate()
                    : selectedMessage.date)
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 px-1 flex-grow overflow-y-auto">
              <h4 className="font-semibold mb-2">Message:</h4>
              <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{selectedMessage.message}</p>
            </div>
            <DialogFooter className="mt-auto">
              <Button variant="outline" onClick={() => {
                if (selectedMessage) handleToggleReadStatus(selectedMessage.id);
                // Optionally close dialog or keep it open
                // setIsViewDialogOpen(false); 
              }}>
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
