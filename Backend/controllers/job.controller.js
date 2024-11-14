import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (user.role == "student") {
      return res.status(401).json({
        message: "You cannot create a job.",
        success: false,
      });
    }
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      openings,
      companyId,
      experience,
    } = req.body;
    //console.log("req----->>  ", req.body);
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !openings ||
      !companyId ||
      !experience
    ) {
      return res.status(401).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      openings,
      company: companyId,
      createdBy: req.id,
      experience,
    });
    return res.status(200).json({
      message: "job created Successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      openings,
      companyId,
      experience,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !openings ||
      !companyId ||
      !experience
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const job = await Job.findByIdAndUpdate(req.params.id, {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      openings,
      company: companyId,
      createdBy: req.id,
      experience,
    });
    if (!job) {
      return res.status(400).json({
        message: "No job found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "job Details Updated Successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs Not Found.", success: false });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const adminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs Not Found.", success: false });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });

    if (!job) {
      return res
        .status(400)
        .json({ message: "Job Not Found.", success: false });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
