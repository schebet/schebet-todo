import { Briefcase, Home, Calendar, Sparkles, FileText, FolderOpen, BarChart3 } from 'lucide-react';

interface FilterCount {
  allTasks: number;
  today: number;
  nextWeek: number;
  priority: number;
}

interface PriorityCount {
  висока: number;
  средња: number;
  ниска: number;
}

interface CategoryCount {
  посао: number;
  лично: number;
  куповина: number;
  учење: number;
}

interface SidebarProps {
  filterCounts: FilterCount;
  priorityCounts: PriorityCount;
  categoryCounts: CategoryCount;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const priorityColors = {
  висока: 'bg-red-500',
  средња: 'bg-yellow-500',
  ниска: 'bg-cyan-500',
};

const categoryIcons = {
  посао: Briefcase,
  лично: Home,
  куповина: FolderOpen,
  учење: FileText,
};

export function Sidebar({ filterCounts, priorityCounts, categoryCounts, activeFilter, onFilterChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 px-6 py-8 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 mb-8">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-xl font-bold">TaskFlow</h1>
        </div>

        <nav>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Филтери</h2>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => onFilterChange('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm font-medium">Сви задаци</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{filterCounts.allTasks}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onFilterChange('today')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeFilter === 'today' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Данас</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{filterCounts.today}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onFilterChange('nextWeek')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeFilter === 'nextWeek' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Наредних 7 дана</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{filterCounts.nextWeek}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onFilterChange('priority')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeFilter === 'priority' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Приоритетни</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">{filterCounts.priority}</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Приоритет</h2>
          <ul className="space-y-1">
            {(Object.keys(priorityCounts) as Array<keyof PriorityCount>).map((priority) => (
              <li key={priority}>
                <button
                  onClick={() => onFilterChange(`priority-${priority}`)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeFilter === `priority-${priority}` ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${priorityColors[priority]}`} />
                    <span className="text-sm font-medium capitalize">{priority}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">{priorityCounts[priority]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Категорије</h2>
          <ul className="space-y-1">
            {(Object.keys(categoryCounts) as Array<keyof CategoryCount>).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <li key={category}>
                  <button
                    onClick={() => onFilterChange(`category-${category}`)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      activeFilter === `category-${category}` ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium capitalize">{category}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500">{categoryCounts[category]}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
