import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription,
  CardHeader, CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Calendar,
  Users
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from 'recharts';

// Mock data
const userActivityData = [
  { name: 'T2', users: 400 },
  { name: 'T3', users: 300 },
  { name: 'T4', users: 520 },
  { name: 'T5', users: 480 },
  { name: 'T6', users: 390 },
  { name: 'T7', users: 210 },
  { name: 'CN', users: 180 },
];

const lessonCompletionData = [
  { name: 'Hiragana', complete: 85 },
  { name: 'Katakana', complete: 73 },
  { name: 'N5 Kanji', complete: 62 },
  { name: 'N4 Kanji', complete: 45 },
  { name: 'N3 Kanji', complete: 25 },
];

const recentStudents = [
  { id: 1, name: 'Nguyễn Văn A', level: 'N4', progress: 78, avatar: '' },
  { id: 2, name: 'Trần Thị B', level: 'N5', progress: 92, avatar: '' },
  { id: 3, name: 'Lê Minh C', level: 'N3', progress: 45, avatar: '' },
  { id: 4, name: 'Phạm Hoàng D', level: 'N5', progress: 88, avatar: '' },
];

const Dashboard = () => {

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main Content */}
      <div className="w-full">

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Xin chào, Admin!</h1>
            <p className="text-gray-500">Đây là tổng quan của ứng dụng Học Tiếng Nhật</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tổng học viên</p>
                    <h3 className="text-2xl font-bold mt-1">1,247</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users size={24} className="text-blue-500" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <ArrowUpRight size={16} />
                  <span className="ml-1">12% so với tháng trước</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bài học hoàn thành</p>
                    <h3 className="text-2xl font-bold mt-1">8,729</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BookOpen size={24} className="text-green-500" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <ArrowUpRight size={16} />
                  <span className="ml-1">8% so với tháng trước</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tỷ lệ hoàn thành</p>
                    <h3 className="text-2xl font-bold mt-1">76%</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <BarChart3 size={24} className="text-purple-500" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-green-500">
                  <ArrowUpRight size={16} />
                  <span className="ml-1">5% so với tháng trước</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Thời gian học trung bình</p>
                    <h3 className="text-2xl font-bold mt-1">32 phút</h3>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Calendar size={24} className="text-orange-500" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-red-500">
                  <ArrowUpRight size={16} className="transform rotate-90" />
                  <span className="ml-1">3% giảm so với tháng trước</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động người dùng</CardTitle>
                <CardDescription>Số lượng người dùng hoạt động theo ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userActivityData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#3b82f6" 
                        fill="#93c5fd" 
                        fillOpacity={0.8} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hoàn thành bài học</CardTitle>
                <CardDescription>Tỷ lệ hoàn thành theo loại bài học</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={lessonCompletionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip />
                      <Bar 
                        dataKey="complete" 
                        fill="#8b5cf6" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Học viên gần đây</CardTitle>
              <CardDescription>Học viên đăng nhập gần đây và tiến độ học tập</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="font-medium p-4 pl-0">Học viên</th>
                      <th className="font-medium p-4">Cấp độ</th>
                      <th className="font-medium p-4">Tiến độ</th>
                      <th className="font-medium p-4 pr-0">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map((student) => (
                      <tr key={student.id} className="border-b last:border-b-0">
                        <td className="p-4 pl-0">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <p className="font-medium">{student.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded-md text-xs">
                            {student.level}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Progress value={student.progress} className="h-2 w-32" />
                            <span className="ml-3 text-sm text-gray-500">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 pr-0">
                          <span className={`py-1 px-2 rounded-md text-xs ${
                            student.progress > 75 
                              ? 'bg-green-100 text-green-700' 
                              : student.progress > 50 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-red-100 text-red-700'
                          }`}>
                            {student.progress > 75 
                              ? 'Tốt' 
                              : student.progress > 50 
                                ? 'Trung bình' 
                                : 'Cần cải thiện'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">Xem tất cả học viên</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;