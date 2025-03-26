import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
  const [dashBoardData, setDashBoardData] = useState(null);
  
  const fetchDashBoardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setDashBoardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashBoardData();
    }
  }, [isEducator]);

  return dashBoardData ? (
    <div className="min-h-screen flex flex-col items-center justify-between gap-6 px-4 pt-6 pb-4 md:p-8 md:pb-0">
      <div className="space-y-5 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md w-full">
            <img src={assets.patients_icon} alt="earning icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashBoardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm text-gray-500">Total Enrolments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md w-full">
            <img src={assets.appointments_icon} alt="patients icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {dashBoardData.totalCourses}
              </p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 rounded-md w-full">
            <img src={assets.earning_icon} alt="patients icon" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-medium text-gray-600">
                {currency}
                {dashBoardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-medium">Latest Enrollments</h2>
        <div className="overflow-x-auto w-full rounded-md bg-white border border-gray-500/20">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-gray-900 border-b border-gray-500/20">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden md:table-cell">#</th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashBoardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} className="border-b border-gray-500/20">
                  <td className="px-4 py-3 text-center hidden md:table-cell">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img src={item.students.imageUrl} alt="profile" className="w-9 h-9 rounded-full" />
                    <span className="truncate">{item.students.name}</span>
                  </td>
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
