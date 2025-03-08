// "use client";

// import { useState, useEffect } from "react";
// import { getAllProducts } from "@/utils/actions/products";

// // ✅ Custom Hook Moved OUTSIDE the Component
// const useMedicines = (filters: Record<string, string>) => {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       if (!filters.name && !filters.category) return; // ✅ Only fetch if filters are set

//       setLoading(true);
//       const data = await getAllProducts(filters);
//       console.log("Loaded Medicines:", data);
//       setMedicines(data);
//       setLoading(false);
//     };

//     fetchMedicines();
//   }, [filters]);

//   console.log(medicines)

//   return { medicines, loading };
// };


// export default useMedicines;
