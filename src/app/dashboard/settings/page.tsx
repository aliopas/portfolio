
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, UserCircle, Lock,Palette } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from '@/context/ThemeContext';

export default function AccountSettingsPage() {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  // Mock user data - replace with actual data from your auth context/API
  const [name, setName] = useState("AliAlaa");
  const [email, setEmail] = useState("admin@example.com");
  const [bio, setBio] = useState("Full-stack developer passionate about creating amazing web experiences.");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, call an API to update profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
    // In a real app, call an API to change password
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Account Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile information, password, and site preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Information Card */}
        <Card className="lg:col-span-2 shadow-lg">
          <form onSubmit={handleProfileUpdate}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" /> Profile Information
              </CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us a bit about yourself" rows={3}/>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button type="submit" className="btn-glow">
                <Save className="mr-2 h-4 w-4" /> Save Profile
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-8 lg:col-span-1">
            {/* Change Password Card */}
            <Card className="shadow-lg">
            <form onSubmit={handlePasswordChange}>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lock className="h-6 w-6" /> Change Password
                </CardTitle>
                <CardDescription>Update your account password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                <Button type="submit" variant="outline" className="w-full">
                    Update Password
                </Button>
                </CardFooter>
            </form>
            </Card>
            
            {/* Theme Settings Card */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-6 w-6" /> Theme Preferences
                    </CardTitle>
                    <CardDescription>Customize the site appearance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="themeToggle" className="text-base">
                            Current Theme: <span className="font-semibold capitalize">{theme}</span>
                        </Label>
                        <Button onClick={toggleTheme} variant="outline">
                            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
