import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MessageSquare,
  MoreHorizontal,
  Download,
  Tag,
  Star,
  StarOff
} from "lucide-react";
import { FadeIn, ScaleIn, StaggerContainer } from "@/components/ui/motion";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock data for contacts
const contacts = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john.smith@acmecorp.com", 
    company: "Acme Corp", 
    phone: "(555) 123-4567", 
    status: "Customer", 
    leadScore: 85,
    tags: ["Enterprise", "Software"],
    lastContact: "2 days ago"
  },
  { 
    id: 2, 
    name: "Lisa Wong", 
    email: "lisa.wong@techgiant.com", 
    company: "TechGiant Inc", 
    phone: "(555) 987-6543", 
    status: "Lead", 
    leadScore: 65,
    tags: ["Mid-Market", "Cloud"],
    lastContact: "5 days ago"
  },
  { 
    id: 3, 
    name: "Michael Johnson", 
    email: "mjohnson@globex.com", 
    company: "Globex Systems", 
    phone: "(555) 567-8901", 
    status: "Customer", 
    leadScore: 92,
    tags: ["Enterprise", "Support"],
    lastContact: "Today"
  },
  { 
    id: 4, 
    name: "Robert Chen", 
    email: "robert.c@initech.com", 
    company: "Initech LLC", 
    phone: "(555) 345-6789", 
    status: "Lead", 
    leadScore: 45,
    tags: ["SMB", "Security"],
    lastContact: "1 week ago"
  },
  { 
    id: 5, 
    name: "Sarah Williams", 
    email: "swilliams@hoolitech.com", 
    company: "Hooli Tech", 
    phone: "(555) 234-5678", 
    status: "Customer", 
    leadScore: 78,
    tags: ["Enterprise", "Data"],
    lastContact: "Yesterday"
  }
];

// Mock data for leads
const leads = [
  { 
    id: 6, 
    name: "David Lee", 
    email: "david.lee@newprospect.com", 
    company: "New Prospect Inc", 
    phone: "(555) 876-5432", 
    source: "Website", 
    stage: "Qualification", 
    leadScore: 35,
    tags: ["SMB", "Manufacturing"],
    created: "2 days ago"
  },
  { 
    id: 7, 
    name: "Emma Rodriguez", 
    email: "erodriguez@potentialclient.com", 
    company: "Potential Client Co", 
    phone: "(555) 765-4321", 
    source: "LinkedIn", 
    stage: "Discovery", 
    leadScore: 55,
    tags: ["Mid-Market", "Healthcare"],
    created: "1 week ago"
  },
  { 
    id: 8, 
    name: "James Wilson", 
    email: "jwilson@bigopportunity.com", 
    company: "Big Opportunity Ltd", 
    phone: "(555) 432-1098", 
    source: "Referral", 
    stage: "Proposal", 
    leadScore: 75,
    tags: ["Enterprise", "Finance"],
    created: "3 days ago"
  },
  { 
    id: 9, 
    name: "Olivia Martinez", 
    email: "omartinez@growingbiz.com", 
    company: "Growing Business LLC", 
    phone: "(555) 321-9876", 
    source: "Trade Show", 
    stage: "Qualification", 
    leadScore: 45,
    tags: ["SMB", "Retail"],
    created: "5 days ago"
  },
  { 
    id: 10, 
    name: "William Brown", 
    email: "wbrown@promisinglead.com", 
    company: "Promising Lead Corp", 
    phone: "(555) 543-2109", 
    source: "Google Ads", 
    stage: "Interest", 
    leadScore: 25,
    tags: ["Mid-Market", "Education"],
    created: "Today"
  }
];

// Define form schema for new contact
const newContactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  tags: z.string().optional(),
});

type NewContactFormValues = z.infer<typeof newContactSchema>;

