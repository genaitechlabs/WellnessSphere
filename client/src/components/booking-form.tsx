import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  sessionType: "ai" | "human" | "group";
  onSuccess: () => void;
}

export function BookingForm({ sessionType, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: undefined as Date | undefined,
    time: "",
    notes: "",
  });
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();

  const sessionDetails = {
    ai: {
      title: "AI-Assisted Guidance",
      therapistName: "HealthyOwl AI Assistant",
      price: "Free",
    },
    human: {
      title: "Human Therapist",
      therapistName: "Dr. Sarah Johnson",
      price: "$75",
    },
    group: {
      title: "Group Session",
      therapistName: "Certified Instructor",
      price: "$35",
    },
  };

  const availableTimes = [
    "9:00 AM",
    "10:00 AM", 
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const bookingMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/bookings", {
        userId: 1, // Demo user ID
        sessionType,
        therapistName: sessionDetails[sessionType].therapistName,
        date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
        time: formData.time,
        notes: formData.notes,
        status: "pending",
      });
    },
    onSuccess: () => {
      toast({
        title: "Booking confirmed!",
        description: `Your ${sessionDetails[sessionType].title} session has been scheduled.`,
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.date || !formData.time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate();
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Session Summary */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Session Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/10 rounded-xl p-4">
            <h3 className="font-semibold text-foreground mb-2">
              {sessionDetails[sessionType].title}
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Therapist:</span>
                <span className="font-medium text-foreground">
                  {sessionDetails[sessionType].therapistName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium text-foreground">
                  {sessionType === "ai" ? "30 minutes" : sessionType === "group" ? "60 minutes" : "45 minutes"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-bold text-primary text-lg">
                  {sessionDetails[sessionType].price}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground">What to expect:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {sessionType === "ai" && (
                <>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Personalized wellness assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>AI-generated recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Custom wellness plan</span>
                  </li>
                </>
              )}
              {sessionType === "human" && (
                <>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>One-on-one consultation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Professional assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Personalized treatment plan</span>
                  </li>
                </>
              )}
              {sessionType === "group" && (
                <>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Guided group meditation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Community support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Take-home exercises</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="wellness-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your@email.com"
                className="wellness-input"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal wellness-input",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => {
                      updateFormData("date", date);
                      setIsCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Preferred Time *</Label>
              <Select value={formData.time} onValueChange={(value) => updateFormData("time", value)}>
                <SelectTrigger className="wellness-input">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">What would you like to focus on?</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
                placeholder="Tell us about your wellness goals, concerns, or what you'd like to work on..."
                className="wellness-input min-h-24 resize-none"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full wellness-button"
              size="lg"
              disabled={bookingMutation.isPending}
            >
              {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
