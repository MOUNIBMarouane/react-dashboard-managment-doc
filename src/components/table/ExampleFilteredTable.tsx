
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableSearchBar } from './TableSearchBar';
import { DataTable } from './DataTable';
import { TableAdvancedFilters, FilterState } from './TableAdvancedFilters';
import { TableActiveFilters } from './TableActiveFilters';
import { DateRange } from '@/components/ui/calendar';
import { columns } from './columns';

// Example data
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', type: 'customer', date: new Date('2023-01-15') },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', type: 'vendor', date: new Date('2023-02-20') },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending', type: 'customer', date: new Date('2023-03-10') },
];

export const ExampleFilteredTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  
  const [filterState, setFilterState] = useState<FilterState>({
    query: '',
    field: 'name',
    status: 'any',
    type: 'any',
  });

  const statusOptions = [
    { label: 'Any Status', value: 'any' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ];

  const typeOptions = [
    { label: 'Any Type', value: 'any' },
    { label: 'Customer', value: 'customer' },
    { label: 'Vendor', value: 'vendor' },
  ];

  // Filter data based on search query, date range and filters
  const filteredData = data.filter(item => {
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Date filter
    if (dateRange.from && dateRange.to) {
      if (item.date < dateRange.from || item.date > dateRange.to) {
        return false;
      }
    }

    // Status filter
    if (filterState.status && filterState.status !== 'any' && item.status !== filterState.status) {
      return false;
    }

    // Type filter
    if (filterState.type && filterState.type !== 'any' && item.type !== filterState.type) {
      return false;
    }

    return true;
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilterState(newFilters);
  };

  const handleClearFilter = (filterKey: string) => {
    setFilterState(prev => ({
      ...prev,
      [filterKey]: filterKey === 'date' ? undefined : 'any'
    }));
    if (filterKey === 'date') {
      setDateRange({ from: undefined, to: undefined });
    }
  };

  const handleClearAllFilters = () => {
    setFilterState({
      query: '',
      field: 'name',
      status: 'any',
      type: 'any'
    });
    setDateRange({ from: undefined, to: undefined });
    setSearchQuery('');
  };

  // Get active filters for display
  const activeFilters: Record<string, string | boolean | number | Date | undefined> = {};
  
  if (searchQuery) {
    activeFilters.search = searchQuery;
  }
  
  if (filterState.status && filterState.status !== 'any') {
    activeFilters.status = filterState.status;
  }
  
  if (filterState.type && filterState.type !== 'any') {
    activeFilters.type = filterState.type;
  }
  
  if (dateRange.from && dateRange.to) {
    activeFilters.dateFrom = dateRange.from;
    activeFilters.dateTo = dateRange.to;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filtered Table Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search Bar */}
          <TableSearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Search by name or email..."
            showFiltersButton={true}
            onToggleFilters={() => setShowFilters(!showFilters)}
            dateRange={dateRange}
            onDateChange={setDateRange}
          />

          {/* Advanced Filters */}
          {showFilters && (
            <TableAdvancedFilters
              filters={filterState}
              onFiltersChange={handleFilterChange}
              statusOptions={statusOptions}
              typeOptions={typeOptions}
              onApply={() => setShowFilters(false)}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Active Filters */}
          <TableActiveFilters
            filters={activeFilters}
            onClearFilter={handleClearFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Data Table */}
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Records ({data.length})</TabsTrigger>
              <TabsTrigger value="filtered">Filtered ({filteredData.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="p-0">
              <DataTable columns={columns} data={data} />
            </TabsContent>
            <TabsContent value="filtered" className="p-0">
              <DataTable columns={columns} data={filteredData} />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
