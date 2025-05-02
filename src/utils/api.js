const staffData = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Frontend Developer',
    email: 'john@brrmedia.com',
    status: 'active',
    lastLogin: '2023-05-15T09:30:00',
    driveStorageUsed: '15.2 GB',
    deviceType: 'MacBook Pro (16, 2021)',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Backend Developer',
    email: 'jane@brrmedia.com',
    status: 'active',
    lastLogin: '2023-05-14T14:20:00',
    driveStorageUsed: '8.7 GB',
    deviceType: 'MacBook Air (M1, 2020)',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'IT Administrator',
    email: 'mike@brrmedia.com',
    status: 'active',
    lastLogin: '2023-05-15T08:15:00',
    driveStorageUsed: '22.1 GB',
    deviceType: 'iMac (24-inch, 2021)',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];

const ticketsData = [
  {
    id: '1',
    userId: '1',
    issueType: 'software',
    description: 'Need access to Figma',
    status: 'open',
    createdAt: '2023-05-10T14:30:00',
  },
  {
    id: '2',
    userId: '1',
    issueType: 'hardware',
    description: 'Laptop keyboard not working properly',
    status: 'in-progress',
    createdAt: '2023-05-12T09:15:00',
  },
  {
    id: '3',
    userId: '1',
    issueType: 'account',
    description: 'Password reset required',
    status: 'resolved',
    createdAt: '2023-05-08T11:20:00',
  },
];

const todosData = [
  {
    id: '1',
    text: 'Complete dashboard UI',
    completed: false,
    createdAt: '2023-05-15T08:00:00',
  },
  {
    id: '2',
    text: 'Review pull requests',
    completed: true,
    createdAt: '2023-05-14T16:30:00',
  },
  {
    id: '3',
    text: 'Update project documentation',
    completed: false,
    createdAt: '2023-05-13T10:15:00',
  },
];

export const fetchStaff = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(staffData), 500);
  });
};

export const fetchTickets = async (userId) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(ticketsData.filter(ticket => ticket.userId === userId)), 500);
  });
};

export const fetchTodos = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(todosData), 500);
  });
};

export const submitTicket = async (ticketData) => {
  return new Promise(resolve => {
    const newTicket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'open',
      createdAt: new Date().toISOString(),
      userId: '1', // Simulated user ID
    };
    ticketsData.unshift(newTicket);
    setTimeout(() => resolve(newTicket), 500);
  });
};

export const updateTodo = async (todoId, updates) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = todosData.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        todosData[index] = { ...todosData[index], ...updates };
        resolve(todosData[index]);
      }
      resolve(null);
    }, 500);
  });
};

export const addTodo = async (text) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exists = todosData.some(
        todo => todo.text.trim().toLowerCase() === text.trim().toLowerCase()
      );
      
      if (exists) {
        return reject(new Error('This task already exists!'));
      }

      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      todosData.unshift(newTodo);
      resolve(newTodo);
    }, 500);
  });
};


export const deleteTodo = async (todoId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = todosData.findIndex(todo => todo.id === todoId);
      if (index !== -1) {
        todosData.splice(index, 1);
        resolve(true);
      }
      resolve(false);
    }, 500);
  });
};
