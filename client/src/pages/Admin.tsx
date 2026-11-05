import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import FormProviders from "@/components/FormProviders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Lock, LogOut, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactRequest } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ContactsResponse {
  contacts: ContactRequest[];
  unreadCount: number;
}

export default function Admin() {
  return <FormProviders><AdminPage /></FormProviders>;
}

function AdminPage() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");

  const sessionQuery = useQuery<{ authenticated: boolean }>({
    queryKey: ["/api/admin/session"],
  });
  const isAuthenticated = sessionQuery.data?.authenticated === true;

  const contactsQuery = useQuery<ContactsResponse>({
    queryKey: ["/api/contacts"],
    enabled: isAuthenticated,
  });

  const loginMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/login", { password }),
    onSuccess: () => {
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/session"] });
      toast({ title: "Signed in" });
    },
    onError: () => toast({ title: "Login failed", description: "Unable to sign in with those credentials.", variant: "destructive" }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/admin/session"], { authenticated: false });
      queryClient.removeQueries({ queryKey: ["/api/contacts"] });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/contacts/${id}/mark-read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Marked as read", description: "Contact message marked as read." });
    },
    onError: () => toast({ title: "Error", description: "Unable to update the contact message.", variant: "destructive" }),
  });

  if (sessionQuery.isLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md" data-testid="card-admin-login">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock size={24} />Admin Login</CardTitle>
            <CardDescription>Sign in to view contact messages.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(event) => { event.preventDefault(); loginMutation.mutate(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <Input id="password" type="password" autoComplete="current-password" maxLength={1024} value={password} onChange={(event) => setPassword(event.target.value)} required data-testid="input-admin-password" />
              </div>
              <Button type="submit" className="w-full" disabled={loginMutation.isPending} data-testid="button-admin-login">
                {loginMutation.isPending ? "Signing in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const contactsData = contactsQuery.data;
  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2" data-testid="text-admin-title">Admin Panel</h1>
            <p className="text-muted-foreground">Manage contact messages.</p>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}><LogOut size={16} className="mr-2" />Log out</Button>
        </div>
        <Card data-testid="card-contact-messages">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail size={20} />Contact Messages
              {contactsData && contactsData.unreadCount > 0 && <Badge variant="destructive" data-testid="badge-unread-count">{contactsData.unreadCount} unread</Badge>}
            </CardTitle>
            <CardDescription>Messages submitted through the contact form.</CardDescription>
          </CardHeader>
          <CardContent>
            {contactsQuery.isLoading ? <div className="animate-pulse h-24 bg-muted rounded" /> :
              contactsQuery.isError ? <p className="text-destructive">Unable to load contact messages.</p> :
              contactsData && contactsData.contacts.length > 0 ? <div className="space-y-4">
                {contactsData.contacts.map((contact) => (
                  <div key={contact.id} className={`border rounded-lg p-4 ${contact.isRead === 0 ? "bg-accent/10" : ""}`} data-testid={`card-contact-${contact.id}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1"><p className="font-medium">{contact.firstName} {contact.lastName}</p>{contact.isRead === 0 && <Badge variant="secondary">New</Badge>}</div>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                        {contact.company && <p className="text-sm text-muted-foreground">{contact.company}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}</p>
                        {contact.isRead === 0 && <Button size="sm" variant="outline" onClick={() => markAsReadMutation.mutate(contact.id)} disabled={markAsReadMutation.isPending} data-testid={`button-mark-read-${contact.id}`}><CheckCircle2 size={14} className="mr-1" />Mark Read</Button>}
                      </div>
                    </div>
                    <div className="border-t pt-3"><p className="text-sm font-medium mb-1">Message:</p><p className="text-sm whitespace-pre-wrap">{contact.message}</p></div>
                  </div>
                ))}
              </div> : <p className="text-muted-foreground">No contact messages yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}