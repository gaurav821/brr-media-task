import { useState, useEffect } from "react";
import { fetchTickets, submitTicket } from "../utils/api";

export const useTickets = (userId) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets(userId);
        setTickets(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadTickets();
  }, [userId]);

  const addTicket = async (ticketData) => {
    setLoading(true);
    try {
      const newTicket = await submitTicket(ticketData);
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { tickets, loading, error, addTicket };
};
