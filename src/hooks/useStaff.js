import { useState, useEffect } from "react";
import { fetchStaff } from "../utils/api";

export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data = await fetchStaff();
        setStaff(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadStaff();
  }, []);

  return { staff, loading, error };
};