// New Contact dialog component
const NewContactDialog = ({ onAddContact }: { onAddContact: (data: any) => void }) => {
  const form = useForm<NewContactFormValues>({
    resolver: zodResolver(newContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      status: "Lead",
      tags: "",
    }
  });

  function onSubmit(data: NewContactFormValues) {
    const newContact = {
      ...data,
      id: Date.now(), // Generate a unique ID
      leadScore: Math.floor(Math.random() * 50) + 50, // Random score between 50-100
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      lastContact: "Just now"
    };
    
    onAddContact(newContact);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                        <option value="Customer">Customer</option>
                        <option value="Prospect">Prospect</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enterprise, Software" />
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

const ContactsPage: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("contacts");
  const [favorites, setFavorites] = useState<number[]>([1, 3]); // IDs of favorite contacts
  const [contactsData, setContactsData] = useState(contacts);
  const [leadsData, setLeadsData] = useState(leads);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Customer":
        return "bg-green-100 text-green-800";
      case "Lead":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Qualification":
        return "bg-yellow-100 text-yellow-800";
      case "Discovery":
        return "bg-purple-100 text-purple-800";
      case "Proposal":
        return "bg-indigo-100 text-indigo-800";
      case "Interest":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLeadScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <FadeIn className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contacts & Leads</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => {
              // Generate CSV for export
              const dataToExport = activeTab === "contacts" ? contactsData : leadsData;
              const fields = Object.keys(dataToExport[0]);
              
              // Create CSV header
              let csv = fields.join(',') + '\n';
              
              // Add data rows
              dataToExport.forEach(item => {
                const row = fields.map(field => {
                  const value = item[field];
                  // Handle arrays (like tags) and objects
                  if (Array.isArray(value)) {
                    return `"${value.join('; ')}"`;
                  } else if (typeof value === 'object' && value !== null) {
                    return `"${JSON.stringify(value)}"`;
                  }
                  return `"${value}"`;
                }).join(',');
                csv += row + '\n';
              });
              
              // Create and download file
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.setAttribute('hidden', '');
              a.setAttribute('href', url);
              a.setAttribute('download', `${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`);
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              
              toast({
                title: "Export Successful",
                description: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} exported to CSV successfully`,
              });
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <NewContactDialog onAddContact={(newContact) => {
            if (activeTab === "contacts") {
              setContactsData([newContact, ...contactsData]);
            } else {
              // Convert contact to lead format if needed
              const newLead = {
                ...newContact,
                source: "Manual Entry",
                stage: "Interest",
                created: "Just now"
              };
              setLeadsData([newLead, ...leadsData]);
            }
            
            toast({
              title: "Contact Added",
              description: `${newContact.name} has been added to your ${activeTab}`,
            });
          }} />
        </div>
      </div>

      <ScaleIn className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search contacts or companies..." 
            className="pl-10 pr-3 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" className="w-full md:w-auto">
          <Tag className="h-4 w-4 mr-2" />
          Tags
        </Button>
      </ScaleIn>

      <Tabs defaultValue="contacts" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Manage your contacts and customer relationships.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Lead Score</TableHead>
                    <TableHead className="hidden md:table-cell">Tags</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <StaggerContainer>
                    {contacts.map((contact, index) => (
                      <ScaleIn key={contact.id} delay={index * 0.05}>
                        <TableRow>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => toggleFavorite(contact.id)}
                            >
                              {favorites.includes(contact.id) ? 
                                <Star className="h-4 w-4 text-yellow-400" /> : 
                                <StarOff className="h-4 w-4 text-gray-400" />
                              }
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>{contact.name}</div>
                            <div className="text-sm text-gray-500">{contact.email}</div>
                          </TableCell>
                          <TableCell>{contact.company}</TableCell>
                          <TableCell className="hidden md:table-cell">{contact.phone}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                              {contact.status}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className={`font-medium ${getLeadScoreColor(contact.leadScore)}`}>
                              {contact.leadScore}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {contact.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                                  <DropdownMenuItem>Add to Campaign</DropdownMenuItem>
                                  <DropdownMenuItem>Create Task</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      </ScaleIn>
                    ))}
                  </StaggerContainer>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leads">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Leads</CardTitle>
              <CardDescription>Manage your leads and opportunities.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="hidden md:table-cell">Contact</TableHead>
                    <TableHead className="hidden md:table-cell">Source</TableHead>
                    <TableHead className="hidden md:table-cell">Stage</TableHead>
                    <TableHead className="hidden md:table-cell">Lead Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <StaggerContainer>
                    {leads.map((lead, index) => (
                      <ScaleIn key={lead.id} delay={index * 0.05}>
                        <TableRow>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => toggleFavorite(lead.id)}
                            >
                              {favorites.includes(lead.id) ? 
                                <Star className="h-4 w-4 text-yellow-400" /> : 
                                <StarOff className="h-4 w-4 text-gray-400" />
                              }
                            </Button>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div>{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell className="hidden md:table-cell">{lead.phone}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {lead.source}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(lead.stage)}`}>
                              {lead.stage}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className={`font-medium ${getLeadScoreColor(lead.leadScore)}`}>
                              {lead.leadScore}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                                  <DropdownMenuItem>Convert to Contact</DropdownMenuItem>
                                  <DropdownMenuItem>Create Task</DropdownMenuItem>
                                  <DropdownMenuItem>Add to Deal</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      </ScaleIn>
                    ))}
                  </StaggerContainer>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FadeIn>
  );
};

export default ContactsPage;