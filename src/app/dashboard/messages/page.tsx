
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Eye, Trash2, Search, Inbox, CheckCircle, Filter, Loader2 } from 'lucide-react';
import type { Message } from '@/data/mockData'; // Using type from mockData for structure
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc, type Timestamp } from 'firebase/firestore';

// Helper function to format date from various types
const formatDate = (dateValue: Timestamp | Date | string): string => {
  if (typeof dateValue === 'string') {
    return format(parseISO(dateValue), "MMM d, yyyy, HH:mm");
  }
  if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
    return format((dateValue as Timestamp).toDate(), "MMM d, yyyy, HH:mm");
  }
  if (dateValue instanceof Date) {
    return format(dateValue, "MMM d, yyyy, HH:mm");
  }
  return 'Invalid Date';
};

// Helper function to format date for dialog
const formatDateForDialog = (dateValue: Timestamp | Date | string): string => {
    if (typeof dateValue === 'string') {
      return format(parseISO(dateValue), "PPPp");
    }
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
      return format((dateValue as Timestamp).toDate(), "PPPp");
    }
    if (dateValue instanceof Date) {
      return format(dateValue, "PPPp");
    }
    return 'Invalid Date';
  };


export default function ManageMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'read' | 'unread'>('all');

  const { toast } = useToast();

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, 'messages'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedMessages: Message[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Date is already a Firestore Timestamp or will be handled by formatDate
        } as Message));
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages: ", error);
        toast({
          title: "Error Fetching Messages",
          description: "Could not load messages from the database.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [toast]);

  const handleViewMessage = async (messageToView: Message) => {
    let messageForDialog = { ...messageToView };

    if (!messageToView.read) {
      try {
        const messageRef = doc(db, 'messages', messageToView.id);
        await updateDoc(messageRef, { read: true });
        messageForDialog.read = true; // Update for dialog
        // Update in local state
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageToView.id ? { ...msg, read: true } : msg
          )
        );
      } catch (error) {
        console.error("Error marking message as read:", error);
        toast({
          title: "Error",
          description: "Could not mark message as read.",
          variant: "destructive"
        });
        // Proceed to open dialog with original state if update failed
      }
    }
    setSelectedMessage(messageForDialog);
    setIsViewDialogOpen(true);
  };

  const handleDeleteMessage = async (messageId: string) => {
    // Optimistic UI update
    const originalMessages = [...messages];
    setMessages(messages.filter(msg => msg.id !== messageId));

    try {
      await deleteDoc(doc(db, 'messages', messageId));
      toast({
        title: "Message Deleted",
        description: "The message has been removed.",
      });
      if (selectedMessage && selectedMessage.id === messageId) {
        setIsViewDialogOpen(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setMessages(originalMessages); // Revert UI on error
      toast({
        title: "Error Deleting Message",
        description: "Could not delete the message.",
        variant: "destructive",
      });
    }
  };
  
  const handleToggleReadStatus = async (messageId: string) => {
    const messageToUpdate = messages.find(msg => msg.id === messageId);
    if (!messageToUpdate) return;

    const newReadState = !messageToUpdate.read;
    
    // Optimistic UI update
    const originalMessages = [...messages];
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: newReadState } : msg
      )
    );
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(prev => prev ? {...prev, read: newReadState} : null);
    }

    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, { read: newReadState });
      toast({
        title: `Message Marked as ${newReadState ? 'Read' : 'Unread'}`,
        description: "The message status has been updated.",
      });
    } catch (error) {
      console.error("Error toggling read status:", error);
      setMessages(originalMessages); // Revert UI on error
      if (selectedMessage && selectedMessage.id === messageId) {
        setSelectedMessage(prev => prev ? {...prev, read: !newReadState} : null);
      }
      toast({
        title: "Error Updating Status",
        description: "Could not update message read status.",
        variant: "destructive",
      });
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
              Review messages sent through your contact form. {unreadCount > 0 ? `${unreadCount} unread.` : 'All messages read.'}
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
                          <Badge variant="default">New</Badge> 
                        ) : (
                          <Badge variant="outline">Read</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                          <div>{message.name}</div>
                          <div className="text-xs text-muted-foreground">{message.email}</div>
                      </TableCell>
                      <TableCell>{message.subject || <span className="text-muted-foreground italic">No Subject</span>}</TableCell>
                      <TableCell className="text-xs">{formatDate(message.date)}</TableCell>
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
                        {messages.length === 0 && !isLoading ? "No messages yet. Messages from your contact form will appear here." : "No messages match your current filter."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
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
                Received: {formatDateForDialog(selectedMessage.date)}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 px-1 flex-grow overflow-y-auto">
              <h4 className="font-semibold mb-2">Message:</h4>
              <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{selectedMessage.message}</p>
            </div>
            <DialogFooter className="mt-auto">
              <Button variant="outline" onClick={() => {
                if (selectedMessage) handleToggleReadStatus(selectedMessage.id);
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
