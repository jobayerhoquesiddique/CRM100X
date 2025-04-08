import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, ScaleIn } from "@/components/ui/motion";
import { 
  Phone, 
  Mail, 
  Building, 
  MoreHorizontal, 
  MapPin,
  Star,
  StarOff,
  PlusCircle
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  location: string;
  status: 'Lead' | 'Customer' | 'Prospect';
  lastInteraction: string;
  avatar?: string;
  starred: boolean;
}

// Define form schemas
const emailFormSchema = z.object({
  to: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message content is required" })
});

const callFormSchema = z.object({
  contact: z.string().min(1, { message: "Contact name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  notes: z.string().optional()
});

const newContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  status: z.enum(["Lead", "Customer", "Prospect"], {
    required_error: "Please select a status",
  }),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;
type CallFormValues = z.infer<typeof callFormSchema>;
type NewContactFormValues = z.infer<typeof newContactSchema>;

// Email dialog component
const EmailDialog = ({ contact }: { contact: Contact }) => {
  const { toast } = useToast();
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: contact.email,
      subject: "",
      message: ""
    }
  });

  function onSubmit(data: EmailFormValues) {
    toast({
      title: "Email Sent",
      description: `Email successfully sent to ${contact.name}`,
    });
    // In a real app, this would send the email via API
    console.log("Email data:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Mail className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Email to {contact.name}</DialogTitle>
          <DialogDescription>
            Compose and send an email to this contact. Click send when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter email subject" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Type your message here" 
                      rows={6}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Send Email</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Call dialog component
const CallDialog = ({ contact }: { contact: Contact }) => {
  const { toast } = useToast();
  const form = useForm<CallFormValues>({
    resolver: zodResolver(callFormSchema),
    defaultValues: {
      contact: contact.name,
      phone: "+1 (555) 123-4567", // Mock phone number
      notes: ""
    }
  });

  function onSubmit(data: CallFormValues) {
    toast({
      title: "Call Initiated",
      description: `Call to ${contact.name} has been scheduled`,
    });
    // In a real app, this would initiate a call via API
    console.log("Call data:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 px-2">
          <Phone className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Call {contact.name}</DialogTitle>
          <DialogDescription>
            Initiate a call to this contact. Add notes before or after the call.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add notes about this call" 
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Start Call</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// New Contact dialog component
const NewContactDialog = () => {
  const { toast } = useToast();
  const form = useForm<NewContactFormValues>({
    resolver: zodResolver(newContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      location: "",
      status: "Lead"
    }
  });

  function onSubmit(data: NewContactFormValues) {
    toast({
      title: "Contact Added",
      description: `${data.name} has been added to your contacts`,
    });
    // In a real app, this would add the contact via API
    console.log("New contact data:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your CRM. Fill in the details and click save.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Job position" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City, State" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 rounded-md border border-gray-300"
                        {...field}
                      >
                        <option value="Lead">Lead</option>
                        <option value="Prospect">Prospect</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Contact</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const RecentContacts: React.FC = () => {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Emma Wilson',
      email: 'emma.wilson@techgiant.com',
      company: 'TechGiant Inc',
      position: 'CTO',
      location: 'San Francisco, CA',
      status: 'Lead',
      lastInteraction: '2 days ago',
      starred: true
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@acme.com',
      company: 'Acme Corp',
      position: 'CEO',
      location: 'New York, NY',
      status: 'Customer',
      lastInteraction: '1 week ago',
      starred: true
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.j@globex.com',
      company: 'Globex Systems',
      position: 'Procurement Manager',
      location: 'Chicago, IL',
      status: 'Customer',
      lastInteraction: '3 days ago',
      starred: false
    },
    {
      id: '4',
      name: 'Michael Chen',
      email: 'michael.chen@initech.com',
      company: 'Initech LLC',
      position: 'CFO',
      location: 'Austin, TX',
      status: 'Prospect',
      lastInteraction: 'Today',
      starred: false
    },
    {
      id: '5',
      name: 'Lisa Rodriguez',
      email: 'lisa.r@hooli.com',
      company: 'Hooli Tech',
      position: 'CIO',
      location: 'Seattle, WA',
      status: 'Lead',
      lastInteraction: 'Yesterday',
      starred: true
    }
  ]);

  // Get the status badge style
  const getStatusBadge = (status: Contact['status']) => {
    switch (status) {
      case 'Lead':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0">Lead</Badge>;
      case 'Customer':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-0">Customer</Badge>;
      case 'Prospect':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-0">Prospect</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-0">{status}</Badge>;
    }
  };

  // Get contact initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Toggle star status for a contact
  const toggleStarred = (contactId: string) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, starred: !contact.starred } 
        : contact
    ));
    
    // Success notification
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      toast({
        title: contact.starred ? "Contact Unstarred" : "Contact Starred",
        description: `${contact.name} has been ${contact.starred ? "removed from" : "added to"} your favorites`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-4 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Contacts</CardTitle>
        <NewContactDialog />
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <StaggerContainer className="space-y-4">
          {contacts.map((contact, index) => (
            <ScaleIn key={contact.id} delay={index * 0.05}>
              <div className="p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between">
                  <div className="flex">
                    <Avatar className="h-12 w-12 mr-4">
                      {contact.avatar && <AvatarImage src={contact.avatar} alt={contact.name} />}
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900 mr-2">{contact.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => toggleStarred(contact.id)}
                        >
                          {contact.starred ? (
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          ) : (
                            <StarOff className="h-4 w-4 text-gray-300" />
                          )}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{contact.position}</p>
                      <div className="flex items-center mt-1">
                        <Building className="h-3.5 w-3.5 text-gray-500 mr-1" />
                        <span className="text-xs text-gray-600">{contact.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {getStatusBadge(contact.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {}}>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Send Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {}}>
                          <Phone className="mr-2 h-4 w-4" />
                          <span>Call</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStarred(contact.id)}>
                          <Star className="mr-2 h-4 w-4" />
                          <span>{contact.starred ? 'Unstar' : 'Star'}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <Mail className="h-3.5 w-3.5 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-600 truncate">{contact.email}</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center">
                      <MapPin className="h-3.5 w-3.5 text-gray-500 mr-2" />
                      <span className="text-xs text-gray-600 truncate">{contact.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Last interaction: {contact.lastInteraction}
                  </span>
                  <div className="flex space-x-1">
                    <EmailDialog contact={contact} />
                    <CallDialog contact={contact} />
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </StaggerContainer>
      </CardContent>
    </Card>
  );
};

export default RecentContacts;