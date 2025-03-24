import { clerkClient } from "@clerk/express";
import Course from "../models/courseModel.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js"

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator"
      }
    });

    res.json({ success: true, message: "You ca now publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not Attached" });
    }

    // Upload image first
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    
    // Parse course data
    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    parsedCourseData.courseThumbnail = imageUpload.secure_url; // Assign the image URL here

    // Create course with all required fields
    const newCourse = await Course.create(parsedCourseData);

    res.json({ success: true, message: "Course Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const educatorDashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;

    // Fetch all courses of the educator
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;
    const courseIds = courses.map((course) => course._id);

    // Fetch all completed purchases for these courses
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    });

    // Calculate total earnings
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // Fetch all enrolled students in a single query (Instead of looping)
    const studentIds = courses.flatMap((course) => course.enrolledStudents);
    const uniqueStudentIds = [...new Set(studentIds)]; // Remove duplicates

    const students = await User.find(
      { _id: { $in: uniqueStudentIds } },
      "name imageUrl"
    );

    // Map students to their respective courses
    const enrolledStudentsData = courses.map((course) => ({
      courseTitle: course.courseTitle,
      students: students.filter((student) =>
        course.enrolledStudents.includes(student._id)
      )
    }));

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed"
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt
    }));

    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
