import { Briefcase, Home, FolderOpen, FileText, Calendar, MoreVertical, File } from 'lucide-react';
import type { Task } from '../lib/supabase';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
}

const priorityColors = {
  висока: 'border-red-500',
  средња: 'border-yellow-500',
  ниска: 'border-cyan-500',
};

const categoryIcons = {
  посао: Briefcase,
  лично: Home,
  куповина: FolderOpen,
  учење: FileText,
};

const categoryColors = {
  посао: 'bg-blue-100 text-blue-700',
  лично: 'bg-purple-100 text-purple-700',
  куповина: 'bg-green-100 text-green-700',
  учење: 'bg-amber-100 text-amber-700',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Данас';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Сутра';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

export function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Активни задаци</h2>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-md">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
            <span>Сортирај</span>
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
            <span>Филтер</span>
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {tasks.map((task) => {
          const Icon = categoryIcons[task.category];
          const dateStr = formatDate(task.due_date);

          return (
            <div key={task.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => onToggleComplete(task.id, !task.completed)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {task.completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>

                <div className={`flex-grow min-w-0 border-l-3 pl-4 ${priorityColors[task.priority]}`}>
                  <h3 className={`text-base font-semibold text-gray-900 mb-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${categoryColors[task.category]}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span className="capitalize">{task.category}</span>
                    </div>

                    {task.due_date && (
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${
                        dateStr === 'Данас' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateStr}{task.due_time ? `, ${task.due_time}` : ''}</span>
                      </div>
                    )}

                    {task.documents_count > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        <File className="w-3.5 h-3.5" />
                        <span>{task.documents_count} документа</span>
                      </div>
                    )}

                    {task.participants_count > 0 && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        <span>👥 {task.participants_count} članova</span>
                      </div>
                    )}

                    {task.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{task.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
