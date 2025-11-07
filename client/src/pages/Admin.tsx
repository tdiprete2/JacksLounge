import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Star, Calendar, Database, Lock, Mail, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ReviewStats, Review, ContactRequest } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ReviewsResponse {
  stats: ReviewStats | null;
  reviews: Review[];
}

interface ContactsResponse {
  contacts: ContactRequest[];
  unreadCount: number;
}

export default function Admin() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { data, isLoading } = useQuery<ReviewsResponse>({
    queryKey: ['/api/reviews'],
  });

  const { data: contactsData, isLoading: contactsLoading, error: contactsError } = useQuery<ContactsResponse>({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      try {
        const response = await apiRequest(
          'GET',
          '/api/contacts',
          undefined,
          { 'x-admin-password': adminPassword }
        );
        return await response.json();
      } catch (error) {
        // Check if it's a 401 error
        if (error instanceof Error && error.message.includes('401')) {
          setIsAuthenticated(false);
          sessionStorage.removeItem('adminPassword');
          toast({
            title: "Session Expired",
            description: "Please log in again",
            variant: "destructive",
          });
        }
        throw error;
      }
    },
    enabled: isAuthenticated && !!adminPassword,
    retry: false,
  });

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setAdminPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  const refreshMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/reviews/refresh', { password: adminPassword }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Reviews Refreshed",
        description: "Successfully updated reviews from Google",
      });
      setIsRefreshing(false);
    },
    onError: (error: Error) => {
      if (error.message.includes('401')) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminPassword');
        toast({
          title: "Session Expired",
          description: "Please log in again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Refresh Failed",
          description: error.message || "Failed to refresh reviews",
          variant: "destructive",
        });
      }
      setIsRefreshing(false);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setAdminPassword(password);
      setIsAuthenticated(true);
      sessionStorage.setItem('adminPassword', password);
      setPassword("");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMutation.mutate();
  };

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => 
      apiRequest('POST', `/api/contacts/${id}/mark-read`, { password: adminPassword }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: "Marked as Read",
        description: "Contact message marked as read",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to mark as read",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md" data-testid="card-admin-login">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={24} />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter the admin password to access the management panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  data-testid="input-admin-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data?.stats;
  const reviews = data?.reviews || [];

  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-admin-title">
            Admin Panel
          </h1>
          <p className="text-muted-foreground" data-testid="text-admin-description">
            Manage reviews and contact messages
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card data-testid="card-stats">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database size={20} />
                Review Statistics
              </CardTitle>
              <CardDescription>
                Current review data from Google Business Profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ) : stats ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="fill-primary text-primary" size={24} />
                      <span className="text-3xl font-bold" data-testid="text-admin-rating">
                        {stats.overallRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      <p data-testid="text-admin-total-reviews">{stats.totalReviews} total reviews</p>
                      <p className="text-sm flex items-center gap-1" data-testid="text-admin-last-updated">
                        <Calendar size={14} />
                        Updated {formatDistanceToNow(new Date(stats.lastUpdated), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing || refreshMutation.isPending}
                    data-testid="button-refresh-reviews"
                  >
                    <RefreshCw size={16} className={isRefreshing || refreshMutation.isPending ? "animate-spin" : ""} />
                    {isRefreshing || refreshMutation.isPending ? "Refreshing..." : "Refresh Reviews Now"}
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-4">No review data available</p>
                  <Button
                    onClick={handleRefresh}
                    disabled={isRefreshing || refreshMutation.isPending}
                    data-testid="button-initial-fetch"
                  >
                    <RefreshCw size={16} className={isRefreshing || refreshMutation.isPending ? "animate-spin" : ""} />
                    Fetch Reviews
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-recent-reviews">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>
                Latest reviews stored in the database
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-16 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              ) : reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border rounded-lg p-4"
                      data-testid={`card-admin-review-${review.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium" data-testid={`text-admin-reviewer-${review.id}`}>
                            {review.authorName}
                          </p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? "fill-primary text-primary" : "text-muted"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(review.reviewDate), { addSuffix: true })}
                        </p>
                      </div>
                      {review.reviewText && (
                        <p className="text-sm text-muted-foreground" data-testid={`text-admin-review-text-${review.id}`}>
                          {review.reviewText}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No reviews available</p>
              )}
            </CardContent>
          </Card>

          <Card data-testid="card-schedule">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Update Schedule
              </CardTitle>
              <CardDescription>
                Automatic review refresh configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Schedule:</strong> Every Sunday at 2:00 AM
                </p>
                <p className="text-sm text-muted-foreground">
                  Reviews are automatically fetched from Google Business Profile and updated weekly. You can manually refresh at any time using the button above.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-contact-messages">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail size={20} />
                Contact Messages
                {contactsData && contactsData.unreadCount > 0 && (
                  <Badge variant="destructive" data-testid="badge-unread-count">
                    {contactsData.unreadCount} unread
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Messages submitted through the contact form
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-20 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>
              ) : contactsError ? (
                <div className="text-center py-8">
                  <p className="text-destructive mb-2">Failed to load contact messages</p>
                  <p className="text-sm text-muted-foreground">{(contactsError as Error).message}</p>
                </div>
              ) : contactsData && contactsData.contacts.length > 0 ? (
                <div className="space-y-4">
                  {contactsData.contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`border rounded-lg p-4 ${contact.isRead === 0 ? 'bg-accent/10' : ''}`}
                      data-testid={`card-contact-${contact.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium" data-testid={`text-contact-name-${contact.id}`}>
                              {contact.firstName} {contact.lastName}
                            </p>
                            {contact.isRead === 0 && (
                              <Badge variant="secondary" data-testid={`badge-unread-${contact.id}`}>
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground" data-testid={`text-contact-email-${contact.id}`}>
                            {contact.email}
                          </p>
                          {contact.company && (
                            <p className="text-sm text-muted-foreground" data-testid={`text-contact-company-${contact.id}`}>
                              {contact.company}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                          </p>
                          {contact.isRead === 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsReadMutation.mutate(contact.id)}
                              disabled={markAsReadMutation.isPending}
                              data-testid={`button-mark-read-${contact.id}`}
                            >
                              <CheckCircle2 size={14} className="mr-1" />
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-1">Message:</p>
                        <p className="text-sm text-foreground whitespace-pre-wrap" data-testid={`text-contact-message-${contact.id}`}>
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No contact messages yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
