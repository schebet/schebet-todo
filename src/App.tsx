import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { StatsCards } from './components/StatsCards';
import { TaskList } from './components/TaskList';
import { supabase, type Task } from './lib/supabase';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [tasks, activeFilter]);

  async function loadTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Грешка при учитавању задатака:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTaskComplete(taskId: string, completed: boolean) {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed } : task
      ));
    } catch (error) {
      console.error('Грешка при ажурирању задатка:', error);
    }
  }

  function applyFilter() {
    let filtered = [...tasks];

    if (activeFilter === 'today') {
      const today = new Date().toDateString();
      filtered = filtered.filter(task =>
        task.due_date && new Date(task.due_date).toDateString() === today
      );
    } else if (activeFilter === 'nextWeek') {
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(task => {
        if (!task.due_date) return false;
        const dueDate = new Date(task.due_date);
        return dueDate >= today && dueDate <= nextWeek;
      });
    } else if (activeFilter === 'priority') {
      filtered = filtered.filter(task => task.priority === 'висока');
    } else if (activeFilter.startsWith('priority-')) {
      const priority = activeFilter.replace('priority-', '') as Task['priority'];
      filtered = filtered.filter(task => task.priority === priority);
    } else if (activeFilter.startsWith('category-')) {
      const category = activeFilter.replace('category-', '') as Task['category'];
      filtered = filtered.filter(task => task.category === category);
    }

    filtered = filtered.filter(task => !task.completed);
    setFilteredTasks(filtered);
  }

  const filterCounts = {
    allTasks: tasks.filter(t => !t.completed).length,
    today: tasks.filter(t => {
      if (!t.due_date || t.completed) return false;
      return new Date(t.due_date).toDateString() === new Date().toDateString();
    }).length,
    nextWeek: tasks.filter(t => {
      if (!t.due_date || t.completed) return false;
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const dueDate = new Date(t.due_date);
      return dueDate >= today && dueDate <= nextWeek;
    }).length,
    priority: tasks.filter(t => t.priority === 'висока' && !t.completed).length,
  };

  const priorityCounts = {
    висока: tasks.filter(t => t.priority === 'висока' && !t.completed).length,
    средња: tasks.filter(t => t.priority === 'средња' && !t.completed).length,
    ниска: tasks.filter(t => t.priority === 'ниска' && !t.completed).length,
  };

  const categoryCounts = {
    посао: tasks.filter(t => t.category === 'посао' && !t.completed).length,
    лично: tasks.filter(t => t.category === 'лично' && !t.completed).length,
    куповина: tasks.filter(t => t.category === 'куповина' && !t.completed).length,
    учење: tasks.filter(t => t.category === 'учење' && !t.completed).length,
  };

  const stats = {
    totalTasks: tasks.filter(t => !t.completed).length,
    completedToday: tasks.filter(t => {
      if (!t.completed) return false;
      return new Date(t.created_at).toDateString() === new Date().toDateString();
    }).length,
    urgentTasks: tasks.filter(t => t.status === 'хитан' && !t.completed).length,
    dueTodayTasks: tasks.filter(t => {
      if (!t.due_date || t.completed) return false;
      return new Date(t.due_date).toDateString() === new Date().toDateString();
    }).length,
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Учитавање...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          filterCounts={filterCounts}
          priorityCounts={priorityCounts}
          categoryCounts={categoryCounts}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Моји задаци</h1>
              <p className="text-gray-600">
                Имате {stats.totalTasks} активних задатака, {stats.dueTodayTasks} за данас
              </p>
            </div>

            <StatsCards
              totalTasks={stats.totalTasks}
              completedToday={stats.completedToday}
              urgentTasks={stats.urgentTasks}
              dueTodayTasks={stats.dueTodayTasks}
            />

            <TaskList tasks={filteredTasks} onToggleComplete={toggleTaskComplete} />
          </div>
        </main>
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
