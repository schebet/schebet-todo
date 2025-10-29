import { FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface StatsCardsProps {
  totalTasks: number;
  completedToday: number;
  urgentTasks: number;
  dueTodayTasks: number;
}

export function StatsCards({ totalTasks, completedToday, urgentTasks, dueTodayTasks }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{totalTasks}</div>
        <div className="text-sm text-gray-600 font-medium">УКУПНО ЗАДАТАКА</div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{completedToday}</div>
        <div className="text-sm text-gray-600 font-medium">ЗАВРШЕНО ДАНАС</div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{urgentTasks}</div>
        <div className="text-sm text-gray-600 font-medium">ХИТНИ ЗАДАЦИ</div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{dueTodayTasks}</div>
        <div className="text-sm text-gray-600 font-medium">ЗА ДАНАС</div>
      </div>
    </div>
  );
}
