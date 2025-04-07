
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { User as UserIcon, Upload } from "lucide-react";
import { toast } from "sonner";

interface UserEditDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({ user, isOpen, onClose }) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    avatarUrl: user.avatarUrl
  });
  
  const [previewImage, setPreviewImage] = useState<string | undefined>(user.avatarUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        // In a real app, you would upload this to storage and get a URL
        // For now, we'll just use the data URL for preview
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, update the user in the database
      // For now, we'll just show a success toast
      toast.success("User details updated successfully");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-dashboard-blue-dark border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Edit User Details</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-dashboard-blue-light flex items-center justify-center relative group">
              {previewImage ? (
                <img src={previewImage} alt={formData.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={40} className="text-white/70" />
              )}
              
              <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <Upload size={20} className="text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="sr-only" 
                  onChange={handleImageChange} 
                />
              </label>
            </div>
            <p className="text-xs text-white/60">Click to upload a new image</p>
          </div>
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-white/80 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
            />
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-white/80 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
            />
          </div>
          
          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm text-white/80 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm text-white/80 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <DialogFooter className="sm:justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dashboard-accent hover:bg-dashboard-accent/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
