import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define form validation schema
const documentSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Document content is required" }),
  tags: z.string().optional()
});

type DocumentFormValues = z.infer<typeof documentSchema>;

interface CreateDocumentDialogProps {
  buttonVariant?: "default" | "outline" | "ghost";
  buttonSize?: "default" | "sm" | "lg";
  buttonIcon?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  onDocumentCreated: (document: any) => void;
}

const CreateDocumentDialog: React.FC<CreateDocumentDialogProps> = ({
  buttonVariant = "default",
  buttonSize = "sm",
  buttonIcon = true,
  buttonText = "Create Document",
  buttonClassName = "",
  onDocumentCreated
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: ""
    }
  });

  function onSubmit(data: DocumentFormValues) {
    // Create new document object
    const newDocument = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description || "",
      content: data.content,
      tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      size: `${Math.floor(data.content.length / 100)} KB`,
      type: "document"
    };
    
    // Call the callback function
    onDocumentCreated(newDocument);
    
    // Show success toast
    toast({
      title: "Document Created",
      description: `${data.title} has been created successfully.`,
    });
    
    // Reset form and close dialog
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={buttonSize}
          className={buttonClassName}
        >
          {buttonIcon && <FileText className="h-4 w-4 mr-2" />}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            Create a new document in your workspace. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter document title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter a brief description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Enter document content here..."
                      rows={8}
                      className="resize-none"
                    />
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
                  <FormLabel>Tags (Optional, comma separated)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="proposal, contract, draft" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Document</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocumentDialog;