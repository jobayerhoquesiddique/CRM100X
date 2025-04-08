import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  User,
  PlusCircle
} from "lucide-react";
import { UPCOMING_TASKS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
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

interface Event {
  date: Date;
  title: string;
  type: 'meeting' | 'deadline' | 'reminder';
}

// Define form schemas
const eventFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.enum(['meeting', 'deadline', 'reminder'], {
    required_error: "Please select an event type",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, { message: "Time is required" }),
  description: z.string().optional(),
});

const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  priority: z.enum(['High', 'Medium', 'Low'], {
    required_error: "Please select a priority level",
  }),
  due: z.date({
    required_error: "Please select a due date",
  }),
  assigned: z.string().min(1, { message: "Assigned to is required" }),
  description: z.string().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;
type TaskFormValues = z.infer<typeof taskFormSchema>;

// Event dialog component
const AddEventDialog = ({ selectedDate, onAddEvent }: { selectedDate?: Date, onAddEvent: (data: any) => void }) => {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      type: "meeting",
      date: selectedDate || new Date(),
      time: "09:00",
      description: "",
    }
  });

  function onSubmit(data: EventFormValues) {
    onAddEvent(data);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Schedule a new event on your calendar. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter event title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 rounded-md border border-gray-300"
                        {...field}
                      >
                        <option value="meeting">Meeting</option>
                        <option value="deadline">Deadline</option>
                        <option value="reminder">Reminder</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add details about this event" 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Event</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Task dialog component
const AddTaskDialog = ({ onAddTask }: { onAddTask: (data: any) => void }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      priority: "Medium",
      due: new Date(),
      assigned: "",
      description: "",
    }
  });

  function onSubmit(data: TaskFormValues) {
    onAddTask(data);
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-2">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task and assign it to a team member. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter task title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 rounded-md border border-gray-300"
                        {...field}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assigned"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Team member name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Add details about this task" 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const TaskCalendarWidget: React.FC = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<string>("calendar");
  const [eventsData, setEventsData] = useState<Event[]>([
    { date: new Date(2025, 3, 10), title: "Call with TechGiant stakeholders", type: 'meeting' },
    { date: new Date(2025, 3, 12), title: "Quarterly review preparation", type: 'deadline' },
    { date: new Date(2025, 3, 15), title: "Update CRM data", type: 'reminder' },
    { date: new Date(2025, 3, 18), title: "Team weekly sync", type: 'meeting' },
    { date: new Date(2025, 3, 20), title: "Project proposal submission", type: 'deadline' },
    { date: new Date(2025, 3, 22), title: "Client presentation", type: 'meeting' }
  ]);
  const [tasksData, setTasksData] = useState(UPCOMING_TASKS);

  // Mock calendar events data
  const events: Event[] = [
    { date: new Date(2025, 3, 10), title: "Call with TechGiant stakeholders", type: 'meeting' },
    { date: new Date(2025, 3, 12), title: "Quarterly review preparation", type: 'deadline' },
    { date: new Date(2025, 3, 15), title: "Update CRM data", type: 'reminder' },
    { date: new Date(2025, 3, 18), title: "Team weekly sync", type: 'meeting' },
    { date: new Date(2025, 3, 20), title: "Project proposal submission", type: 'deadline' },
    { date: new Date(2025, 3, 22), title: "Client presentation", type: 'meeting' }
  ];

  // Get task priority badge style
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-0">High</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-0">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0">Low</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-0">{priority}</Badge>;
    }
  };

  // Check if a date has events
  const hasEvents = (date: Date) => {
    return events.some(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
      date.getMonth() === today.getMonth() && 
      date.getFullYear() === today.getFullYear();
  };

  // Get selected date events
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <Card className="h-full">
      <CardHeader className="px-6 pt-6 pb-0 flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-800">Tasks & Calendar</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[240px]">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-4">
        <TabsContent value="calendar" className="mt-0">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate}
                modifiers={{
                  hasEvent: (date) => hasEvents(date),
                  today: (date) => isToday(date)
                }}
                modifiersClassNames={{
                  hasEvent: "bg-blue-50 font-medium",
                  today: "bg-blue-100 text-blue-700 font-bold"
                }}
                className="rounded-md border"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm text-gray-700 mb-2">
                {selectedDate ? (
                  <span>
                    Events for {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                ) : (
                  <span>No date selected</span>
                )}
              </h3>
              <div className="space-y-2">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map((event, index) => (
                    <div key={index} className="p-2 border rounded-md bg-gray-50 flex items-start gap-2">
                      <div className={`
                        p-1.5 rounded-md
                        ${event.type === 'meeting' ? 'bg-blue-100 text-blue-700' : 
                          event.type === 'deadline' ? 'bg-red-100 text-red-700' : 
                          'bg-amber-100 text-amber-700'
                        }
                      `}>
                        {event.type === 'meeting' ? <User className="h-4 w-4" /> : 
                         event.type === 'deadline' ? <Clock className="h-4 w-4" /> : 
                         <CalendarIcon className="h-4 w-4" />
                        }
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.type === 'meeting' ? 'Meeting' : 
                           event.type === 'deadline' ? 'Deadline' : 
                           'Reminder'
                          }
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No events scheduled for this date
                  </div>
                )}
                <AddEventDialog 
                  selectedDate={selectedDate}
                  onAddEvent={(eventData) => {
                    // Create a new event object
                    const newEvent: Event = {
                      date: eventData.date,
                      title: eventData.title,
                      type: eventData.type as 'meeting' | 'deadline' | 'reminder'
                    };
                    
                    // Add the event to state
                    setEventsData([...eventsData, newEvent]);
                    
                    // Show success toast
                    toast({
                      title: "Event Added",
                      description: `${newEvent.title} has been scheduled on your calendar`,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <div className="space-y-3">
            {UPCOMING_TASKS.map((task) => (
              <div key={task.id} className="p-3 border rounded-md bg-white flex items-start">
                <div className="p-2 bg-gray-100 rounded-md mr-3 text-gray-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-600">
                      <Clock className="h-3.5 w-3.5 inline-block mr-1" />
                      {task.due}
                    </p>
                    <p className="text-sm text-gray-600">
                      <User className="h-3.5 w-3.5 inline-block mr-1" />
                      {task.assigned}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <AddTaskDialog 
              onAddTask={(taskData) => {
                // Format date to a string
                const dateStr = taskData.due.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
                
                // Create a new task object with our required format
                const newTask = {
                  id: Date.now().toString(),
                  title: taskData.title,
                  priority: taskData.priority,
                  due: dateStr,
                  assigned: taskData.assigned
                };
                
                // Add the task to state
                setTasksData([...tasksData, newTask]);
                
                // Show success toast
                toast({
                  title: "Task Created",
                  description: `New task "${newTask.title}" has been assigned to ${newTask.assigned}`,
                });
              }}
            />
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default TaskCalendarWidget;