import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const SearchFilters = ({ onSearch, onFilter, filters }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [localFilters, setLocalFilters] = useState({
    college: "",
    branch: "",
    location: "",
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setLocalFilters({ college: "", branch: "", location: "" });
    setSearchTerm("");
    onSearch("");
    onFilter({ college: "", branch: "", location: "" });
  };

  const hasActiveFilters = searchTerm || Object.values(localFilters).some(v => v);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, college, branch, or location..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">College</label>
                <Input
                  placeholder="Filter by college..."
                  value={localFilters.college}
                  onChange={(e) => handleFilterChange("college", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Branch</label>
                <Input
                  placeholder="Filter by branch..."
                  value={localFilters.branch}
                  onChange={(e) => handleFilterChange("branch", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  placeholder="Filter by location..."
                  value={localFilters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchFilters;