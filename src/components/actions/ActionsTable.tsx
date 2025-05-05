import { useState } from 'react';
import { Action } from '@/models/action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Eye, Edit, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface ActionsTableProps {
  actions: Action[];
  onView?: (action: Action) => void;
  onEdit: (action: Action) => void;
  onDelete: (action: Action) => void;
  isSimpleUser: boolean;
}

export const ActionsTable = ({ 
  actions, 
  onView, 
  onEdit, 
  onDelete, 
  isSimpleUser 
}: ActionsTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.actionKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search actions..."
            className="pl-8 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Key</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No actions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredActions.map((action) => (
                <TableRow key={action.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline" className="bg-blue-900/20">
                      {action.actionId}
                    </Badge>
                  </TableCell>
                  <TableCell>{action.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {action.description || "No description"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <code className="px-2 py-1 bg-blue-900/20 rounded text-xs">
                      {action.actionKey}
                    </code>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(action)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                        )}
                        {!isSimpleUser && (
                          <>
                            <DropdownMenuItem onClick={() => onEdit(action)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => onDelete(action)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
