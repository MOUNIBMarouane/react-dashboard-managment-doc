
import { useSubTypeForm } from "../context/SubTypeFormContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import documentTypeService from "@/services/documentTypeService";

export const SubTypeReview = () => {
  const { formData, goToStep, submitForm } = useSubTypeForm();
  
  const { data: documentTypes = [] } = useQuery({
    queryKey: ['document-types'],
    queryFn: documentTypeService.getAllDocumentTypes,
  });
  
  const documentType = documentTypes.find(type => type.id === formData.documentTypeId)?.typeName || '';

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review Information</h2>
      <p className="text-muted-foreground">Please review the information below before submitting.</p>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Basic Information</span>
            <Button variant="outline" size="sm" onClick={() => goToStep(1)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Subtype Name</div>
            <div className="text-lg font-medium">{formData.name || 'Not specified'}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Description</div>
            <div>{formData.description || 'None provided'}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Document Type</div>
            <div>{documentType || 'Unknown'}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Validity Period</span>
            <Button variant="outline" size="sm" onClick={() => goToStep(2)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div>{formData.startDate ? format(formData.startDate, 'PPP') : 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">End Date</div>
              <div>{formData.endDate ? format(formData.endDate, 'PPP') : 'Not specified'}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Status</div>
            <Badge variant={formData.isActive ? "default" : "secondary"}>
              {formData.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
