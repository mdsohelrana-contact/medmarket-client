"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ProductCard from "../../Shared/Product/ProductCard";
import { IMedicine } from "@/types/medicinesTypes";

const ShopHome = ({ medicines }: { medicines: IMedicine[] }) => {
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    prescription_required: false,
    sort: "",
  });

  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  useEffect(() => {
    let updatedMedicines = [...medicines];

    if (filters.search) {
      updatedMedicines = updatedMedicines.filter((medicine) => {
        const searchTerm = filters.search.toLowerCase();
        return (
          medicine.name.toLowerCase().includes(searchTerm) ||
          medicine.category.toLowerCase().includes(searchTerm) ||
          medicine.symptoms.includes(searchTerm)
        );
      });
    }

    // Filter by prescription_required
    if (filters.prescription_required) {
      updatedMedicines = updatedMedicines.filter(
        (medicine) => medicine.prescription_required === true
      );
    }

    // Sort the medicines
    if (filters.sort === "price-asc") {
      updatedMedicines.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-desc") {
      updatedMedicines.sort((a, b) => b.price - a.price);
    }

    setFilteredMedicines(updatedMedicines);
    setLoading(false);
  }, [filters, medicines]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search by name, category, or symptoms..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="p-3 border rounded-lg shadow-md w-full"
          />
        </div>

        {/* Sorting Select */}
        <div className="w-full md:w-1/4">
          <Select
            value={filters.sort}
            onValueChange={(value) => setFilters({ ...filters, sort: value })}
          >
            <SelectTrigger className="w-full p-3 border rounded-lg shadow-md">
              Sort by
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prescription Required Toggle */}
        <div className="w-full md:w-1/4">
          <Select
            value={filters.prescription_required ? "true" : "false"}
            onValueChange={(value) =>
              setFilters({
                ...filters,
                prescription_required: value === "true",
              })
            }
          >
            <SelectTrigger className="w-full p-3 border rounded-lg shadow-md">
              Prescription Required
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Empty State or Products */}
      {filteredMedicines.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-xl text-gray-600">
            No medicines found based on your filters. Please try again with
            different criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedicines.map((medicine) => (
            <ProductCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopHome;
