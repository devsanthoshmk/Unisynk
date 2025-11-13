"use client"

import { useState } from "react"
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  Eye, 
  Settings,
  MoreHorizontal,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface RoleManagementProps {
  organizationId?: string
  eventId?: string
  scope: 'organization' | 'event'
}

const roleTypes = {
  organizer: {
    label: 'Organizer',
    description: 'Full access to dashboard, settings, automations',
    icon: Shield,
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  },
  volunteer: {
    label: 'Volunteer',
    description: 'Limited access to helpdesk, check-in, ticketing',
    icon: Users,
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  },
  viewer: {
    label: 'Viewer',
    description: 'Read-only access to analytics and reports',
    icon: Eye,
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  },
  admin: {
    label: 'Admin',
    description: 'Org-level settings and billing (organization only)',
    icon: Settings,
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  }
}

// Mock data - in real app, this would come from API
const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'organizer',
    joinedAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'volunteer',
    joinedAt: '2024-01-20',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'viewer',
    joinedAt: '2024-01-25',
    status: 'active'
  }
]

export function RoleManagement({ organizationId, eventId, scope }: RoleManagementProps) {
  const [members, setMembers] = useState(mockMembers)
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'volunteer'
  })

  const availableRoles = scope === 'organization' 
    ? Object.keys(roleTypes)
    : Object.keys(roleTypes).filter(role => role !== 'admin')

  const handleInvite = async () => {
    // TODO: Backend implementation needed
    // 1. Validate email
    // 2. Check if user already exists
    // 3. Create invitation record
    // 4. Send invitation email
    // 5. Update UI
    
    console.log('Inviting user:', inviteData)
    setShowInviteForm(false)
    setInviteData({ email: '', role: 'volunteer' })
  }

  const handleRoleChange = async (memberId: string, newRole: string) => {
    // TODO: Backend implementation needed
    // 1. Validate role change permissions
    // 2. Update role in database
    // 3. Update UI
    // 4. Send notification to user
    
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
  }

  const handleRemoveMember = async (memberId: string) => {
    // TODO: Backend implementation needed
    // 1. Validate removal permissions
    // 2. Remove from database
    // 3. Update UI
    // 4. Send notification to user
    
    setMembers(prev => prev.filter(member => member.id !== memberId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground">
            Manage {scope} access and permissions
          </p>
        </div>
        <Button onClick={() => setShowInviteForm(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Member</CardTitle>
            <CardDescription>
              Send an invitation to join this {scope}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={inviteData.email}
                  onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={inviteData.role} 
                  onValueChange={(value) => setInviteData(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((roleKey) => {
                      const role = roleTypes[roleKey as keyof typeof roleTypes]
                      return (
                        <SelectItem key={roleKey} value={roleKey}>
                          <div className="flex items-center space-x-2">
                            <role.icon className="w-4 h-4" />
                            <span>{role.label}</span>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleInvite}>
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInviteForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Current Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => {
              const role = roleTypes[member.role as keyof typeof roleTypes]
              const RoleIcon = role.icon
              
              return (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.email}</div>
                      <div className="text-xs text-muted-foreground">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={role.color}>
                      <RoleIcon className="w-3 h-3 mr-1" />
                      {role.label}
                    </Badge>
                    
                    {member.status === 'pending' && (
                      <Badge variant="outline">Pending</Badge>
                    )}
                    
                    <Select 
                      value={member.role} 
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((roleKey) => {
                          const roleOption = roleTypes[roleKey as keyof typeof roleTypes]
                          return (
                            <SelectItem key={roleKey} value={roleKey}>
                              <div className="flex items-center space-x-2">
                                <roleOption.icon className="w-4 h-4" />
                                <span>{roleOption.label}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Role Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding what each role can do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRoles.map((roleKey) => {
              const role = roleTypes[roleKey as keyof typeof roleTypes]
              const RoleIcon = role.icon
              
              return (
                <div key={roleKey} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <RoleIcon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm text-muted-foreground">{role.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}